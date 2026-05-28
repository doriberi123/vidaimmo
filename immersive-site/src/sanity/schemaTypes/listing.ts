import { defineField, defineType } from "sanity";

export const listing = defineType({
  name: "listing",
  title: "Immobilien-Inserat",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "available",
      options: {
        layout: "radio",
        list: [
          { title: "Verfuegbar", value: "available" },
          { title: "Reserviert", value: "reserved" },
          { title: "Verkauft", value: "sold" },
          { title: "Entwurf", value: "draft" },
        ],
      },
    }),
    defineField({
      name: "propertyType",
      title: "Objekttyp",
      type: "string",
      options: {
        list: [
          { title: "Haus", value: "house" },
          { title: "Wohnung", value: "apartment" },
          { title: "Grundstueck", value: "plot" },
          { title: "Gewerbe", value: "commercial" },
        ],
      },
    }),
    defineField({ name: "location", title: "Ort", type: "string" }),
    defineField({ name: "price", title: "Preis", type: "string" }),
    defineField({ name: "livingArea", title: "Wohnflaeche", type: "string" }),
    defineField({ name: "propertyArea", title: "Grundstuecksflaeche", type: "string" }),
    defineField({ name: "rooms", title: "Zimmer", type: "number" }),
    defineField({ name: "bedrooms", title: "Schlafzimmer", type: "number" }),
    defineField({ name: "bathrooms", title: "Badezimmer", type: "number" }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      title: "Ausstattung / Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Bildergalerie",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt-Text", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Titel",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Beschreibung",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "images.0",
    },
  },
});
