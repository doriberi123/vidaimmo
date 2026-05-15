import type { RoomId } from "./rooms";

export type ExperienceStage = "gate" | "approach" | "tour";

export type ExperienceState = {
  progress: number;
  stage: ExperienceStage;
  gateOpen: number;
  cameraPush: number;
  landingReveal: number;
  activeRoom: RoomId;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const normalize = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

export function deriveExperienceState(progressRaw: number): ExperienceState {
  const progress = clamp(progressRaw);
  const gateOpen = normalize(progress, 0.02, 0.32);
  const cameraPush = normalize(progress, 0.2, 0.65);
  const landingReveal = normalize(progress, 0.58, 0.9);

  const stage: ExperienceStage =
    progress < 0.33 ? "gate" : progress < 0.66 ? "approach" : "tour";

  let activeRoom: RoomId = "foyer";
  if (progress > 0.74 && progress <= 0.87) activeRoom = "leftRoom";
  if (progress > 0.87) activeRoom = "rightRoom";

  return {
    progress,
    stage,
    gateOpen,
    cameraPush,
    landingReveal,
    activeRoom,
  };
}
