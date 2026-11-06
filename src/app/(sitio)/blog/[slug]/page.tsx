import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaCotizar, EtiquetaEjemplo } from "@/components/ui";
import { articulos, getArticulo } from "@/content/blog";
import { fechaLarga } from "@/lib/formato";

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = getArticulo(slug);
  if (!a) return {};
  return { title: a.titulo, description: a.bajada };
}

export default async function ArticuloPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const a = getArticulo(slug);
  if (!a) notFound();

  return (
    <>
      <article className="mx-auto w-full max-w-2xl px-6 pb-20 pt-10">
        <nav aria-label="Ruta" className="cuerpo-chico mb-8 text-muted">
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>{" "}
          / {a.categoria}
        </nav>
        <p className="cuerpo-chico mb-4 flex items-center gap-2 text-muted">
          {fechaLarga(a.fecha)} {a.ejemplo && <EtiquetaEjemplo />}
        </p>
        <h1 className="titulo-grande mb-4 text-[32px] leading-[40px] sm:text-[40px] sm:leading-[48px]">{a.titulo}</h1>
        <p className="mb-10 text-lg text-muted">{a.bajada}</p>
        <div className="flex flex-col gap-8">
          {a.cuerpo.map((bloque, i) => (
            <section key={i} className="flex flex-col gap-4">
              {bloque.subtitulo && <h2 className="text-xl font-semibold">{bloque.subtitulo}</h2>}
              {bloque.parrafos.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <CtaCotizar />
    </>
  );
}
