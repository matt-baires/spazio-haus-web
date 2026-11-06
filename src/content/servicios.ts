export type Servicio = {
  slug: string;
  nombre: string;
  /** Una línea para tarjetas y metadatos. */
  resumen: string;
  intro: string;
  queResolvemos: string[];
  materiales: string[];
};

/**
 * Servicios de Spazio Haus. Los tipos de mueble salen del design system;
 * los textos son de ejemplo y hay que validarlos con el cliente.
 */
export const servicios: Servicio[] = [
  {
    slug: "cocinas",
    nombre: "Cocinas",
    resumen: "Pensadas para cómo cocinás y para el espacio que tenés.",
    intro:
      "Diseñamos la cocina a partir de tu espacio y de cómo la usás. La fabricamos en nuestro taller y cuidamos cada encuentro con la mesada, los electrodomésticos y la pared.",
    queResolvemos: [
      "Bajo mesada y alacenas a medida",
      "Columnas para horno y heladera",
      "Islas y desayunadores",
      "Despensas y cajoneras con guías de cierre suave",
    ],
    materiales: ["Melamina", "Laqueado", "Madera", "Herrajes de cierre suave"],
  },
  {
    slug: "racks",
    nombre: "Racks",
    resumen: "A la medida de la pared, la pantalla y lo que guardás.",
    intro:
      "Un rack pensado para tu living: el ancho de la pared, la altura de la pantalla y el lugar justo para cada equipo y cada cable.",
    queResolvemos: [
      "Racks de pie y flotantes",
      "Paneles para TV con pasacables",
      "Bibliotecas y estantes integrados",
      "Iluminación LED integrada",
    ],
    materiales: ["Melamina", "Laqueado", "Madera", "Iluminación LED"],
  },
  {
    slug: "vanitorys",
    nombre: "Vanitorys",
    resumen: "Para baños donde cada centímetro cuenta.",
    intro:
      "Diseñamos el vanitory para el baño que tenés, con materiales preparados para la humedad y el guardado que necesitás.",
    queResolvemos: [
      "Vanitorys suspendidos y de pie",
      "Muebles de espejo con guardado",
      "Columnas y estantes para baño",
      "Integración con bachas de apoyo o empotradas",
    ],
    materiales: ["Melamina hidrófuga", "Laqueado", "Herrajes de cierre suave"],
  },
  {
    slug: "respaldos",
    nombre: "Respaldos",
    resumen: "Del ancho exacto de la cama y del cuarto.",
    intro:
      "Respaldos pensados para el dormitorio completo: el ancho de la cama, las mesas de luz y la luz de lectura.",
    queResolvemos: [
      "Respaldos tapizados y de madera",
      "Respaldos con mesas de luz integradas",
      "Iluminación de lectura",
      "Paneles de pared completos",
    ],
    materiales: ["Madera", "Laqueado", "Tapizado", "Iluminación LED"],
  },
  {
    slug: "muebles-a-medida",
    nombre: "Muebles a medida",
    resumen: "Si tu espacio lo necesita, lo diseñamos.",
    intro:
      "Placares, vestidores, escritorios, bibliotecas y muebles para espacios difíciles. Si no está en esta lista, contanos tu idea.",
    queResolvemos: [
      "Placares y vestidores",
      "Escritorios y espacios de trabajo",
      "Bibliotecas",
      "Muebles bajo escalera y rincones",
    ],
    materiales: ["Melamina", "Laqueado", "Madera", "Herrajes de cierre suave"],
  },
];

export function getServicio(slug: string) {
  return servicios.find((s) => s.slug === slug);
}
