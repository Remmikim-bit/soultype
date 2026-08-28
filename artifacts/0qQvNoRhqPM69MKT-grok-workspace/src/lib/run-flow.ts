"use client";

import { useEffect } from "react";
import { useAppStore, type RunPhase } from "@/lib/store";

export const THEATER_MS = 2800;
export type { RunPhase };

export function useRunFlow(id: string) {
  const phase = useAppStore((s) => s.runPhase[id] ?? "in");
  const theaterAt = useAppStore((s) => s.theaterAt[id] ?? 0);
  const unlocked = useAppStore((s) => Boolean(s.unlocks[id]));
  const setRunPhase = useAppStore((s) => s.setRunPhase);

  const effective: RunPhase = unlocked ? "result" : phase;

  useEffect(() => {
    if (unlocked || phase !== "theater" || !theaterAt) return;
    const left = Math.max(0, THEATER_MS - (Date.now() - theaterAt));
    if (left === 0) {
      setRunPhase(id, "teaser");
      return;
    }
    const t = window.setTimeout(() => setRunPhase(id, "teaser"), left);
    return () => window.clearTimeout(t);
  }, [id, phase, theaterAt, unlocked, setRunPhase]);

  return {
    phase: effective,
    start: () => setRunPhase(id, "theater", Date.now()),
    toTeaser: () => setRunPhase(id, "teaser"),
    toResult: () => setRunPhase(id, "result"),
  };
}
