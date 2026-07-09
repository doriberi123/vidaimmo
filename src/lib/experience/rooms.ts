export type RoomId = "foyer" | "leftRoom" | "rightRoom";

export type RoomDefinition = {
  id: RoomId;
  title: string;
  tagline: string;
  purpose: string;
  ctaLabel: string;
  ctaHref: string;
  /** Keyframe, das diesen Raum visuell verankert. */
  keyframeId: string;
};

export const ROOM_DEFINITIONS: Record<RoomId, RoomDefinition> = {
  foyer: {
    id: "foyer",
    title: "Foyer",
    tagline: "Willkommen bei Vida Immobilien",
    purpose:
      "Zentrale Drehscheibe der Experience. Von hier startet die Besichtigung in die Seitenräume – Kaufberatung und Verkauf.",
    ctaLabel: "Exposé anfordern",
    ctaHref: "/kontakt",
    keyframeId: "K05",
  },
  leftRoom: {
    id: "leftRoom",
    title: "Kaufberatung",
    tagline: "Der Raum für Suchende",
    purpose:
      "Suchauftrag, Objektauswahl und diskrete Begleitung bis zur Schlüsselübergabe.",
    ctaLabel: "Suchprofil starten",
    ctaHref: "/kaufberatung",
    keyframeId: "K14",
  },
  rightRoom: {
    id: "rightRoom",
    title: "Verkauf & Bewertung",
    tagline: "Der Raum für Eigentümer",
    purpose:
      "Marktgerechte Bewertung, exklusive Vermarktung und ein verhandlungsstarker Verkaufsprozess.",
    ctaLabel: "Bewertung anfragen",
    ctaHref: "/verkauf",
    keyframeId: "K16",
  },
};

export const ROOM_SEQUENCE: RoomId[] = ["foyer", "leftRoom", "rightRoom"];

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Journey", href: "/" },
  { label: "Objekte", href: "/objekte" },
  { label: "Kaufberatung", href: "/kaufberatung" },
  { label: "Verkauf", href: "/verkauf" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];
