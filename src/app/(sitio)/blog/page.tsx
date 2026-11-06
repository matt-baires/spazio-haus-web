import type { Metadata } from "next";
import Link from "next/link";
import { Encabezado, EtiquetaEjemplo, FotoPendiente } from "@/components/ui";
import { articulos } from "@/content/blog";
import { fechaLarga } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Blog",
  description: "Materiales, cuidados y guías para elegir muebles a medida.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
      <Encabezado etiqueta="Blog" titulo="Materiales, cuidados y guías" />
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {articulos.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col gap-4">
            <FotoPendiente etiqueta={a.categoria} proporcion="aspect-[16/9]" />
            <div className="flex flex-col gap-2">
              <span className="cuerpo-chico flex items-center gap-2 text-muted">
                {a.categoria} · {fechaLarga(a.fecha)} {a.ejemplo && <EtiquetaEjemplo />}
              </span>
              <h2 className="text-xl font-semibold group-hover:underline group-hover:underline-offset-4">{a.titulo}</h2>
              <p className="text-muted">{a.bajada}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
