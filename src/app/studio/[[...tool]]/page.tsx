import type { Metadata } from "next";
import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#050b18] px-6 text-center">
        <div className="max-w-md">
          <p className="eyebrow justify-center">Sanity Studio</p>
          <h1 className="mt-4 font-display text-3xl text-stone-50">
            CMS noch nicht verbunden
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-50/70">
            Setze <code className="text-gold-300">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
            in <code className="text-gold-300">.env.local</code> (siehe{" "}
            <code className="text-gold-300">.env.example</code>), um das Studio
            unter <code>/studio</code> zu aktivieren. Bis dahin läuft die Seite
            mit statischen Inhalten.
          </p>
        </div>
      </main>
    );
  }
  return <Studio />;
}
