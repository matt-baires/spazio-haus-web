"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Hace aparecer con un movimiento suave los elementos con `data-revelar` cuando llegan a la pantalla.
 * - Lo que ya se ve al cargar queda visible de entrada (sin parpadeo).
 * - En cada scroll se muestra todo lo que está a la vista o más arriba, así un salto
 *   (tecla Fin, un link al final) nunca deja secciones ocultas.
 * - También toma lo que aparece después (navegación o contenido que se carga más tarde).
 * Con "reducir movimiento" no hace nada y todo queda visible.
 */
export function Revelar() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raiz = document.documentElement;

    const revisar = () => {
      const limite = window.innerHeight * 0.92;
      document.querySelectorAll<HTMLElement>("[data-revelar]:not(.visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < limite) el.classList.add("visible");
      });
    };

    // Primera pasada antes de activar el modo animado: lo visible no parpadea.
    if (!raiz.classList.contains("animar")) {
      revisar();
      raiz.classList.add("animar");
    } else {
      // Navegación entre páginas: el contenido nuevo entra animado.
      requestAnimationFrame(revisar);
    }

    let pendiente = false;
    const alMover = () => {
      if (pendiente) return;
      pendiente = true;
      setTimeout(() => {
        pendiente = false;
        revisar();
      }, 60);
    };
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);

    const mutaciones = new MutationObserver(alMover);
    mutaciones.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      mutaciones.disconnect();
    };
  }, [pathname]);

  return null;
}
