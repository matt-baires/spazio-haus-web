"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { orden } from "@/components/flecha";
import type { Paso } from "@/lib/proceso";

/**
 * Cómo trabajamos en la portada: a la izquierda, un indicador fijo con el número y el nombre
 * del paso que está en pantalla y una barra de avance; a la derecha, los cuatro pasos con
 * foto, texto y lo que recibís en cada uno. El paso activo se ilumina y los demás se atenúan.
 */
export function ProcesoHome({ pasos }: { pasos: Paso[] }) {
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let cuadro = 0;
    const revisar = () => {
      const objetivo = window.innerHeight * 0.45;
      let mejor = 0;
      let distancia = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const caja = el.getBoundingClientRect();
        const d = Math.abs(caja.top + caja.height / 2 - objetivo);
        if (d < distancia) {
          distancia = d;
          mejor = i;
        }
      });
      setActivo(mejor);
    };
    const alMover = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, []);

  const paso = pasos[activo];

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-12 md:gap-x-6">
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-28 flex flex-col gap-6">
          <span className="etiqueta text-hueso/50">Paso</span>
          <span
            key={paso.numero}
            className="titulo-grande text-hueso motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)]"
            style={{ fontSize: "clamp(96px, 11vw, 160px)", lineHeight: 1 }}
          >
            {paso.numero}
          </span>
          <p key={paso.titulo} className="destacado max-w-xs motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)]">
            {paso.titulo}
          </p>
          <div className="flex max-w-xs gap-1.5" aria-hidden="true">
            {pasos.map((p, i) => (
              <span
                key={p.numero}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${i <= activo ? "bg-dorado" : "bg-hueso/20"}`}
              />
            ))}
          </div>
          <Link href="/cotizar" className="flecha cuerpo-chico inline-flex items-center gap-2 self-start underline underline-offset-4">
            Empezar por el paso 01
            <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <ol className="flex flex-col gap-16 md:col-span-7 md:gap-28">
        {pasos.map((p, i) => (
          <li
            key={p.numero}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-revelar
            style={orden(0)}
            className={`flex flex-col gap-6 transition-opacity duration-500 ${i === activo ? "md:opacity-100" : "md:opacity-40"}`}
          >
            <div className="zoom-hover redondeado group relative isolate aspect-[16/10] w-full overflow-hidden bg-carbon">
              <Image src={p.foto.url} alt={p.foto.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-4 border-t border-hueso/20 pt-6 sm:grid-cols-[auto_1fr] sm:gap-x-8">
              <span className="etiqueta pt-1.5 text-dorado">Paso {p.numero}</span>
              <div className="flex flex-col gap-3">
                <h3 className="titulo">{p.titulo}</h3>
                <p className="text-hueso/80">{p.texto}</p>
                <p className="cuerpo-chico flex items-start gap-2 text-hueso/60">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dorado" aria-hidden="true" />
                  <span>
                    <span className="text-hueso/80">Qué recibís:</span> {p.recibis}
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
