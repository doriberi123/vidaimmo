export type Keyframe = {
  id: string;
  file: string;
  progress: number;
  title: string;
  caption: string;
};

/**
 * Die 18 cinematic Ankerpunkte der Journey (K01-K18).
 * `progress` = Scroll-Position 0..1, an der dieser Frame im Video sichtbar wird.
 * Werte stammen aus CINEMATIC-VIEW.md (Quick Reference).
 */
export const KEYFRAMES: Keyframe[] = [
  { id: "K01", file: "K01-tore-geschlossen.jpg", progress: 0.0, title: "Das Portal", caption: "Navyblaue Doppeltür mit goldenem Wappen" },
  { id: "K02", file: "K02-tore-oeffnen.jpg", progress: 0.05, title: "Empfang", caption: "Die Tore beginnen sich zu öffnen" },
  { id: "K03", file: "K03-logo-reveal.jpg", progress: 0.09, title: "VIDA", caption: "Logo-Reveal zwischen den Türflügeln" },
  { id: "K04", file: "K04-durchfahrt.jpg", progress: 0.14, title: "Eintritt", caption: "Kamera gleitet durch die offenen Tore" },
  { id: "K05", file: "K05-foyer-totale.jpg", progress: 0.22, title: "Foyer", caption: "Totale mit Logo-Wand und Panoramablick" },
  { id: "K06", file: "K06-foyer-ende.jpg", progress: 0.34, title: "Golden Hour", caption: "Weitwinkel-Foyer im warmen Abendlicht" },
  { id: "K07", file: "K07-clip2-start.jpg", progress: 0.36, title: "Übergang", caption: "Nahtloser Anschluss an die Logo-Wand" },
  { id: "K08", file: "K08-logo-wand.jpg", progress: 0.42, title: "Signatur", caption: "Totale Logo-Wand mit Terrassenblick" },
  { id: "K09", file: "K09-lounge-schraeg.jpg", progress: 0.49, title: "Lounge", caption: "Schräge Ansicht der Wohnlandschaft" },
  { id: "K10", file: "K10-logo-closeup.jpg", progress: 0.53, title: "Handwerk", caption: "Close-up des gravierten VIDA-Wappens" },
  { id: "K11", file: "K11-penthouse-frauenkirche.jpg", progress: 0.56, title: "München", caption: "Penthouse mit Blick auf die Frauenkirche" },
  { id: "K12", file: "K12-clip2-ende.jpg", progress: 0.63, title: "Zuhause", caption: "Bewohntes Penthouse, VIDA-Wand" },
  { id: "K13", file: "K13-clip3-start.jpg", progress: 0.65, title: "Die Tour", caption: "Penthouse mit VIDA-Branding" },
  { id: "K14", file: "K14-person-am-fenster.jpg", progress: 0.75, title: "Kaufberatung", caption: "Am Panoramafenster – der Moment der Suche" },
  { id: "K15", file: "K15-korridor.jpg", progress: 0.82, title: "Der Weg", caption: "Korridor Richtung Ausstellungsraum" },
  { id: "K16", file: "K16-whiteboard-rahmen.jpg", progress: 0.89, title: "Verkauf", caption: "Der leere Rahmen wartet auf Ihr Objekt" },
  { id: "K17", file: "K17-whiteboard-totale.jpg", progress: 0.92, title: "Bühne", caption: "Rahmen auf Marmorsockel, zentriert" },
  { id: "K18", file: "K18-endframe.jpg", progress: 1.0, title: "Ihr Auftritt", caption: "Endframe – Kontakt, Inserate, CTA" },
];

export const keyframeSrc = (file: string) => `/assets/cinematic-keyframes/${file}`;

export const keyframeById = (id: string) =>
  KEYFRAMES.find((k) => k.id === id) ?? KEYFRAMES[0];
