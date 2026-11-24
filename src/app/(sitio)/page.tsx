import Link from "next/link";
import { Card, buttonVariants } from "@heroui/react";
import { CtaCotizar, FotoObra, ObraCard } from "@/components/ui";
import { Flecha, orden } from "@/components/flecha";
import { Dividir } from "@/components/dividir";
import { MarcasHerrajes } from "@/components/marcas-herrajes";
import { MarquesinaTexto } from "@/components/marquesina-texto";
import { fotosEjemplo } from "@/lib/fotos-ejemplo";
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
  const portada = destacadas.find((o) => o.fotos.length > 0)?.fotos[0] ?? fotosEjemplo.cocinaMaderaMesadaNegra;
  const faqHome = (preguntas.some((p) => p.enHome) ? preguntas.filter((p) => p.enHome) : preguntas).slice(0, 3);

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="etiqueta entrar text-muted" style={orden(0)}>
            {site.descriptor}
          </p>
          <h1 className="titulo-grande text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px]">
            <Dividir texto={site.tagline} alCargar />
          </h1>
          <p className="entrar max-w-xl text-muted" style={orden(2)}>
            Lo diseñamos con vos. Lo fabricamos en nuestro taller de Caseros, desde {site.desde}.
          </p>
          <div className="entrar flex flex-wrap gap-3 pt-2" style={orden(3)}>
            <Link href="/cotizar" className={buttonVariants({ variant: "primary", size: "lg", className: "flecha gap-2" })}>
              Cotizá tu proyecto
              <Flecha />
            </Link>
            <Link href="/obras" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Ver obras
            </Link>
          </div>
        </div>
        <FotoObra
          foto={portada}
          etiqueta="Foto de obra destacada"
          proporcion="aspect-[5/4]"
          prioridad
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="entrar-foto"
          paralaje
        />
      </section>

      <section className="bg-humo">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div data-revelar className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="titulo">
              <Dividir texto="Qué hacemos" />
            </h2>
            <Link href="/servicios" className="cuerpo-chico underline underline-offset-4">
              Todos los servicios
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s, i) => (
              <Link key={s.slug} href={`/servicios/${s.slug}`} className="group" data-revelar style={orden(i)}>
                <Card className="h-full bg-background transition-[transform,background-color] duration-500 ease-out group-hover:bg-background/70 motion-safe:group-hover:-translate-y-1">
                  <Card.Header>
                    <Card.Title className="text-lg">{s.nombre}</Card.Title>
                    <Card.Description className="text-muted">{s.resumen}</Card.Description>
                    <span
                      className="mt-2 h-px w-0 bg-dorado transition-[width] duration-500 ease-out group-hover:w-10"
                      aria-hidden="true"
                    />
                  </Card.Header>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {destacadas.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div data-revelar className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="titulo">
              <Dividir texto="Obras" />
            </h2>
            <Link href="/obras" className="cuerpo-chico underline underline-offset-4">
              Ver todas
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((o, i) => (
              <ObraCard key={o.slug} obra={o} orden={i} />
            ))}
          </div>
        </section>
      )}

      <MarquesinaTexto />

      <section className="bg-carbon text-hueso">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <h2 data-revelar className="titulo mb-10">
            <Dividir texto="Cómo trabajamos" />
          </h2>
          <ol className="grid gap-10 sm:grid-cols-3">
            {pasos.map((p, i) => (
              <li key={p.paso} data-revelar className="flex flex-col gap-3" style={orden(i + 1)}>
                <span className="etiqueta text-hueso/60">{p.paso}</span>
                <span className="filete-crece h-px w-10 bg-dorado" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <p className="text-hueso/75">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MarcasHerrajes />

      {faqHome.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <div data-revelar className="flex max-w-3xl flex-col gap-5">
            <h2 className="titulo">
              <Dividir texto="Preguntas frecuentes" />
            </h2>
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
        </section>
      )}

      <CtaCotizar />
    </>
  );
}
