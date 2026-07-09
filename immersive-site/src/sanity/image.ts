import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset, isSanityConfigured } from "./env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: unknown): string | null {
  if (!builder || !source) return null;
  return builder
    .image(source as never)
    .auto("format")
    .fit("max")
    .url();
}
