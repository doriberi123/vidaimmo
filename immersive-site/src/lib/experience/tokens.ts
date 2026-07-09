export const brandTokens = {
  colors: {
    royalBlue900: "#071734",
    royalBlue700: "#0f2f65",
    royalBlue500: "#1f56a7",
    royalBlue300: "#8fb0ea",
    warmWood700: "#4d2f1b",
    warmWood500: "#7a4d2d",
    stone050: "#f6f3ee",
    stone200: "#ddd6ca",
    gold400: "#b99862",
    gold300: "#d8bd8c",
    ink900: "#11131a",
  },
  typography: {
    display: "clamp(2.4rem, 6.5vw, 5.4rem)",
    h1: "clamp(2rem, 5vw, 3.6rem)",
    h2: "clamp(1.5rem, 3.4vw, 2.6rem)",
    body: "clamp(1rem, 1.8vw, 1.2rem)",
    caption: "0.82rem",
  },
  motion: {
    cinematicEase: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    revealDurationMs: 700,
    panelStaggerMs: 110,
  },
  perfBudgets: {
    mainBundleKbGzip: 220,
    textureBudgetMb: 12,
    lcpMs: 2600,
    cls: 0.1,
  },
} as const;

export type BrandTokens = typeof brandTokens;
