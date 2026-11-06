import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@heroui/react";
import { CtaCotizar, FotoPendiente, ObraCard } from "@/components/ui";
import { obrasPorTipo, type Obra } from "@/content/obras";
import { getServicio, servicios } from "@/content/servicios";
import { site, whatsappUrl } from "@/lib/site";

export function generateStaticParams() {
  return servicios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getServicio(slug);
  if (!s) return {};
  return {
    title: `${s.nombre} a medida en ${site.direccion.localidad}`,
    description: `${s.resumen} ${s.intro}`,
  };
}

export default async function ServicioPage(props: PageProps<"/servicios/[slug]">) {
  const { slug } = await props.params;
  const s = getServicio(slug);
  if (!s) notFound();

  const obrasDelTipo = obrasPorTipo(s.slug as Obra["tipo"]);
  const wa = whatsappUrl(`Hola, quiero consultar por ${s.nombre.toLowerCase()} a medida.`);

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="etiqueta text-muted">Servicios</p>
          <h1 className="titulo-grande text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px]">{s.nombre}</h1>
          <p className="text-muted">{s.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/cotizar?tipo=${s.slug}`} className={buttonVariants({ variant: "primary", size: "lg" })}>
              Cotizá tu proyecto
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
                WhatsApp
              </a>
            )}
          </div>
        </div>
        <FotoPendiente etiqueta={`Foto de ${s.nombre.toLowerCase()}`} proporcion="aspect-[5/4]" />
      </section>

      <section className="bg-marfil">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="titulo mb-6">Qué resolvemos</h2>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {s.queResolvemos.map((item) => (
                <li key={item} className="py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="titulo mb-6">Materiales</h2>
            <ul className="flex flex-wrap gap-2">
              {s.materiales.map((m) => (
                <li key={m} className="cuerpo-chico rounded border border-border bg-background px-3 py-1.5">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {obrasDelTipo.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="titulo mb-10">Obras de {s.nombre.toLowerCase()}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {obrasDelTipo.map((o) => (
              <ObraCard key={o.slug} obra={o} />
            ))}
          </div>
        </section>
      )}

      <CtaCotizar href={`/cotizar?tipo=${s.slug}`} />
    </>
  );
}
