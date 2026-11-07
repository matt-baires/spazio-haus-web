import type { CollectionConfig, Field } from "payload";
import { conSesion, esAdmin, esAdminCampo, publicadoOSesion, publico } from "./acceso";
import { TAGS, revalidarColeccion } from "./revalidar";

const slugCampo: Field = {
  name: "slug",
  label: "Dirección (slug)",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Parte final de la URL, en minúsculas y con guiones. Ej.: cocina-isla-laqueada",
  },
  validate: (v: string | null | undefined) =>
    !v || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || "Usá solo minúsculas, números y guiones.",
};

const ordenCampo: Field = {
  name: "orden",
  label: "Orden",
  type: "number",
  defaultValue: 0,
  admin: { position: "sidebar", description: "Menor número, más arriba." },
};

const ejemploCampo: Field = {
  name: "ejemplo",
  label: "Contenido de ejemplo",
  type: "checkbox",
  defaultValue: false,
  admin: { position: "sidebar", description: "Si está tildado, el sitio lo marca como ejemplo." },
};

export const Usuarios: CollectionConfig = {
  slug: "usuarios",
  labels: { singular: "Usuario", plural: "Usuarios" },
  auth: { tokenExpiration: 60 * 60 * 12, maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  admin: { useAsTitle: "email", group: "Configuración", defaultColumns: ["nombre", "email", "rol"] },
  access: {
    read: conSesion,
    create: esAdmin,
    update: ({ req, id }) => (req.user as { rol?: string } | null)?.rol === "admin" || req.user?.id === id,
    delete: esAdmin,
  },
  fields: [
    { name: "nombre", label: "Nombre", type: "text" },
    {
      name: "rol",
      label: "Rol",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: { update: esAdminCampo },
      admin: { description: "Los editores cargan contenido; los administradores también gestionan usuarios." },
    },
  ],
};

export const Medios: CollectionConfig = {
  slug: "medios",
  labels: { singular: "Imagen", plural: "Imágenes" },
  admin: { group: "Contenido" },
  access: { read: publico, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.medios),
  upload: {
    mimeTypes: ["image/*"],
    focalPoint: true,
    imageSizes: [
      { name: "miniatura", width: 480 },
      { name: "media", width: 1200 },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Texto alternativo",
      type: "text",
      required: true,
      admin: { description: "Qué muestra la foto, para lectores de pantalla y Google." },
    },
  ],
};

export const Servicios: CollectionConfig = {
  slug: "servicios",
  labels: { singular: "Servicio", plural: "Servicios" },
  admin: { useAsTitle: "nombre", group: "Contenido", defaultColumns: ["nombre", "slug", "orden"] },
  defaultSort: "orden",
  access: { read: publico, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.servicios),
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    slugCampo,
    ordenCampo,
    { name: "resumen", label: "Resumen (una línea)", type: "text", required: true },
    { name: "intro", label: "Introducción", type: "textarea", required: true },
    { name: "imagen", label: "Imagen principal", type: "upload", relationTo: "medios" },
    {
      name: "queResolvemos",
      label: "Qué resolvemos",
      type: "array",
      labels: { singular: "Ítem", plural: "Ítems" },
      fields: [{ name: "texto", label: "Texto", type: "text", required: true }],
    },
    {
      name: "materiales",
      label: "Materiales",
      type: "array",
      labels: { singular: "Material", plural: "Materiales" },
      fields: [{ name: "texto", label: "Material", type: "text", required: true }],
    },
  ],
};

