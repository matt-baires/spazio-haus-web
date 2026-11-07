import { getSitio } from "@/lib/datos";

/** Aviso fijo mientras haya contenido de ejemplo (se apaga desde el panel). */
export async function AvisoEjemplo() {
  const { contenidoDeEjemplo } = await getSitio();
  if (!contenidoDeEjemplo) return null;
  return (
    <div className="bg-foreground text-crema">
      <p className="cuerpo-chico mx-auto w-full max-w-6xl px-6 py-2">
        Sitio en construcción. Las obras y algunos textos son de ejemplo hasta cargar el contenido real.
      </p>
    </div>
  );
}
