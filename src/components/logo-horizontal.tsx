/**
 * Versión horizontal del logo, según el design system:
 * "SPAZIO HAUS" en `titulo`, filete `dorado-mate` de 1 px y bajada en `etiqueta`.
 * Reemplazar por el sello vectorial cuando llegue el archivo original.
 */
export function LogoHorizontal({ compacto = false }: { compacto?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start gap-1.5" aria-label="Spazio Haus">
      <span
        className={
          compacto
            ? "font-display text-lg font-semibold uppercase tracking-[0.08em]"
            : "font-display text-2xl font-semibold uppercase tracking-[0.08em]"
        }
      >
        Spazio Haus
      </span>
      <span className="h-px w-full bg-dorado" aria-hidden="true" />
      {!compacto && <span className="etiqueta text-muted">Muebles de diseño a medida</span>}
    </span>
  );
}
