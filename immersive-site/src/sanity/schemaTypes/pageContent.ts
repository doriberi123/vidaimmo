import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Seiteninhalt",
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
      name: "intro",
      title: "Intro-Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [
        { type: "block" },
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
});
