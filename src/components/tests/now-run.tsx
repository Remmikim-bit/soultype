"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { LockedPanel } from "@/components/mbti-card";
import { RelatedTests } from "@/components/related-tests";
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
    <div className="grid gap-10" data-phase={open ? "result" : "teaser"} data-qa="now-run">
      <section className="glass grid max-w-xl gap-3 p-5 md:p-6">
        <p className="kicker">{META.no}</p>
        <h1 className="font-serif text-4xl tracking-tight md:text-6xl">살아 있는 랭킹은 없다</h1>
        <p className="text-sm text-muted">남들 데이터를 안 모은다. 관찰만 적는다.</p>
      </section>

      <AdSlot place="inline" />

      <ol className="grid gap-3">
        {NOW_NOTES.map((n) => (
          <li key={n.title} className="sheet p-5 md:p-6">
            <p className="kicker">{n.kicker}</p>
            <h2 className="mt-2 font-serif text-2xl">{n.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{n.body}</p>
          </li>
        ))}
      </ol>

      {open ? (
        <section className="sheet p-6 md:p-8" data-phase="result">
          <p className="kicker">{NOW_LOCKED.title}</p>
          <p className="mt-3 font-serif text-3xl tracking-tight">{NOW_LOCKED.body}</p>
        </section>
      ) : (
        <LockedPanel
          kicker="잠금"
          title={META.teaser}
          body="광고 보면 이번 주 한 줄을 연다."
          action="광고 보고 결과 보기"
          onAction={() => setAdKey("now:main")}
        />
      )}

      <RelatedTests current="now" />

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
