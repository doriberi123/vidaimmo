export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * True, sobald ein echtes Sanity-Projekt konfiguriert ist.
 * Solange nicht gesetzt, nutzt die Seite statische Fallback-Inhalte.
 */
export const isSanityConfigured = projectId.length > 0;
