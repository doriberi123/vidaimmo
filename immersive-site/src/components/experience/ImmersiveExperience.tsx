"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ImmersiveExperience.module.css";

const VIDEOS = [
  "/assets/VIDA_LOBBY_V2_SCROLL.mp4",
  "/assets/hf_20260515_190916_e335e8ef-1dcd-4b5f-ae12-a340cec6ec55_SCROLL.mp4",
  "/assets/hf_20260528_223739_7c229451-3f28-4050-b5ba-bc743e362b23_SCROLL.mp4",
];

const SKIP_FIRST_SECONDS = 0.4;
const BASE_SCROLL_VH = 600;

export function ImmersiveExperience() {
  const [progress, setProgress] = useState(0);
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const [durations, setDurations] = useState<number[]>([0, 0, 0]);

  const onScroll = (event: React.UIEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const range = target.scrollHeight - target.clientHeight;
    setProgress(range > 0 ? target.scrollTop / range : 0);
  };

  useEffect(() => {
    const syncAll = () => {
      setDurations((prev) => {
        const next = [...prev];
        videoRefs.forEach((ref, i) => {
          const v = ref.current;
          if (v && Number.isFinite(v.duration) && v.duration > 0) {
            next[i] = v.duration;
          }
        });
        return next;
      });
    };

    syncAll();
    videoRefs.forEach((ref) => {
      const v = ref.current;
      if (!v) return;
      v.addEventListener("loadedmetadata", syncAll);
      v.addEventListener("durationchange", syncAll);
    });
    return () => {
      videoRefs.forEach((ref) => {
        const v = ref.current;
        if (!v) return;
        v.removeEventListener("loadedmetadata", syncAll);
        v.removeEventListener("durationchange", syncAll);
      });
    };
  }, []);

  const timeline = useMemo(() => {
    const usable = durations.map((d, i) =>
      i === 0 ? Math.max(0, d - SKIP_FIRST_SECONDS) : d
    );
    const totalUsable = usable.reduce((sum, u) => sum + u, 0);
    return { usable, totalUsable };
  }, [durations]);

  const scrollSpaceVh = useMemo(() => {
    const { usable, totalUsable } = timeline;
    if (usable[0] <= 0) return BASE_SCROLL_VH;
    return BASE_SCROLL_VH * (totalUsable / usable[0]);
  }, [timeline]);

  const activeIndex = useMemo(() => {
    const { usable, totalUsable } = timeline;
    if (totalUsable <= 0) return 0;
    const t = progress * totalUsable;
    let acc = 0;
    for (let i = 0; i < usable.length; i++) {
      if (t <= acc + usable[i]) return i;
      acc += usable[i];
    }
    return usable.length - 1;
  }, [progress, timeline]);

  useEffect(() => {
    const { usable, totalUsable } = timeline;
    if (totalUsable <= 0) return;

    const t = progress * totalUsable;
    let acc = 0;

    for (let i = 0; i < VIDEOS.length; i++) {
      const v = videoRefs[i].current;
      if (!v) continue;

      if (i < activeIndex) {
        if (Math.abs(v.currentTime - durations[i]) > 0.05 && durations[i] > 0) {
          v.currentTime = durations[i];
        }
      } else if (i === activeIndex) {
        const localT = t - acc;
        const offset = i === 0 ? SKIP_FIRST_SECONDS : 0;
        const target = offset + Math.min(localT, usable[i]);
        if (Math.abs(v.currentTime - target) > 0.02) {
          v.currentTime = target;
        }
      } else {
        if (Math.abs(v.currentTime) > 0.02) {
          v.currentTime = 0;
        }
      }
      acc += usable[i];
    }
  }, [progress, timeline, activeIndex, durations]);

  return (
    <section
      className={styles.root}
      onScroll={onScroll}
      aria-label="Vida Immobilien"
    >
      <div className={styles.sticky}>
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={videoRefs[i]}
            className={`${styles.video} ${i === activeIndex ? styles.videoOnTop : styles.videoBehind}`}
            src={src}
            muted
            playsInline
            preload="auto"
          />
        ))}
      </div>
      <div
        className={styles.scrollSpace}
        style={{ height: `${scrollSpaceVh}vh` }}
      />
    </section>
  );
}