export const Obras: CollectionConfig = {
  slug: "obras",
  labels: { singular: "Obra", plural: "Obras" },
  admin: {
    useAsTitle: "titulo",
    group: "Contenido",
    defaultColumns: ["titulo", "tipo", "zona", "destacada", "_status"],
  },
  defaultSort: "orden",
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publicadoOSesion, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.obras),
  fields: [
    { name: "titulo", label: "Título", type: "text", required: true },
    slugCampo,
    ordenCampo,
    ejemploCampo,
    {
      name: "destacada",
      label: "Destacada en la home",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    { name: "tipo", label: "Tipo de mueble", type: "relationship", relationTo: "servicios", required: true },
    {
      type: "row",
      fields: [
        { name: "ambiente", label: "Ambiente", type: "text", required: true },
        { name: "zona", label: "Zona", type: "text", required: true },
      ],
    },
    { name: "descripcion", label: "Descripción", type: "textarea", required: true },
    {
      name: "detalle",
      label: "El detalle",
      type: "text",
      required: true,
      admin: { description: "Qué muestra la foto de detalle: un canto, un herraje, un encuentro." },
    },
    {
      name: "materiales",
      label: "Materiales",
      type: "array",
      labels: { singular: "Material", plural: "Materiales" },
      fields: [{ name: "texto", label: "Material", type: "text", required: true }],
    },
    {
      name: "fotos",
      label: "Fotos de la obra terminada",
      type: "upload",
      relationTo: "medios",
      hasMany: true,
      admin: { description: "La primera es la principal. Solo obras terminadas y limpias." },
    },
    { name: "fotoDetalle", label: "Foto de detalle", type: "upload", relationTo: "medios" },
    {
      name: "fotosPrevistas",
      label: "Fotos previstas (mientras no haya fotos)",
      type: "number",
      defaultValue: 3,
      admin: { position: "sidebar", description: "Cantidad de espacios reservados que muestra la galería." },
    },
  ],
};

export const Materiales: CollectionConfig = {
  slug: "materiales",
  labels: { singular: "Grupo de materiales", plural: "Materiales" },
  admin: { useAsTitle: "nombre", group: "Contenido", defaultColumns: ["nombre", "orden"] },
  defaultSort: "orden",
  access: { read: publico, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.materiales),
  fields: [
    { name: "nombre", label: "Nombre", type: "text", required: true },
    slugCampo,
    ordenCampo,
    ejemploCampo,
    { name: "descripcion", label: "Descripción", type: "textarea", required: true },
    { name: "ideal", label: "Ideal para", type: "text", required: true },
    {
      name: "muestras",
      label: "Muestras",
      type: "array",
      labels: { singular: "Muestra", plural: "Muestras" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "nombre", label: "Nombre", type: "text", required: true },
            {
              name: "color",
              label: "Color de referencia",
              type: "text",
              required: true,
              admin: { description: "Hexadecimal, ej. #A87D52. Se usa si no hay foto." },
              validate: (v: string | null | undefined) => !v || /^#[0-9a-fA-F]{6}$/.test(v) || "Formato #RRGGBB",
            },
            {
              name: "textura",
              label: "Textura",
              type: "select",
              defaultValue: "lisa",
              options: [
                { label: "Lisa", value: "lisa" },
                { label: "Madera", value: "madera" },
              ],
            },
          ],
        },
        { name: "foto", label: "Foto de la muestra", type: "upload", relationTo: "medios" },
      ],
    },
  ],
};

export const Preguntas: CollectionConfig = {
  slug: "preguntas",
  labels: { singular: "Pregunta frecuente", plural: "Preguntas frecuentes" },
  admin: { useAsTitle: "pregunta", group: "Contenido", defaultColumns: ["pregunta", "orden"] },
  defaultSort: "orden",
  access: { read: publico, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.preguntas),
  fields: [
    { name: "pregunta", label: "Pregunta", type: "text", required: true },
    { name: "respuesta", label: "Respuesta", type: "textarea", required: true },
    ordenCampo,
    {
      name: "enHome",
      label: "Mostrar en la home",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};

export const Articulos: CollectionConfig = {
  slug: "articulos",
  labels: { singular: "Artículo", plural: "Blog" },
  admin: { useAsTitle: "titulo", group: "Contenido", defaultColumns: ["titulo", "categoria", "fecha", "_status"] },
  defaultSort: "-fecha",
  versions: { drafts: true, maxPerDoc: 20 },
  access: { read: publicadoOSesion, create: conSesion, update: conSesion, delete: conSesion },
  hooks: revalidarColeccion(TAGS.articulos),
  fields: [
    { name: "titulo", label: "Título", type: "text", required: true },
    slugCampo,
    ejemploCampo,
    { name: "bajada", label: "Bajada", type: "textarea", required: true },
    {
      name: "fecha",
      label: "Fecha",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "d/M/yyyy" } },
    },
    {
      name: "categoria",
      label: "Categoría",
      type: "select",
      required: true,
      options: ["Materiales", "Cuidados", "Guías"].map((c) => ({ label: c, value: c })),
      admin: { position: "sidebar" },
    },
    { name: "imagen", label: "Imagen", type: "upload", relationTo: "medios" },
    { name: "cuerpo", label: "Texto", type: "richText", required: true },
  ],
};

