import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { ListingCard } from "@/components/site/ListingCard";
import { getListings } from "@/lib/content/getListings";

export const metadata: Metadata = {
  title: "Kaufberatung",
  description:
    "Diskrete Kaufbegleitung für exklusive Immobilien in München – Suchprofil, Objektauswahl und Verhandlung aus einer Hand.",
};

const services = [
  {
    title: "Persönliches Suchprofil",
    text: "Wir übersetzen Ihre Wünsche in ein präzises Suchprofil – Lage, Architektur, Rendite und Diskretion inklusive.",
  },
  {
    title: "Off-Market-Zugang",
    text: "Zugang zu Objekten, die nie öffentlich inseriert werden. Ihr Vorteil in einem engen Markt.",
  },
  {
    title: "Begleitung bis zur Übergabe",
    text: "Von der Besichtigung über die Finanzierung bis zum Notartermin – ein Ansprechpartner, ein roter Faden.",
  },
];

export default async function KaufberatungPage() {
  const listings = (await getListings()).slice(0, 4);
  return (
    <PageShell
      eyebrow="Der Raum für Suchende"
      title="Kaufberatung"
      intro="Der linke Raum unseres Hauses. Hier beginnt Ihre Suche – strukturiert, diskret und mit Zugang zu Objekten, die andere nicht sehen."
      heroKeyframe="K14-person-am-fenster.jpg"
    >
      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="glass-card p-8">
              <h3 className="font-display text-2xl text-stone-50">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-50/68">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#040912] py-24">
        <div className="shell">
          <Reveal>
            <span className="eyebrow">Passend zu Ihrem Profil</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Aktuelle Objekte für Käufer
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.08}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/objekte" className="btn-ghost">Alle Objekte ansehen</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#050b18] py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Suchprofil starten</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Erzählen Sie uns, wonach Sie suchen
            </h2>
            <p className="mt-5 max-w-md text-stone-50/70">
              Wir melden uns innerhalb von 24 Stunden mit einer ersten
              kuratierten Auswahl – abgestimmt auf Ihr Profil.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm variant="kaufberatung" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
