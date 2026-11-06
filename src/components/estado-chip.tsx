import { Chip } from "@heroui/react";
import { ESTADOS, type Estado } from "@/lib/estados";

const colorEstado: Record<Estado, "accent" | "default" | "success" | "danger" | "warning"> = {
  nueva: "accent",
  "en-presupuesto": "warning",
  presupuestada: "default",
  ganada: "success",
  perdida: "danger",
};

export function EstadoChip({ estado }: { estado: Estado }) {
  const nombre = ESTADOS.find((e) => e.id === estado)?.nombre ?? estado;
  return (
    <Chip size="sm" variant="soft" color={colorEstado[estado]}>
      {nombre}
    </Chip>
  );
}
