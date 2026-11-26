import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Encabezado, EtiquetaEjemplo, FotoObra } from "@/components/ui";
import { getArticulos } from "@/lib/datos";
import { fechaLarga } from "@/lib/formato";
import { fotoEjemploArticulo } from "@/lib/fotos-ejemplo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Materiales, cuidados y guías para elegir muebles a medida.",
};

export default async function BlogPage() {
  if (!site.blogVisible) notFound();
  const articulos = await getArticulos();
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-8 sm:pt-12">
      <Encabezado etiqueta="Blog" titulo="Materiales, cuidados y guías" />
      {articulos.length === 0 && <p className="mt-10 text-muted">Pronto vas a encontrar artículos acá.</p>}
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {articulos.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col gap-4">
            <FotoObra foto={a.imagen ?? fotoEjemploArticulo(a.slug)} etiqueta={a.categoria} proporcion="aspect-[16/9]" sizes="(min-width: 640px) 50vw, 100vw" />
            <div className="flex flex-col gap-2">
              <span className="cuerpo-chico flex items-center gap-2 text-muted">
                {a.categoria} · {fechaLarga(a.fecha)} {a.ejemplo && <EtiquetaEjemplo />}
              </span>
              <h2 className="destacado font-semibold group-hover:underline group-hover:underline-offset-4">{a.titulo}</h2>
              <p className="text-muted">{a.bajada}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
