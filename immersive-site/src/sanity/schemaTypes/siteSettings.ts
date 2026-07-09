import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Seitentitel", type: "string" }),
    defineField({ name: "tagline", title: "Claim", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 2 }),
    defineField({ name: "openingHours", title: "Öffnungszeiten", type: "string" }),
  ],
});
