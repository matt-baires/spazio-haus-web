/**
 * Texto grande en movimiento continuo entre secciones (Cinzel, frases cortas de la marca).
 * Decorativo: los lectores de pantalla lo saltean. Con "reducir movimiento" queda quieto.
 */
const frases = ["Diseño a medida", "Hecho en taller propio", "Caseros, Buenos Aires", "Desde 2018"];

function Tramo({ oculto = false }: { oculto?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {frases.map((f) => (
        <span key={f} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span>{f}</span>
          <span className="h-2 w-2 rounded-full bg-dorado sm:h-3 sm:w-3" />
        </span>
      ))}
    </span>
  );
}

export function MarquesinaTexto() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-border py-6 sm:py-10">
      <div
        className="marquesina-pista marquesina-lenta titulo-grande flex w-max whitespace-nowrap"
        style={{ fontSize: "clamp(40px, 8vw, 112px)", lineHeight: 1.1 }}
      >
        <Tramo />
        <Tramo oculto />
      </div>
    </div>
  );
}
