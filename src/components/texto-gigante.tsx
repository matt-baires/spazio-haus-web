/**
 * Texto gigante en movimiento entre dos filetes, sobre una foto oscura (al estilo de AYOCIN).
 * Un solo componente para que "Qué hacemos", "Madera maciza" y "Hablemos" tengan siempre el
 * mismo tamaño. Es decorativo: los lectores de pantalla lo saltean (cada sección tiene su título). Con "reducir movimiento" sigue andando, más lento.
 */
export function TextoGigante({ texto }: { texto: string }) {
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-hueso/20 py-4">
      <div
        className="marquesina-pista marquesina-lenta titulo-grande flex w-max whitespace-nowrap uppercase"
        style={{ fontSize: "clamp(64px, 13vw, 190px)", lineHeight: 1 }}
      >
        {[0, 1].map((copia) => (
          <span key={copia} className="flex shrink-0 items-center">
            {[0, 1, 2].map((k) => (
              <span key={k} className="flex shrink-0 items-center gap-[0.3em] pr-[0.3em]">
                <span>{texto}</span>
                <span className="h-[0.08em] w-[0.08em] rounded-full bg-dorado" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
