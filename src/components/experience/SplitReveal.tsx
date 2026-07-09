"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Maskierter Text-Reveal: Der Text wird in Wörter zerlegt, die – hinter
 * einer Maske (overflow hidden) – gestaffelt von unten einfahren, sobald
 * das Element in den Viewport scrollt. Terminal-industries-Signature.
 */
export function SplitReveal({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.045,
  delay = 0,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: shown ? "translateY(0)" : "translateY(105%)",
              opacity: shown ? 1 : 0,
              transition:
                "transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.95s ease",
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
