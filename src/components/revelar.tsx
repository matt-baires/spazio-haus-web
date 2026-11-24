"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const sinMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Movimiento del sitio, todo en un lugar:
 * - Scroll suave (Lenis), con la inercia de AYOCIN.
 * - Elementos con `data-revelar` que aparecen al llegar a la pantalla. Lo que ya se ve al cargar
 *   queda visible de entrada, y un salto (tecla Fin, un link al final) nunca deja secciones ocultas.
 * - Fotos con `data-paralaje` que se desplazan más lento que la página.
 * Con "reducir movimiento" no hace nada y todo queda visible y quieto.
 */
export function Revelar() {
  const pathname = usePathname();

  // Scroll suave y parallax: una sola vez para todo el sitio.
  useEffect(() => {
    if (sinMovimiento()) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });

    let cuadro = 0;
    const paralaje = () => {
      const alto = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-paralaje]").forEach((el) => {
        const caja = el.parentElement?.getBoundingClientRect();
        if (!caja || caja.bottom < -100 || caja.top > alto + 100) return;
        // -1 cuando la foto entra por abajo, 1 cuando sale por arriba.
        const avance = (alto / 2 - (caja.top + caja.height / 2)) / (alto / 2 + caja.height / 2);
        const desplazamiento = Math.max(-1, Math.min(1, avance)) * caja.height * 0.08;
        el.style.transform = `translate3d(0, ${desplazamiento.toFixed(1)}px, 0)`;
      });
    };
    const alMover = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(paralaje);
    };
    lenis.on("scroll", alMover);
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    window.addEventListener("sh:paralaje", alMover);
    paralaje();

    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      window.removeEventListener("sh:paralaje", alMover);
      lenis.destroy();
    };
  }, []);

  // Cortina entre secciones para navegadores sin animation-timeline (Safari anterior a 26,
  // Firefox). Donde hay soporte la hace el CSS (globals.css), que es más suave. Activa también
  // con "reducir movimiento" (decisión del dueño, 24/11/2026).
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    let cuadro = 0;
    const mover = () => {
      const alto = window.innerHeight;
      document.querySelectorAll<HTMLElement>(".cortina").forEach((el) => {
        const corrido = parseFloat(el.dataset.cortinaY ?? "0");
        const abajo = el.getBoundingClientRect().bottom - corrido;
        const avance = Math.max(0, Math.min(1, (alto - abajo) / alto));
        const y = avance * alto * 0.45;
        el.dataset.cortinaY = String(y);
        el.style.transform = avance > 0 ? `translate3d(0, ${y.toFixed(1)}px, 0)` : "";
        el.style.setProperty("--sombra", (avance * 0.6).toFixed(3));
      });
    };
    const alMover = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(mover);
    };
    mover();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [pathname]);

  // Apariciones: se rearma en cada página.
  useEffect(() => {
    if (sinMovimiento()) return;
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
    // Ubica las fotos con parallax de la página nueva sin esperar al primer scroll.
    window.dispatchEvent(new Event("sh:paralaje"));

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

    const mutaciones = new MutationObserver(alMover);
    mutaciones.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", alMover);
      mutaciones.disconnect();
    };
  }, [pathname]);

  return null;
}
