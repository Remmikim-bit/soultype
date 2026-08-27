"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AdSlot } from "@/components/ad-slot";
import { SiteShell } from "@/components/site-shell";
import { ArrowGlyph } from "@/components/hero-switch";
import { TESTS, TEST_PATH } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const digest = useAppStore((s) => s.digest);
  const fileLabel = useAppStore((s) => s.fileLabel);

  return (
    <SiteShell stage="gate" home>
      <section className="grid max-w-xl gap-4">
        <p className="kicker">소울타입 · 내 AI의 MBTI</p>
        <h1 id="hub-title" className="font-serif text-5xl tracking-tight md:text-7xl">
          뭐부터 들킬까
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          쓰는 습관이 얼굴을 만든다. 한 번 올리면 여러 번 뜯는다.
        </p>
        {digest ? (
          <p className="text-sm text-fg">
            대화록 있음{fileLabel ? ` · ${fileLabel}` : ""}. 바로 뜯어도 된다.
          </p>
        ) : null}
      </section>

      <AdSlot place="hub" />

      <nav aria-label="시험 목록">
        {TESTS.map((t, i) => (
          <div key={t.id}>
            {i === 3 ? <AdSlot place="inline" /> : null}
            <a href={TEST_PATH[t.id]} className="cta-row">
              <span className="flex min-w-0 items-baseline gap-4">
                <span className="font-mono text-xs tabular-nums text-subtle">{t.no}</span>
                <span>
                  <span className="block font-serif text-2xl md:text-3xl">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted">{t.hook}</span>
                </span>
              </span>
              <ArrowGlyph className="size-5 shrink-0" />
            </a>
          </div>
        ))}
      </nav>

      <p className="text-xs text-subtle">문장 하나거나 대화록 JSON. 이 기기에서만 읽는다.</p>
    </SiteShell>
  );
}
