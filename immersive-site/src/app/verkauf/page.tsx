import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Verkauf & Bewertung",
  description:
    "Marktgerechte Bewertung und exklusive Vermarktung Ihrer Immobilie in München – cinematic inszeniert, verhandlungsstark begleitet.",
};

const pillars = [
  {
    title: "Bewertung in 48 Stunden",
    text: "Datenbasiert, diskret und kostenfrei. Sie erhalten eine belastbare Einschätzung des Marktwerts.",
  },
  {
    title: "Cinematic Vermarktung",
    text: "3D-Touren, Home Staging und Bildsprache, die Ihr Objekt zur Bühne macht – so wie diese Website.",
  },
  {
    title: "Qualifizierte Käufer",
    text: "Vorgeprüfte, bonitätsstarke Interessenten statt Besichtigungstourismus.",
  },
  {
    title: "Verhandlung & Notar",
    text: "Wir begleiten bis zur Beurkundung – verhandlungsstark und rechtssicher.",
  },
];

const timeline = [
  { n: "01", title: "Erstgespräch", text: "Kennenlernen, Zieldefinition, Objektaufnahme." },
  { n: "02", title: "Bewertung", text: "Marktwertanalyse & Vermarktungsstrategie." },
  { n: "03", title: "Inszenierung", text: "Fotografie, 3D-Tour, Exposé, Home Staging." },
  { n: "04", title: "Vermarktung", text: "Zielgerichtete Ansprache, Besichtigungen." },
  { n: "05", title: "Abschluss", text: "Verhandlung, Notartermin, Übergabe." },
];

export default function VerkaufPage() {
  return (
    <PageShell
      eyebrow="Der Raum für Eigentümer"
      title="Verkauf & Bewertung"
      intro="Der rechte Raum unseres Hauses. Hier wird aus Ihrer Immobilie ein Auftritt – vom leeren Rahmen bis zur beurkundeten Übergabe."
      heroKeyframe="K16-whiteboard-rahmen.jpg"
    >
      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="glass-card p-7">
              <h3 className="font-display text-xl text-stone-50">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-50/68">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#040912] py-24">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Der Vida-Prozess</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Fünf Schritte zum bestmöglichen Verkauf
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {timeline.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-gold-400/15 bg-royal-900/40 p-6">
                  <p className="font-display text-4xl text-gold-400/40">{t.n}</p>
                  <h3 className="mt-3 font-display text-xl text-stone-50">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-50/65">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Kostenlose Bewertung</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Was ist Ihre Immobilie wert?
            </h2>
            <p className="mt-5 max-w-md text-stone-50/70">
              Fordern Sie eine unverbindliche, diskrete Marktwerteinschätzung an.
              Innerhalb von 48 Stunden erhalten Sie eine erste Rückmeldung.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm variant="verkauf" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
