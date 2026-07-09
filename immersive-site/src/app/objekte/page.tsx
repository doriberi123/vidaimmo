import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ListingCard } from "@/components/site/ListingCard";
import { getListings } from "@/lib/content/getListings";

export const metadata: Metadata = {
  title: "Objekte",
  description:
    "Ausgewählte Immobilien von Vida Immobilien in München – Penthouses, Residenzen und Lofts in besten Lagen.",
};

export default async function ObjektePage() {
  const listings = await getListings();
  return (
    <PageShell
      eyebrow="Kuratierte Auswahl"
      title="Objekte"
      intro="Der leere Rahmen aus der Journey – nun gefüllt. Eine Auswahl exklusiver Immobilien, diskret vermittelt in München und Umgebung."
      heroKeyframe="K17-whiteboard-totale.jpg"
    >
      <section className="bg-[#050b18] py-24">
        <div className="shell">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l, i) => (
              <Reveal key={l.slug} delay={i * 0.08}>
                <ListingCard listing={l} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="glass-card mt-16 flex flex-col items-center gap-4 p-10 text-center">
              <span className="eyebrow justify-center">Off-Market</span>
              <h2 className="max-w-2xl font-display text-3xl text-stone-50 md:text-4xl">
                Nicht jedes Objekt inserieren wir öffentlich.
              </h2>
              <p className="max-w-xl text-stone-50/70">
                Ein Teil unserer schönsten Immobilien wird ausschließlich diskret
                vermittelt. Hinterlegen Sie Ihr Suchprofil für exklusiven Zugang.
              </p>
              <a href="/kaufberatung" className="btn-gold mt-2">Suchprofil hinterlegen</a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
