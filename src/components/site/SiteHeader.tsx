"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/lib/experience/rooms";
import { VidaMark } from "./VidaMark";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const showBackground = !isHome || scrolled;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500"
      style={{
        background: showBackground
          ? "linear-gradient(180deg, rgba(5,11,24,0.92), rgba(5,11,24,0.72))"
          : "linear-gradient(180deg, rgba(5,11,24,0.5), transparent)",
        backdropFilter: showBackground ? "blur(12px)" : "blur(2px)",
        borderBottom: showBackground
          ? "1px solid rgba(216,189,140,0.16)"
          : "1px solid transparent",
      }}
    >
      <div className="shell flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Vida Immobilien – Startseite">
          <VidaMark className="h-10 w-10" />
          <span className="font-display text-lg tracking-[0.28em] text-stone-50">
            VIDA
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-[0.82rem] tracking-[0.08em] text-stone-50/80 transition-colors hover:text-stone-50"
              >
                {item.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-px bg-gold-300 transition-all duration-500"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/kontakt" className="btn-gold text-sm">
            Beratung
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <span className="text-stone-50">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-gold-400/15 bg-[#050b18]/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.08em] text-stone-50/85"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/kontakt" onClick={() => setOpen(false)} className="btn-gold mt-2 justify-center">
              Beratung anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
