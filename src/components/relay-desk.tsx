"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RELAY_PROMPT, SAMPLE_RELAY, parseRelay } from "@/lib/relay";
import type { RelayPayload } from "@/lib/relay";

export function RelayDesk({
  busy,
  error,
  onSubmit,
}: {
  busy: boolean;
  error: string | null;
  onSubmit: (payload: RelayPayload) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [paste, setPaste] = useState("");
  const [openPaste, setOpenPaste] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RELAY_PROMPT);
    } catch {
      const el = document.createElement("textarea");
      el.value = RELAY_PROMPT;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setOpenPaste(true);
  };

  const run = () => {
    const parsed = parseRelay(paste);
    if (!parsed) return;
    onSubmit(parsed);
  };

  const parsedOk = Boolean(parseRelay(paste));

  return (
    <section className="grid gap-8">
      <div className="glass grid max-w-xl gap-3 p-5 md:p-6">
        <p className="kicker">문장 하나</p>
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">이 문장 넣고, 돌아온 거 붙여</h1>
        <p className="text-sm text-muted">
          Grok, ChatGPT, Claude 어디든. JSON만 다시 가져오면 된다.
        </p>
      </div>
      <div className="sheet p-4 md:p-5">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-subtle">st.v1</p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              data-qa="sample-relay"
              onClick={() => {
                setPaste(SAMPLE_RELAY);
                setOpenPaste(true);
              }}
            >
              예시 JSON
            </Button>
            <Button size="sm" onClick={() => void copy()}>
              {copied ? "복사됨" : "복사하기"}
            </Button>
          </div>
        </div>
        <pre className="max-h-56 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted">
          {RELAY_PROMPT}
        </pre>
      </div>
      {openPaste || paste ? (
        <div className="grid gap-3">
          <p className="font-serif text-2xl">AI가 준 JSON</p>
          <textarea
            suppressHydrationWarning
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            rows={8}
            placeholder='{"schema":"st.v1","vec":[...]}'
            className="w-full resize-y rounded-xl bg-surface px-4 py-3 font-mono text-xs text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button disabled={!parsedOk || busy} arrow onClick={run} data-qa="paste-relay">
              {busy ? "읽는 중" : "붙이기"}
            </Button>
          </div>
          {paste && !parsedOk ? (
            <p className="text-sm text-muted">JSON 형식이 아닙니다. AI가 보낸 답을 통째로 붙여 주세요.</p>
          ) : null}
          {error ? <p className="text-sm text-muted">{error}</p> : null}
        </div>
      ) : (
        <p className="text-sm text-muted">복사해서 넣고, 돌아온 답을 가져오면 칸이 열린다.</p>
      )}
    </section>
  );
}
