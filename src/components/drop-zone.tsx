"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function DropZone({
  busy,
  onFile,
  onSample,
}: {
  busy: boolean;
  onFile: (file: File) => void;
  onSample: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const take = (file?: File | null) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".json") && file.type && !file.type.includes("json")) {
      return;
    }
    onFile(file);
  };

  return (
    <section className="grid gap-4">
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          take(e.dataTransfer.files[0]);
        }}
        className={cn(
          "sheet px-6 py-14 text-left transition-[box-shadow,opacity] duration-300",
          over && "shadow-[var(--shadow-border-hover)]",
        )}
      >
        <p className="font-serif text-2xl tracking-tight text-fg md:text-3xl">대화록 3초 만에 불러오기</p>
        <p className="mt-3 max-w-md text-sm text-muted">
          복잡한 입력 없이 대화 내역 한 줄로 끝!
        </p>
        <p className="mt-6 text-sm text-accent">conversations.json</p>
      </button>
      {mounted ? (
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => take(e.target.files?.[0])}
        />
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button arrow onClick={() => inputRef.current?.click()} disabled={busy}>
          JSON 선택
        </Button>
        <Button variant="ghost" onClick={onSample} disabled={busy} data-qa="sample-export">
          샘플로 보기
        </Button>
      </div>
    </section>
  );
}
