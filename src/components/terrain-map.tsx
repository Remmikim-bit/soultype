"use client";

import { CHARACTERS, QUADRANTS, QUADRANT_TINT, TERRAIN_ORDER, charactersIn } from "@/lib/characters";
import { cn } from "@/lib/utils";

export function TerrainMap({
  active,
  onPick,
  locked,
}: {
  active?: string | null;
  onPick?: (mbti: string) => void;
  locked?: boolean;
}) {
  return (
    <section className="grid gap-4">
      <div>
        <p className="kicker">AI 페르소나 도감</p>
        <h2 className="mt-2 font-serif text-4xl tracking-tight">이 중에 하나</h2>
      </div>
      <div className={cn("relative", locked && "select-none")}>
        <div
          className={cn(
            "grid gap-3 md:grid-cols-2",
            locked && "pointer-events-none blur-sm",
          )}
        >
          {TERRAIN_ORDER.map((id) => {
            const q = QUADRANTS[id];
            const cells = charactersIn(id);
            return (
              <div key={id} className={cn("rounded-2xl p-4", QUADRANT_TINT[id])}>
                <p className="text-xs tabular-nums opacity-70">{q.letters}</p>
                <p className="mt-1 font-serif text-xl">{q.title}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {cells.map((c) => {
                    const on = Boolean(active) && c.mbti === active;
                    const className = cn(
                      "rounded-lg px-3 py-3 text-left transition-[color,opacity,box-shadow] duration-300 ease-in-out",
                      on ? "text-accent shadow-[var(--shadow-border-hover)]" : "bg-surface/70",
                      onPick && !on ? "hover:opacity-80" : "",
                    );
                    const inner = (
                      <>
                        <p className="font-mono text-xs tabular-nums">{c.mbti}</p>
                        <p className="mt-1 text-sm leading-snug">{c.name}</p>
                      </>
                    );
                    return onPick && !locked ? (
                      <button key={c.mbti} type="button" onClick={() => onPick(c.mbti)} className={className}>
                        {inner}
                      </button>
                    ) : (
                      <div key={c.mbti} className={className}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {locked ? (
          <div className="absolute inset-0 flex items-end justify-center rounded-2xl bg-bg/20 p-6">
            <p className="rounded-full bg-bg px-4 py-2 text-sm text-muted">
              광고를 보면 이 지도가 선명해집니다
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function TerrainLegend() {
  return (
    <p className="text-xs text-subtle">{Object.values(CHARACTERS).length} · 2050</p>
  );
}
