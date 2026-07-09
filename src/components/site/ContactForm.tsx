"use client";

import { useState } from "react";

type Variant = "kontakt" | "kaufberatung" | "verkauf";

const intentLabel: Record<Variant, string> = {
  kontakt: "Allgemeine Anfrage",
  kaufberatung: "Ich suche eine Immobilie",
  verkauf: "Ich möchte verkaufen / bewerten lassen",
};

export function ContactForm({ variant = "kontakt" }: { variant?: Variant }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Demo-Verhalten: keine Backend-Anbindung. Andockpunkt für API/CRM.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="font-display text-2xl text-gold-300">Vielen Dank.</p>
        <p className="mt-3 text-sm text-stone-50/70">
          Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden
          diskret bei Ihnen.
        </p>
        <button className="btn-ghost mt-6" onClick={() => setSent(false)}>
          Weitere Anfrage
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card grid gap-4 p-8">
      <input type="hidden" name="intent" value={intentLabel[variant]} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Vorname" name="firstName" />
        <Field label="Nachname" name="lastName" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="E-Mail" name="email" type="email" />
        <Field label="Telefon" name="phone" type="tel" required={false} />
      </div>
      {variant === "verkauf" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Objektadresse" name="address" required={false} />
          <Field label="Wohnfläche (m²)" name="area" required={false} />
        </div>
      )}
      {variant === "kaufberatung" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Wunschlage" name="location" required={false} />
          <Field label="Budget" name="budget" required={false} />
        </div>
      )}
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-50/60">
          Nachricht
        </span>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-stone-50 outline-none transition-colors focus:border-gold-300"
          placeholder="Wie können wir Sie unterstützen?"
        />
      </label>
      <label className="flex items-start gap-3 text-xs text-stone-50/60">
        <input type="checkbox" required className="mt-0.5 accent-[#b99862]" />
        <span>
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung
          meiner Daten zur Bearbeitung der Anfrage zu.
        </span>
      </label>
      <button type="submit" className="btn-gold mt-2 justify-center">
        Anfrage senden
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-stone-50/60">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-stone-50 outline-none transition-colors focus:border-gold-300"
      />
    </label>
  );
}
