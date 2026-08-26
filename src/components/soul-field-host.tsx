"use client";

import { lazy, Suspense } from "react";
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

export function SoulFieldHost(props: Props) {
  return (
    <Suspense fallback={<div className="soul-field" aria-hidden="true" />}>
      <SoulField {...props} />
    </Suspense>
  );
}
