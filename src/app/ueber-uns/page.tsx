import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { keyframeSrc } from "@/lib/experience/keyframes";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Vida Immobilien – Münchner Maklerhaus für exklusive Wohn- und Anlageimmobilien. Werte, Team und Philosophie.",
};

const values = [
  {
    title: "Diskretion",
    text: "Vertraulichkeit ist kein Versprechen, sondern unsere Arbeitsweise. Off-Market als Standard.",
  },
  {
    title: "Inszenierung",
    text: "Wir erzählen Objekte als Erlebnis – cinematic, präzise, emotional.",
  },
  {
    title: "Marktnähe",
    text: "Tiefe Kenntnis des Münchner Marktes, von Lehel bis Grünwald.",
  },
];

const team = [
  { name: "Dr. Vida Sommer", role: "Gründerin & Geschäftsführung", frame: "K10-logo-closeup.jpg" },
  { name: "Julian Berg", role: "Leitung Verkauf", frame: "K08-logo-wand.jpg" },
  { name: "Marlene Voss", role: "Kaufberatung", frame: "K14-person-am-fenster.jpg" },
];

export default function UeberUnsPage() {
  return (
    <PageShell
      eyebrow="Das Haus hinter der Journey"
      title="Über Vida Immobilien"
      intro="Ein Münchner Maklerhaus, das Immobilien nicht verwaltet, sondern inszeniert. Gegründet aus der Überzeugung, dass außergewöhnliche Objekte eine außergewöhnliche Bühne verdienen."
      heroKeyframe="K05-foyer-totale.jpg"
    >
      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">Unsere Philosophie</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-stone-50 md:text-5xl">
              Zwischen Portal und Penthouse liegt Vertrauen
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-50/70">
              Jede Immobilie hat eine Geschichte. Unsere Aufgabe ist es, diese
              Geschichte so zu erzählen, dass die richtigen Menschen sie hören –
              und den Weg von der ersten Tür bis zur Schlüsselübergabe als etwas
              Besonderes erleben.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-stone-50/70">
              Dafür verbinden wir klassische Maklerkunst mit modernster
              Inszenierung: 3D-Touren, cinematic Bildsprache und ein Netzwerk,
              das in München seinesgleichen sucht.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="relative overflow-hidden rounded-3xl border border-gold-400/20">
            <img
              src={keyframeSrc("K06-foyer-ende.jpg")}
              alt="Vida Foyer im Abendlicht"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-[#040912] py-24">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Wofür wir stehen</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">Drei Werte</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="glass-card p-8">
                <h3 className="font-display text-2xl text-gold-300">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-50/68">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050b18] py-24">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Menschen bei Vida</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">Ihr Team</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="group overflow-hidden rounded-2xl border border-gold-400/15">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={keyframeSrc(m.frame)}
                      alt={m.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-900/95 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-display text-2xl text-stone-50">{m.name}</p>
                      <p className="text-sm text-gold-300">{m.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/kontakt" className="btn-gold">Lernen Sie uns kennen</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
