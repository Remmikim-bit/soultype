"use client";

import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { DuelRun } from "@/components/tests/duel-run";
import { GradeRun } from "@/components/tests/grade-run";
import { NowRun } from "@/components/tests/now-run";
import { SoulRun } from "@/components/tests/soul-run";
import { testOf, type GradeId, type TestId } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";

export function TestPage({ slug }: { slug: TestId }) {
  const meta = testOf(slug);
  const digest = useAppStore((s) => s.digest);
  const unlocks = useAppStore((s) => s.unlocks);
  const runPhase = useAppStore((s) => (meta ? s.runPhase[meta.id] : undefined));

  if (!meta) {
    return (
      <SiteShell stage="gate">
        <section className="glass p-6">
          <p className="text-3xl font-semibold tracking-tight">없는 페이지예요</p>
          <p className="mt-2 text-[15px] text-muted">홈에서 분석을 다시 골라 볼 수 있어요.</p>
          <Link to="/" className="mt-4 inline-block min-h-11 text-[15px] text-accent">
            홈으로
          </Link>
        </section>
      </SiteShell>
    );
  }

  const unlocked = Boolean(unlocks[meta.id]);
  const stage = unlocked ? "result" : runPhase === "theater" || runPhase === "teaser" || digest ? "work" : "gate";

  return (
    <SiteShell stage={stage}>
      {meta.id === "soul" ? <SoulRun /> : null}
      {meta.id === "abuse" || meta.id === "love" || meta.id === "skill" ? (
        <GradeRun id={meta.id as GradeId} />
      ) : null}
      {meta.id === "duel" ? <DuelRun /> : null}
      {meta.id === "now" ? <NowRun /> : null}
    </SiteShell>
  );
}
