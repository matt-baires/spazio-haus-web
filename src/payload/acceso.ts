import type { Access, FieldAccess } from "payload";

type ConRol = { rol?: string | null } | null | undefined;

export const conSesion: Access = ({ req }) => Boolean(req.user);
export const esAdmin: Access = ({ req }) => (req.user as ConRol)?.rol === "admin";
export const esAdminCampo: FieldAccess = ({ req }) => (req.user as ConRol)?.rol === "admin";
export const publico: Access = () => true;

/** Lectura pública solo de lo publicado; con sesión, también los borradores. */
export const publicadoOSesion: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
