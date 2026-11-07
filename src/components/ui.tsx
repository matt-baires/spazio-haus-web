import Image from "next/image";
import Link from "next/link";
import { Chip, buttonVariants } from "@heroui/react";
import type { ReactNode } from "react";
import type { Foto, Obra } from "@/lib/datos";

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
  className = "",
}: {
  foto?: Foto | null;
  etiqueta?: string;
  proporcion?: string;
  sizes?: string;
  prioridad?: boolean;
  className?: string;
}) {
  if (foto) {
    return (
      <div className={`relative ${proporcion} w-full overflow-hidden bg-marfil ${className}`}>
        <Image src={foto.url} alt={foto.alt} fill sizes={sizes} priority={prioridad} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={etiqueta}
      className={`relative flex ${proporcion} w-full items-end overflow-hidden border border-border bg-marfil ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="var(--sh-piedra)" strokeWidth="1.5">
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
      {etiqueta && <p className="etiqueta text-muted">{etiqueta}</p>}
      <h1 className="titulo-grande text-[32px] leading-[40px] sm:text-[48px] sm:leading-[56px]">{titulo}</h1>
      {children && <div className="max-w-2xl text-muted">{children}</div>}
    </div>
  );
}

export function ObraCard({ obra }: { obra: Obra }) {
  return (
    <Link href={`/obras/${obra.slug}`} className="group flex flex-col gap-3">
      <div className="relative">
        <FotoObra foto={obra.fotos[0]} etiqueta={obra.tipoNombre || "Obra"} />
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
}: {
  titulo?: string;
  texto?: string;
  href?: string;
}) {
  return (
    <section className="bg-foreground text-crema">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-6 py-16 sm:py-20">
        <span className="h-px w-10 bg-dorado" aria-hidden="true" />
        <h2 className="titulo">{titulo}</h2>
        <p className="max-w-xl opacity-80">{texto}</p>
        <Link
          href={href}
          className={buttonVariants({ variant: "secondary", size: "lg", className: "bg-crema text-foreground" })}
        >
          Cotizá tu proyecto
        </Link>
      </div>
    </section>
  );
}
