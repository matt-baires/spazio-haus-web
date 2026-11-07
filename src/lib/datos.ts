import "server-only";
import config from "@payload-config";
import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { TAGS } from "@/payload/revalidar";

/* ---------- Tipos que usa el sitio ---------- */

export type Foto = { url: string; alt: string; width: number; height: number };

export type Servicio = {
  slug: string;
  nombre: string;
  resumen: string;
  intro: string;
  queResolvemos: string[];
  materiales: string[];
  imagen: Foto | null;
};

export type Obra = {
  slug: string;
  titulo: string;
  tipo: string;
  tipoNombre: string;
  ambiente: string;
  zona: string;
  materiales: string[];
  descripcion: string;
  detalle: string;
  fotos: Foto[];
  fotoDetalle: Foto | null;
  fotosPrevistas: number;
  destacada: boolean;
  ejemplo: boolean;
};

export type Muestra = { nombre: string; color: string; textura: "lisa" | "madera"; foto: Foto | null };
export type GrupoMateriales = {
  slug: string;
  nombre: string;
  descripcion: string;
  ideal: string;
  muestras: Muestra[];
  ejemplo: boolean;
};

export type Pregunta = { pregunta: string; respuesta: string; enHome: boolean };

export type Articulo = {
  slug: string;
  titulo: string;
  bajada: string;
  fecha: string;
  categoria: string;
  cuerpo: SerializedEditorState;
  imagen: Foto | null;
  ejemplo: boolean;
};

export type Sitio = {
  whatsapp: string | null;
  email: string | null;
  instagram: { usuario: string; url: string };
  direccion: { calle: string; localidad: string; provincia: string; codigoPostal: string };
  contenidoDeEjemplo: boolean;
};

/* ---------- Helpers ---------- */

type Doc = Record<string, unknown>;
const texto = (v: unknown) => (typeof v === "string" ? v : "");
const lista = (v: unknown) =>
  Array.isArray(v) ? v.map((i) => texto((i as Doc)?.texto)).filter(Boolean) : [];

function foto(v: unknown): Foto | null {
  if (!v || typeof v !== "object") return null;
  const m = v as Doc;
  if (typeof m.url !== "string") return null;
  return {
    url: m.url,
    alt: texto(m.alt),
    width: typeof m.width === "number" ? m.width : 1600,
    height: typeof m.height === "number" ? m.height : 1200,
  };
}

const payload = () => getPayload({ config });

/* ---------- Lecturas cacheadas ---------- */

export async function getSitio(): Promise<Sitio> {
  "use cache";
  cacheTag(TAGS.sitio);
  cacheLife("max");
  const s = (await (await payload()).findGlobal({ slug: "sitio", depth: 0 })) as unknown as Doc;
  const d = (s.direccion ?? {}) as Doc;
  return {
    whatsapp: texto(s.whatsapp) || null,
    email: texto(s.email) || null,
    instagram: {
      usuario: texto(s.instagramUsuario) || "@spaziohaus.arg",
      url: texto(s.instagramUrl) || "https://www.instagram.com/spaziohaus.arg/",
    },
    direccion: {
      calle: texto(d.calle) || "Marco Polo 5379",
      localidad: texto(d.localidad) || "Caseros",
      provincia: texto(d.provincia) || "Buenos Aires",
      codigoPostal: texto(d.codigoPostal) || "B1682",
    },
    contenidoDeEjemplo: s.contenidoDeEjemplo !== false,
  };
}

function aServicio(d: Doc): Servicio {
  return {
    slug: texto(d.slug),
    nombre: texto(d.nombre),
    resumen: texto(d.resumen),
    intro: texto(d.intro),
    queResolvemos: lista(d.queResolvemos),
    materiales: lista(d.materiales),
    imagen: foto(d.imagen),
  };
}

export async function getServicios(): Promise<Servicio[]> {
  "use cache";
  cacheTag(TAGS.servicios, TAGS.medios);
  cacheLife("max");
  const r = await (await payload()).find({ collection: "servicios", sort: "orden", limit: 100, depth: 1 });
  return r.docs.map((d) => aServicio(d as unknown as Doc));
}

