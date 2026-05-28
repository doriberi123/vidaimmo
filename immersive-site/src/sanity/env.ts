export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-28";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "yf2xmdi3";

export const useCdn = process.env.NODE_ENV === "production";
