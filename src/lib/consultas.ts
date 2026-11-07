import "server-only";
import { get, put } from "@vercel/blob";

/** Adjuntos de las cotizaciones: se guardan en el Blob privado, fuera de la base. */
export type Adjunto = { nombre: string; pathname: string; tipo: string; tamano: number };

export function blobDisponible() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function subirAdjunto(id: string, indice: number, archivo: File): Promise<Adjunto> {
  const seguro = archivo.name.normalize("NFD").replace(/[^\w.-]+/g, "-").slice(-80) || "archivo";
  const pathname = `adjuntos/${id}/${indice + 1}-${seguro}`;
  await put(pathname, archivo, { access: "private", contentType: archivo.type || undefined });
  return { nombre: archivo.name, pathname, tipo: archivo.type, tamano: archivo.size };
}

export async function leerAdjunto(pathname: string) {
  if (!pathname.startsWith("adjuntos/") || pathname.includes("..")) return null;
  return get(pathname, { access: "private" });
}
