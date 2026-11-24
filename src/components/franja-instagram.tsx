/**
 * Franja negra en movimiento arriba del pie: "Seguinos en Instagram · @usuario".
 * Toda la franja es un solo enlace al perfil. Con "reducir movimiento" sigue andando, más lenta.
 */
export function FranjaInstagram({ usuario, url }: { usuario: string; url: string }) {
  const tramo = (oculto: boolean) => (
    <span className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
          <span>Seguinos en Instagram</span>
          <span className="font-semibold text-hueso underline-offset-4 group-hover:underline">{usuario}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
        </span>
      ))}
    </span>
  );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Seguinos en Instagram: ${usuario}`}
      data-menu="oscuro"
      className="group block overflow-hidden bg-foreground py-3 text-hueso/80"
    >
      <span className="marquesina-pista marquesina-rapida etiqueta flex w-max" aria-hidden="true">
        {tramo(false)}
        {tramo(true)}
      </span>
    </a>
  );
}
