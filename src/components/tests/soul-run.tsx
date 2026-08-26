"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { CharacterParade } from "@/components/character-parade";
import { LockedPanel, MbtiCard } from "@/components/mbti-card";
import { PromptList } from "@/components/prompt-list";
import { RelatedTests } from "@/components/related-tests";
import { SessionIntake } from "@/components/session-intake";
import { StatsPanel } from "@/components/stats-panel";
import { TerrainMap } from "@/components/terrain-map";
import { Theater } from "@/components/theater";
import { ArrowGlyph } from "@/components/hero-switch";
import { analyzeUsage } from "@/lib/analyze";
import { testOf } from "@/lib/catalog";
import { classifyLocal, resultFromMbti } from "@/lib/mbti-local";
import { useRunFlow } from "@/lib/run-flow";
import { useAppStore } from "@/lib/store";
import type { AnalysisResult } from "@/lib/types";
import { useState } from "react";

const META = testOf("soul")!;

export function SoulRun() {
  const digest = useAppStore((s) => s.digest);
  const parsed = useAppStore((s) => s.parsed);
  const stats = useAppStore((s) => s.stats);
  const soul = useAppStore((s) => s.soul);
  const unlocks = useAppStore((s) => s.unlocks);
  const adKey = useAppStore((s) => s.adKey);
  const setSoul = useAppStore((s) => s.setSoul);
  const setAnalyzing = useAppStore((s) => s.setAnalyzing);
  const unlock = useAppStore((s) => s.unlock);
  const setAdKey = useAppStore((s) => s.setAdKey);
  const intake = useAppStore((s) => s.intake);
  const { phase, start: startTheater } = useRunFlow("soul");
  const [peek, setPeek] = useState<string | null>(null);

  const unlocked = Boolean(unlocks.soul);
  const winner = unlocked ? (peek ?? soul?.mbti) : null;
  const shown: AnalysisResult | null = soul
    ? peek && peek !== soul.mbti
      ? resultFromMbti(peek)
      : soul
    : null;

  const start = () => {
    if (!digest) return;
    startTheater();
    if (soul) return;
    const local = classifyLocal(digest);
    setSoul(local);
    window.setTimeout(() => {
      setAnalyzing();
      void analyzeUsage({ data: digest })
        .then((res) => setSoul(res.analysis))
        .catch(() => setSoul(local));
    }, 3200);
  };

  return (
    <div className="grid gap-10" data-phase={phase} data-qa="soul-run">
      <section className="glass grid max-w-xl gap-3 p-5 md:p-6">
        <p className="kicker">{META.no}</p>
        <h1 className="font-serif text-4xl tracking-tight md:text-6xl">한 장만 뽑는다</h1>
        <p className="text-sm text-muted">맞는지 네가 알아.</p>
      </section>

      {phase === "in" && !digest ? <SessionIntake /> : null}

      {phase === "in" && digest ? (
        <button type="button" onClick={start} className="cta-row" data-qa="tear">
          <span>
            <span className="block font-serif text-2xl">뜯기</span>
            <span className="mt-1 block text-sm text-muted">
              {intake === "simple" ? "문장으로" : "올린 기록으로"}
            </span>
          </span>
          <ArrowGlyph className="size-5 shrink-0" />
        </button>
      ) : null}

      {phase === "theater" ? <Theater lines={META.theater} /> : null}

      {phase === "teaser" ? (
        <>
          <LockedPanel
            kicker={META.name}
            title={META.teaser}
            body="광고 보면 글자 네 개랑 이름을 열어줄게."
            action="광고 보고 결과 보기"
            onAction={() => setAdKey("soul:mbti")}
          />
          <AdSlot place="inline" />
        </>
      ) : null}

      {phase === "result" && unlocked && shown ? (
        <>
          <CharacterParade winner={winner} dim={false} compact />
          <MbtiCard analysis={shown} />
          {parsed ? <StatsPanel stats={parsed.stats} /> : stats ? <StatsPanel stats={stats} /> : null}
          <TerrainMap active={winner} onPick={setPeek} />
          {unlocks["soul:prompts"] ? (
            <PromptList prompts={shown.imagePrompts} />
          ) : (
            <LockedPanel
              kicker="이미지"
              title="이미지 프롬프트 3개"
              body="이 얼굴로 그릴 때 쓰는 영어 문장. 광고 보면 복사."
              action="광고 보고 받기"
              onAction={() => setAdKey("soul:prompts")}
            />
          )}
          <AdSlot place="inline" />
          <RelatedTests current="soul" />
        </>
      ) : null}

      <AdGate
        kind="mbti"
        open={adKey === "soul:mbti"}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock("soul");
        }}
      />
      <AdGate
        kind="prompts"
        open={adKey === "soul:prompts"}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock("soul:prompts");
        }}
      />
    </div>
  );
}
