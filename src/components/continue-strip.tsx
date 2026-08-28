"use client";

import { Link } from "@tanstack/react-router";
import { ArrowGlyph } from "@/components/hero-switch";
import { RelatedTests } from "@/components/related-tests";
import { TEST_IDS, TEST_PATH, TESTS, testOf, type TestId } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";

export function ContinueStrip({ current }: { current: TestId }) {
  const unlocks = useAppStore((s) => s.unlocks);
  const done = TEST_IDS.filter((id) => unlocks[id]).length;
  const next = TESTS.find((t) => t.id !== current && !unlocks[t.id]) ?? testOf(current);
  const remain = Math.max(0, TEST_IDS.length - done);

  return (
    <section className="grid gap-4" data-qa="continue-strip">
      {next && next.id !== current ? (
        <Link to={TEST_PATH[next.id]} className="continue-card">
          <div className="min-w-0">
            <p className="kicker">다음에 볼 분석 · {done}/6</p>
            <p className="mt-1 text-[20px] font-semibold tracking-tight">{next.name}</p>
            <p className="mt-1 text-[15px] text-muted">
              {next.hook}
              {remain > 1 ? ` · ${remain}개가 남았어요` : ""}
            </p>
          </div>
          <ArrowGlyph className="size-5 shrink-0 text-subtle" />
        </Link>
      ) : (
        <div className="continue-card">
          <div>
            <p className="kicker">도감</p>
            <p className="mt-1 text-[20px] font-semibold tracking-tight">6개를 모두 봤어요</p>
            <p className="mt-1 text-[15px] text-muted">홈에서 결과를 다시 볼 수 있어요.</p>
          </div>
        </div>
      )}
      <RelatedTests current={current} />
    </section>
  );
}
