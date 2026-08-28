"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/type-mark";
import type { SoulStage } from "@/lib/soul-shape";
import { useAppStore } from "@/lib/store";
import { bootTheme } from "@/lib/theme";

export function SiteShell({
  stage,
  children,
}: {
  stage: SoulStage;
  children: ReactNode;
}) {
  const digest = useAppStore((s) => s.digest);
  const clearRecord = useAppStore((s) => s.clearRecord);
  const rehydrate = useAppStore((s) => s.rehydrate);
  const setFieldView = useAppStore((s) => s.setFieldView);
  const hasSession = Boolean(digest);
  const isHome = useRouterState({ select: (s) => s.location.pathname === "/" });

  useLayoutEffect(() => {
    setFieldView({ stage });
  }, [stage, setFieldView]);

  useEffect(() => {
    bootTheme();
    rehydrate();
    document.documentElement.setAttribute("data-st-ready", "1");
    return () => document.documentElement.removeAttribute("data-st-ready");
  }, [rehydrate]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-transparent text-fg">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="site-header mx-auto flex w-full max-w-[26.5rem] justify-center px-5">
          <div className="glass-bar pointer-events-auto flex w-full max-w-[26.5rem] items-center justify-between gap-3 px-3 py-1.5">
            <Link to="/" className="flex min-h-11 items-center gap-2.5 text-left">
              <BrandMark className="size-7" />
              <span className="font-serif text-base leading-none">소울타입</span>
            </Link>
            <div className="flex items-center gap-1 text-[15px] text-muted">
              {hasSession ? (
                <button
                  type="button"
                  onClick={clearRecord}
                  className="min-h-11 px-2 transition-opacity duration-300 hover:opacity-70"
                >
                  기록 지우기
                </button>
              ) : null}
              {isHome ? null : (
                <Link to="/" className="min-h-11 px-2 text-fg transition-opacity duration-300 hover:opacity-70">
                  홈
                </Link>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="proscenium" />
        <div className="overlay-col">{children}</div>
      </div>
    </div>
  );
}
