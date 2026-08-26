"use client";

import { useEffect, useState } from "react";
import { CHARACTERS } from "@/lib/characters";
import { cn } from "@/lib/utils";

const LIST = Object.values(CHARACTERS);

function normalize(map: Record<string, number>) {
  const sum = Object.values(map).reduce((a, b) => a + b, 0) || 1;
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(map)) out[k] = (v / sum) * 100;
  return out;
}

function driftOdds(): Record<string, number> {
  const raw: Record<string, number> = {};
  LIST.forEach((c, i) => {
    raw[c.mbti] = 3.8 + ((i * 5) % 9) * 0.7 + (i % 3) * 0.35;
  });
  return normalize(raw);
}

function settleOdds(winner: string): Record<string, number> {
  const raw: Record<string, number> = {};
  LIST.forEach((c, i) => {
    raw[c.mbti] = c.mbti === winner ? 54 : 1.8 + (i % 7) * 0.4;
  });
  return normalize(raw);
}

export function CharacterParade({
  winner,
  dim,
  compact,
}: {
  winner?: string | null;
  dim?: boolean;
  compact?: boolean;
}) {
  const [odds, setOdds] = useState(driftOdds);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setOdds(winner ? settleOdds(winner) : driftOdds());
  }, [winner]);

  return (
    <div className={cn("grid gap-3 overflow-hidden", dim && "opacity-50")}>
      <ParadeRow items={LIST} odds={odds} winner={winner} reverse={false} reduce={reduce} compact={compact} />
      {compact ? null : (
        <ParadeRow items={[...LIST].reverse()} odds={odds} winner={winner} reverse reduce={reduce} />
      )}
    </div>
  );
}

function ParadeRow({
  items,
  odds,
  winner,
  reverse,
  reduce,
  compact,
}: {
  items: typeof LIST;
  odds: Record<string, number>;
  winner?: string | null;
  reverse: boolean;
  reduce: boolean;
  compact?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-3",
          !reduce && (reverse ? "animate-marquee-rev" : "animate-marquee"),
        )}
      >
        {loop.map((c, i) => {
          const on = winner === c.mbti;
          const pct = odds[c.mbti] ?? 0;
          return (
            <article
              key={`${c.mbti}-${i}`}
              className={cn(
                "flex shrink-0 items-baseline gap-3 rounded-xl px-3",
                compact ? "w-48 py-2" : "w-56 py-3",
                on ? "sheet text-accent" : "sheet text-fg",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-sm leading-tight">{c.name}</p>
                <p className={cn("font-mono text-xs tabular-nums", on ? "text-accent" : "text-subtle")}>
                  {c.mbti}
                </p>
              </div>
              <p className={cn("text-sm tabular-nums", on ? "text-accent" : "text-muted")}>
                {pct.toFixed(1)}
                <span className="text-xs">%</span>
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
