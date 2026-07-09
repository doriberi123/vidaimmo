import Link from "next/link";
import { NAV_ITEMS } from "@/lib/experience/rooms";
import { VidaMark } from "./VidaMark";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gold-400/15 bg-[#040912]">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <VidaMark className="h-9 w-9" />
            <span className="font-display text-xl tracking-[0.28em] text-stone-50">
              VIDA IMMOBILIEN
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-50/60">
            Diskrete Vermittlung exklusiver Wohn- und Anlageimmobilien in
            München und Umgebung. Bewertung, Vermarktung und Kaufbegleitung auf
            höchstem Niveau.
          </p>
        </div>

        <div>
          <h4 className="text-[0.72rem] uppercase tracking-[0.3em] text-gold-300">
            Navigation
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-50/70">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[0.72rem] uppercase tracking-[0.3em] text-gold-300">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-50/70">
            <li>Maximilianstraße 1</li>
            <li>80539 München</li>
            <li>
              <a href="tel:+498900000000" className="hover:text-gold-300">
                +49 89 000 000 00
              </a>
            </li>
            <li>
              <a href="mailto:kontakt@vida-immobilien.de" className="hover:text-gold-300">
                kontakt@vida-immobilien.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline" />
      <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-stone-50/45 md:flex-row">
        <span>© {new Date().getFullYear()} Vida Immobilien. Alle Rechte vorbehalten.</span>
        <div className="flex gap-6">
          <Link href="/kontakt" className="hover:text-gold-300">Impressum</Link>
          <Link href="/kontakt" className="hover:text-gold-300">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
