import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@heroui/react";
import { CtaCotizar, FotoObra, ObraCard } from "@/components/ui";
import { Flecha, orden } from "@/components/flecha";
import { Dividir } from "@/components/dividir";
import { TextoGigante } from "@/components/texto-gigante";
import { MarcasHerrajes } from "@/components/marcas-herrajes";
import { ProcesoHome } from "@/components/proceso-home";
import { proceso } from "@/lib/proceso";
import { CarruselPiezas } from "@/components/carrusel-piezas";
import { fotosEjemplo, galeriaEjemploServicio } from "@/lib/fotos-ejemplo";
import { getObras, getServicios } from "@/lib/datos";
import { site } from "@/lib/site";

export default async function Home() {
  const [obras, servicios] = await Promise.all([getObras(), getServicios()]);
  const destacadas = (obras.some((o) => o.destacada) ? obras.filter((o) => o.destacada) : obras).slice(0, 3);
  const piezas = galeriaEjemploServicio("muebles-de-madera");
  const portada = destacadas.find((o) => o.fotos.length > 0)?.fotos[0] ?? fotosEjemplo.cocinaMaderaMesadaNegra;

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="etiqueta entrar text-muted" style={orden(0)}>
            {site.descriptor}
          </p>
          <h1 className="titulo-grande">
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

      {/* Qué hacemos al estilo de la sección "Full spectrum lighting" de AYOCIN: foto de fondo con
          parallax, texto gigante en movimiento entre filetes y una fila por servicio, en blanco. */}
      <section data-menu="oscuro" aria-labelledby="que-hacemos" className="relative overflow-hidden text-hueso">
        <div data-paralaje className="absolute inset-x-0 -top-[9%] h-[118%] will-change-transform" aria-hidden="true">
          <Image src={fotosEjemplo.muestrasMadera.url} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative pt-16 sm:pt-28">
          <h2 id="que-hacemos" className="sr-only">
            Qué hacemos
          </h2>
          <TextoGigante texto="Qué hacemos" />

          <ul className="mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-28">
            {servicios.map((s, i) => (
              <li
                key={s.slug}
                data-revelar
                style={orden(i % 3)}
                className="grid gap-y-3 border-b border-hueso/20 pb-10 pt-8 md:grid-cols-12 md:gap-x-6 md:pb-14 md:pt-10"
              >
                <span className="titulo hidden text-hueso/60 md:col-span-4 md:block">{String.fromCharCode(65 + i)}</span>
                <h3 className="titulo md:col-span-4">
                  <Link href={`/servicios/${s.slug}`} className="hover:underline hover:underline-offset-8">
                    {s.nombre}
                  </Link>
                </h3>
                <div className="flex flex-col items-start gap-4 md:col-span-4 md:pt-1">
                  <p className="text-hueso/80">{s.resumen}</p>
                  <Link href={`/servicios/${s.slug}`} className="flecha cuerpo-chico inline-flex items-center gap-2 underline underline-offset-4">
                    Ver {s.nombre.toLowerCase()}
                    <Flecha />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
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

      {piezas.length > 0 && (
        /* Al estilo de "Health Station" de AYOCIN: foto de fondo, texto gigante en movimiento
           y una tarjeta flotante con el carrusel de piezas de madera maciza. */
        <section data-menu="oscuro" aria-labelledby="madera-maciza" className="relative overflow-hidden text-hueso">
          <div data-paralaje className="absolute inset-x-0 -top-[9%] h-[118%] will-change-transform" aria-hidden="true">
            <Image src={fotosEjemplo.maderaMesaTablones.url} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

          <div className="relative pb-14 pt-14 sm:pb-20 sm:pt-20">
            <h2 id="madera-maciza" className="sr-only">
              Muebles de madera maciza
            </h2>
            <TextoGigante texto="Madera maciza" />

            <div data-revelar data-menu="claro" className="mx-auto mt-12 w-full max-w-5xl px-4 sm:mt-16 sm:px-6">
              <CarruselPiezas piezas={piezas} href="/servicios/muebles-de-madera" />
            </div>
          </div>
        </section>
      )}

      <section data-menu="oscuro" aria-labelledby="como-trabajamos" className="bg-carbon py-20 text-hueso sm:py-28">
        <div className="mx-auto mb-14 grid w-full max-w-6xl gap-6 px-6 sm:mb-20 md:grid-cols-12 md:gap-x-6">
          <div className="flex flex-col gap-4 md:col-span-7">
            <span className="etiqueta text-hueso/50">Cómo trabajamos</span>
            <h2 id="como-trabajamos" data-revelar className="frase">
              <Dividir texto="Del primer boceto a la última bisagra." />
            </h2>
          </div>
          <p data-revelar style={orden(1)} className="self-end text-hueso/75 md:col-span-4 md:col-start-9">
            Cuatro pasos, del primer mensaje a la instalación. Diseñamos y fabricamos en el mismo lugar, así controlamos el
            proyecto del boceto al último canto.
          </p>
        </div>
        <ProcesoHome pasos={proceso} />
      </section>

      <MarcasHerrajes />

      <CtaCotizar foto={fotosEjemplo.obraCocinaVarillasLed} />
    </>
  );
}
