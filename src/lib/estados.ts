export const ESTADOS = [
  { id: "nueva", nombre: "Nueva" },
  { id: "en-presupuesto", nombre: "En presupuesto" },
  { id: "presupuestada", nombre: "Presupuestada" },
  { id: "ganada", nombre: "Ganada" },
  { id: "perdida", nombre: "Perdida" },
] as const;

export type Estado = (typeof ESTADOS)[number]["id"];

export function esEstado(v: unknown): v is Estado {
  return ESTADOS.some((e) => e.id === v);
}
