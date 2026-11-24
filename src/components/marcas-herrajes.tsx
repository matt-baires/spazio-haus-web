import Image from "next/image";

/**
 * Tira de logos de las marcas de herrajes que usa el taller, en movimiento continuo.
 * Logos en un solo tono (public/marcas). La altura se ajusta por logo para que pesen parecido.
 * Con "reducir movimiento" activado en el sistema, la tira queda quieta y centrada.
 */
const marcas = [
  { nombre: "Blum", archivo: "blum", ancho: 458, alto: 123, h: 30 },
  { nombre: "Häfele", archivo: "hafele", ancho: 696, alto: 116, h: 22 },
  { nombre: "Hettich", archivo: "hettich", ancho: 192, alto: 120, h: 44 },
  { nombre: "Salice", archivo: "salice", ancho: 771, alto: 120, h: 22 },
  { nombre: "Ducasse", archivo: "ducasse", ancho: 545, alto: 120, h: 30 },
];

function Tira({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16 sm:gap-24 sm:pr-24" aria-hidden={oculta || undefined}>
      {marcas.map((m) => (
        <li key={m.nombre} className="shrink-0">
          <Image
            src={`/marcas/${m.archivo}.png`}
            alt={oculta ? "" : m.nombre}
            width={Math.round((m.ancho / m.alto) * m.h)}
            height={m.h}
            className="opacity-60"
          />
        </li>
      ))}
    </ul>
  );
}

export function MarcasHerrajes() {
  return (
    <section aria-labelledby="marcas-titulo" className="border-y border-border py-14 sm:py-16">
      <div data-revelar className="mx-auto mb-10 flex w-full max-w-6xl flex-col gap-3 px-6">
        <span className="filete-crece h-px w-10 bg-dorado" aria-hidden="true" />
        <h2 id="marcas-titulo" className="titulo">Herrajes que usamos</h2>
        <p className="max-w-2xl text-muted">
          Bisagras, correderas, sistemas de apertura y elevables de marcas reconocidas en todo el mundo. Lo que no se
          ve también se elige.
        </p>
      </div>
      <div className="marquesina relative overflow-hidden">
        <div className="marquesina-pista flex w-max">
          <Tira />
          <Tira oculta />
        </div>
      </div>
    </section>
  );
}
