"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImmersiveExperience.module.css";
import { CLIPS } from "@/lib/experience/videos";
import { deriveExperienceState } from "@/lib/experience/motion";
import { ExperienceOverlay } from "./ExperienceOverlay";
import { AnalyticsBeacon } from "./AnalyticsBeacon";
import type { Listing } from "@/lib/content/listings";

/** Scroll-Weg pro Sekunde Videomaterial (vh). Höher = langsameres Scrubbing. */
const SCRUB_VH_PER_SECOND = 36;

function clipIndexForProgress(
  progress: number,
  usable: number[],
  totalUsable: number
) {
  if (totalUsable <= 0) return 0;
  const time = progress * totalUsable;
  let elapsed = 0;
  for (let i = 0; i < usable.length; i++) {
    if (time <= elapsed + usable[i]) return i;
    elapsed += usable[i];
  }
  return Math.max(0, usable.length - 1);
}

export function ImmersiveExperience({ listings = [] }: { listings?: Listing[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<number[]>(() => CLIPS.map(() => 0));
  const progressRef = useRef(0);
  const preloadedRef = useRef(new Set<number>([0]));
  const uiSignatureRef = useRef("");

  // Video-Metadaten (Dauer) einsammeln
  useEffect(() => {
    const syncAll = () => {
      setDurations((prev) => {
        const next = [...prev];
        let changed = false;
        videoRefs.current.forEach((v, i) => {
          if (
            v &&
            Number.isFinite(v.duration) &&
            v.duration > 0 &&
            Math.abs(next[i] - v.duration) > 0.01
          ) {
            next[i] = v.duration;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };
    syncAll();
    const cleanups: Array<() => void> = [];
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.addEventListener("loadedmetadata", syncAll);
      v.addEventListener("durationchange", syncAll);
      cleanups.push(() => {
        v.removeEventListener("loadedmetadata", syncAll);
        v.removeEventListener("durationchange", syncAll);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const timeline = useMemo(() => {
    const usable = durations.map((d, i) => Math.max(0, d - CLIPS[i].skipStart));
    const totalUsable = usable.reduce((sum, u) => sum + u, 0);
    return { usable, totalUsable };
  }, [durations]);

  const activeIndex = useMemo(() => {
    const { usable, totalUsable } = timeline;
    return clipIndexForProgress(progress, usable, totalUsable);
  }, [progress, timeline]);

  /** Durchgehendes Scrubbing über ALLE Clips: currentTime aus globalem Progress. */
  const scrubTo = (p: number) => {
    const { usable, totalUsable } = timeline;
    if (totalUsable <= 0) return;
    const t = p * totalUsable;
    let acc = 0;
    for (let i = 0; i < CLIPS.length; i++) {
      const v = videoRefs.current[i];
      if (!v) continue;
      if (t < acc) {
        if (Math.abs(v.currentTime) > 0.02) v.currentTime = 0;
      } else if (t > acc + usable[i]) {
        const end = CLIPS[i].skipStart + usable[i];
        if (Math.abs(v.currentTime - end) > 0.05) v.currentTime = end;
      } else {
        const target = CLIPS[i].skipStart + (t - acc);
        if (Math.abs(v.currentTime - target) > 0.02) v.currentTime = target;

        const localProgress = usable[i] > 0 ? (t - acc) / usable[i] : 0;
        const nextIndex = i + 1;
        const nextVideo = videoRefs.current[nextIndex];
        if (
          localProgress > 0.65 &&
          nextVideo &&
          !preloadedRef.current.has(nextIndex)
        ) {
          preloadedRef.current.add(nextIndex);
          nextVideo.preload = "auto";
          nextVideo.load();
        }
      }
      acc += usable[i];
    }
  };

  // GSAP ScrollTrigger: gepinnte, durchgehend gescrubte Journey.
  useEffect(() => {
    const { totalUsable } = timeline;
    const root = rootRef.current;
    const pin = pinRef.current;
    if (!root || !pin || totalUsable <= 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const lengthPx = () =>
      (totalUsable * SCRUB_VH_PER_SECOND * window.innerHeight) / 100;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${lengthPx()}`,
        pin: pin,
        pinSpacing: true,
        scrub: reduce ? false : 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          scrubTo(p);

          const nextState = deriveExperienceState(p);
          const clipIndex = clipIndexForProgress(
            p,
            timeline.usable,
            totalUsable
          );
          const uiSignature = [
            p < 0.06,
            p > 0.2 && p < 0.95,
            p >= 0.98,
            nextState.activeRoom,
            nextState.keyframeIndex,
            clipIndex,
          ].join(":");

          if (uiSignature !== uiSignatureRef.current) {
            uiSignatureRef.current = uiSignature;
            setProgress(p);
          }
        },
      });
      return () => st.kill();
    }, root);

    // Initiales Frame setzen.
    scrubTo(progressRef.current);
    ScrollTrigger.refresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeline.totalUsable]);

  const state = useMemo(() => deriveExperienceState(progress), [progress]);

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-label="Vida Immobilien – Cinematic Journey"
    >
      <div ref={pinRef} className={styles.sticky}>
        {CLIPS.map((clip, i) => (
          <video
            key={clip.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className={`${styles.video} ${
              i === activeIndex ? styles.videoOnTop : styles.videoBehind
            }`}
            src={clip.src}
            poster={
              i === 0
                ? "/assets/cinematic-keyframes/K01-tore-geschlossen.jpg"
                : undefined
            }
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
          />
        ))}
        <div className={styles.vignette} />
        <ExperienceOverlay state={state} listings={listings} />
      </div>
      <AnalyticsBeacon activeRoom={state.activeRoom} />
    </section>
  );
}
