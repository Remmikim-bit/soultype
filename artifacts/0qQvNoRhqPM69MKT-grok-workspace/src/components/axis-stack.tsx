"use client";

import { AXIS_META } from "@/lib/axes";
import type { AxisScores } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AxisStack({ axes }: { axes: AxisScores; live?: boolean }) {
  return (
    <div className="grid gap-4">
      {AXIS_META.map((m) => {
        const v = axes[m.key];
        const pct = Math.min(96, Math.max(4, ((v + 1) / 2) * 100));
        const activeLeft = v < -0.08;
        const activeRight = v > 0.08;
        return (
          <div key={m.key}>
            <div className="flex items-baseline justify-between gap-3 font-mono text-sm">
              <span className={cn(activeLeft ? "text-fg" : "text-subtle")}>{m.left.letter}</span>
              <span className={cn(activeRight ? "text-fg" : "text-subtle")}>{m.right.letter}</span>
            </div>
            <div className="relative mt-2 h-px bg-line">
              <span
                className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[left] duration-300 ease-[var(--ease-out)]"
                style={{ left: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}