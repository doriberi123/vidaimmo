export type RoomId = "foyer" | "leftRoom" | "rightRoom";

export type RoomDefinition = {
  id: RoomId;
  title: string;
  tagline: string;
  purpose: string;
  ctaLabel: string;
  ctaHref: string;
};

export const ROOM_DEFINITIONS: Record<RoomId, RoomDefinition> = {
  foyer: {
    id: "foyer",
    title: "Foyer",
    tagline: "Willkommen bei Vida Immobilien",
    purpose:
      "Zentrale Drehscheibe der Experience. Von hier aus startet die Besichtigung in die Seitenraeume.",
    ctaLabel: "Expose anfordern",
    ctaHref: "#kontakt",
  },
  leftRoom: {
    id: "leftRoom",
    title: "Kaufberatung",
    tagline: "Der linke Raum fuer Suchende",
    purpose:
      "Suchauftrag, Objektauswahl und diskrete Begleitung bis zur Schluesseluebergabe.",
    ctaLabel: "Suchprofil starten",
    ctaHref: "#kaufberatung",
  },
  rightRoom: {
    id: "rightRoom",
    title: "Verkauf & Bewertung",
    tagline: "Der rechte Raum fuer Eigentuemer",
    purpose:
      "Marktgerechte Bewertung, exklusive Vermarktung und verhandlungsstarker Verkaufsprozess.",
    ctaLabel: "Bewertung anfragen",
    ctaHref: "#verkauf",
  },
};

export const ROOM_SEQUENCE: RoomId[] = ["foyer", "leftRoom", "rightRoom"];
