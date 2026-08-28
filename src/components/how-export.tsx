"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const PROVIDERS = [
  {
    id: "grok",
    label: "Grok",
    body: "Grok 설정에서 데이터를 내보낸 뒤, 받은 JSON을 여기에 올려 주세요.",
  },
  {
    id: "gemini",
    label: "Gemini",
    body: "Gemini 설정에서 채팅을 내보낸 뒤, 받은 파일을 여기에 올려 주세요.",
  },
  {
    id: "gpt",
    label: "GPT",
    body: "설정 → 데이터 관리 → Export에서 conversations JSON을 받을 수 있어요.",
  },
  {
    id: "claude",
    label: "Claude",
    body: "설정 → Privacy → Export data에서 대화 파일을 받을 수 있어요.",
  },
] as const;

type ProviderId = (typeof PROVIDERS)[number]["id"];

export function HowExport() {
  const [id, setId] = useState<ProviderId>("grok");
  const current = PROVIDERS.find((p) => p.id === id) ?? PROVIDERS[0];

  return (
    <section className="grid gap-4">
      <h2 className="text-[20px] font-semibold tracking-tight">대화록은 이렇게 받아요</h2>
      <div className="sheet p-4">
        <p className="text-[15px] text-muted">어느 서비스에서 받았는지 골라 주세요.</p>
        <div className="mt-3 grid grid-cols-2 gap-2" role="tablist" aria-label="서비스 선택">
          {PROVIDERS.map((p) => {
            const on = p.id === id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setId(p.id)}
                className={cn(
                  "min-h-11 rounded-xl px-3 text-[15px] font-medium transition-[background,color,opacity] duration-200 ease-out",
                  on ? "bg-fg text-bg" : "text-muted shadow-[var(--shadow-border)] hover:opacity-70",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{current.body}</p>
      </div>
    </section>
  );
}
