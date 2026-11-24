"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ObraCard } from "@/components/ui";
import type { Foto, Obra } from "@/lib/datos";
import { OTRAS, subcategoriaDe, subcategorias } from "@/lib/subcategorias";

type Tipo = { slug: string; nombre: string; resumen?: string };

const dos = (n: number) => String(n).padStart(2, "0");

/**
 * Galería de obras con filtro en dos niveles: categoría (Cocinas, Vestidores, Madera maciza…)
 * y, dentro de cada una, subcategoría (Madera maciza → Mesas, Sillas…). Al elegir una categoría
 * aparece su cabecera con el nombre en grande, la cantidad y las subcategorías.
 */
export function GaleriaObras({
  obras,
  tipos,
  fotos,
  encabezado,
}: {
  obras: Obra[];
  tipos: Tipo[];
  /** Foto de cada categoría (por slug) y la de "todas", para el costado de la cabecera. */
  fotos: Record<string, Foto>;
  encabezado: ReactNode;
}) {
  const [categoria, setCategoria] = useState("todas");
  const [sub, setSub] = useState("todas");

  const conSub = useMemo(
    () => obras.map((o) => ({ obra: o, sub: subcategoriaDe(o.tipo, o.titulo) })),
    [obras],
  );
  const categorias = tipos.filter((t) => obras.some((o) => o.tipo === t.slug));
  const deCategoria = categoria === "todas" ? conSub : conSub.filter((x) => x.obra.tipo === categoria);
  const visibles = sub === "todas" ? deCategoria : deCategoria.filter((x) => x.sub.slug === sub);

  // Subcategorías de la categoría elegida que tienen al menos una obra, en el orden definido.
  const opcionesSub = categoria === "todas" ? [] : [...(subcategorias[categoria] ?? []), OTRAS]
    .map((s) => ({ slug: s.slug, nombre: s.nombre, cantidad: deCategoria.filter((x) => x.sub.slug === s.slug).length }))
    .filter((s) => s.cantidad > 0);

  const tipoActual = categorias.find((t) => t.slug === categoria);
  const elegir = (slug: string) => {
    setCategoria(slug);
    setSub("todas");
  };

  const pastilla = (activa: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-4 py-2 cuerpo-chico transition-colors duration-300 ${
      activa ? "border-foreground bg-foreground text-hueso" : "border-border hover:border-foreground"
    }`;

  const cantidadActual = categoria === "todas" ? obras.length : obras.filter((o) => o.tipo === categoria).length;
  const claves = ["todas", ...categorias.map((t) => t.slug)].filter((k) => fotos[k]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col gap-8 lg:col-span-6">
          {encabezado}
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {[{ slug: "todas", nombre: "Todas" }, ...categorias].map((t) => {
          const cantidad = t.slug === "todas" ? obras.length : obras.filter((o) => o.tipo === t.slug).length;
          return (
            <button key={t.slug} type="button" aria-pressed={categoria === t.slug} onClick={() => elegir(t.slug)} className={pastilla(categoria === t.slug)}>
              {t.nombre}
              <sup className="text-[10px] tabular-nums opacity-60">{dos(cantidad)}</sup>
            </button>
          );
        })}
      </div>
        </div>

        {/* Foto de la categoría elegida: cambia con un fundido al tocar cada filtro. */}
        <div className="redondeado relative isolate aspect-[4/3] overflow-hidden bg-niebla lg:col-span-6">
          {claves.map((k) => (
            <Image
              key={k}
              src={fotos[k].url}
              alt={k === categoria ? fotos[k].alt : ""}
              aria-hidden={k !== categoria || undefined}
              fill
              priority={k === "todas"}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                k === categoria ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          <span
            key={categoria}
            className="cuerpo-chico absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 backdrop-blur-sm motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)]"
          >
            {tipoActual?.nombre ?? "Todas las obras"}
            <span className="tabular-nums text-muted">{dos(cantidadActual)}</span>
          </span>
        </div>
      </div>

      {tipoActual && (
        <div key={tipoActual.slug} className="grid gap-5 border-y border-border py-6 motion-safe:animate-[entrar_0.6s_cubic-bezier(0.2,0.7,0.2,1)] md:grid-cols-12 md:items-end">
          <div className="flex flex-col gap-3 md:col-span-7">
            <span className="etiqueta text-muted">Categoría</span>
            <h2 className="frase">{tipoActual.nombre}</h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:col-span-5 md:items-end md:text-right">
            {tipoActual.resumen && <p className="text-muted">{tipoActual.resumen}</p>}
            <Link href={`/servicios/${tipoActual.slug}`} className="flecha cuerpo-chico inline-flex items-center gap-2 underline underline-offset-4">
              Ver el servicio
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {opcionesSub.length > 1 && (
            <div role="group" aria-label={`Filtrar ${tipoActual.nombre.toLowerCase()} por tipo`} className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-12">
              {[{ slug: "todas", nombre: "Todo", cantidad: deCategoria.length }, ...opcionesSub].map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={sub === s.slug}
                  onClick={() => setSub(s.slug)}
                  className={`group relative pb-1 transition-colors ${sub === s.slug ? "text-foreground" : "text-muted hover:text-foreground"}`}
                >
                  {s.nombre} <span className="cuerpo-chico tabular-nums opacity-60">({s.cantidad})</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-px origin-left bg-dorado transition-transform duration-500 ${
                      sub === s.slug ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="cuerpo-chico text-muted" aria-live="polite">
        {visibles.length} {visibles.length === 1 ? "obra" : "obras"}
      </p>
      <div key={`${categoria}-${sub}`} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((x, i) => (
          <div
            key={x.obra.slug}
            className="motion-safe:animate-[entrar_0.7s_cubic-bezier(0.2,0.7,0.2,1)_both]"
            style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
          >
            <ObraCard obra={x.obra} subcategoria={x.sub.slug === OTRAS.slug ? undefined : x.sub.nombre} />
          </div>
        ))}
      </div>
    </div>
  );
}
