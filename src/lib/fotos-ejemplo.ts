import type { Foto } from "@/lib/datos";

/**
 * Fotos de ejemplo (stock de Unsplash, licencia libre para uso comercial) que se muestran
 * mientras una obra, un servicio o un artículo no tiene fotos propias cargadas en el panel.
 * Apenas se carga una foto real en /admin, esa reemplaza a la de ejemplo.
 * Fuentes en public/fotos/CREDITOS.md.
 */
const f = (archivo: string, alt: string, width: number, height: number): Foto => ({
  url: `/fotos/${archivo}.jpg`,
  alt,
  width,
  height,
});

export const fotosEjemplo = {
  cocinaMaderaMesadaNegra: f("cocina-madera-mesada-negra", "Cocina con muebles de madera, isla y mesada negra", 1800, 1200),
  cocinaMaderaLed: f("cocina-madera-led", "Cocina en madera con barra, banquetas y luz integrada bajo las alacenas", 1800, 1200),
  cocinaIsla: f("cocina-isla", "Cocina blanca con isla de mármol y banquetas", 1800, 1200),
  rackFlotante: f("rack-flotante", "Rack flotante de madera con columna de guardado junto a la ventana", 1800, 2250),
  rackPanelOscuro: f("rack-panel-oscuro", "Panel de TV oscuro de piso a techo con luz integrada", 1800, 2250),
  vanitoryDoble: f("vanitory-doble", "Dos vanitorys de madera con espejos ovalados y griferías doradas", 1800, 1201),
  vanitoryDetalle: f("vanitory-detalle", "Vanitory de madera con mesada de mármol y grifería dorada", 1800, 1201),
  respaldoMadera: f("respaldo-madera", "Dormitorio con respaldo de madera de pared a pared", 1800, 2700),
  respaldoMesaDeLuz: f("respaldo-mesa-de-luz", "Respaldo de madera con mesa de luz y lámpara colgante", 1800, 2446),
  placardVestidor: f("placard-vestidor", "Placard a medida con barral, estantes y cajones", 1800, 2700),
  vestidorLargo: f("vestidor-largo", "Vestidor largo con frentes claros y puertas de vidrio", 1800, 2699),
  taller: f("taller", "Carpintero trabajando una pieza de madera en el taller", 1800, 1202),
  detalleTiradores: f("detalle-tiradores", "Detalle de tiradores metálicos sobre puertas de madera", 1800, 831),
  muestrasMadera: f("muestras-madera", "Muestras de maderas y enchapados sobre fondo negro", 1800, 1200),
  muebleMadera: f("mueble-madera", "Cajoneras de madera a medida en un ambiente con luz natural", 1800, 1200),
  maderaComedor: f("madera-comedor", "Mesa de comedor de madera con sillas en un ambiente luminoso", 1800, 2700),
  maderaSillon: f("madera-sillon", "Sillón individual de madera con asiento y respaldo de esterilla", 1800, 1800),
  maderaMesaBaja: f("madera-mesa-baja", "Mesa baja de madera maciza con estante inferior", 1800, 1200),
  maderaEnsamble: f("madera-ensamble", "Detalle del ensamble de una mesa de madera con su silla", 1800, 2304),
  maderaSilla: f("madera-silla", "Silla de madera con respaldo curvo y asiento tapizado", 1800, 2700),
} satisfies Record<string, Foto>;

const porServicio: Record<string, Foto> = {
  cocinas: fotosEjemplo.cocinaMaderaLed,
  racks: fotosEjemplo.rackFlotante,
  vanitorys: fotosEjemplo.vanitoryDoble,
  respaldos: fotosEjemplo.respaldoMadera,
  "muebles-a-medida": fotosEjemplo.vestidorLargo,
  "muebles-de-madera": fotosEjemplo.maderaComedor,
};

/** Piezas de ejemplo que se muestran en la página de un servicio que todavía no tiene obras. */
const galeriaPorServicio: Record<string, Foto[]> = {
  "muebles-de-madera": [
    fotosEjemplo.maderaSillon,
    fotosEjemplo.maderaMesaBaja,
    fotosEjemplo.maderaSilla,
    fotosEjemplo.maderaEnsamble,
  ],
};

export const galeriaEjemploServicio = (slug: string): Foto[] => galeriaPorServicio[slug] ?? [];

const porObra: Record<string, Foto> = {
  "cocina-madera-mesada-negra": fotosEjemplo.cocinaMaderaMesadaNegra,
  "rack-flotante-living": fotosEjemplo.rackPanelOscuro,
  "vanitory-suspendido": fotosEjemplo.vanitoryDetalle,
  "respaldo-con-mesas-de-luz": fotosEjemplo.respaldoMesaDeLuz,
  "placard-con-vestidor": fotosEjemplo.placardVestidor,
  "cocina-isla-laqueada": fotosEjemplo.cocinaIsla,
};

const porArticulo: Record<string, Foto> = {
  "melamina-o-laqueado": fotosEjemplo.muestrasMadera,
  "como-cuidar-tus-muebles": fotosEjemplo.muebleMadera,
};

/** Foto de ejemplo para un servicio (por su slug). */
export const fotoEjemploServicio = (slug: string): Foto =>
  porServicio[slug] ?? fotosEjemplo.muebleMadera;

/** Foto de ejemplo para una obra: por su slug, si no por su tipo. */
export const fotoEjemploObra = (slug: string, tipo: string): Foto =>
  porObra[slug] ?? fotoEjemploServicio(tipo);

/** Foto de ejemplo para un artículo del blog. */
export const fotoEjemploArticulo = (slug: string): Foto =>
  porArticulo[slug] ?? fotosEjemplo.muestrasMadera;
