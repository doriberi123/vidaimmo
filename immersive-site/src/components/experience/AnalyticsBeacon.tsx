"use client";

import { useEffect, useRef } from "react";
import type { RoomId } from "@/lib/experience/rooms";

type AnalyticsBeaconProps = {
  activeRoom: RoomId;
  progress: number;
};

export function AnalyticsBeacon({ activeRoom, progress }: AnalyticsBeaconProps) {
  const lastRoom = useRef<RoomId | null>(null);

  useEffect(() => {
    if (lastRoom.current === activeRoom) return;

    lastRoom.current = activeRoom;
    // Placeholder hook for GA/GTM event integration.
    // Keeping this centralized prevents animation components from mixing tracking logic.
    window.dispatchEvent(
      new CustomEvent("vida:room-change", {
        detail: {
          room: activeRoom,
          progress: Number(progress.toFixed(3)),
        },
      }),
    );
  }, [activeRoom, progress]);

  return null;
}
