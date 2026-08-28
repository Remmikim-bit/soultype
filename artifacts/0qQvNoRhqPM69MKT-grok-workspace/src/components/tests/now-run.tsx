"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { ContinueStrip } from "@/components/continue-strip";
import { LockedPanel } from "@/components/mbti-card";
import { testOf } from "@/lib/catalog";
import { NOW_LOCKED, NOW_NOTES } from "@/lib/now-copy";
import { useAppStore } from "@/lib/store";

const META = testOf("now")!;

export function NowRun() {
  const unlocks = useAppStore((s) => s.unlocks);
  const unlock = useAppStore((s) => s.unlock);
  const adKey = useAppStore((s) => s.adKey);
  const setAdKey = useAppStore((s) => s.setAdKey);
  const open = Boolean(unlocks.now);

  return (
    <div className="grid gap-5" data-phase={open ? "result" : "teaser"} data-qa="now-run">
      <section className="glass grid gap-2 p-5">
        <p className="kicker">{META.no}</p>
        <h1 className="hero-title tracking-tight">{META.name}</h1>
        <p className="text-[15px] leading-relaxed text-muted">{META.hook}</p>
      </section>

      <AdSlot place="inline" />

      <ol className="grid gap-3">
        {NOW_NOTES.map((n) => (
          <li key={n.title} className="sheet p-5">
            <p className="kicker">{n.kicker}</p>
            <h2 className="mt-2 text-[18px] font-semibold">{n.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{n.body}</p>
          </li>
        ))}
      </ol>

      {open ? (
        <section className="sheet p-5" data-phase="result">
          <p className="kicker">{NOW_LOCKED.title}</p>
          <p className="mt-2 text-[22px] font-semibold tracking-tight">{NOW_LOCKED.body}</p>
        </section>
      ) : (
        <LockedPanel
          kicker="잠금"
          title={META.teaser}
          body="광고를 보면 이번 주 한 줄을 바로 열어드려요."
          action="광고 보고 결과 보기"
          onAction={() => setAdKey("now:main")}
        />
      )}

      <ContinueStrip current="now" />

      <AdGate
        kind="extra"
        open={adKey === "now:main"}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock("now");
        }}
      />
    </div>
  );
}
