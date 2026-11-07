import type { GlobalConfig } from "payload";
import { conSesion, publico } from "./acceso";
import { TAGS, revalidarGlobal } from "./revalidar";

export const Sitio: GlobalConfig = {
  slug: "sitio",
  label: "Datos del sitio",
  admin: { group: "Configuración" },
  access: { read: publico, update: conSesion },
  hooks: { afterChange: revalidarGlobal(TAGS.sitio) },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "whatsapp",
          label: "WhatsApp",
          type: "text",
          admin: { description: "Formato internacional sin + ni espacios. Ej.: 5491112345678. Vacío oculta el botón." },
          validate: (v: string | null | undefined) => !v || /^\d{10,15}$/.test(v) || "Solo números, de 10 a 15 dígitos.",
        },
        { name: "email", label: "Email de contacto", type: "email" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "instagramUsuario", label: "Usuario de Instagram", type: "text", defaultValue: "@spaziohaus.arg" },
        {
          name: "instagramUrl",
          label: "Enlace de Instagram",
          type: "text",
          defaultValue: "https://www.instagram.com/spaziohaus.arg/",
        },
      ],
    },
    {
      name: "direccion",
      label: "Dirección del taller",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            { name: "calle", label: "Calle y número", type: "text", defaultValue: "Marco Polo 5379" },
            { name: "localidad", label: "Localidad", type: "text", defaultValue: "Caseros" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "provincia", label: "Provincia", type: "text", defaultValue: "Buenos Aires" },
            { name: "codigoPostal", label: "Código postal", type: "text", defaultValue: "B1682" },
          ],
        },
      ],
    },
    {
      name: "contenidoDeEjemplo",
      label: "Mostrar el aviso de contenido de ejemplo",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Destildalo cuando todo el contenido sea real." },
    },
  ],
};
