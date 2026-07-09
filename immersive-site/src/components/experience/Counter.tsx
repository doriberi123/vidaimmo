"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slot-Machine-Zähler im terminal-industries-Stil: jede Ziffer ist ein
 * vertikaler 0–9-Reel, der beim Sichtbarwerden auf den Zielwert rollt.
 * Nicht-Ziffern (Komma, %, Buchstaben, Leerzeichen) bleiben statisch.
 */
export function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const chars = value.split("");
  let digitOrder = 0;

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {chars.map((ch, i) => {
        if (/\d/.test(ch)) {
          const idx = digitOrder++;
          return (
            <Digit key={i} target={Number(ch)} play={play} delay={idx * 0.08} />
          );
        }
        return (
          <span key={i} style={{ whiteSpace: "pre" }}>
            {ch}
          </span>
        );
      })}
    </span>
  );
}

function Digit({
  target,
  play,
  delay,
}: {
  target: number;
  play: boolean;
  delay: number;
}) {
  // Zwei volle Umdrehungen + Zielziffer für den "Roll"-Effekt.
  const offset = play ? 20 + target : 0;
  return (
    <span
      style={{
        display: "inline-block",
        height: "1em",
        overflow: "hidden",
        verticalAlign: "bottom",
        lineHeight: 1,
      }}
      aria-hidden
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${offset}em)`,
          transition: `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)`,
          transitionDelay: `${delay}s`,
        }}
      >
        {Array.from({ length: 31 }).map((_, n) => (
          <span key={n} style={{ height: "1em", lineHeight: 1 }}>
            {n % 10}
          </span>
        ))}
      </span>
    </span>
  );
}
