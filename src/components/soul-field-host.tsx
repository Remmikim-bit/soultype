"use client";

import { useEffect, useState, type ComponentType } from "react";
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

export function SoulFieldHost(props: Props) {
  const [Field, setField] = useState<ComponentType<Props> | null>(null);

  useEffect(() => {
    let live = true;
    void import("@/components/soul-field").then((mod) => {
      if (live) setField(() => mod.SoulField);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!Field) return <div className="soul-field" aria-hidden="true" />;
  return <Field {...props} />;
}
