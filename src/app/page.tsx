import Link from "next/link";
import { ImmersiveExperience } from "@/components/experience/ImmersiveExperience";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/experience/Counter";
import { SplitReveal } from "@/components/experience/SplitReveal";
import { MagneticButton } from "@/components/experience/MagneticButton";
import { ProcessScroll } from "@/components/experience/ProcessScroll";
import { Marquee } from "@/components/experience/Marquee";
import { getListings } from "@/lib/content/getListings";
import { ROOM_DEFINITIONS } from "@/lib/experience/rooms";
import { keyframeSrc, keyframeById } from "@/lib/experience/keyframes";

const rooms = [
  ROOM_DEFINITIONS.leftRoom,
  ROOM_DEFINITIONS.rightRoom,
  ROOM_DEFINITIONS.foyer,
];

const stats = [
  { value: "1,8", suffix: "Mrd €", label: "vermitteltes Volumen" },
  { value: "320", suffix: "+", label: "verkaufte Objekte" },
  { value: "27", suffix: "Tage", label: "Ø bis zum Notartermin" },
  { value: "98", suffix: "%", label: "Weiterempfehlung" },
];

const processItems = [
  { title: "Erstgespräch", text: "Kennenlernen, Zieldefinition und diskrete Objektaufnahme – vor Ort oder virtuell." },
  { title: "Bewertung", text: "Datenbasierte Marktwertanalyse und eine maßgeschneiderte Vermarktungsstrategie." },
  { title: "Inszenierung", text: "Cinematic 3D-Touren, Fotografie und Home Staging, die Emotion erzeugen." },
  { title: "Vermarktung", text: "Zielgerichtete Ansprache vorgeprüfter Interessenten – öffentlich oder off-market." },
  { title: "Verhandlung", text: "Verhandlungsstarke Begleitung mit klarem Blick auf Ihren Bestpreis." },
  { title: "Übergabe", text: "Notartermin, Schlüsselübergabe und ein Abschluss, der in Erinnerung bleibt." },
];

const marqueeItems = [
  "Penthäuser",
  "Stadtvillen",
  "Anlageobjekte",
  "Off-Market",
  "Altbau-Juwelen",
  "Neubau-Erstbezug",
];

export default async function Home() {
  const listings = await getListings();
  return (
    <>
      <ImmersiveExperience listings={listings} />

      {/* Manifest / Positionierung */}
      <section className="relative overflow-hidden bg-[#050b18] py-32">
        <div className="shell">
          <span className="eyebrow">Vida Immobilien — München</span>
          <SplitReveal
            as="h2"
            text="Immobilien, die man nicht besichtigt."
            className="mt-6 block display-xl text-stone-50"
          />
          <SplitReveal
            as="h2"
            text="Sondern betritt."
            className="mt-1 block display-xl text-outline"
            delay={0.2}
          />
          <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1fr]">
            <p className="max-w-xl text-lg leading-relaxed text-stone-50/72">
              Wir verbinden Münchner Marktexpertise mit einer Inszenierung, die
              Ihrem Objekt gerecht wird. Vom ersten Portal bis zum letzten Rahmen
              führen wir Käufer und Eigentümer durch ein Erlebnis, das bleibt.
            </p>
            <div className="flex flex-wrap items-start gap-4 lg:justify-end">
              <MagneticButton href="/objekte" className="btn-gold">
                Aktuelle Objekte
              </MagneticButton>
              <MagneticButton href="/verkauf" className="btn-ghost">
                Immobilie verkaufen
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-gold-400/15 bg-[#04070e] py-8">
        <Marquee items={marqueeItems} />
      </section>

      {/* Kennzahlen mit Slot-Machine-Countern */}
      <section className="relative bg-[#050b18] py-24">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="flex items-baseline gap-1.5 font-display text-gold-300">
                <Counter value={s.value} className="text-5xl md:text-6xl" />
                <span className="text-xl text-gold-300/80 md:text-2xl">{s.suffix}</span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-stone-50/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gepinnte Prozess-Sequenz */}
      <ProcessScroll
        eyebrow="So arbeiten wir"
        heading="Vom Erstgespräch bis zur Übergabe"
        items={processItems}
      />

      {/* Drei Räume */}
      <section className="relative bg-[#050b18] py-28">
        <div className="shell">
          <span className="eyebrow">Drei Räume, ein Haus</span>
          <SplitReveal
            as="h2"
            text="Finden Sie Ihren Weg durch das Vida-Haus"
            className="mt-4 block max-w-3xl font-display text-4xl text-stone-50 md:text-5xl"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {rooms.map((room, i) => (
              <Reveal key={room.id} delay={i * 0.12}>
                <Link
                  href={room.ctaHref}
                  className="group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-gold-400/15"
                  style={{ minHeight: "440px" }}
                >
                  <img
                    src={keyframeSrc(keyframeById(room.keyframeId).file)}
                    alt={room.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-900/95 via-royal-900/25 to-transparent" />
                  <div className="relative p-7">
                    <span className="eyebrow">{room.tagline}</span>
                    <h3 className="mt-3 font-display text-3xl text-stone-50">
                      {room.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-50/70">
                      {room.purpose}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-gold-300">
                      {room.ctaLabel} <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#040912] py-32">
        <img
          src={keyframeSrc("K18-endframe.jpg")}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040912] via-[#040912]/85 to-[#040912]/60" />
        <div className="shell relative text-center">
          <span className="eyebrow justify-center">Ihr Auftritt</span>
          <SplitReveal
            as="h2"
            text="Lassen Sie uns Ihre Immobilie inszenieren."
            className="mx-auto mt-4 block max-w-3xl font-display text-4xl text-stone-50 md:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-xl text-lg text-stone-50/70">
            Kostenlose Bewertung, diskrete Beratung und eine Vermarktung, die
            Ihrem Objekt die Bühne gibt, die es verdient.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/kontakt" className="btn-gold">
              Beratung anfragen
            </MagneticButton>
            <MagneticButton href="/verkauf" className="btn-ghost">
              Bewertung starten
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
