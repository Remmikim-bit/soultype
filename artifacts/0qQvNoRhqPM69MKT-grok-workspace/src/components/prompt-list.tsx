"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { ImagePrompt } from "@/lib/types";

export function PromptList({ prompts }: { prompts: ImagePrompt[] }) {
  return (
    <section className="grid gap-3">
      <div>
        <p className="kicker">이미지</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">이미지 프롬프트</h2>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">
          그대로 붙여 넣으면 돼요. 로고와 네온은 빼 두었어요.
        </p>
      </div>
      <ol className="grid gap-3">
        {prompts.map((p, i) => (
          <PromptRow key={p.title} index={i + 1} prompt={p} />
        ))}
      </ol>
    </section>
  );
}

function PromptRow({ index, prompt }: { index: number; prompt: ImagePrompt }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li className="sheet p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs tabular-nums text-subtle">{String(index).padStart(2, "0")}</p>
          <h3 className="mt-1 text-xl font-semibold">{prompt.title}</h3>
        </div>
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex h-11 min-h-11 items-center gap-2 rounded-full px-4 text-[15px] text-fg shadow-[var(--shadow-border)] hover:opacity-70"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "복사했어요" : "복사하기"}
        </button>
      </div>
      <p className="mt-4 font-mono text-sm leading-relaxed text-muted">{prompt.prompt}</p>
    </li>
  );
}
