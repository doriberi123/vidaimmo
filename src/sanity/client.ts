import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

/**
 * Sanity-Client – nur aktiv, wenn ein Projekt konfiguriert ist.
 * Andernfalls `null`, damit die Content-Loader auf statische Daten zurückfallen.
 */
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
