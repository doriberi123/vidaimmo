export type Listing = {
  slug: string;
  title: string;
  location: string;
  price: string;
  area: string;
  rooms: string;
  status: "verfügbar" | "reserviert" | "verkauft";
  keyframe: string;
  teaser: string;
};

/**
 * Statische Objektdaten – Fallback, wenn kein Sanity-Projekt konfiguriert ist.
 * Bildquellen nutzen die vorhandenen Keyframes als edle Platzhalter.
 */
export const LISTINGS: Listing[] = [
  {
    slug: "penthouse-frauenkirche",
    title: "Penthouse am Blick zur Frauenkirche",
    location: "München · Altstadt-Lehel",
    price: "4.950.000 €",
    area: "268 m²",
    rooms: "4,5 Zimmer",
    status: "verfügbar",
    keyframe: "K11-penthouse-frauenkirche.jpg",
    teaser:
      "Bodentiefe Panoramafenster, Concierge-Service und ein Blick über die Türme Münchens.",
  },
  {
    slug: "lounge-residence",
    title: "Residence mit Lounge-Terrasse",
    location: "München · Bogenhausen",
    price: "3.280.000 €",
    area: "212 m²",
    rooms: "4 Zimmer",
    status: "verfügbar",
    keyframe: "K09-lounge-schraeg.jpg",
    teaser:
      "Offene Wohnlandschaft mit Kamin, Ankleide und uneinsehbarer Dachterrasse.",
  },
  {
    slug: "foyer-suite",
    title: "Beletage-Suite im Gründerzeit-Palais",
    location: "München · Maxvorstadt",
    price: "2.640.000 €",
    area: "184 m²",
    rooms: "3,5 Zimmer",
    status: "reserviert",
    keyframe: "K05-foyer-totale.jpg",
    teaser:
      "Stuck, Fischgrätparkett und eine Lobby, die wie ein privates Foyer wirkt.",
  },
  {
    slug: "gallery-loft",
    title: "Galerie-Loft mit Kunstwand",
    location: "München · Glockenbach",
    price: "1.980.000 €",
    area: "156 m²",
    rooms: "3 Zimmer",
    status: "verfügbar",
    keyframe: "K17-whiteboard-totale.jpg",
    teaser:
      "Doppelte Raumhöhe, Marmorsockel und eine Wand, die nach Ihrer Sammlung ruft.",
  },
];

export const listingImage = (file: string) =>
  `/assets/cinematic-keyframes/${file}`;
