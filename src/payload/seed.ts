/**
 * Carga inicial con el contenido de ejemplo. Corre en cada build, pero solo
 * completa las colecciones que están vacías: nunca pisa lo cargado en el panel.
 *
 *   npm run seed
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { faq } from "../content/faq";
import { materiales } from "../content/materiales";
import { obras, obrasNuevas } from "../content/obras";
import { servicios } from "../content/servicios";

const context = { sinRevalidar: true };

async function main() {
  if (!process.env.SPAZIOH_DATABASE_URL && !process.env.DATABASE_URL) {
    console.log("[seed] Sin base de datos configurada: se omite.");
    return;
  }
  const payload = await getPayload({ config });
  const vacia = async (collection: "servicios" | "obras" | "materiales" | "preguntas") =>
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
    // Servicios que se sumaron al contenido después de la carga inicial: se agregan una vez,
    // al final, sin tocar los existentes. Solo los de esta lista, para no recrear uno que
    // se haya borrado a propósito desde el panel.
    const nuevos = new Set(["muebles-de-madera", "vestidores"]);
    let orden = r.docs.length;
    for (const s of servicios) {
      if (!nuevos.has(s.slug) || idPorSlug.has(s.slug)) continue;
      const doc = await payload.create({
        collection: "servicios",
        context,
        overrideAccess: true,
        data: {
          nombre: s.nombre,
          slug: s.slug,
          orden: orden++,
          resumen: s.resumen,
          intro: s.intro,
          queResolvemos: s.queResolvemos.map((texto) => ({ texto })),
          materiales: s.materiales.map((texto) => ({ texto })),
        },
      });
      idPorSlug.set(s.slug, doc.id);
      console.log(`[seed] servicio nuevo: ${s.nombre}`);
    }
    // Nombres cambiados después de la carga inicial. Solo se actualizan si siguen con el nombre
    // viejo, para no pisar un cambio hecho a mano en el panel.
    const renombrados = [{ slug: "muebles-de-madera", de: "Muebles de madera", a: "Madera maciza" }];
    for (const r of renombrados) {
      const doc = (await payload.find({ collection: "servicios", where: { slug: { equals: r.slug } }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as
        | { id: number; nombre: string }
        | undefined;
      if (doc && doc.nombre === r.de) {
        await payload.update({ collection: "servicios", id: doc.id, context, overrideAccess: true, data: { nombre: r.a } });
        console.log(`[seed] servicio renombrado: ${r.de} → ${r.a}`);
      }
    }
  }

  // Obras de ejemplo (publicadas)
  const crearObra = async (o: (typeof obras)[number], orden: number) => {
    const tipo = idPorSlug.get(o.tipo);
    if (!tipo) return false;
    await payload.create({
      collection: "obras",
      context,
      overrideAccess: true,
      draft: false,
      data: {
        titulo: o.titulo,
        slug: o.slug,
        orden,
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
    return true;
  };
  if (await vacia("obras")) {
    for (const [i, o] of [...obras, ...obrasNuevas].entries()) await crearObra(o, i);
    console.log(`[seed] ${obras.length + obrasNuevas.length} obras de ejemplo`);
  } else {
    // Obras de ejemplo sumadas después de la carga inicial: se agregan una vez, al final.
    const r = await payload.find({
      collection: "obras",
      where: { slug: { in: obrasNuevas.map((o) => o.slug) } },
      limit: 100,
      depth: 0,
      overrideAccess: true,
    });
    const existentes = new Set(r.docs.map((d) => (d as { slug: string }).slug));
    let orden = (await payload.count({ collection: "obras", overrideAccess: true })).totalDocs;
    for (const o of obrasNuevas) {
      if (existentes.has(o.slug)) continue;
      if (await crearObra(o, orden)) {
        orden++;
        console.log(`[seed] obra de ejemplo nueva: ${o.titulo}`);
      }
    }
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

  console.log("[seed] listo");
}

await main();
process.exit(0);
