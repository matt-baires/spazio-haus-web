import type { Foto } from "@/lib/datos";
import { fotosEjemplo } from "@/lib/fotos-ejemplo";

/**
 * Cómo trabajamos: los mismos cuatro pasos en la portada y en Nosotros.
 * Las fotos son de ejemplo hasta tener fotos propias de cada etapa.
 */
export type Paso = { numero: string; titulo: string; texto: string; recibis: string; foto: Foto };

export const proceso: Paso[] = [
  {
    numero: "01",
    titulo: "Nos contás qué necesitás",
    texto:
      "Escribinos por el formulario o por WhatsApp. Con medidas aproximadas y fotos del espacio alcanza para empezar a pensarlo.",
    recibis: "Una primera respuesta con ideas y las preguntas que hagan falta.",
    foto: fotosEjemplo.obraCocinaIslaBarra,
  },
  {
    numero: "02",
    titulo: "Lo diseñamos con vos",
    texto:
      "Te proponemos el diseño, los materiales y el presupuesto. Ajustamos medidas, colores y herrajes con vos antes de fabricar.",
    recibis: "La propuesta con diseño, muestras de materiales y presupuesto.",
    foto: fotosEjemplo.muestrasMadera,
  },
  {
    numero: "03",
    titulo: "Lo fabricamos en el taller",
    texto:
      "Tomamos las medidas definitivas en tu casa. Después fabricamos cada pieza en nuestro taller de Caseros, del corte al último canto.",
    recibis: "Medición en obra y fabricación en taller propio.",
    foto: fotosEjemplo.taller,
  },
  {
    numero: "04",
    titulo: "Lo instalamos",
    texto:
      "Llevamos el mueble y lo instalamos nosotros. Cuidamos cada encuentro, canto y herraje para que quede como lo diseñamos.",
    recibis: "El mueble instalado, regulado y listo para usar.",
    foto: fotosEjemplo.detalleTiradores,
  },
];
