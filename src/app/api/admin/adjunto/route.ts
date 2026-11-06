import { leerAdjunto } from "@/lib/consultas";

/** Sirve un adjunto privado de una consulta. Protegido por src/proxy.ts. */
export async function GET(request: Request) {
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
