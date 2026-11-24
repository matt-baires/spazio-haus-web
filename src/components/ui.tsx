import Image from "next/image";
import Link from "next/link";
import { Chip, buttonVariants } from "@heroui/react";
import type { ReactNode } from "react";
import type { Foto, Obra } from "@/lib/datos";
import { fotoEjemploObra } from "@/lib/fotos-ejemplo";
import { Dividir } from "@/components/dividir";
import { Flecha, orden } from "@/components/flecha";
import { TextoGigante } from "@/components/texto-gigante";

export function EtiquetaEjemplo() {
  return (
    <Chip size="sm" variant="secondary" className="bg-background">
      Ejemplo
    </Chip>
  );
}

/**
 * Foto de obra a escuadra (radius-none). Si todavía no hay foto,
 * muestra un espacio reservado con un dibujo de línea.
 */
export function FotoObra({
  foto,
  etiqueta = "Foto de obra pendiente",
  proporcion = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  prioridad = false,
  paralaje = false,
  className = "",
}: {
  foto?: Foto | null;
  etiqueta?: string;
  proporcion?: string;
  sizes?: string;
  prioridad?: boolean;
  /** La foto se desplaza más lento que la página al hacer scroll. */
  paralaje?: boolean;
  className?: string;
}) {
  if (foto) {
    return (
      <div className={`zoom-hover redondeado relative isolate ${proporcion} w-full overflow-hidden bg-niebla ${className}`}>
        {paralaje ? (
          <div data-paralaje className="absolute inset-x-0 -top-[9%] h-[118%] will-change-transform">
            <Image src={foto.url} alt={foto.alt} fill sizes={sizes} priority={prioridad} className="object-cover" />
          </div>
        ) : (
          <Image src={foto.url} alt={foto.alt} fill sizes={sizes} priority={prioridad} className="object-cover" />
        )}
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={etiqueta}
      className={`redondeado relative flex ${proporcion} w-full items-end overflow-hidden border border-border bg-niebla ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="var(--sh-ceniza)" strokeWidth="1.5">
          <rect x="80" y="150" width="240" height="90" />
          <line x1="160" y1="150" x2="160" y2="240" />
          <line x1="240" y1="150" x2="240" y2="240" />
          <rect x="80" y="60" width="240" height="55" />
          <line x1="200" y1="60" x2="200" y2="115" />
          <line x1="60" y1="240" x2="340" y2="240" />
        </g>
      </svg>
      <span className="etiqueta relative m-4 text-muted">{etiqueta}</span>
    </div>
  );
}

export function Encabezado({
  etiqueta,
  titulo,
  children,
}: {
  etiqueta?: string;
  titulo: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      {etiqueta && (
        <p className="etiqueta entrar text-muted" style={orden(0)}>
          {etiqueta}
        </p>
      )}
      <h1 className="titulo-grande">
        <Dividir texto={titulo} alCargar />
      </h1>
      {children && (
        <div className="entrar max-w-2xl text-muted" style={orden(2)}>
          {children}
        </div>
      )}
    </div>
  );
}

export function ObraCard({ obra, orden: i = 0, subcategoria }: { obra: Obra; orden?: number; subcategoria?: string }) {
  return (
    <Link href={`/obras/${obra.slug}`} className="group flex flex-col gap-3" data-revelar style={orden(i)}>
      <div className="relative">
        <FotoObra foto={obra.fotos[0] ?? fotoEjemploObra(obra.slug, obra.tipo)} etiqueta={obra.tipoNombre || "Obra"} />
        {subcategoria && (
          <span className="cuerpo-chico absolute left-3 top-3 rounded-full bg-background/90 px-3 py-0.5 backdrop-blur-sm">
            {subcategoria}
          </span>
        )}
        {obra.ejemplo && (
          <span className="absolute right-3 top-3">
            <EtiquetaEjemplo />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold group-hover:underline group-hover:underline-offset-4">{obra.titulo}</span>
        <span className="cuerpo-chico text-muted">
          {obra.ambiente} · {obra.zona}
        </span>
      </div>
    </Link>
  );
}

export function CtaCotizar({
  titulo = "¿Tenés un espacio para resolver?",
  texto = "Contanos qué necesitás, con medidas aproximadas y fotos si las tenés. Lo diseñamos con vos y lo fabricamos en nuestro taller.",
  href = "/cotizar",
  foto,
}: {
  titulo?: string;
  texto?: string;
  href?: string;
  /** Con foto, el llamado va a pantalla completa al estilo de "Our mission" de AYOCIN. */
  foto?: Foto;
}) {
  if (foto) {
    return (
      <section
        data-menu="oscuro"
        className="relative flex min-h-[640px] flex-col justify-between overflow-hidden py-14 text-hueso sm:py-14 lg:min-h-[88svh]"
      >
        <div data-paralaje className="absolute inset-x-0 -top-[9%] h-[118%] will-change-transform" aria-hidden="true">
          <Image src={foto.url} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        <TextoGigante texto="Hablemos" />

        <div className="relative mx-auto mt-14 grid w-full max-w-6xl gap-y-6 px-6 md:grid-cols-12 md:gap-x-6">
          <h2 data-revelar className="titulo md:col-span-5">
            <Dividir texto={titulo} />
          </h2>
          <div data-revelar className="flex flex-col items-start gap-6 md:col-span-4" style={orden(1)}>
            <p className="text-hueso/85">{texto}</p>
            <Link
              href={href}
              className={buttonVariants({ variant: "secondary", size: "lg", className: "flecha gap-2 bg-hueso text-foreground" })}
            >
              Cotizá tu proyecto
              <Flecha />
            </Link>
          </div>
          <span
            data-revelar
            style={orden(2)}
            className="etiqueta inline-flex items-center gap-2 self-start text-hueso/80 md:col-span-3 md:justify-self-end"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
            Taller en Caseros
          </span>
        </div>
      </section>
    );
  }

  return (
    <section data-menu="oscuro" className="bg-carbon text-hueso">
      <div data-revelar className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-6 py-12 sm:py-14">
        <span className="filete-crece h-px w-10 bg-dorado" aria-hidden="true" />
        <h2 className="titulo">
          <Dividir texto={titulo} />
        </h2>
        <p className="max-w-xl opacity-80">{texto}</p>
        <Link
          href={href}
          className={buttonVariants({ variant: "secondary", size: "lg", className: "flecha gap-2 bg-hueso text-foreground" })}
        >
          Cotizá tu proyecto
          <Flecha />
        </Link>
      </div>
    </section>
  );
}
