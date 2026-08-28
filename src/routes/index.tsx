"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/ad-slot";
import { SiteShell } from "@/components/site-shell";
import { ArrowGlyph } from "@/components/hero-switch";
import { TEST_IDS, TESTS, TEST_PATH } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const digest = useAppStore((s) => s.digest);
  const fileLabel = useAppStore((s) => s.fileLabel);
  const unlocks = useAppStore((s) => s.unlocks);
  const done = TEST_IDS.filter((id) => unlocks[id]).length;
  const next = TESTS.find((t) => !unlocks[t.id]) ?? TESTS[0];
  const remain = 6 - done;

  return (
    <SiteShell stage="gate" home>
      <section className="grid gap-2">
        <p className="kicker">소울타입 · 내 AI의 MBTI</p>
        <h1 id="hub-title" className="hero-title tracking-tight">
          내 AI 성격 분석
        </h1>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          매일 붙인 말투가 쌓이면, 쓰는 AI도 그 말투를 닮아요.
        </p>
        {digest ? (
          <p className="text-[15px] text-fg">
            대화록 있음{fileLabel ? ` · ${fileLabel}` : ""}. 바로 분석해도 돼요.
          </p>
        ) : null}
      </section>

      {digest ? (
        <section className="sheet grid gap-3 p-5">
          <div className="flex items-end justify-between">
            <p className="kicker">어디까지 봤어요</p>
            <p className="text-[28px] font-semibold tabular-nums leading-none">{done}/6</p>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${(done / 6) * 100}%` }} />
          </div>
          <p className="text-[15px] text-muted">
            {done === 0
              ? "아직 시작 전이에요. 하나 열어보면 나머지도 자연스럽게 이어져요."
              : done === 6
                ? "6개를 모두 봤어요."
                : `${remain}개가 남았어요. 다음 결과도 이어서 열어볼 수 있어요.`}
          </p>
        </section>
      ) : null}

      {next ? (
        <Link to={TEST_PATH[next.id]} className="feature-card">
          <span className="min-w-0">
            <span className="kicker">{digest ? "이어서 볼게요" : "먼저 이걸로 시작해 봐요"}</span>
            <span className="mt-1 block text-[20px] font-semibold tracking-tight">{next.name}</span>
            <span className="mt-1 block text-[15px] text-muted">{next.hook}</span>
          </span>
          <ArrowGlyph className="size-5 shrink-0" />
        </Link>
      ) : null}

      <AdSlot place="hub" />

      <nav aria-label="시험 목록" className="sheet overflow-hidden px-5">
        <p className="kicker pt-5">모든 분석</p>
        {TESTS.map((t, i) => (
          <div key={t.id}>
            {i === 3 ? (
              <div className="py-3">
                <AdSlot place="inline" />
              </div>
            ) : null}
            <Link to={TEST_PATH[t.id]} className="cta-row">
              <span className="flex min-w-0 items-baseline gap-4">
                <span className="font-mono text-xs tabular-nums text-subtle">{t.no}</span>
                <span>
                  <span className="block text-[17px] font-semibold leading-tight">
                    {t.name}
                    {unlocks[t.id] ? <span className="ml-2 text-sm font-medium text-accent">완료</span> : null}
                  </span>
                  <span className="mt-1 block text-[14px] text-muted">{t.hook}</span>
                </span>
              </span>
              <ArrowGlyph className="size-5 shrink-0 text-subtle" />
            </Link>
          </div>
        ))}
      </nav>

      <p className="text-[13px] text-subtle">문장 하나, 또는 대화록 JSON이면 충분해요. 원문은 이 기기에서만 읽어요.</p>
    </SiteShell>
  );
}
