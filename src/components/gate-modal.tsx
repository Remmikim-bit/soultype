"use client";

import { HeroSwitch, ArrowGlyph } from "@/components/hero-switch";

export function GateModal({
  open,
  onPick,
}: {
  open: boolean;
  onPick: (mode: "simple" | "export") => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto px-4 pb-32 pt-16 md:items-center md:px-10 md:pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      <div className="grid w-full max-w-6xl items-center gap-5 md:grid-cols-2 md:gap-12">
        <div className="flex justify-center md:justify-end">
          <HeroSwitch />
        </div>
        <div className="animate-fade-up border-l-0 md:border-l md:border-line md:pl-12">
          <p className="text-sm font-normal text-accent">16가지 유형 · 간단 또는 심층</p>
          <h2
            id="gate-title"
            className="mt-3 font-serif text-4xl leading-tight tracking-tight md:text-6xl"
          >
            네가 쓰는
            <br />
            AI의 성격
          </h2>
          <div className="mt-5 hidden gap-6 text-sm text-muted md:grid md:grid-cols-2">
            <p>대화를 어떻게 하느냐에 따라, 그 AI의 유형이 갈립니다.</p>
            <p>문장을 복사하거나, 대화 기록 JSON을 올리면 됩니다.</p>
          </div>
          <p className="mt-4 text-sm text-muted md:hidden">
            대화를 어떻게 하느냐에 따라, 그 AI의 유형이 갈립니다.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onPick("simple")}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-true px-2 py-2 pr-5 text-left text-accent-fg transition-opacity duration-300 ease-in-out hover:opacity-70 active:scale-96"
            >
              <span className="grid size-10 place-items-center rounded-full bg-bg text-fg">
                <ArrowGlyph />
              </span>
              <span className="font-serif text-lg leading-none md:text-xl">지금 쓰는 AI에게</span>
            </button>
            <button
              type="button"
              onClick={() => onPick("export")}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-bold px-2 py-2 pr-5 text-left text-fg transition-opacity duration-300 ease-in-out hover:opacity-70 active:scale-96"
            >
              <span className="grid size-10 place-items-center rounded-full bg-bg text-fg">
                <ArrowGlyph />
              </span>
              <span className="font-serif text-lg leading-none md:text-xl">대화 기록 올리기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
