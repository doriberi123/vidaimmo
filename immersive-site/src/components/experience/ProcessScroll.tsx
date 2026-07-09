"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ProcessItem = { title: string; text: string };

/**
 * Gepinnte, scroll-gesteuerte Prozess-Sequenz im terminal-industries-Stil:
 * Links eine große rollende Index-Zahl + Fortschrittsbalken, rechts die
 * Liste – der aktive Schritt wird hervorgehoben, während man scrollt.
 */
export function ProcessScroll({
  eyebrow,
  heading,
  items,
}: {
  eyebrow: string;
  heading: string;
  items: ProcessItem[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${items.length * 0.85 * window.innerHeight}`,
        pin: pin,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (fillRef.current) {
            fillRef.current.style.transform = `scaleX(${p})`;
          }
          const idx = Math.min(items.length - 1, Math.floor(p * items.length));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <div ref={rootRef} className="relative bg-[#04070e]">
      <div
        ref={pinRef}
        className="flex min-h-dvh items-center overflow-hidden py-24"
      >
        <div className="shell grid w-full gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
          {/* Index + Progress */}
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-stone-50 md:text-6xl">
              {heading}
            </h2>
            <div className="mt-10 flex items-end gap-5">
              <div
                className="font-display leading-none text-gold-300"
                style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
              >
                <span style={{ display: "inline-block", height: "1em", overflow: "hidden" }}>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      transform: `translateY(-${active}em)`,
                      transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {items.map((_, n) => (
                      <span key={n} style={{ height: "1em", lineHeight: 1 }}>
                        {String(n + 1).padStart(2, "0")}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
              <span className="mb-3 text-sm text-stone-50/45">
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-8 h-px w-full max-w-xs bg-white/12">
              <div
                ref={fillRef}
                className="h-px bg-gold-300"
                style={{
                  width: "100%",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  willChange: "transform",
                }}
              />
            </div>
          </div>

          {/* Liste */}
          <ol className="space-y-3">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.title}
                  className="border-b border-white/10 py-5"
                  style={{
                    opacity: isActive ? 1 : 0.32,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-gold-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-stone-50 md:text-3xl">
                        {item.title}
                      </h3>
                      <p
                        className="max-w-xl text-sm leading-relaxed text-stone-50/70"
                        style={{
                          maxHeight: isActive ? "8rem" : "0",
                          marginTop: isActive ? "0.6rem" : "0",
                          overflow: "hidden",
                          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
