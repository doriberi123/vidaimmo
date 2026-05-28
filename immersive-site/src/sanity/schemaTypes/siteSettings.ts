import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Website-Titel",
      type: "string",
      initialValue: "VIDA Immobilien GmbH",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Meta-Beschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "whatsAppUrl", title: "WhatsApp-Link", type: "url" }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Strasse", type: "string" }),
        defineField({ name: "postalCode", title: "PLZ", type: "string" }),
        defineField({ name: "city", title: "Stadt", type: "string" }),
        defineField({ name: "country", title: "Land", type: "string", initialValue: "Deutschland" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "email" },
  },
});
