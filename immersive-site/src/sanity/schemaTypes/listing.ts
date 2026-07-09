import { defineField, defineType } from "sanity";

export const listing = defineType({
  name: "listing",
  title: "Objekt",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", title: "Lage", type: "string" }),
    defineField({ name: "price", title: "Preis", type: "string" }),
    defineField({ name: "area", title: "Wohnfläche", type: "string" }),
    defineField({ name: "rooms", title: "Zimmer", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Verfügbar", value: "verfügbar" },
          { title: "Reserviert", value: "reserviert" },
          { title: "Verkauft", value: "verkauft" },
        ],
      },
      initialValue: "verfügbar",
    }),
    defineField({ name: "teaser", title: "Teaser", type: "text", rows: 3 }),
    defineField({
      name: "hero",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "hero" },
  },
});
