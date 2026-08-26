"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ADS = {
  mbti: {
    brand: "한낮노트",
    line: "대화 기록은 이 기기에만 남습니다.",
    hold: 7,
  },
  prompts: {
    brand: "잉크랩",
    line: "같은 캐릭터로 그리는 영어 프롬프트 3개.",
    hold: 8,
  },
} as const;

export function AdGate({
  kind,
  open,
  onClose,
  onComplete,
}: {
  kind: keyof typeof ADS;
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const ad = ADS[kind];
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!open) return;
    setLeft(ad.hold);
    const id = window.setInterval(() => {
      setLeft((n) => (n <= 1 ? 0 : n - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [open, ad.hold]);

  if (!open) return null;

  const elapsed = ad.hold - left;
  const progress = Math.min(100, (elapsed / ad.hold) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bg/85 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-title"
    >
      <div className="sheet w-full max-w-lg p-6 md:p-8">
        <p className="kicker">광고</p>
        <div className="mt-6 aspect-video rounded-xl bg-surface p-6">
          <p className="font-serif text-4xl text-fg">{ad.brand}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{ad.line}</p>
          <div className="relative mt-10 h-px bg-line">
            <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <p id="ad-title" className="text-sm text-muted">
            {left > 0 ? (
              <>
                <span className="tabular-nums text-fg">{left}</span>초 후 열립니다
              </>
            ) : (
              "광고가 끝났습니다"
            )}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              닫기
            </Button>
            <Button size="sm" disabled={left > 0} onClick={onComplete}>
              결과 열기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
