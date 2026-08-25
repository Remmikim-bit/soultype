"use client";

import { useMemo, useState } from "react";
import { AxisStack } from "@/components/axis-stack";
import { TerrainMap } from "@/components/terrain-map";
import { Button } from "@/components/ui/button";
import { lettersFromAxes, scoreAxesFromTexts } from "@/lib/axes";
import { classifyFromAxes } from "@/lib/mbti-local";
import type { AnalysisResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const KINDS = [
  { id: "code", label: "코드" },
  { id: "write", label: "글" },
  { id: "decide", label: "결정" },
  { id: "study", label: "공부" },
  { id: "plan", label: "일정" },
  { id: "talk", label: "잡담" },
] as const;

type Kind = (typeof KINDS)[number]["id"];

const TEMPLATES: Record<Kind, { seed: string; wrap: (body: string) => string }> = {
  code: {
    seed: "로그인 타임아웃 버그를 최소 재현 코드로 고치고, 원인 한 줄과 패치만 남겨라.",
    wrap: (body) =>
      `아래 오류를 재현 가능한 최소 코드로 고치고, 원인 한 줄과 수정 패치만 남겨라.\n반박할 허점이 있으면 먼저 지적해라.\n\n${body}`,
  },
  write: {
    seed: "이 문장을 주장 하나, 근거 둘로 더 짧게 다시 써라.",
    wrap: (body) =>
      `이 글을 더 짧게, 주장 하나와 근거 둘로 다시 써라. 부드러운 수식은 빼라.\n\n${body}`,
  },
  decide: {
    seed: "이직 vs 잔류. 손실과 되돌리기 비용만 표로 비교하고 내가 놓친 전제를 지적해라.",
    wrap: (body) =>
      `선택지의 손실과 되돌리기 비용을 표로 비교하고, 내가 놓친 전제만 냉정히 지적해라. 위로하지 마라.\n\n${body}`,
  },
  study: {
    seed: "양자역학을 비유 하나와 반례 하나로 설명해라. 정의 암기는 빼라.",
    wrap: (body) =>
      `이 개념을 비유 하나와 반례 하나로 설명해라. 정의 암기와 위로는 빼라. 왜 그렇게 보이는지만 남겨라.\n\n${body}`,
  },
  plan: {
    seed: "다음 7일을 고정 / 이동 가능 / 버려도 되는 일로 나누고 순서를 강제해라.",
    wrap: (body) =>
      `다음 7일을 고정 일정 / 이동 가능 / 버려도 되는 일로 나눠라. 감정 대신 순서와 차단 규칙만.\n\n${body}`,
  },
  talk: {
    seed: "요즘 의욕이 없다. 감정의 이름을 하나 붙이고 같은 말을 더 정확하게 다시 해 봐라.",
    wrap: (body) =>
      `내가 지금 말한 감정의 이름을 하나 붙이고, 같은 말을 더 정확하게 다시 써 봐라. 해결책 목록은 나중에.\n\n${body}`,
  },
};

export function SimpleWriter({ onDone }: { onDone: (analysis: AnalysisResult) => void }) {
  const [kind, setKind] = useState<Kind>("code");
  const [slots, setSlots] = useState(["", "", ""]);
  const [focus, setFocus] = useState(0);

  const filled = slots.map((s) => s.trim()).filter(Boolean);
  const axes = useMemo(() => scoreAxesFromTexts(filled), [filled]);
  const leaning = filled.join("").length >= 24 ? lettersFromAxes(axes) : null;
  const ready = filled.join("").length >= 48;

  const writeSlot = (i: number, value: string) => {
    setSlots((prev) => prev.map((s, idx) => (idx === i ? value : s)));
  };

  const draftInto = (i: number) => {
    const current = slots[i].trim();
    const next = TEMPLATES[kind].wrap(current || TEMPLATES[kind].seed);
    writeSlot(i, next);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <section className="grid gap-5">
        <div>
          <p className="text-xs tracking-widest text-subtle uppercase">심플</p>
          <h2 className="mt-1 font-serif text-3xl tracking-tight">평소 던지는 말을 적으세요</h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            주제를 고르면 초안을 대신 써 줍니다. 그 문장의 버릇이 4축에 쌓이고, 쓰는 AI가
            16 지형 중 하나로 변합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={cn(
                "h-11 min-h-11 rounded-md px-3 text-sm",
                kind === k.id
                  ? "bg-accent text-accent-fg"
                  : "text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
        <ol className="grid gap-4">
          {slots.map((value, i) => (
            <li key={i} className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs tabular-nums text-subtle">0{i + 1}</p>
                <button
                  type="button"
                  className="h-11 min-h-11 px-2 text-xs text-muted hover:text-fg"
                  onClick={() => {
                    setFocus(i);
                    draftInto(i);
                  }}
                >
                  초안 쓰기
                </button>
              </div>
              <textarea
                suppressHydrationWarning
                value={value}
                onFocus={() => setFocus(i)}
                onChange={(e) => writeSlot(i, e.target.value)}
                rows={i === focus ? 7 : 4}
                placeholder={
                  i === 0
                    ? "예: 이 에러 왜 나는지 모르겠어. 어떻게 해야 해?"
                    : "한 줄 더. 주제가 달라도 됩니다."
                }
                className="w-full resize-y rounded-xl bg-surface px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
              />
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled={!ready} onClick={() => onDone(classifyFromAxes(axes, { shallow: !ready }))}>
            이 AI가 된 얼굴 보기
          </Button>
          <p className="text-xs text-subtle">
            {ready ? "작성만으로 분석합니다. 원문은 이 탭에만 있습니다." : "조금만 더 적으면 지형이 움직입니다."}
          </p>
        </div>
      </section>
      <aside className="grid gap-6">
        <div className="rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)] md:p-6">
          <p className="text-xs tracking-widest text-subtle uppercase">쌓이는 4축</p>
          <p className="mt-2 font-serif text-2xl">{leaning ?? "아직 얇음"}</p>
          <div className="mt-6">
            <AxisStack axes={axes} live />
          </div>
        </div>
        <TerrainMap active={leaning} />
      </aside>
    </div>
  );
}
