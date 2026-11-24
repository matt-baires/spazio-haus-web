import type { CSSProperties } from "react";

/** Flecha fina para los botones de acción; avanza al pasar el mouse (clase `flecha` en el botón). */
export function Flecha() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Índice para escalonar animaciones dentro de un grupo (variable CSS --i). */
export const orden = (i: number) => ({ "--i": i }) as CSSProperties;
