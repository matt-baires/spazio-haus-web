import config from "@payload-config";
import { getPayload } from "payload";
import { blobDisponible, subirAdjunto } from "@/lib/consultas";

const MAX_ARCHIVOS = 3;
const MAX_TOTAL = 4 * 1024 * 1024; // Vercel admite hasta 4,5 MB por pedido
const TIPOS_OK = /^(image\/(jpeg|png|webp|heic|heif)|application\/pdf)$/;

const texto = (fd: FormData, campo: string, max = 500) => {
  const v = fd.get(campo);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

function error(mensaje: string, status = 400) {
  return Response.json({ ok: false, error: mensaje }, { status });
}

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return error("No pudimos leer el formulario. Probá de nuevo.");
  }

  // Campo trampa para bots: las personas no lo ven ni lo completan.
  if (texto(fd, "sitio_web")) return Response.json({ ok: true });

  const nombre = texto(fd, "nombre", 120);
  const email = texto(fd, "email", 200);
  const telefono = texto(fd, "telefono", 40);
  const mensaje = texto(fd, "mensaje", 4000);
  const tipo = texto(fd, "tipo", 60);
  const perfil = texto(fd, "perfil", 20) === "profesional" ? "profesional" : "particular";

  if (!nombre) return error("Falta tu nombre.");
  if (!email && !telefono) return error("Dejanos un email o un teléfono para responderte.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error("Revisá el email.");
  if (!tipo) return error("Elegí qué querés hacer.");
  if (!mensaje) return error("Contanos un poco del proyecto.");

  const archivos = fd.getAll("adjuntos").filter((a): a is File => a instanceof File && a.size > 0);
  if (archivos.length > MAX_ARCHIVOS) return error(`Podés adjuntar hasta ${MAX_ARCHIVOS} archivos.`);
  if (archivos.reduce((t, a) => t + a.size, 0) > MAX_TOTAL) return error("Los archivos superan los 4 MB en total.");
  if (archivos.some((a) => !TIPOS_OK.test(a.type))) return error("Solo se aceptan fotos (JPG, PNG, WEBP, HEIC) o PDF.");
  if (archivos.length > 0 && !blobDisponible()) return error("Por ahora no podemos recibir adjuntos. Enviá la consulta sin archivos.", 503);

  try {
    const carpeta = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
    const adjuntos = await Promise.all(archivos.map((a, i) => subirAdjunto(carpeta, i, a)));
    const payload = await getPayload({ config });
    const servicio = await payload.find({ collection: "servicios", where: { slug: { equals: tipo } }, limit: 1, depth: 0 });

    await payload.create({
      collection: "consultas",
      overrideAccess: true,
      data: {
        estado: "nueva",
        perfil,
        tipo: (servicio.docs[0] as { nombre?: string } | undefined)?.nombre ?? (tipo === "otro" ? "Otro" : tipo),
        ambiente: texto(fd, "ambiente", 120) || undefined,
        medidas: texto(fd, "medidas", 300) || undefined,
        zona: texto(fd, "zona", 120) || undefined,
        plazo: texto(fd, "plazo", 120) || undefined,
        presupuesto: texto(fd, "presupuesto", 120) || undefined,
        mensaje,
        nombre,
        email: email || undefined,
        telefono: telefono || undefined,
        origen: texto(fd, "origen", 120) || undefined,
        referencia: texto(fd, "referencia", 120) || undefined,
        adjuntos,
      },
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Error al guardar la consulta", e);
    return error("No pudimos guardar tu consulta. Probá de nuevo en unos minutos.", 500);
  }
}
