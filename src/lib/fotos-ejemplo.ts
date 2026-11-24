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
  taller: f("taller", "Manos marcando con lápiz una tabla de madera entre virutas, en el taller", 1800, 1200),
  detalleTiradores: f("detalle-tiradores", "Detalle de tiradores metálicos sobre puertas de madera", 1800, 831),
  muestrasMadera: f("muestras-madera", "Muestras de maderas y enchapados sobre fondo negro", 1800, 1200),
  muebleMadera: f("mueble-madera", "Cajoneras de madera a medida en un ambiente con luz natural", 1800, 1200),
  maderaComedor: f("madera-comedor", "Mesa de comedor de madera con sillas en un ambiente luminoso", 1800, 2700),
  maderaSillon: f("madera-sillon", "Sillón individual de madera con asiento y respaldo de esterilla", 1800, 1800),
  maderaMesaBaja: f("madera-mesa-baja", "Mesa baja de madera maciza con estante inferior", 1800, 1200),
  maderaEnsamble: f("madera-ensamble", "Detalle del ensamble de una mesa de madera con su silla", 1800, 2304),
  maderaSilla: f("madera-silla", "Silla de madera con respaldo curvo y asiento tapizado", 1800, 2700),
  maderaBanquetaAlta: f("madera-banqueta-alta", "Banqueta alta de madera con asiento redondo y apoyapiés", 1800, 3200),
  maderaBanquetasBajas: f("madera-banquetas-bajas", "Dos banquetas bajas de madera maciza con asiento redondo", 1800, 2466),
  maderaMesaRatona: f("madera-mesa-ratona", "Mesa ratona de madera con patas de hierro frente a un sillón", 1800, 2700),
  maderaMesasNido: f("madera-mesas-nido", "Juego de tres mesas nido de madera", 1800, 1200),
  maderaMesaDeLuz: f("madera-mesa-de-luz", "Mesa de luz de madera con bordes redondeados y estante abierto", 1800, 2700),
  maderaMesaRedonda: f("madera-mesa-redonda", "Mesa redonda de madera con luz natural", 1800, 2700),
  maderaMesaTablones: f("madera-mesa-tablones", "Mesa larga de tablones de madera con sillas negras", 1800, 1193),
  maderaSillaRecta: f("madera-silla-recta", "Silla de madera de líneas rectas con asiento tapizado claro", 1800, 2700),
  maderaEscritorio: f("madera-escritorio", "Escritorio de madera con frente de varillas", 1800, 1091),
  maderaConsola: f("madera-consola", "Consola de madera con cajones blancos", 1800, 1013),
  maderaAparador: f("madera-aparador", "Aparador de madera con puertas de varillas", 1800, 2249),
  maderaEstante: f("madera-estante", "Estante de pared de madera con libros", 1800, 1800),
  maderaCantoVivo: f("madera-canto-vivo", "Mesa auxiliar con tapa de madera de canto vivo", 1800, 2399),
} satisfies Record<string, Foto>;

const porServicio: Record<string, Foto> = {
  cocinas: fotosEjemplo.cocinaMaderaLed,
  racks: fotosEjemplo.rackFlotante,
  vanitorys: fotosEjemplo.vanitoryDoble,
  respaldos: fotosEjemplo.respaldoMadera,
  "muebles-a-medida": fotosEjemplo.vestidorLargo,
  "muebles-de-madera": fotosEjemplo.maderaComedor,
};

export type Pieza = { nombre: string; detalle: string; foto: Foto };

const p = (nombre: string, detalle: string, foto: Foto): Pieza => ({ nombre, detalle, foto });

/** Piezas de ejemplo que se muestran en la página de un servicio que todavía no tiene obras. */
const galeriaPorServicio: Record<string, Pieza[]> = {
  "muebles-de-madera": [
    p("Mesa de comedor", "Tapa maciza a la medida del ambiente", fotosEjemplo.maderaComedor),
    p("Mesa redonda", "Para cuatro o seis, con pata central o cuatro patas", fotosEjemplo.maderaMesaRedonda),
    p("Mesa de tablones", "Tablones encolados, ideal para comedor o trabajo", fotosEjemplo.maderaMesaTablones),
    p("Silla tapizada", "Respaldo curvo y asiento en tela a elección", fotosEjemplo.maderaSilla),
    p("Silla recta", "Líneas simples, asiento tapizado", fotosEjemplo.maderaSillaRecta),
    p("Banqueta alta", "Con apoyapiés, a la altura de tu barra", fotosEjemplo.maderaBanquetaAlta),
    p("Banqueta baja", "Asiento redondo de madera maciza", fotosEjemplo.maderaBanquetasBajas),
    p("Sillón individual", "Estructura de madera y esterilla", fotosEjemplo.maderaSillon),
    p("Mesa baja", "Madera maciza con estante inferior", fotosEjemplo.maderaMesaBaja),
    p("Mesa ratona", "Tapa de madera y patas de hierro", fotosEjemplo.maderaMesaRatona),
    p("Mesas nido", "Tres medidas que se guardan una dentro de otra", fotosEjemplo.maderaMesasNido),
    p("Mesa de arrime", "Tapa de canto vivo, cada pieza es única", fotosEjemplo.maderaCantoVivo),
    p("Mesa de luz", "Bordes redondeados y estante abierto", fotosEjemplo.maderaMesaDeLuz),
    p("Aparador", "Puertas de varillas y guardado interior", fotosEjemplo.maderaAparador),
    p("Consola", "Para recibidor o pasillo, con cajones", fotosEjemplo.maderaConsola),
    p("Escritorio", "Frente de varillas y medida a elección", fotosEjemplo.maderaEscritorio),
    p("Estante de pared", "Parante de madera con estantes regulables", fotosEjemplo.maderaEstante),
    p("Detalle de ensamble", "Uniones de carpintería en madera maciza", fotosEjemplo.maderaEnsamble),
  ],
};

export const galeriaEjemploServicio = (slug: string): Pieza[] => galeriaPorServicio[slug] ?? [];

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
