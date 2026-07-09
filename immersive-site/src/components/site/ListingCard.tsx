import Link from "next/link";
import type { Listing } from "@/lib/content/listings";
import { resolveListingImage } from "@/lib/content/getListings";

const statusColor: Record<Listing["status"], string> = {
  "verfügbar": "text-emerald-300 border-emerald-300/40",
  reserviert: "text-amber-300 border-amber-300/40",
  verkauft: "text-stone-50/50 border-stone-50/20",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/objekte/${listing.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-gold-400/15 bg-royal-900/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={resolveListingImage(listing)}
          alt={listing.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-900/90 via-transparent to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] backdrop-blur ${statusColor[listing.status]}`}
        >
          {listing.status}
        </span>
      </div>
      <div className="p-6">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-gold-300">
          {listing.location}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-stone-50">
          {listing.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-50/60">
          {listing.teaser}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-display text-xl text-gold-300">{listing.price}</span>
          <span className="text-xs text-stone-50/55">
            {listing.area} · {listing.rooms}
          </span>
        </div>
      </div>
    </Link>
  );
}
