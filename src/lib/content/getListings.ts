import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { LISTINGS, listingImage, type Listing } from "./listings";

type SanityListing = {
  slug: string;
  title: string;
  location?: string;
  price?: string;
  area?: string;
  rooms?: string;
  status?: Listing["status"];
  teaser?: string;
  hero?: unknown;
};

const LIST_QUERY = `*[_type == "listing"] | order(_createdAt desc){
  "slug": slug.current, title, location, price, area, rooms, status, teaser, hero
}`;

function mapSanity(doc: SanityListing): Listing {
  const heroUrl = doc.hero ? urlForImage(doc.hero) : null;
  return {
    slug: doc.slug,
    title: doc.title,
    location: doc.location ?? "München",
    price: doc.price ?? "auf Anfrage",
    area: doc.area ?? "—",
    rooms: doc.rooms ?? "—",
    status: doc.status ?? "verfügbar",
    teaser: doc.teaser ?? "",
    // Fällt auf einen Keyframe zurück, falls kein Sanity-Bild vorhanden ist.
    keyframe: heroUrl ? "" : "K11-penthouse-frauenkirche.jpg",
    // heroUrl wird über resolveImage() bevorzugt (siehe unten).
    ...(heroUrl ? { _heroUrl: heroUrl } : {}),
  } as Listing & { _heroUrl?: string };
}

/**
 * Liefert Objekte aus Sanity, falls konfiguriert – sonst statische Fallback-Daten.
 */
export async function getListings(): Promise<Listing[]> {
  if (!sanityClient) return LISTINGS;
  try {
    const docs = await sanityClient.fetch<SanityListing[]>(LIST_QUERY);
    if (!docs || docs.length === 0) return LISTINGS;
    return docs.map(mapSanity);
  } catch {
    return LISTINGS;
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const all = await getListings();
  return all.find((l) => l.slug === slug) ?? null;
}

/** Bildquelle auflösen: Sanity-URL bevorzugt, sonst Keyframe. */
export function resolveListingImage(listing: Listing): string {
  const withHero = listing as Listing & { _heroUrl?: string };
  if (withHero._heroUrl) return withHero._heroUrl;
  return listingImage(listing.keyframe);
}
