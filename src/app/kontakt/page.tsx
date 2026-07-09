import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Vida Immobilien in München – für Kauf, Verkauf, Bewertung oder eine diskrete Beratung.",
};

const contacts = [
  { label: "Telefon", value: "+49 89 000 000 00", href: "tel:+498900000000" },
  { label: "E-Mail", value: "kontakt@vida-immobilien.de", href: "mailto:kontakt@vida-immobilien.de" },
  { label: "Adresse", value: "Maximilianstraße 1, 80539 München" },
  { label: "Öffnungszeiten", value: "Mo–Fr 9–19 Uhr · Termine nach Vereinbarung" },
];

export default function KontaktPage() {
  return (
    <PageShell
      eyebrow="Sprechen wir"
      title="Kontakt"
      intro="Ob Kauf, Verkauf oder eine erste diskrete Einschätzung – wir sind für Sie da. Nutzen Sie das Formular oder erreichen Sie uns direkt."
      heroKeyframe="K18-endframe.jpg"
    >
      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Direkt erreichbar</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Vida Immobilien München
            </h2>
            <dl className="mt-8 space-y-6">
              {contacts.map((c) => (
                <div key={c.label} className="border-b border-white/10 pb-5">
                  <dt className="text-xs uppercase tracking-[0.24em] text-gold-300">
                    {c.label}
                  </dt>
                  <dd className="mt-1.5 text-lg text-stone-50/85">
                    {c.href ? (
                      <a href={c.href} className="transition-colors hover:text-gold-300">
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm variant="kontakt" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
