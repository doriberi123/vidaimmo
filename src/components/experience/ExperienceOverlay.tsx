"use client";

import Link from "next/link";
import styles from "./ImmersiveExperience.module.css";
import type { ExperienceState } from "@/lib/experience/motion";
import { ROOM_DEFINITIONS, ROOM_SEQUENCE } from "@/lib/experience/rooms";
import { KEYFRAMES } from "@/lib/experience/keyframes";
import type { Listing } from "@/lib/content/listings";
import { resolveListingImage } from "@/lib/content/getListings";

const statusClass: Record<Listing["status"], string> = {
  "verfügbar": styles.statusAvailable,
  reserviert: styles.statusReserved,
  verkauft: styles.statusSold,
};

export function ExperienceOverlay({
  state,
  listings = [],
}: {
  state: ExperienceState;
  listings?: Listing[];
}) {
  const { progress, activeRoom } = state;
  const introVisible = progress < 0.06;
  const endVisible = progress >= 0.98;
  const showPanel = progress > 0.2 && progress < 0.95;

  const room = ROOM_DEFINITIONS[activeRoom];
  const roomNumber = ROOM_SEQUENCE.indexOf(activeRoom) + 1;

  return (
    <div className={styles.overlay}>
      {/* Raum-Panel — editoriale, imposante Kapitel-Karte */}
      {showPanel && (
        <div className={styles.panel} key={room.id}>
          <span className={styles.panelIndex} aria-hidden>
            {String(roomNumber).padStart(2, "0")}
          </span>
          <div className={styles.panelInner}>
            <span className={styles.panelEyebrow}>
              <span className={styles.panelRule} aria-hidden />
              {room.tagline}
            </span>
            <h2 className={styles.panelTitle}>{room.title}</h2>
            <p className={styles.panelText}>{room.purpose}</p>
            <Link href={room.ctaHref} className={`btn-gold ${styles.panelCta}`}>
              {room.ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Endframe — Inserate liegen AUF dem Board des letzten Video-Frames */}
      {endVisible && (
        <div
          className={styles.boardListings}
          role="region"
          aria-labelledby="board-title"
        >
          <div className={styles.boardHead}>
            <div>
              <span className={styles.boardEyebrow}>Ihre ersten Inserate</span>
              <h2 id="board-title" className={styles.boardTitle}>
                Aktuelle Objekte
              </h2>
            </div>
            <Link href="/objekte" className={styles.boardAll}>
              Alle Objekte <span aria-hidden>→</span>
            </Link>
          </div>

          <div className={styles.boardScroll} data-lenis-prevent>
            <div className={styles.boardGrid}>
              {listings.map((listing) => (
                <Link
                  key={listing.slug}
                  href={`/objekte/${listing.slug}`}
                  className={styles.boardCard}
                  aria-label={`${listing.title} in ${listing.location} ansehen`}
                >
                  <div className={styles.boardMedia}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveListingImage(listing)}
                      alt={listing.title}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <span
                      className={`${styles.boardStatus} ${statusClass[listing.status]}`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <div className={styles.boardBody}>
                    <p className={styles.boardLocation}>{listing.location}</p>
                    <h3 className={styles.boardCardTitle}>{listing.title}</h3>
                    <div className={styles.boardMeta}>
                      <span className={styles.boardPrice}>{listing.price}</span>
                      <span className={styles.boardDims}>
                        {listing.area} · {listing.rooms}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll-Hinweis — dezent, Tore bleiben unbeschriftet */}
      {introVisible && (
        <div className={styles.scrollHint}>
          <div className={styles.mouse} />
          <span>Scrollen · Eintreten</span>
        </div>
      )}

      {/* Progress-Rail mit Keyframe-Ticks */}
      <div className={styles.progressRail} aria-hidden>
        {KEYFRAMES.map((k, index) => {
          const active = index === state.keyframeIndex;
          return (
            <span
              key={k.id}
              className={`${styles.tick} ${active ? styles.tickActive : ""}`}
            />
          );
        })}
      </div>

      {/* Kapitel-Anzeige unten rechts */}
      <div className="pointer-events-none absolute bottom-6 right-6 hidden text-right md:block">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-stone-50/50">
          {roomNumber} / {ROOM_SEQUENCE.length}
        </p>
      </div>
    </div>
  );
}
