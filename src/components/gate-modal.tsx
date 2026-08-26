"use client";

import { ArrowGlyph } from "@/components/hero-switch";

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
      className="fixed inset-0 z-40 px-5 pt-24 md:px-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      <div className="gate-veil" />
      <div className="flex h-full flex-col justify-end">
        <div className="animate-fade-up glass relative mb-32 w-full max-w-2xl p-6 md:mb-24 md:p-8">
          <h2 id="gate-title" className="relative font-serif text-4xl tracking-tight md:text-7xl">
            네가 쓰는 AI는
            <br />
            이미 성격이 있다
          </h2>
          <p className="relative mt-5 max-w-md text-sm leading-relaxed text-muted">
            뒤에 떠 있는 유체가 그 성격이다. 말버릇이 쌓이면 갈라지고 뭉치고, 둥글거나 각이 선다.
          </p>
          <div className="relative mt-8">
            <button type="button" onClick={() => onPick("simple")} className="cta-row">
              <span>
                <span className="block font-serif text-2xl">간단</span>
                <span className="mt-1 block text-sm text-muted">지금 쓰는 AI에게 문장 하나를 넣습니다</span>
              </span>
              <ArrowGlyph className="size-5 shrink-0" />
            </button>
            <button type="button" onClick={() => onPick("export")} className="cta-row">
              <span>
                <span className="block font-serif text-2xl">심층</span>
                <span className="mt-1 block text-sm text-muted">
                  대화 내보내기 JSON을 이 기기에서만 엽니다
                </span>
              </span>
              <ArrowGlyph className="size-5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