export async function getServicio(slug: string) {
  return (await getServicios()).find((s) => s.slug === slug) ?? null;
}

function aObra(d: Doc): Obra {
  const tipo = (d.tipo ?? {}) as Doc;
  return {
    slug: texto(d.slug),
    titulo: texto(d.titulo),
    tipo: texto(tipo.slug),
    tipoNombre: texto(tipo.nombre),
    ambiente: texto(d.ambiente),
    zona: texto(d.zona),
    materiales: lista(d.materiales),
    descripcion: texto(d.descripcion),
    detalle: texto(d.detalle),
    fotos: Array.isArray(d.fotos) ? d.fotos.map(foto).filter((f): f is Foto => f !== null) : [],
    fotoDetalle: foto(d.fotoDetalle),
    fotosPrevistas: typeof d.fotosPrevistas === "number" ? d.fotosPrevistas : 3,
    destacada: d.destacada === true,
    ejemplo: d.ejemplo === true,
  };
}

export async function getObras(): Promise<Obra[]> {
  "use cache";
  cacheTag(TAGS.obras, TAGS.servicios, TAGS.medios);
  cacheLife("max");
  const r = await (await payload()).find({
    collection: "obras",
    where: { _status: { equals: "published" } },
    sort: "orden",
    limit: 500,
    depth: 1,
  });
  return r.docs.map((d) => aObra(d as unknown as Doc));
}

export async function getObra(slug: string) {
  return (await getObras()).find((o) => o.slug === slug) ?? null;
}

export async function getMateriales(): Promise<GrupoMateriales[]> {
  "use cache";
  cacheTag(TAGS.materiales, TAGS.medios);
  cacheLife("max");
  const r = await (await payload()).find({ collection: "materiales", sort: "orden", limit: 100, depth: 1 });
  return r.docs.map((raw) => {
    const d = raw as unknown as Doc;
    const muestras = Array.isArray(d.muestras) ? (d.muestras as Doc[]) : [];
    return {
      slug: texto(d.slug),
      nombre: texto(d.nombre),
      descripcion: texto(d.descripcion),
      ideal: texto(d.ideal),
      ejemplo: d.ejemplo === true,
      muestras: muestras.map((m) => ({
        nombre: texto(m.nombre),
        color: texto(m.color) || "#D9D3C8",
        textura: m.textura === "madera" ? "madera" : "lisa",
        foto: foto(m.foto),
      })),
    };
  });
}

export async function getPreguntas(): Promise<Pregunta[]> {
  "use cache";
  cacheTag(TAGS.preguntas);
  cacheLife("max");
  const r = await (await payload()).find({ collection: "preguntas", sort: "orden", limit: 100, depth: 0 });
  return r.docs.map((raw) => {
    const d = raw as unknown as Doc;
    return { pregunta: texto(d.pregunta), respuesta: texto(d.respuesta), enHome: d.enHome === true };
  });
}

export async function getArticulos(): Promise<Articulo[]> {
  "use cache";
  cacheTag(TAGS.articulos, TAGS.medios);
  cacheLife("max");
  const r = await (await payload()).find({
    collection: "articulos",
    where: { _status: { equals: "published" } },
    sort: "-fecha",
    limit: 200,
    depth: 1,
  });
  return r.docs.map((raw) => {
    const d = raw as unknown as Doc;
    return {
      slug: texto(d.slug),
      titulo: texto(d.titulo),
      bajada: texto(d.bajada),
      fecha: texto(d.fecha).slice(0, 10),
      categoria: texto(d.categoria),
      cuerpo: d.cuerpo as SerializedEditorState,
      imagen: foto(d.imagen),
      ejemplo: d.ejemplo === true,
    };
  });
}

export async function getArticulo(slug: string) {
  return (await getArticulos()).find((a) => a.slug === slug) ?? null;
}
