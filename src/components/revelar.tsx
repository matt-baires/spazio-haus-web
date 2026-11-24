"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Hace aparecer con un movimiento suave los elementos con `data-revelar` cuando entran en pantalla.
 * Los que ya se ven al cargar quedan visibles de entrada (sin parpadeo); los que llegan después
 * (navegación o contenido que se carga más tarde) también se observan.
 * Con "reducir movimiento" no hace nada y todo queda visible.
 */
export function Revelar() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("visible");
          observador.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const registrar = (raiz: ParentNode) => {
      raiz.querySelectorAll<HTMLElement>("[data-revelar]:not(.visible)").forEach((el) => {
        // Lo que ya está en pantalla se muestra sin animar, para que no parpadee.
        if (!document.documentElement.classList.contains("animar") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("visible");
        } else {
          observador.observe(el);
        }
      });
    };

    registrar(document);
    document.documentElement.classList.add("animar");

    const mutaciones = new MutationObserver((cambios) => {
      for (const c of cambios) c.addedNodes.forEach((n) => n instanceof Element && registrar(n.parentNode ?? n));
    });
    mutaciones.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mutaciones.disconnect();
    };
  }, [pathname]);

  return null;
}
