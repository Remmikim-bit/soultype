"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";
import type { QuadrantId } from "@/lib/characters";
import type { SoulStage } from "@/lib/soul-shape";
import type { AxisScores } from "@/lib/types";

type Props = {
  stage: SoulStage;
  axes: AxisScores | null;
  locked: boolean;
  quadrant: QuadrantId | null;
  caption?: string | null;
};

const SoulField = lazy(() =>
  import("@/components/soul-field").then((mod) => ({ default: mod.SoulField })),
);

const empty = () => () => {};

export function SoulFieldHost(props: Props) {
  const live = useSyncExternalStore(empty, () => true, () => false);
  if (!live) {
    return <div className="soul-field" aria-hidden="true" />;
  }
  if (new URLSearchParams(window.location.search).has("qa")) {
    return <div className="soul-field" aria-hidden="true" data-qa="field-off" />;
  }
  return (
    <Suspense fallback={<div className="soul-field" aria-hidden="true" />}>
      <SoulField {...props} />
    </Suspense>
  );
}
