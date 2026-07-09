import { keyframeSrc } from "@/lib/experience/keyframes";

type PageShellProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  heroKeyframe?: string;
  children: React.ReactNode;
};

/** Standard-Seitenkopf für alle Unterseiten mit cinematic Hero. */
export function PageShell({
  eyebrow,
  title,
  intro,
  heroKeyframe,
  children,
}: PageShellProps) {
  return (
    <main className="relative min-h-dvh bg-[#050b18]">
      <section className="relative flex min-h-[62vh] items-end overflow-hidden">
        {heroKeyframe && (
          <>
            <img
              src={keyframeSrc(heroKeyframe)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(5,11,24,0.72) 0%, rgba(5,11,24,0.35) 40%, rgba(5,11,24,0.94) 100%)",
              }}
            />
          </>
        )}
        <div className="shell relative z-10 pb-14 pt-32">
          <span className="eyebrow reveal-up">{eyebrow}</span>
          <h1
            className="reveal-up mt-4 max-w-3xl font-display text-stone-50"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)", animationDelay: "0.08s" }}
          >
            {title}
          </h1>
          {intro && (
            <p
              className="reveal-up mt-5 max-w-2xl text-lg leading-relaxed text-stone-50/72"
              style={{ animationDelay: "0.16s" }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>
      {children}
    </main>
  );
}
