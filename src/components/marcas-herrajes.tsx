import Image from "next/image";
import { Dividir } from "@/components/dividir";

/**
 * Tira de logos de las marcas de herrajes que usa el taller, en movimiento continuo.
 * Logos en sus colores originales (public/marcas), cada uno en una tarjeta blanca.
 * La altura se ajusta por logo para que pesen parecido.
 * Con "reducir movimiento" activado en el sistema, la tira queda quieta y centrada.
 */
const marcas = [
  { nombre: "Blum", archivo: "blum", ancho: 321, alto: 160, h: 44 },
  { nombre: "Häfele", archivo: "hafele", ancho: 970, alto: 160, h: 24 },
  { nombre: "Hettich", archivo: "hettich", ancho: 257, alto: 160, h: 52 },
  { nombre: "Salice", archivo: "salice", ancho: 954, alto: 160, h: 24 },
  { nombre: "Ducasse", archivo: "ducasse", ancho: 734, alto: 160, h: 34 },
];

function Tira({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 py-2 pr-4 sm:gap-6 sm:pr-6" aria-hidden={oculta || undefined}>
      {marcas.map((m) => (
        <li
          key={m.nombre}
          className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-6 shadow-sm transition-transform duration-300 motion-safe:hover:-translate-y-1"
        >
          <Image
            src={`/marcas/${m.archivo}.png`}
            alt={oculta ? "" : m.nombre}
            width={Math.round((m.ancho / m.alto) * m.h)}
            height={m.h}
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
        <h2 id="marcas-titulo" className="titulo">
          <Dividir texto="Herrajes que usamos" />
        </h2>
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