export const Consultas: CollectionConfig = {
  slug: "consultas",
  labels: { singular: "Consulta", plural: "Consultas" },
  admin: {
    useAsTitle: "nombre",
    group: "Consultas",
    defaultColumns: ["nombre", "tipo", "zona", "estado", "createdAt"],
    listSearchableFields: ["nombre", "email", "telefono", "zona"],
    description: "Pedidos de cotización recibidos desde el sitio.",
  },
  defaultSort: "-createdAt",
  // Las consultas solo se crean desde el formulario del sitio (servidor).
  access: { read: conSesion, create: () => false, update: conSesion, delete: esAdmin },
  fields: [
    {
      name: "estado",
      label: "Estado",
      type: "select",
      required: true,
      defaultValue: "nueva",
      options: [
        { label: "Nueva", value: "nueva" },
        { label: "En presupuesto", value: "en-presupuesto" },
        { label: "Presupuestada", value: "presupuestada" },
        { label: "Ganada", value: "ganada" },
        { label: "Perdida", value: "perdida" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notas",
      label: "Notas internas",
      type: "textarea",
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "nombre", label: "Nombre", type: "text", required: true, admin: { readOnly: true } },
        {
          name: "perfil",
          label: "Perfil",
          type: "select",
          options: [
            { label: "Particular", value: "particular" },
            { label: "Arquitecto o interiorista", value: "profesional" },
          ],
          admin: { readOnly: true },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", label: "Email", type: "email", admin: { readOnly: true } },
        { name: "telefono", label: "Teléfono", type: "text", admin: { readOnly: true } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "tipo", label: "Qué quiere hacer", type: "text", admin: { readOnly: true } },
        { name: "ambiente", label: "Ambiente", type: "text", admin: { readOnly: true } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "medidas", label: "Medidas", type: "text", admin: { readOnly: true } },
        { name: "zona", label: "Zona", type: "text", admin: { readOnly: true } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "plazo", label: "Plazo", type: "text", admin: { readOnly: true } },
        { name: "presupuesto", label: "Presupuesto orientativo", type: "text", admin: { readOnly: true } },
      ],
    },
    { name: "mensaje", label: "Mensaje", type: "textarea", admin: { readOnly: true } },
    {
      type: "row",
      fields: [
        { name: "origen", label: "Cómo nos conoció", type: "text", admin: { readOnly: true } },
        { name: "referencia", label: "Desde la obra", type: "text", admin: { readOnly: true } },
      ],
    },
    {
      name: "adjuntos",
      label: "Adjuntos",
      type: "array",
      admin: {
        readOnly: true,
        components: { RowLabel: "/payload/componentes/adjunto-label#AdjuntoLabel" },
      },
      fields: [
        { name: "nombre", label: "Archivo", type: "text" },
        { name: "pathname", label: "Ruta", type: "text", admin: { hidden: true } },
        { name: "tipo", label: "Tipo", type: "text" },
        { name: "tamano", label: "Tamaño (bytes)", type: "number" },
      ],
    },
  ],
};
