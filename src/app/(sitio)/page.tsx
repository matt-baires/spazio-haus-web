import Link from "next/link";
import { Card, buttonVariants } from "@heroui/react";
import { CtaCotizar, FotoObra, ObraCard } from "@/components/ui";
import { getObras, getPreguntas, getServicios } from "@/lib/datos";
import { site } from "@/lib/site";

const pasos = [
  { paso: "01", titulo: "Diseño", texto: "Pensamos cada pieza para tu espacio, con vos." },
  { paso: "02", titulo: "Taller", texto: "La fabricamos en nuestro taller de Caseros." },
  { paso: "03", titulo: "Detalle", texto: "Cuidamos cada canto, herraje y terminación." },
];

export default async function Home() {
  const [obras, servicios, preguntas] = await Promise.all([getObras(), getServicios(), getPreguntas()]);
  const destacadas = (obras.some((o) => o.destacada) ? obras.filter((o) => o.destacada) : obras).slice(0, 3);
  const portada = destacadas.find((o) => o.fotos.length > 0)?.fotos[0] ?? null;
  const faqHome = (preguntas.some((p) => p.enHome) ? preguntas.filter((p) => p.enHome) : preguntas).slice(0, 3);

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="etiqueta text-muted">{site.descriptor}</p>
          <h1 className="titulo-grande text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px]">{site.tagline}</h1>
          <p className="max-w-xl text-muted">
            Lo diseñamos con vos. Lo fabricamos en nuestro taller de Caseros, desde {site.desde}.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/cotizar" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Cotizá tu proyecto
            </Link>
            <Link href="/obras" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Ver obras
            </Link>
          </div>
        </div>
        <FotoObra foto={portada} etiqueta="Foto de obra destacada" proporcion="aspect-[5/4]" prioridad sizes="(min-width: 1024px) 45vw, 100vw" />
      </section>

      <section className="bg-marfil">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="titulo">Qué hacemos</h2>
            <Link href="/servicios" className="cuerpo-chico underline underline-offset-4">
              Todos los servicios
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`} className="group">
                <Card className="h-full bg-background transition-colors group-hover:bg-background/70">
                  <Card.Header>
                    <Card.Title className="text-lg">{s.nombre}</Card.Title>
                    <Card.Description className="text-muted">{s.resumen}</Card.Description>
                  </Card.Header>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {destacadas.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="titulo">Obras</h2>
            <Link href="/obras" className="cuerpo-chico underline underline-offset-4">
              Ver todas
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((o) => (
              <ObraCard key={o.slug} obra={o} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-marfil">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <h2 className="titulo mb-10">Cómo trabajamos</h2>
          <ol className="grid gap-10 sm:grid-cols-3">
            {pasos.map((p) => (
              <li key={p.paso} className="flex flex-col gap-3">
                <span className="etiqueta text-muted">{p.paso}</span>
                <span className="h-px w-10 bg-dorado" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <p className="text-muted">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <p className="etiqueta text-muted">Para profesionales</p>
          <h2 className="titulo">Arquitectos e interioristas</h2>
          <p className="text-muted">
            Fabricamos tu diseño respetando el plano, los materiales y los plazos. Un solo interlocutor de punta a punta.
          </p>
          <Link href="/profesionales" className={buttonVariants({ variant: "outline" })}>
            Trabajemos juntos
          </Link>
        </div>
        {faqHome.length > 0 && (
          <div className="flex flex-col gap-5">
            <h2 className="titulo">Preguntas frecuentes</h2>
            <dl className="flex flex-col divide-y divide-border border-y border-border">
              {faqHome.map((f) => (
                <div key={f.pregunta} className="py-4">
                  <dt className="font-semibold">{f.pregunta}</dt>
                  <dd className="cuerpo-chico mt-1 text-muted">{f.respuesta}</dd>
                </div>
              ))}
            </dl>
            <Link href="/preguntas-frecuentes" className="cuerpo-chico underline underline-offset-4">
              Más preguntas
            </Link>
          </div>
        )}
      </section>

      <CtaCotizar />
    </>
  );
}
