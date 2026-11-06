import "server-only";
import { get, list, put } from "@vercel/blob";

import type { Estado } from "@/lib/estados";

export { ESTADOS, type Estado } from "@/lib/estados";

export type Adjunto = { nombre: string; pathname: string; tipo: string; tamano: number };

export type Consulta = {
  id: string;
  creada: string;
  estado: Estado;
  perfil: "particular" | "profesional";
  tipo: string;
  ambiente?: string;
  medidas?: string;
  zona?: string;
  plazo?: string;
  presupuesto?: string;
  mensaje: string;
  nombre: string;
  email?: string;
  telefono?: string;
  origen?: string;
  referencia?: string;
  adjuntos: Adjunto[];
  notas?: string;
};

const PREFIJO = "consultas/";
const ruta = (id: string) => `${PREFIJO}${id}.json`;

export function blobDisponible() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function subirAdjunto(id: string, indice: number, archivo: File): Promise<Adjunto> {
  const seguro = archivo.name.normalize("NFD").replace(/[^\w.-]+/g, "-").slice(-80) || "archivo";
  const pathname = `adjuntos/${id}/${indice + 1}-${seguro}`;
  await put(pathname, archivo, { access: "private", contentType: archivo.type || undefined });
  return { nombre: archivo.name, pathname, tipo: archivo.type, tamano: archivo.size };
}

export async function guardarConsulta(consulta: Consulta) {
  await put(ruta(consulta.id), JSON.stringify(consulta), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export async function obtenerConsulta(id: string): Promise<Consulta | null> {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  const r = await get(ruta(id), { access: "private", useCache: false });
  if (!r || r.statusCode !== 200) return null;
  return (await new Response(r.stream).json()) as Consulta;
}

export async function listarConsultas(): Promise<Consulta[]> {
  const { blobs } = await list({ prefix: PREFIJO, limit: 200 });
  const ids = blobs
    .map((b) => b.pathname.slice(PREFIJO.length).replace(/\.json$/, ""))
    .filter((id) => /^[a-z0-9-]+$/.test(id));
  const consultas = await Promise.all(ids.map((id) => obtenerConsulta(id)));
  return consultas
    .filter((c): c is Consulta => c !== null)
    .sort((a, b) => b.creada.localeCompare(a.creada));
}

export async function actualizarConsulta(id: string, cambios: Partial<Pick<Consulta, "estado" | "notas">>) {
  const actual = await obtenerConsulta(id);
  if (!actual) throw new Error("Consulta no encontrada");
  await guardarConsulta({ ...actual, ...cambios });
}

export async function leerAdjunto(pathname: string) {
  if (!pathname.startsWith("adjuntos/")) return null;
  return get(pathname, { access: "private" });
}
