"use client";

import { useRowLabel } from "@payloadcms/ui";

type Adjunto = { nombre?: string; pathname?: string };

/** Etiqueta de cada adjunto en el panel: el nombre del archivo, con enlace para abrirlo. */
export function AdjuntoLabel() {
  const { data, rowNumber } = useRowLabel<Adjunto>();
  const nombre = data?.nombre || `Adjunto ${(rowNumber ?? 0) + 1}`;
  if (!data?.pathname) return <span>{nombre}</span>;
  const url = `/api/adjunto?p=${encodeURIComponent(data.pathname)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      style={{ textDecoration: "underline" }}
    >
      {nombre} ↗
    </a>
  );
}
