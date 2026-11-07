/**
 * Carga inicial con el contenido de ejemplo. Corre en cada build, pero solo
 * completa las colecciones que están vacías: nunca pisa lo cargado en el panel.
 *
 *   npm run seed
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { articulos } from "../content/blog";
import { faq } from "../content/faq";
import { materiales } from "../content/materiales";
import { obras } from "../content/obras";
import { servicios } from "../content/servicios";

const context = { sinRevalidar: true };

const textoNodo = (text: string) => ({ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 });
const parrafo = (text: string) => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  textFormat: 0,
  textStyle: "",
  children: [textoNodo(text)],
});
const titulo = (text: string) => ({
  type: "heading",
  tag: "h2",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr",
  children: [textoNodo(text)],
});

async function main() {
  if (!process.env.SPAZIOH_DATABASE_URL && !process.env.DATABASE_URL) {
    console.log("[seed] Sin base de datos configurada: se omite.");
    return;
  }
  const payload = await getPayload({ config });
  const vacia = async (collection: "servicios" | "obras" | "materiales" | "preguntas" | "articulos") =>
    (await payload.count({ collection, overrideAccess: true })).totalDocs === 0;

  // Servicios
  const idPorSlug = new Map<string, number | string>();
  if (await vacia("servicios")) {
    for (const [i, s] of servicios.entries()) {
      const doc = await payload.create({
        collection: "servicios",
        context,
        overrideAccess: true,
        data: {
          nombre: s.nombre,
          slug: s.slug,
          orden: i,
          resumen: s.resumen,
          intro: s.intro,
          queResolvemos: s.queResolvemos.map((texto) => ({ texto })),
          materiales: s.materiales.map((texto) => ({ texto })),
        },
      });
      idPorSlug.set(s.slug, doc.id);
    }
    console.log(`[seed] ${servicios.length} servicios`);
  } else {
    const r = await payload.find({ collection: "servicios", limit: 100, depth: 0, overrideAccess: true });
    for (const d of r.docs) idPorSlug.set((d as { slug: string }).slug, d.id);
  }

  // Obras de ejemplo (publicadas)
  if (await vacia("obras")) {
    for (const [i, o] of obras.entries()) {
      const tipo = idPorSlug.get(o.tipo);
      if (!tipo) continue;
      await payload.create({
        collection: "obras",
        context,
        overrideAccess: true,
        draft: false,
        data: {
          titulo: o.titulo,
          slug: o.slug,
          orden: i,
          ejemplo: true,
          destacada: Boolean(o.destacada),
          tipo: tipo as number,
          ambiente: o.ambiente,
          zona: o.zona,
          descripcion: o.descripcion,
          detalle: o.detalle,
          materiales: o.materiales.map((texto) => ({ texto })),
          fotosPrevistas: o.fotos,
          _status: "published",
        },
      });
    }
    console.log(`[seed] ${obras.length} obras de ejemplo`);
  }

  // Muestrario
  if (await vacia("materiales")) {
    for (const [i, g] of materiales.entries()) {
      await payload.create({
        collection: "materiales",
        context,
        overrideAccess: true,
        data: {
          nombre: g.nombre,
          slug: g.id,
          orden: i,
          ejemplo: true,
          descripcion: g.descripcion,
          ideal: g.ideal,
          muestras: g.muestras.map((m) => ({ nombre: m.nombre, color: m.color, textura: m.textura })),
        },
      });
    }
    console.log(`[seed] ${materiales.length} grupos de materiales`);
  }

  // Preguntas frecuentes
  if (await vacia("preguntas")) {
    for (const [i, f] of faq.entries()) {
      await payload.create({
        collection: "preguntas",
        context,
        overrideAccess: true,
        data: { pregunta: f.pregunta, respuesta: f.respuesta, orden: i, enHome: i < 3 },
      });
    }
    console.log(`[seed] ${faq.length} preguntas`);
  }

  // Blog (publicado)
  if (await vacia("articulos")) {
    for (const a of articulos) {
      const children = a.cuerpo.flatMap((b) => [...(b.subtitulo ? [titulo(b.subtitulo)] : []), ...b.parrafos.map(parrafo)]);
      await payload.create({
        collection: "articulos",
        context,
        overrideAccess: true,
        draft: false,
        data: {
          titulo: a.titulo,
          slug: a.slug,
          ejemplo: true,
          bajada: a.bajada,
          fecha: `${a.fecha}T12:00:00.000Z`,
          categoria: a.categoria,
          cuerpo: { root: { type: "root", format: "", indent: 0, version: 1, direction: "ltr", children } },
          _status: "published",
        } as never,
      });
    }
    console.log(`[seed] ${articulos.length} artículos`);
  }

  console.log("[seed] listo");
}

await main();
process.exit(0);
