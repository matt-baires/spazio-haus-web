import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { es } from "@payloadcms/translations/languages/es";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { site } from "./lib/site";
import { blobPrivado } from "./payload/almacenamiento";
import { Articulos, Consultas, Materiales, Medios, Obras, Preguntas, Servicios, Usuarios } from "./payload/colecciones";
import { Sitio } from "./payload/globales";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// En Vercel, Neon se conectó con el prefijo SPAZIOH_.
const databaseUrl = process.env.SPAZIOH_DATABASE_URL || process.env.DATABASE_URL || "";

export default buildConfig({
  serverURL: site.url,
  // Dominios desde los que se puede usar el panel (la URL vieja sigue activa).
  csrf: [site.url, "https://spazio-haus-web.vercel.app"],
  // Emails (recuperar contraseña) con Resend. Sin RESEND_API_KEY, Payload los escribe en la consola.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM || "onboarding@resend.dev",
        defaultFromName: "Spazio Haus",
      })
    : undefined,
  admin: {
    user: Usuarios.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · Spazio Haus", description: "Panel de contenidos de Spazio Haus" },
    dateFormat: "d/M/yyyy HH:mm",
  },
  i18n: { supportedLanguages: { es }, fallbackLanguage: "es" },
  collections: [Consultas, Obras, Servicios, Materiales, Preguntas, Articulos, Medios, Usuarios],
  globals: [Sitio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: databaseUrl },
    migrationDir: path.resolve(dirname, "migrations"),
    push: false,
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        medios: { adapter: blobPrivado("medios"), disableLocalStorage: true },
      },
    }),
  ],
  telemetry: false,
});
