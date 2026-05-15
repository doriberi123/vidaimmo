"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ImmersiveExperience.module.css";

const VIDEO_FIRST = "/assets/VIDA_LOBBY_V2_SCROLL.mp4";
const VIDEO_SECOND =
  "/assets/hf_20260515_190916_e335e8ef-1dcd-4b5f-ae12-a340cec6ec55_SCROLL.mp4";

/** Ersten Teil des ersten Clips ueberspringen (statische Frames). */
const SKIP_FIRST_SECONDS = 0.4;

/** Scroll-Hoehe bei einem einzigen Clip (ohne zweites Video) — Referenz fuer Proportion. */
const BASE_SCROLL_VH = 600;

export function ImmersiveExperience() {
  const [progress, setProgress] = useState(0);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);

  const onScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const range = target.scrollHeight - target.clientHeight;
    setProgress(range > 0 ? target.scrollTop / range : 0);
  };

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const sync = () => {
      if (Number.isFinite(v1.duration) && v1.duration > 0) {
        setDuration1(v1.duration);
      }
      if (Number.isFinite(v2.duration) && v2.duration > 0) {
        setDuration2(v2.duration);
      }
    };

    sync();
    v1.addEventListener("loadedmetadata", sync);
    v1.addEventListener("durationchange", sync);
    v2.addEventListener("loadedmetadata", sync);
    v2.addEventListener("durationchange", sync);
    return () => {
      v1.removeEventListener("loadedmetadata", sync);
      v1.removeEventListener("durationchange", sync);
      v2.removeEventListener("loadedmetadata", sync);
      v2.removeEventListener("durationchange", sync);
    };
  }, []);

  const timeline = useMemo(() => {
    const usable1 = Math.max(0, duration1 - SKIP_FIRST_SECONDS);
    const d2 = duration2;
    const hasSecond = d2 > 0;
    const totalUsable = hasSecond ? usable1 + d2 : usable1;
    return { usable1, d2, hasSecond, totalUsable };
  }, [duration1, duration2]);

  /** Scroll-Hoehe: gleiches „Tempo“ pro Videosekunde wie bei nur einem Clip. */
  const scrollSpaceVh = useMemo(() => {
    const { usable1, totalUsable } = timeline;
    if (usable1 <= 0) return BASE_SCROLL_VH;
    return BASE_SCROLL_VH * (totalUsable / usable1);
  }, [timeline]);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    const { usable1, totalUsable, hasSecond } = timeline;
    if (!v1 || !v2 || usable1 <= 0 || totalUsable <= 0) return;

    const t = progress * totalUsable;

    if (!hasSecond || t <= usable1) {
      const target1 = SKIP_FIRST_SECONDS + Math.min(t, usable1);
      if (Math.abs(v1.currentTime - target1) > 0.02) {
        v1.currentTime = target1;
      }
      if (hasSecond && Math.abs(v2.currentTime) > 0.02) {
        v2.currentTime = 0;
      }
    } else {
      const target2 = t - usable1;
      if (Math.abs(v1.currentTime - duration1) > 0.05 && duration1 > 0) {
        v1.currentTime = duration1;
      }
      if (Math.abs(v2.currentTime - target2) > 0.02) {
        v2.currentTime = target2;
      }
    }
  }, [progress, timeline, duration1]);

  const showFirst =
    timeline.totalUsable <= 0 ||
    progress * timeline.totalUsable <= timeline.usable1;

  return (
    <section
      className={styles.root}
      onScroll={onScroll}
      aria-label="Vida Immobilien"
    >
      <div className={styles.sticky}>
        <video
          ref={video1Ref}
          className={`${styles.video} ${showFirst ? styles.videoOnTop : styles.videoBehind}`}
          src={VIDEO_FIRST}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={video2Ref}
          className={`${styles.video} ${showFirst ? styles.videoBehind : styles.videoOnTop}`}
          src={VIDEO_SECOND}
          muted
          playsInline
          preload="auto"
        />
      </div>
      <div
        className={styles.scrollSpace}
        style={{ height: `${scrollSpaceVh}vh` }}
      />
    </section>
  );
}
