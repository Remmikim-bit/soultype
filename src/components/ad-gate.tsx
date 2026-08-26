"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ADS = {
  mbti: {
    brand: "한낮노트",
    line: "기록은 이 기기에만 남는다.",
    hold: 7,
  },
  prompts: {
    brand: "잉크랩",
    line: "같은 얼굴로 그리는 영어 문장.",
    hold: 8,
  },
  grade: {
    brand: "늦은우체국",
    line: "점수는 광고 뒤에.",
    hold: 6,
  },
  extra: {
    brand: "잉크랩",
    line: "한 줄 더.",
    hold: 6,
  },
} as const;

const endsAt = new Map<string, number>();

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
  const [left, setLeft] = useState<number>(ad.hold);

  useEffect(() => {
    if (!open) {
      endsAt.delete(kind);
      setLeft(ad.hold);
      return;
    }
    if (!endsAt.has(kind)) endsAt.set(kind, Date.now() + ad.hold * 1000);
    const tick = () => {
      const end = endsAt.get(kind) ?? Date.now();
      const rem = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(rem);
    };
    tick();
    const id = window.setInterval(tick, 200);
    return () => window.clearInterval(id);
  }, [open, kind, ad.hold]);

  if (!open) return null;

  const elapsed = ad.hold - left;
  const progress = Math.min(100, (elapsed / ad.hold) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-bg/85 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-title"
      data-qa="ad-gate"
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
            <Button variant="ghost" size="sm" onClick={onClose} data-qa="ad-close">
              닫기
            </Button>
            <Button size="sm" disabled={left > 0} onClick={onComplete} data-qa="ad-unlock">
              결과 열기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
