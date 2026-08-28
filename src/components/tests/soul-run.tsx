"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { CharacterParade } from "@/components/character-parade";
import { ContinueStrip } from "@/components/continue-strip";
import { LockedPanel, MbtiCard } from "@/components/mbti-card";
import { PromptList } from "@/components/prompt-list";
import { SessionIntake } from "@/components/session-intake";
import { StatsPanel } from "@/components/stats-panel";
import { TerrainMap } from "@/components/terrain-map";
import { Theater } from "@/components/theater";
import { Button } from "@/components/ui/button";
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
    <div className="grid gap-5" data-phase={phase} data-qa="soul-run">
      <section className="glass grid gap-2 p-5">
        <p className="kicker">{META.no}</p>
        <h1 className="hero-title tracking-tight">{META.name}</h1>
        <p className="text-[15px] leading-relaxed text-muted">{META.hook}</p>
      </section>

      {phase === "in" && !digest ? <SessionIntake /> : null}

      {phase === "in" && digest ? (
        <div className="sheet grid gap-2 p-4">
          <Button className="w-full" onClick={start} data-qa="tear">
            분석 시작하기
          </Button>
          <p className="text-[14px] text-muted">
            {intake === "simple"
              ? "붙여 넣은 문장으로 성격을 분석해요."
              : "올린 대화록으로 성격을 분석해요."}
          </p>
        </div>
      ) : null}

      {phase === "theater" ? <Theater lines={META.theater} /> : null}

      {phase === "teaser" ? (
        <>
          <LockedPanel
            kicker={META.name}
            title={META.teaser}
            body="유형 글자 네 개와 이름까지 한 번에 보여 드려요."
            action="광고 보고 결과 보기"
            onAction={() => setAdKey("soul:mbti")}
          />
          <AdSlot place="inline" />
        </>
      ) : null}

      {phase === "result" && unlocked && shown ? (
        <>
          <div>
            <p className="kicker">다른 사람들의 AI</p>
            <p className="mt-1 text-[20px] font-semibold">다른 사람들의 AI 유형이에요</p>
          </div>
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
              body="이 얼굴로 그릴 때 쓰는 영어 문장이에요. 광고를 보면 복사할 수 있어요."
              action="광고 보고 프롬프트 보기"
              onAction={() => setAdKey("soul:prompts")}
            />
          )}
          <AdSlot place="inline" />
          <ContinueStrip current="soul" />
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
