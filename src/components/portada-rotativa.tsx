"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@heroui/react";
import { Dividir } from "@/components/dividir";
import { Flecha, orden } from "@/components/flecha";
import type { Foto } from "@/lib/datos";

export type Diapositiva = { foto: Foto; etiqueta: string; titulo: string; href: string };

const DURACION = 5000;
const RADIO = 17;
const VUELTA = 2 * Math.PI * RADIO;

/**
 * Cabecera de la portada al estilo de Moffitt.Moffitt.: foto a pantalla completa que cambia
 * cada 5 segundos, el título fijo abajo a la izquierda, la obra de cada foto con su etiqueta,
 * y abajo a la derecha el contador con un anillo de progreso y la flecha para pasar.
 * Se pausa al pasar el mouse; con "reducir movimiento" no avanza sola.
 */
export function PortadaRotativa({
  diapositivas,
  titulo,
  bajada,
}: {
  diapositivas: Diapositiva[];
  titulo: string;
  bajada: string;
}) {
  const [actual, setActual] = useState(0);
  const [pausa, setPausa] = useState(false);
  const total = diapositivas.length;

  useEffect(() => {
    if (pausa || total < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActual((i) => (i + 1) % total), DURACION);
    return () => clearTimeout(t);
  }, [actual, pausa, total]);

  const d = diapositivas[actual];
  const dos = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      data-menu="oscuro"
      aria-roledescription="carrusel"
      aria-label="Obras destacadas"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      className="relative -mt-20 flex min-h-[640px] flex-col justify-end overflow-hidden text-hueso h-[100svh]"
    >
      {diapositivas.map((s, i) => (
        <div
          key={s.foto.url}
          aria-hidden={i !== actual || undefined}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === actual ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.foto.url}
            alt={i === actual ? s.foto.alt : ""}
            fill
            sizes="100vw"
            priority={i === 0}
            className={`object-cover transition-transform duration-[6000ms] ease-out ${
              i === actual ? "scale-100" : "scale-110"
            }`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-6 pb-10 sm:pb-14 md:grid-cols-12 md:items-end">
        <div className="flex flex-col gap-5 md:col-span-8">
          <Link
            key={d.href + d.titulo}
            href={d.href}
            className="flex flex-wrap items-center gap-2 motion-safe:animate-[entrar_0.7s_cubic-bezier(0.2,0.7,0.2,1)]"
          >
            <span className="cuerpo-chico rounded-full border border-hueso/60 px-3 py-0.5">{d.etiqueta}</span>
            <span className="cuerpo-chico rounded-full bg-hueso px-3 py-0.5 text-foreground">Ver</span>
            <span className="cuerpo-chico text-hueso/80">{d.titulo}</span>
          </Link>
          <h1 className="titulo-grande max-w-2xl">
            <Dividir texto={titulo} alCargar />
          </h1>
          <p className="entrar max-w-xl text-hueso/85" style={orden(2)}>
            {bajada}
          </p>
          <div className="entrar flex flex-wrap gap-3" style={orden(3)}>
            <Link
              href="/cotizar"
              className={buttonVariants({ variant: "secondary", size: "lg", className: "flecha gap-2 bg-hueso text-foreground" })}
            >
              Cotizá tu proyecto
              <Flecha />
            </Link>
            <Link href="/obras" className={buttonVariants({ variant: "outline", size: "lg", className: "border-hueso/60 text-hueso" })}>
              Ver obras
            </Link>
          </div>
        </div>

        {total > 1 && (
          <div className="flex items-center gap-4 md:col-span-4 md:justify-self-end">
            <span className="destacado tabular-nums" aria-live="polite">
              {dos(actual + 1)}/{dos(total)}
            </span>
            <svg aria-hidden="true" viewBox="0 0 40 40" width="28" height="28" className="-rotate-90">
              <circle cx="20" cy="20" r={RADIO} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
              <circle
                key={`${actual}-${pausa}`}
                cx="20"
                cy="20"
                r={RADIO}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={VUELTA}
                className="anillo-progreso"
                strokeDashoffset={pausa ? VUELTA : undefined}
                style={pausa ? undefined : { animation: `anillo ${DURACION}ms linear forwards`, ["--vuelta" as string]: VUELTA }}
              />
            </svg>
            <button
              type="button"
              onClick={() => setActual((i) => (i + 1) % total)}
              aria-label="Siguiente obra"
              className="flecha grid h-12 w-12 place-items-center rounded-full border border-hueso/60 transition-colors hover:bg-hueso hover:text-foreground"
            >
              <Flecha />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
