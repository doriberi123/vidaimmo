"use client";

import { useEffect, useRef } from "react";
import type { RoomId } from "@/lib/experience/rooms";

/**
 * Feuert ein `vida:room-change` CustomEvent, sobald der aktive Raum wechselt.
 * Andockpunkt für Analytics (z. B. GA4, Plausible, PostHog).
 */
export function AnalyticsBeacon({ activeRoom }: { activeRoom: RoomId }) {
  const prev = useRef<RoomId | null>(null);

  useEffect(() => {
    if (prev.current === activeRoom) return;
    prev.current = activeRoom;
    window.dispatchEvent(
      new CustomEvent("vida:room-change", { detail: { room: activeRoom } })
    );
  }, [activeRoom]);

  return null;
}
