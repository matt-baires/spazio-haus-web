/**
 * Tira de barrios, countries y empresas donde trabajamos, en movimiento continuo entre dos
 * filetes (al estilo de phippscharlie.com). Texto grande y fino en mayúsculas, sin adornos.
 * Es una excepción decorativa a la escala tipográfica, como los textos gigantes.
 * Con "reducir movimiento" sigue andando, más lenta.
 */
export const zonas = [
  "Nordelta",
  "Tortugas Country Club",
  "Martindale Country Club",
  "Highland Park Country Club",
  "Puertos",
  "San Jorge Village",
  "Newman Club",
  "Abril Club de Campo",
  "Saint Thomas",
  "San Eliseo Golf & Country",
  "El Venado",
  "Country Club Banco Provincia",
  "Campos de Álvarez",
];

function Tramo({ oculto = false }: { oculto?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {zonas.map((z) => (
        <li key={z} className="flex shrink-0 items-center gap-[0.45em] pr-[0.45em]">
          <span>{z}</span>
          <span className="h-[0.12em] w-[0.12em] rounded-full bg-dorado" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function TiraZonas() {
  return (
    <section aria-labelledby="zonas-titulo" className="cortina bg-background py-12 sm:py-16">
      <div className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-4 px-6">
        <h2 id="zonas-titulo" className="etiqueta text-muted">
          Confiaron en nosotros
        </h2>
      </div>
      <div className="marquesina relative overflow-hidden border-y border-border py-6 sm:py-10">
        <div
          className="marquesina-pista flex w-max whitespace-nowrap font-normal uppercase leading-none tracking-[-0.01em]"
          style={{ fontSize: "clamp(44px, 7vw, 96px)", animationDuration: "140s" }}
        >
          <Tramo />
          <Tramo oculto />
        </div>
      </div>
    </section>
  );
}
