import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { CtaCotizar, EtiquetaEjemplo } from "@/components/ui";
import { getArticulo, getArticulos } from "@/lib/datos";
import { fechaLarga } from "@/lib/formato";

export async function generateStaticParams() {
  const articulos = await getArticulos();
  return articulos.length > 0 ? articulos.map((a) => ({ slug: a.slug })) : [{ slug: "_" }];
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = await getArticulo(slug);
  if (!a) return {};
  return { title: a.titulo, description: a.bajada };
}

export default async function ArticuloPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const a = await getArticulo(slug);
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
        <RichText data={a.cuerpo} className="articulo flex flex-col gap-5" />
      </article>
      <CtaCotizar />
    </>
  );
}
