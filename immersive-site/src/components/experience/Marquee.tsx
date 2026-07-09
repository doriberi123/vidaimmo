"use client";

/**
 * Endlos laufendes Lauftext-Band (Marquee) – reines CSS, dupliziert den
 * Inhalt für den nahtlosen Loop.
 */
export function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const content = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className={`marquee__track ${reverse ? "marquee__track--rev" : ""}`}>
        {content.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
