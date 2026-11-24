/**
 * Subcategorías de cada tipo de obra (por ejemplo, Madera maciza → Mesas, Sillas…).
 * Se asignan por palabras del título de la obra: "Mesa de comedor de tablones" cae en Mesas.
 * Para que una obra cargada en el panel entre en una subcategoría, alcanza con que su título
 * nombre el mueble. Las que no coinciden con ninguna van a "Otras".
 */
export type Subcategoria = { slug: string; nombre: string; palabras: string[] };

export const subcategorias: Record<string, Subcategoria[]> = {
  cocinas: [
    { slug: "con-isla", nombre: "Con isla", palabras: ["isla", "barra"] },
    { slug: "en-madera", nombre: "En madera", palabras: ["madera", "varillas", "roble", "nogal"] },
    { slug: "de-color", nombre: "De color", palabras: ["negra", "blanca", "laqueada", "verde", "color"] },
  ],
  racks: [
    { slug: "flotantes", nombre: "Flotantes", palabras: ["flotante", "suspendido"] },
    { slug: "con-panel", nombre: "Con panel", palabras: ["panel"] },
    { slug: "bajos", nombre: "Bajos y bibliotecas", palabras: ["bajo", "estantes", "biblioteca"] },
  ],
  vanitorys: [
    { slug: "suspendidos", nombre: "Suspendidos", palabras: ["suspendido", "flotante"] },
    { slug: "doble-bacha", nombre: "Doble bacha", palabras: ["doble"] },
    { slug: "de-color", nombre: "De color", palabras: ["verde", "negro", "laqueado", "color"] },
  ],
  respaldos: [
    { slug: "con-mesas-de-luz", nombre: "Con mesas de luz", palabras: ["mesas de luz", "mesa de luz"] },
    { slug: "de-listones", nombre: "De listones", palabras: ["listones"] },
    { slug: "paneles", nombre: "Paneles de pared", palabras: ["panel", "pared"] },
  ],
  vestidores: [
    { slug: "con-isla", nombre: "Con isla", palabras: ["isla"] },
    { slug: "con-puertas", nombre: "Con puertas", palabras: ["puertas", "vidrio"] },
    { slug: "abiertos", nombre: "Abiertos", palabras: ["en u", "abierto", "luz"] },
  ],
  "muebles-a-medida": [
    { slug: "placares", nombre: "Placares", palabras: ["placard"] },
    { slug: "vestidores", nombre: "Vestidores", palabras: ["vestidor"] },
    { slug: "bibliotecas", nombre: "Bibliotecas y escritorios", palabras: ["biblioteca", "escritorio"] },
  ],
  "muebles-de-madera": [
    { slug: "mesas", nombre: "Mesas", palabras: ["mesa"] },
    { slug: "sillas", nombre: "Sillas y banquetas", palabras: ["silla", "banqueta"] },
    { slug: "sillones", nombre: "Sillones", palabras: ["sillon"] },
    { slug: "guardado", nombre: "Aparadores y consolas", palabras: ["aparador", "consola", "estante"] },
  ],
};

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const OTRAS = { slug: "otras", nombre: "Otras" };

/** Subcategoría de una obra según su tipo y su título. */
export function subcategoriaDe(tipo: string, titulo: string): { slug: string; nombre: string } {
  const t = normalizar(titulo);
  const encontrada = (subcategorias[tipo] ?? []).find((s) => s.palabras.some((p) => t.includes(normalizar(p))));
  return encontrada ? { slug: encontrada.slug, nombre: encontrada.nombre } : OTRAS;
}
