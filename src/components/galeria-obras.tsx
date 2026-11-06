"use client";

import { useState } from "react";
import { buttonVariants } from "@heroui/react";
import { ObraCard } from "@/components/ui";
import type { Obra } from "@/content/obras";

export function GaleriaObras({ obras, tipos }: { obras: Obra[]; tipos: { slug: string; nombre: string }[] }) {
  const [filtro, setFiltro] = useState<string>("todas");
  const visibles = filtro === "todas" ? obras : obras.filter((o) => o.tipo === filtro);
  const opciones = [{ slug: "todas", nombre: "Todas" }, ...tipos.filter((t) => obras.some((o) => o.tipo === t.slug))];

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filtrar por tipo de mueble" className="flex flex-wrap gap-2">
        {opciones.map((t) => (
          <button
            key={t.slug}
            type="button"
            aria-pressed={filtro === t.slug}
            onClick={() => setFiltro(t.slug)}
            className={buttonVariants({ variant: filtro === t.slug ? "primary" : "outline", size: "sm" })}
          >
            {t.nombre}
          </button>
        ))}
      </div>
      <p className="cuerpo-chico text-muted" aria-live="polite">
        {visibles.length} {visibles.length === 1 ? "obra" : "obras"}
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((o) => (
          <ObraCard key={o.slug} obra={o} />
        ))}
      </div>
    </div>
  );
}
