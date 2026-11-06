export type Articulo = {
  slug: string;
  titulo: string;
  bajada: string;
  fecha: string; // ISO
  categoria: "Materiales" | "Cuidados" | "Guías";
  cuerpo: { subtitulo?: string; parrafos: string[] }[];
  /** Borrador de ejemplo: el sitio lo marca hasta que el cliente lo revise. */
  ejemplo: boolean;
};

export const articulos: Articulo[] = [
  {
    slug: "melamina-o-laqueado",
    titulo: "Melamina o laqueado: cuál elegir",
    bajada: "Dos terminaciones, dos usos. Qué cambia en precio, mantenimiento y aspecto.",
    fecha: "2026-11-06",
    categoria: "Materiales",
    ejemplo: true,
    cuerpo: [
      {
        parrafos: [
          "La melamina es un tablero con una lámina decorativa adherida. Es resistente al uso diario, se limpia fácil y tiene muchas opciones de color y símil madera.",
          "El laqueado es una pintura aplicada en varias capas sobre el tablero. Da una superficie continua, sin vetas, con acabado mate o brillante.",
        ],
      },
      {
        subtitulo: "Cuándo conviene cada uno",
        parrafos: [
          "Para cocinas y muebles de mucho uso, la melamina es práctica y rinde. Para frentes donde querés un color pleno o un acabado sin juntas, el laqueado es la mejor opción.",
          "También se pueden combinar: estructura en melamina y frentes laqueados.",
        ],
      },
    ],
  },
  {
    slug: "como-cuidar-tus-muebles",
    titulo: "Cómo cuidar tus muebles a medida",
    bajada: "Limpieza, humedad y herrajes: lo básico para que duren.",
    fecha: "2026-11-06",
    categoria: "Cuidados",
    ejemplo: true,
    cuerpo: [
      {
        subtitulo: "Limpieza",
        parrafos: [
          "Usá un paño suave apenas húmedo y secá enseguida. Evitá productos abrasivos o con solventes, sobre todo en superficies laqueadas.",
        ],
      },
      {
        subtitulo: "Humedad y calor",
        parrafos: [
          "No dejes agua acumulada sobre cantos y juntas. Cerca del horno o del anafe, usá protectores para el calor.",
        ],
      },
      {
        subtitulo: "Herrajes",
        parrafos: [
          "Si una puerta o un cajón se desalinea, se ajusta desde las bisagras o las guías. Escribinos y te indicamos cómo hacerlo.",
        ],
      },
    ],
  },
];

export function getArticulo(slug: string) {
  return articulos.find((a) => a.slug === slug);
}
