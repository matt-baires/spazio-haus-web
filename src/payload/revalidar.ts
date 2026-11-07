import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/** Etiquetas de caché del sitio público. */
export const TAGS = {
  obras: "obras",
  servicios: "servicios",
  materiales: "materiales",
  preguntas: "preguntas",
  articulos: "articulos",
  sitio: "sitio",
  medios: "medios",
} as const;

function invalidar(tag: string, context: Record<string, unknown>) {
  // La carga inicial (seed) corre fuera de Next.js: no hay caché que invalidar.
  if (context?.sinRevalidar) return;
  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Fuera de un request de Next.js (por ejemplo, scripts): se ignora.
  }
}

export const revalidarColeccion = (tag: string): { afterChange: CollectionAfterChangeHook[]; afterDelete: CollectionAfterDeleteHook[] } => ({
  afterChange: [({ doc, req }) => (invalidar(tag, req.context), doc)],
  afterDelete: [({ doc, req }) => (invalidar(tag, req.context), doc)],
});

export const revalidarGlobal = (tag: string): GlobalAfterChangeHook[] => [
  ({ doc, req }) => (invalidar(tag, req.context), doc),
];
