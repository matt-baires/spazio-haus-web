export type Obra = {
  slug: string;
  titulo: string;
  /** slug del servicio */
  tipo: "cocinas" | "racks" | "vanitorys" | "respaldos" | "muebles-a-medida";
  ambiente: string;
  zona: string;
  materiales: string[];
  descripcion: string;
  detalle: string;
  /** Cantidad de fotos previstas para la galería. */
  fotos: number;
  destacada?: boolean;
  /** true mientras la obra sea de ejemplo: el sitio la marca como tal. */
  ejemplo: boolean;
};

/**
 * OBRAS DE EJEMPLO. Reemplazar por obras reales de Spazio Haus, con fotos
 * de obra terminada y una foto de detalle cada una (ver manual de marca).
 */
export const obras: Obra[] = [
  {
    slug: "cocina-madera-mesada-negra",
    titulo: "Cocina en madera con mesada negra",
    tipo: "cocinas",
    ambiente: "Cocina integrada",
    zona: "Caseros",
    materiales: ["Melamina símil madera", "Mesada negra", "Herrajes de cierre suave"],
    descripcion:
      "Cocina en L con alacenas hasta el techo y una columna para horno y microondas. Diseñada y fabricada a medida.",
    detalle: "Encuentro de la alacena con la campana, sin luz entre muebles.",
    fotos: 4,
    destacada: true,
    ejemplo: true,
  },
  {
    slug: "rack-flotante-living",
    titulo: "Rack flotante con panel para TV",
    tipo: "racks",
    ambiente: "Living",
    zona: "Palermo, CABA",
    materiales: ["Laqueado mate", "Iluminación LED", "Pasacables ocultos"],
    descripcion:
      "Rack suspendido de 2,40 m con panel para TV y estantes laterales. Los cables quedan ocultos detrás del panel.",
    detalle: "Tira LED empotrada en el estante superior.",
    fotos: 3,
    destacada: true,
    ejemplo: true,
  },
  {
    slug: "vanitory-suspendido",
    titulo: "Vanitory suspendido con bacha de apoyo",
    tipo: "vanitorys",
    ambiente: "Baño principal",
    zona: "Villa Devoto, CABA",
    materiales: ["Melamina hidrófuga", "Cajones con cierre suave"],
    descripcion:
      "Vanitory de dos cajones para un baño angosto. Suspendido para ganar sensación de espacio.",
    detalle: "Corte de la mesada para la grifería de pared.",
    fotos: 3,
    destacada: true,
    ejemplo: true,
  },
  {
    slug: "respaldo-con-mesas-de-luz",
    titulo: "Respaldo con mesas de luz integradas",
    tipo: "respaldos",
    ambiente: "Dormitorio",
    zona: "Ciudad Jardín",
    materiales: ["Madera", "Tapizado", "Luz de lectura LED"],
    descripcion:
      "Respaldo de pared a pared con mesas de luz flotantes y luz de lectura a cada lado.",
    detalle: "Interruptor de la luz de lectura embutido en el respaldo.",
    fotos: 3,
    ejemplo: true,
  },
  {
    slug: "placard-con-vestidor",
    titulo: "Placard con vestidor",
    tipo: "muebles-a-medida",
    ambiente: "Dormitorio",
    zona: "Caseros",
    materiales: ["Melamina", "Puertas corredizas", "Iluminación interior"],
    descripcion:
      "Placard de piso a techo con puertas corredizas y un vestidor abierto en el lateral.",
    detalle: "Barral con luz que se enciende al abrir la puerta.",
    fotos: 3,
    ejemplo: true,
  },
  {
    slug: "cocina-isla-laqueada",
    titulo: "Cocina con isla laqueada",
    tipo: "cocinas",
    ambiente: "Cocina abierta al living",
    zona: "Belgrano, CABA",
    materiales: ["Laqueado blanco", "Madera", "Mesada de cuarzo"],
    descripcion:
      "Cocina abierta con isla y desayunador. La isla guarda cajoneras del lado de la cocina y estantes del lado del living.",
    detalle: "Canto de la isla en madera maciza.",
    fotos: 4,
    ejemplo: true,
  },
];

export function getObra(slug: string) {
  return obras.find((o) => o.slug === slug);
}

export function obrasPorTipo(tipo: Obra["tipo"]) {
  return obras.filter((o) => o.tipo === tipo);
}
