"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Globaler Smooth-Scroll (Lenis) mit GSAP-ScrollTrigger-Synchronisation.
 * Erzeugt das "buttery" Momentum-Gefühl im Stil von terminal-industries.com
 * und hält ScrollTrigger-getriebene Szenen (Video-Scrub, Pins) exakt im Takt.
 *
 * Lenis v1 scrollt das echte Window, daher genügt ScrollTrigger.update()
 * auf dem Lenis-Scroll-Event – natives Pinning funktioniert unverändert.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
