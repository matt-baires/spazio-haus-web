import { del, get, put } from "@vercel/blob";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";

/**
 * Guarda los archivos del CMS en el Blob privado del proyecto
 * (BLOB_READ_WRITE_TOKEN). Payload los sirve en /api/medios/file/…
 * respetando el control de acceso de la colección.
 */
export const blobPrivado =
  (carpeta: string): Adapter =>
  () => {
    const ruta = (filename: string, prefix?: string) =>
      [carpeta, prefix, filename].filter(Boolean).join("/");

    return {
      name: "blob-privado",
      handleUpload: async ({ file }) => {
        await put(ruta(file.filename), file.buffer, {
          access: "private",
          contentType: file.mimeType,
          allowOverwrite: true,
          addRandomSuffix: false,
        });
      },
      handleDelete: async ({ filename, doc }) => {
        await del(ruta(filename, doc.prefix)).catch(() => undefined);
      },
      staticHandler: async (_req, { params }) => {
        const r = await get(ruta(params.filename, params.prefix), { access: "private" });
        if (!r || r.statusCode !== 200) return new Response("No encontrado", { status: 404 });
        return new Response(r.stream, {
          headers: {
            "Content-Type": r.blob.contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    };
  };
