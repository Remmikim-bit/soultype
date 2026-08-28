"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ADS = {
  mbti: {
    brand: "한낮노트",
    line: "기록은 이 기기에만 남아요.",
    hold: 7,
  },
  prompts: {
    brand: "잉크랩",
    line: "같은 얼굴로 그리는 영어 문장을 받을 수 있어요.",
    hold: 8,
  },
  grade: {
    brand: "늦은우체국",
    line: "광고가 끝나면 점수를 바로 열어드려요.",
    hold: 6,
  },
  extra: {
    brand: "잉크랩",
    line: "한 줄을 더 열어볼 수 있어요.",
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
    <div className="ad-overlay" role="dialog" aria-modal="true" aria-labelledby="ad-title" data-qa="ad-gate">
      <div className="ad-sheet sheet">
        <p className="ad-badge">AD</p>
        <div className="ad-frame mt-4">
          <p className="text-[28px] font-semibold tracking-tight text-fg">{ad.brand}</p>
          <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">{ad.line}</p>
          <div className="relative mt-8 h-1.5 overflow-hidden rounded-full bg-line">
            <span className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          <p id="ad-title" className="text-[15px] text-muted">
            {left > 0 ? (
              <>
                <span className="tabular-nums text-fg">{left}</span>초 후에 열 수 있어요
              </>
            ) : (
              "광고가 끝났어요. 결과를 열 수 있어요"
            )}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="ghost" onClick={onClose} data-qa="ad-close">
              닫기
            </Button>
            <Button disabled={left > 0} onClick={onComplete} data-qa="ad-unlock">
              결과 열기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
