import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Seiteninhalt",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Seite",
      type: "string",
      options: {
        list: [
          { title: "Kaufberatung", value: "kaufberatung" },
          { title: "Verkauf", value: "verkauf" },
          { title: "Über uns", value: "ueber-uns" },
          { title: "Kontakt", value: "kontakt" },
        ],
      },
    }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Überschrift", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "Sektionen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Titel", type: "string" },
            { name: "body", title: "Text", type: "text", rows: 3 },
          ],
        },
      ],
    }),
  ],
});
