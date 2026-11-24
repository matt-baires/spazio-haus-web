import Image from "next/image";

/**
 * Logo del sitio: el sello dorado (versión principal de la marca) junto al nombre.
 * Nombre en `titulo`, filete `dorado-mate` de 1 px y bajada en `etiqueta`.
 * El sello original es una imagen de 1240 px: para imprimir o grabar usar los SVG de `marca/`.
 */
export function LogoHorizontal({ compacto = false }: { compacto?: boolean }) {
  const tamano = compacto ? 44 : 88;
  return (
    <span className="inline-flex items-center gap-3" aria-label="Spazio Haus">
      <Image
        src="/marca/sello-dorado.png"
        alt=""
        width={tamano}
        height={tamano}
        priority={compacto}
        className="shrink-0"
      />
      <span className="inline-flex flex-col items-start gap-1.5">
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
    </span>
  );
}
