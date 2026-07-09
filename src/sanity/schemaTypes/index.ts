import type { SchemaTypeDefinition } from "sanity";
import { listing } from "./listing";
import { siteSettings } from "./siteSettings";
import { pageContent } from "./pageContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [listing, siteSettings, pageContent],
};
