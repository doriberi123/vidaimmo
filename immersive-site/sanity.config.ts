"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "@/sanity/schemaTypes";
import { dataset, projectId } from "@/sanity/env";

/**
 * Sanity Studio Konfiguration.
 * projectId fällt auf einen Platzhalter zurück, damit die App auch ohne
 * konfiguriertes Projekt kompiliert. Das Studio (/studio) verbindet nur,
 * wenn NEXT_PUBLIC_SANITY_PROJECT_ID gesetzt ist.
 */
export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [structureTool()],
});
