import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@heroui/react";
import { CtaCotizar, EtiquetaEjemplo, FotoPendiente, ObraCard } from "@/components/ui";
import { getObra, obras, obrasPorTipo } from "@/content/obras";
import { getServicio } from "@/content/servicios";
import { whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return obras.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata(props: PageProps<"/obras/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const obra = getObra(slug);
  if (!obra) return {};
  return { title: obra.titulo, description: obra.descripcion };
}

export default async function ObraPage(props: PageProps<"/obras/[slug]">) {
  const { slug } = await props.params;
  const obra = getObra(slug);
  if (!obra) notFound();

  const servicio = getServicio(obra.tipo);
  const relacionadas = obrasPorTipo(obra.tipo).filter((o) => o.slug !== obra.slug).slice(0, 3);
  const wa = whatsappUrl(`Hola, vi la obra "${obra.titulo}" en la web y quiero cotizar algo así.`);

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
        <nav aria-label="Ruta" className="cuerpo-chico mb-8 text-muted">
          <Link href="/obras" className="hover:text-foreground">
            Obras
          </Link>{" "}
          / {servicio && (
            <Link href={`/servicios/${servicio.slug}`} className="hover:text-foreground">
              {servicio.nombre}
            </Link>
          )}
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-4">
            <FotoPendiente etiqueta="Foto principal de la obra" proporcion="aspect-[4/3]" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: Math.max(obra.fotos - 2, 1) }, (_, i) => (
                <FotoPendiente key={i} etiqueta={`Foto ${i + 2}`} proporcion="aspect-square" />
              ))}
              <FotoPendiente etiqueta="Foto de detalle" proporcion="aspect-square" />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
            {obra.ejemplo && (
              <div className="flex items-center gap-2">
                <EtiquetaEjemplo />
                <span className="cuerpo-chico text-muted">Obra de ejemplo</span>
              </div>
            )}
            <p className="etiqueta text-muted">{servicio?.nombre}</p>
            <h1 className="titulo">{obra.titulo}</h1>
            <p className="text-muted">{obra.descripcion}</p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-border py-5 cuerpo-chico">
              <dt className="text-muted">Ambiente</dt>
              <dd>{obra.ambiente}</dd>
              <dt className="text-muted">Zona</dt>
              <dd>{obra.zona}</dd>
              <dt className="text-muted">Materiales</dt>
              <dd>{obra.materiales.join(", ")}</dd>
              <dt className="text-muted">El detalle</dt>
              <dd>{obra.detalle}</dd>
            </dl>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/cotizar?tipo=${obra.tipo}&ref=${obra.slug}`}
                className={buttonVariants({ variant: "primary" })}
              >
                Cotizar uno así
              </Link>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
                  Consultar por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {relacionadas.length > 0 && (
        <section className="bg-marfil">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="titulo mb-10">Más {servicio?.nombre.toLowerCase()}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((o) => (
                <ObraCard key={o.slug} obra={o} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaCotizar />
    </>
  );
}
