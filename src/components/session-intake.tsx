"use client";

import { useState } from "react";
import { DropZone } from "@/components/drop-zone";
import { HowExport } from "@/components/how-export";
import { RelayDesk } from "@/components/relay-desk";
import { ArrowGlyph } from "@/components/hero-switch";
import { buildDemoExport } from "@/lib/demo-export";
import { parseFile, parseObject } from "@/lib/parse-file";
import { digestFromRelay } from "@/lib/relay";
import type { RelayPayload } from "@/lib/relay";
import { useAppStore } from "@/lib/store";

export function SessionIntake() {
  const status = useAppStore((s) => s.status);
  const error = useAppStore((s) => s.error);
  const setParsing = useAppStore((s) => s.setParsing);
  const setExport = useAppStore((s) => s.setExport);
  const setRelay = useAppStore((s) => s.setRelay);
  const setError = useAppStore((s) => s.setError);
  const [way, setWay] = useState<"pick" | "simple" | "export">("pick");
  const busy = status === "parsing";

  const onFile = async (file: File) => {
    setParsing(file.name);
    try {
      const next = await parseFile(file);
      if (next.stats.totalConversations === 0) {
        setError("대화가 안 보인다. Grok · ChatGPT · Claude JSON인지 봐.");
        return;
      }
      setExport(next, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "파일을 못 읽었다.");
    }
  };

  const onSample = () => {
    setParsing("샘플 내보내기");
    try {
      setExport(parseObject(buildDemoExport()), "샘플 내보내기");
    } catch {
      setError("샘플을 못 열었다.");
    }
  };

  const onRelay = (payload: RelayPayload) => {
    setRelay(digestFromRelay(payload), payload.sig);
  };

  if (way === "simple") {
    return (
      <div className="grid gap-6">
        <button type="button" onClick={() => setWay("pick")} className="text-left text-sm text-muted">
          뒤로
        </button>
        <RelayDesk busy={busy} error={error} onSubmit={onRelay} />
      </div>
    );
  }

  if (way === "export") {
    return (
      <div className="grid gap-6">
        <button type="button" onClick={() => setWay("pick")} className="text-left text-sm text-muted">
          뒤로
        </button>
        <DropZone busy={busy} onFile={(f) => void onFile(f)} onSample={onSample} />
        {status === "parsing" ? <p className="text-sm text-muted">읽는 중</p> : null}
        {status === "error" && error ? <p className="text-sm text-muted">{error}</p> : null}
        <HowExport />
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setWay("simple")} className="cta-row" data-qa="way-simple">
        <span>
          <span className="block font-serif text-2xl">문장 하나</span>
          <span className="mt-1 block text-sm text-muted">지금 쓰는 AI한테 넣고, 나온 거 붙여</span>
        </span>
        <ArrowGlyph className="size-5 shrink-0" />
      </button>
      <button type="button" onClick={() => setWay("export")} className="cta-row" data-qa="way-export">
        <span>
          <span className="block font-serif text-2xl">대화록 불러오기</span>
          <span className="mt-1 block text-sm text-muted">JSON만 올리면 된다. 원문은 안 나간다</span>
        </span>
        <ArrowGlyph className="size-5 shrink-0" />
      </button>
    </div>
  );
}
