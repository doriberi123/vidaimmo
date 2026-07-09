/**
 * Video-Timeline der cinematic Journey.
 *
 * Die 3 Clips bilden zusammen die durchgehende 3D-Fahrt K01 -> K18 ab.
 * Aktuell: die von Higgsfield gerenderten Master-Clips (Fallback/Basis).
 *
 * DROP-IN für frisch generierte Higgsfield-Clips:
 * Sobald neue Clips vorliegen, einfach `src` hier austauschen
 * (z. B. "/assets/vida-clip-01.mp4"). Alles Weitere bleibt unverändert.
 */
export type ClipDefinition = {
  id: string;
  src: string;
  /** Erste N Sekunden überspringen (Intro-Artefakte). */
  skipStart: number;
  /** Keyframe-IDs, die dieser Clip abdeckt (nur zur Doku/Debug). */
  covers: string[];
  label: string;
};

export const CLIPS: ClipDefinition[] = [
  {
    id: "clip-01-entry",
    src: "/assets/VIDA_LOBBY_V2_SCROLL.mp4",
    skipStart: 0.4,
    covers: ["K01", "K02", "K03", "K04", "K05", "K06"],
    label: "Portal & Foyer",
  },
  {
    id: "clip-02-passage",
    src: "/assets/hf_20260515_190916_e335e8ef-1dcd-4b5f-ae12-a340cec6ec55_SCROLL.mp4",
    skipStart: 0,
    covers: ["K07", "K08", "K09", "K10", "K11", "K12"],
    label: "Logo-Wand & Penthouse",
  },
  {
    id: "clip-03-gallery",
    src: "/assets/hf_20260528_223739_7c229451-3f28-4050-b5ba-bc743e362b23_SCROLL.mp4",
    skipStart: 0,
    covers: ["K13", "K14", "K15", "K16", "K17", "K18"],
    label: "Korridor & Whiteboard-Endframe",
  },
];

/**
 * Scroll-Höhe (vh) der frei scrubbaren Section 1 (Video 1: Tor -> Foyer-Ende).
 * Nur diese Strecke wird 1:1 durch normales Scrollen gesteuert.
 */
export const BASE_SCROLL_VH = 620;

/**
 * Unsichtbare Pufferzone (vh) zwischen Scrub-Section und Endzustand.
 * Wird nie tatsächlich manuell durchgescrollt (siehe ImmersiveExperience) —
 * sie hält den Video-Bereich während der Sprung-Animation lediglich sticky.
 */
export const JUMP_ZONE_VH = 60;

/** Dauer der automatischen "Sprung"-Animation zwischen den Sections (ms). */
export const JUMP_DURATION_MS = 2200;
