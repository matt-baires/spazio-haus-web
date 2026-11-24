"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Pieza } from "@/lib/fotos-ejemplo";

/**
 * Tarjeta flotante con un carrusel de piezas (foto, nombre y detalle), al estilo de la
 * tarjeta de AYOCIN sobre su foto de fondo. Se avanza con las flechas, con el teclado
 * (← →) o deslizando el dedo en el celular.
 */
export function CarruselPiezas({ piezas, href }: { piezas: Pieza[]; href: string }) {
  const [actual, setActual] = useState(0);
  const toque = useRef<number | null>(null);
  const total = piezas.length;
  const ir = (paso: number) => setActual((i) => (i + paso + total) % total);
  const pieza = piezas[actual];
  const dos = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Piezas de madera maciza"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(1);
        if (e.key === "ArrowLeft") ir(-1);
      }}
      className="redondeado grid gap-4 bg-background p-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-dorado sm:p-4 md:grid-cols-2 md:gap-8"
    >
      <div
        className="redondeado relative isolate aspect-[4/5] overflow-hidden bg-niebla md:aspect-square"
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const delta = e.changedTouches[0].clientX - toque.current;
          if (Math.abs(delta) > 40) ir(delta < 0 ? 1 : -1);
          toque.current = null;
        }}
      >
        {piezas.map((p, i) => (
          <Image
            key={p.foto.url}
            src={p.foto.url}
            alt={i === actual ? p.foto.alt : ""}
            aria-hidden={i !== actual || undefined}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
              i === actual ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            loading={Math.abs(i - actual) <= 1 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="flex flex-col gap-6 px-2 pb-3 pt-2 md:px-4 md:py-6">
        <div className="flex items-center justify-between">
          <span className="etiqueta text-muted">Madera maciza</span>
          <span className="cuerpo-chico tabular-nums text-muted" aria-live="polite">
            {dos(actual + 1)} / {dos(total)}
          </span>
        </div>

        <div className="flex flex-col gap-3 border-y border-border py-6">
          <h3 key={pieza.nombre} className="titulo motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)]">
            {pieza.nombre}
          </h3>
          <p key={pieza.detalle} className="text-muted motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)]">
            {pieza.detalle}.
          </p>
        </div>

        <p className="cuerpo-chico text-muted">
          Cada pieza se hace a pedido en el taller: elegís la madera, la medida y la terminación.
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Pieza anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-hueso"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Pieza siguiente"
              className="grid h-11 w-11 place-items-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-hueso"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <Link href={href} className="cuerpo-chico underline underline-offset-4">
            Ver la línea completa
          </Link>
        </div>

        <div className="flex gap-1" aria-hidden="true">
          {piezas.map((p, i) => (
            <span
              key={p.foto.url}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i === actual ? "bg-foreground" : "bg-niebla"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
