export type Muestra = {
  nombre: string;
  /** Color de referencia para la vista previa (hasta tener la foto real de la muestra). */
  color: string;
  textura: "lisa" | "madera";
};

export type GrupoMateriales = {
  id: string;
  nombre: string;
  descripcion: string;
  ideal: string;
  muestras: Muestra[];
};

/**
 * MUESTRARIO DE EJEMPLO. Reemplazar por los materiales, colores y fotos de
 * muestra con los que trabaja Spazio Haus.
 */
export const muestrarioEsEjemplo = true;

export const materiales: GrupoMateriales[] = [
  {
    id: "melaminas",
    nombre: "Melaminas",
    descripcion: "Tablero con lámina decorativa. Resistente al uso diario y fácil de limpiar.",
    ideal: "Cocinas, placares y muebles de uso intenso.",
    muestras: [
      { nombre: "Blanco", color: "#F3F2EE", textura: "lisa" },
      { nombre: "Gris humo", color: "#8C8A86", textura: "lisa" },
      { nombre: "Grafito", color: "#3B3B3A", textura: "lisa" },
      { nombre: "Roble claro", color: "#C9A57A", textura: "madera" },
      { nombre: "Roble natural", color: "#A87D52", textura: "madera" },
      { nombre: "Nogal", color: "#6B4A33", textura: "madera" },
    ],
  },
  {
    id: "laqueados",
    nombre: "Laqueados",
    descripcion: "Pintura aplicada en varias capas. Superficie continua, mate o brillante.",
    ideal: "Frentes con color pleno y acabado sin vetas.",
    muestras: [
      { nombre: "Blanco mate", color: "#F7F6F2", textura: "lisa" },
      { nombre: "Arena", color: "#D8CDBB", textura: "lisa" },
      { nombre: "Verde salvia", color: "#9AA58E", textura: "lisa" },
      { nombre: "Terracota", color: "#B56A4A", textura: "lisa" },
      { nombre: "Azul profundo", color: "#2F3C4F", textura: "lisa" },
      { nombre: "Negro mate", color: "#1C1C1C", textura: "lisa" },
    ],
  },
  {
    id: "maderas",
    nombre: "Maderas",
    descripcion: "Madera maciza o enchapada, con su veta y su calidez.",
    ideal: "Cantos, mesadas de apoyo, respaldos y piezas protagonistas.",
    muestras: [
      { nombre: "Paraíso", color: "#B98A5E", textura: "madera" },
      { nombre: "Guatambú", color: "#E2CFA4", textura: "madera" },
      { nombre: "Roble", color: "#B08B5C", textura: "madera" },
      { nombre: "Petiribí", color: "#8A5E3C", textura: "madera" },
    ],
  },
];
