import { NextResponse, type NextRequest } from "next/server";

/**
 * Protege la bandeja de consultas con usuario y contraseña (Basic Auth).
 * Usuario: admin · Contraseña: variable de entorno ADMIN_PASSWORD (en Vercel).
 */
function iguales(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function proxy(request: NextRequest) {
  const clave = process.env.ADMIN_PASSWORD;
  if (!clave) {
    return new NextResponse("La bandeja no está configurada: falta ADMIN_PASSWORD.", { status: 503 });
  }

  const auth = request.headers.get("authorization") ?? "";
  if (auth.startsWith("Basic ")) {
    try {
      const [usuario, ...resto] = atob(auth.slice(6)).split(":");
      if (iguales(usuario, "admin") && iguales(resto.join(":"), clave)) return NextResponse.next();
    } catch {
      // credenciales mal formadas: se vuelven a pedir
    }
  }

  return new NextResponse("Acceso restringido", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Spazio Haus - Bandeja", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
