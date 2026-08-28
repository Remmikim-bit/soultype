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
        setError("대화를 찾지 못했어요. Grok, ChatGPT, Claude JSON인지 한 번만 확인해 주세요.");
        return;
      }
      setExport(next, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "파일을 읽지 못했어요. 다시 선택해 주세요.");
    }
  };

  const onSample = () => {
    setParsing("샘플 내보내기");
    try {
      setExport(parseObject(buildDemoExport()), "샘플 내보내기");
    } catch {
      setError("샘플을 열지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const onRelay = (payload: RelayPayload) => {
    setRelay(digestFromRelay(payload), payload.sig);
  };

  if (way === "simple") {
    return (
      <div className="grid gap-6">
        <button type="button" onClick={() => setWay("pick")} className="btn-glass inline-flex min-h-11 items-center rounded-[14px] px-3 text-left text-[15px] text-muted">
          이전으로
        </button>
        <RelayDesk busy={busy} error={error} onSubmit={onRelay} />
      </div>
    );
  }

  if (way === "export") {
    return (
      <div className="grid gap-6">
        <button type="button" onClick={() => setWay("pick")} className="btn-glass inline-flex min-h-11 items-center rounded-[14px] px-3 text-left text-[15px] text-muted">
          이전으로
        </button>
        <DropZone busy={busy} onFile={(f) => void onFile(f)} onSample={onSample} />
        {status === "parsing" ? <p className="text-[15px] text-muted">파일을 읽고 있어요.</p> : null}
        {status === "error" && error ? <p className="text-[15px] text-muted">{error}</p> : null}
        <HowExport />
      </div>
    );
  }

  return (
    <div className="sheet overflow-hidden px-5">
      <button type="button" onClick={() => setWay("simple")} className="cta-row" data-qa="way-simple">
        <span>
          <span className="block text-[20px] font-semibold">문장 하나</span>
          <span className="mt-1 block text-[15px] text-muted">지금 쓰는 AI에 넣고, 돌아온 답을 붙여 주세요</span>
        </span>
        <ArrowGlyph className="size-5 shrink-0 text-subtle" />
      </button>
      <button type="button" onClick={() => setWay("export")} className="cta-row" data-qa="way-export">
        <span>
          <span className="block text-[20px] font-semibold">대화록 불러오기</span>
          <span className="mt-1 block text-[15px] text-muted">JSON만 올리면 돼요. 원문은 이 기기에만 남아요</span>
        </span>
        <ArrowGlyph className="size-5 shrink-0 text-subtle" />
      </button>
    </div>
  );
}
