import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@heroui/react";
import { CtaCotizar, EtiquetaEjemplo, FotoObra, ObraCard } from "@/components/ui";
import { getObra, getObras, getSitio } from "@/lib/datos";
import { fotoEjemploObra, fotoEjemploServicio, fotosEjemplo } from "@/lib/fotos-ejemplo";
import { whatsappUrl } from "@/lib/site";

export async function generateStaticParams() {
  const obras = await getObras();
  return obras.length > 0 ? obras.map((o) => ({ slug: o.slug })) : [{ slug: "_" }];
}

export async function generateMetadata(props: PageProps<"/obras/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const obra = await getObra(slug);
  if (!obra) return {};
  return {
    title: obra.titulo,
    description: obra.descripcion,
    openGraph: { images: [obra.fotos[0] ?? fotoEjemploObra(obra.slug, obra.tipo)].map((f) => ({ url: f.url, alt: f.alt })) },
  };
}

export default async function ObraPage(props: PageProps<"/obras/[slug]">) {
  const { slug } = await props.params;
  const [obra, obras, sitio] = await Promise.all([getObra(slug), getObras(), getSitio()]);
  if (!obra) notFound();

  const relacionadas = obras.filter((o) => o.tipo === obra.tipo && o.slug !== obra.slug).slice(0, 3);
  const wa = whatsappUrl(sitio.whatsapp, `Hola, vi la obra "${obra.titulo}" en la web y quiero cotizar algo así.`);
  // Sin fotos propias todavía: fotos de ejemplo del mismo tipo de mueble.
  const sinFotos = obra.fotos.length === 0;
  const principal = obra.fotos[0] ?? fotoEjemploObra(obra.slug, obra.tipo);
  const resto = sinFotos
    ? [fotoEjemploServicio(obra.tipo)].filter((f) => f.url !== principal.url)
    : obra.fotos.slice(1);
  const detalle = obra.fotoDetalle ?? fotosEjemplo.detalleTiradores;

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
        <nav aria-label="Ruta" className="cuerpo-chico mb-8 text-muted">
          <Link href="/obras" className="hover:text-foreground">
            Obras
          </Link>
          {obra.tipo && (
            <>
              {" / "}
              <Link href={`/servicios/${obra.tipo}`} className="hover:text-foreground">
                {obra.tipoNombre}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-4">
            <FotoObra foto={principal} etiqueta="Foto principal de la obra" prioridad sizes="(min-width: 1024px) 60vw, 100vw" paralaje />
            <div className="grid grid-cols-2 gap-4">
              {resto.map((f) => (
                <FotoObra key={f.url} foto={f} proporcion="aspect-square" sizes="(min-width: 1024px) 30vw, 50vw" />
              ))}
              <FotoObra foto={detalle} etiqueta="Foto de detalle" proporcion="aspect-square" sizes="(min-width: 1024px) 30vw, 50vw" />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
            {obra.ejemplo && (
              <div className="flex items-center gap-2">
                <EtiquetaEjemplo />
                <span className="cuerpo-chico text-muted">Obra de ejemplo</span>
              </div>
            )}
            <p className="etiqueta text-muted">{obra.tipoNombre}</p>
            <h1 className="titulo">{obra.titulo}</h1>
            <p className="text-muted">{obra.descripcion}</p>

            <dl className="cuerpo-chico grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-border py-5">
              <dt className="text-muted">Ambiente</dt>
              <dd>{obra.ambiente}</dd>
              <dt className="text-muted">Zona</dt>
              <dd>{obra.zona}</dd>
              {obra.materiales.length > 0 && (
                <>
                  <dt className="text-muted">Materiales</dt>
                  <dd>{obra.materiales.join(", ")}</dd>
                </>
              )}
              <dt className="text-muted">El detalle</dt>
              <dd>{obra.detalle}</dd>
            </dl>

            <div className="flex flex-wrap gap-3">
              <Link href={`/cotizar?tipo=${obra.tipo}&ref=${obra.slug}`} className={buttonVariants({ variant: "primary" })}>
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
        <section className="bg-humo">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="titulo mb-10">Más {obra.tipoNombre.toLowerCase()}</h2>
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
