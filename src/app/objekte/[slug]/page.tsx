import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { LISTINGS } from "@/lib/content/listings";
import { getListingBySlug, resolveListingImage } from "@/lib/content/getListings";
import { keyframeSrc } from "@/lib/experience/keyframes";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Objekt nicht gefunden" };
  return {
    title: listing.title,
    description: listing.teaser,
  };
}

const galleryFrames = [
  "K09-lounge-schraeg.jpg",
  "K11-penthouse-frauenkirche.jpg",
  "K05-foyer-totale.jpg",
];

export default async function ObjektDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const facts = [
    { label: "Preis", value: listing.price },
    { label: "Wohnfläche", value: listing.area },
    { label: "Zimmer", value: listing.rooms },
    { label: "Lage", value: listing.location },
    { label: "Status", value: listing.status },
  ];

  return (
    <main className="min-h-dvh bg-[#050b18]">
      <section className="relative flex min-h-[72vh] items-end overflow-hidden">
        <img
          src={resolveListingImage(listing)}
          alt={listing.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,11,24,0.6) 0%, rgba(5,11,24,0.2) 45%, rgba(5,11,24,0.96) 100%)",
          }}
        />
        <div className="shell relative z-10 pb-14 pt-32">
          <Link
            href="/objekte"
            className="text-sm text-stone-50/70 transition-colors hover:text-gold-300"
          >
            ← Zurück zu den Objekten
          </Link>
          <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-gold-300">
            {listing.location}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-stone-50" style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}>
            {listing.title}
          </h1>
          <p className="mt-4 font-display text-3xl text-gold-300">{listing.price}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <p className="text-xl leading-relaxed text-stone-50/80">{listing.teaser}</p>
            <p className="mt-6 leading-relaxed text-stone-50/65">
              Dieses Objekt vereint Lage, Architektur und Diskretion auf höchstem
              Niveau. Vereinbaren Sie eine private Besichtigung – gern auch als
              cinematic 3D-Tour, bevor Sie vor Ort sind.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {galleryFrames.map((f) => (
                <div key={f} className="overflow-hidden rounded-xl border border-gold-400/15">
                  <img
                    src={keyframeSrc(f)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-card p-8">
              <h3 className="font-display text-2xl text-stone-50">Eckdaten</h3>
              <dl className="mt-5 space-y-3.5">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <dt className="text-sm text-stone-50/55">{f.label}</dt>
                    <dd className="text-sm text-stone-50/90 capitalize">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/kontakt" className="btn-gold mt-7 w-full justify-center">
                Besichtigung anfragen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-gold-400/15 bg-[#040912] py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Interesse?</span>
            <h2 className="mt-4 font-display text-4xl text-stone-50 md:text-5xl">
              Private Besichtigung anfragen
            </h2>
            <p className="mt-5 max-w-md text-stone-50/70">
              Nennen Sie uns Ihren Wunschtermin. Wir organisieren eine diskrete
              Besichtigung – persönlich oder virtuell.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ContactForm variant="kaufberatung" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
