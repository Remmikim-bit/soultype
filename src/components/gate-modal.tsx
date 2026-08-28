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
      className="fixed inset-x-0 bottom-0 z-40 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
    >
      <div className="gate-veil" />
      <div className="relative mx-auto w-full max-w-[26.5rem]">
        <div className="animate-fade-up sheet relative p-6">
          <h2 id="gate-title" className="relative text-[26px] font-semibold tracking-tight">
            내가 쓰는 AI의 성격을 알아봐요
          </h2>
          <p className="relative mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            매일 나눈 대화가 AI를 어떻게 바꿨는지 1분만에 알아봐요.
          </p>
          <div className="relative mt-6">
            <button type="button" onClick={() => onPick("simple")} className="cta-row">
              <span>
                <span className="block text-[20px] font-semibold">문장 하나</span>
                <span className="mt-1 block text-[15px] text-muted">지금 쓰는 AI에 넣고, 돌아온 답을 붙여 주세요</span>
              </span>
              <ArrowGlyph className="size-5 shrink-0" />
            </button>
            <button type="button" onClick={() => onPick("export")} className="cta-row">
              <span>
                <span className="block text-[20px] font-semibold">대화록 불러오기</span>
                <span className="mt-1 block text-[15px] text-muted">다운 받은 파일을 올려 주세요. 데이터는 서버로 전송되지 않아요</span>
              </span>
              <ArrowGlyph className="size-5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
