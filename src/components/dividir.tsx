import type { CSSProperties } from "react";

/**
 * Parte un título en palabras para que suban de a una, como si salieran de abajo de una línea.
 * - Dentro de un bloque con `data-revelar`, las palabras suben cuando el bloque llega a la pantalla.
 * - Con `alCargar`, suben apenas carga la página (para el título principal).
 * El texto se sigue leyendo igual (lectores de pantalla y buscadores ven la frase completa).
 */
export function Dividir({ texto, alCargar = false }: { texto: string; alCargar?: boolean }) {
  const palabras = texto.split(" ").filter(Boolean);
  return (
    <span className={`dividido${alCargar ? " subir" : ""}`}>
      {palabras.map((p, i) => (
        <span key={i}>
          <span className="pal">
            <span style={{ "--p": i } as CSSProperties}>{p}</span>
          </span>
          {i < palabras.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
