import config from "@payload-config";
import { getPayload } from "payload";
import { leerAdjunto } from "@/lib/consultas";

/** Sirve un adjunto privado de una consulta solo a usuarios con sesión en el panel. */
export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new Response("Iniciá sesión en el panel para ver este archivo.", { status: 401 });

  const pathname = new URL(request.url).searchParams.get("p") ?? "";
  const r = await leerAdjunto(pathname);
  if (!r || r.statusCode !== 200) return new Response("No encontrado", { status: 404 });

  const nombre = pathname.split("/").pop() ?? "adjunto";
  return new Response(r.stream, {
    headers: {
      "Content-Type": r.blob.contentType,
      "Content-Disposition": `inline; filename="${nombre.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
