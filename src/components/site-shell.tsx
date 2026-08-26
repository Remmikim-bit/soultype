"use client";

import { useEffect, type ReactNode } from "react";
import { SoulFieldHost } from "@/components/soul-field-host";
import { BrandMark } from "@/components/type-mark";
import type { QuadrantId } from "@/lib/characters";
import type { SoulStage } from "@/lib/soul-shape";
import { useAppStore } from "@/lib/store";
import type { AxisScores } from "@/lib/types";

export function SiteShell({
  stage,
  home,
  axes,
  locked,
  quadrant,
  caption,
  children,
}: {
  stage: SoulStage;
  home?: boolean;
  axes?: AxisScores | null;
  locked?: boolean;
  quadrant?: QuadrantId | null;
  caption?: string | null;
  children: ReactNode;
}) {
  const digest = useAppStore((s) => s.digest);
  const clearRecord = useAppStore((s) => s.clearRecord);
  const rehydrate = useAppStore((s) => s.rehydrate);
  const hasSession = Boolean(digest);

  useEffect(() => {
    rehydrate();
    document.documentElement.setAttribute("data-st-ready", "1");
    return () => document.documentElement.removeAttribute("data-st-ready");
  }, [rehydrate]);

  return (
    <div className="relative min-h-dvh bg-transparent text-fg">
      <SoulFieldHost
        stage={stage}
        axes={axes ?? null}
        locked={Boolean(locked)}
        quadrant={quadrant ?? null}
        caption={caption ?? null}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="site-header mx-auto flex max-w-5xl px-5 md:px-8">
          <div className="glass-bar pointer-events-auto flex w-full items-center justify-between gap-3 px-4 py-2.5">
            <a href="/" className="flex items-center gap-3 text-left">
              <BrandMark className="size-8" />
              <span className="font-serif text-lg leading-none">소울타입</span>
            </a>
            <div className="flex items-center gap-5 text-sm text-muted">
              {hasSession ? (
                <button
                  type="button"
                  onClick={clearRecord}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  기록 지우기
                </button>
              ) : null}
              {home ? null : (
                <a href="/" className="text-fg transition-opacity duration-300 hover:opacity-70">
                  목록
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="overlay-veil" aria-hidden="true" />
        <div className="proscenium" />
        <div className="overlay-col">{children}</div>
      </div>
    </div>
  );
}
