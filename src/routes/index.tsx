"use client";

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdGate } from "@/components/ad-gate";
import { CharacterParade } from "@/components/character-parade";
import { DropZone } from "@/components/drop-zone";
import { GateModal } from "@/components/gate-modal";
import { HowExport } from "@/components/how-export";
import { LockedPanel, MbtiCard } from "@/components/mbti-card";
import { PromptList } from "@/components/prompt-list";
import { RelayDesk } from "@/components/relay-desk";
import { SoulFieldHost } from "@/components/soul-field-host";
import { StatsPanel } from "@/components/stats-panel";
import { TerrainMap } from "@/components/terrain-map";
import { BrandMark } from "@/components/type-mark";
import { analyzeUsage } from "@/lib/analyze";
import { buildDemoExport } from "@/lib/demo-export";
import { classifyLocal, resultFromMbti } from "@/lib/mbti-local";
import { toDigest } from "@/lib/parse-export";
import { parseFile, parseObject } from "@/lib/parse-file";
import { classifyRelay, digestFromRelay } from "@/lib/relay";
import type { RelayPayload } from "@/lib/relay";
import { useAppStore } from "@/lib/store";
import type { AnalysisResult } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const mode = useAppStore((s) => s.mode);
  const status = useAppStore((s) => s.status);
  const error = useAppStore((s) => s.error);
  const parsed = useAppStore((s) => s.parsed);
  const analysis = useAppStore((s) => s.analysis);
  const unlockedMbti = useAppStore((s) => s.unlockedMbti);
  const unlockedPrompts = useAppStore((s) => s.unlockedPrompts);
  const fileLabel = useAppStore((s) => s.fileLabel);
  const chooseMode = useAppStore((s) => s.chooseMode);
  const setParsing = useAppStore((s) => s.setParsing);
  const setReady = useAppStore((s) => s.setReady);
  const setError = useAppStore((s) => s.setError);
  const setAnalyzing = useAppStore((s) => s.setAnalyzing);
  const setAnalysis = useAppStore((s) => s.setAnalysis);
  const unlockMbti = useAppStore((s) => s.unlockMbti);
  const unlockPrompts = useAppStore((s) => s.unlockPrompts);
  const reset = useAppStore((s) => s.reset);

  const [ad, setAd] = useState<"mbti" | "prompts" | null>(null);
  const [peek, setPeek] = useState<string | null>(null);
  const busy = status === "parsing" || status === "analyzing";
  const winner = unlockedMbti ? (peek ?? analysis?.mbti) : null;

  const onFile = async (file: File) => {
    setParsing(file.name);
    try {
      const next = await parseFile(file);
      if (next.stats.totalConversations === 0) {
        setError("대화가 보이지 않습니다. Grok · ChatGPT · Claude JSON인지 확인해 주세요.");
        return;
      }
      setReady(next, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "파일을 읽지 못했습니다.");
    }
  };

  const onSample = () => {
    setParsing("샘플 내보내기");
    try {
      const next = parseObject(buildDemoExport());
      setReady(next, "샘플 내보내기");
    } catch {
      setError("샘플을 열 수 없습니다.");
    }
  };

  const startExportAnalyze = () => {
    if (!parsed) return;
    setAd("mbti");
    if (analysis || status === "analyzing") return;
    const digest = toDigest(parsed);
    const local = classifyLocal(digest);
    setAnalysis(local);
    setAnalyzing();
    void analyzeUsage({ data: digest })
      .then((res) => setAnalysis(res.analysis))
      .catch(() => setAnalysis(local));
  };

  const startRelayAnalyze = (payload: RelayPayload) => {
    setAd("mbti");
    if (analysis || status === "analyzing") return;
    const local = classifyRelay(payload);
    setAnalysis(local);
    setAnalyzing();
    const digest = digestFromRelay(payload);
    void analyzeUsage({ data: digest })
      .then((res) => setAnalysis(res.analysis))
      .catch(() => setAnalysis(local));
  };

  const shown: AnalysisResult | null = analysis
    ? peek && peek !== analysis.mbti
      ? resultFromMbti(peek)
      : analysis
    : null;

  const stage = mode === null ? "gate" : unlockedMbti ? "result" : "work";

  return (
    <div className="relative min-h-dvh bg-transparent text-fg">
      <SoulFieldHost
        stage={stage}
        axes={shown?.axes ?? analysis?.axes ?? null}
        locked={unlockedMbti}
        quadrant={shown?.quadrant ?? analysis?.quadrant ?? null}
        caption={unlockedMbti && shown ? `${shown.mbti}  ·  ${shown.characterName}` : null}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="site-header mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 md:px-8">
          <button
            type="button"
            onClick={reset}
            className="pointer-events-auto flex items-center gap-3 text-left"
          >
            <BrandMark className="size-8" />
            <span className="font-serif text-lg leading-none">소울타입</span>
          </button>
          <div className="pointer-events-auto flex items-center gap-6 text-sm text-muted">
            {mode ? (
              <>
                <span className="text-fg">{mode === "simple" ? "간단" : "심층"}</span>
                <button
                  type="button"
                  onClick={reset}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  처음으로
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  document.getElementById("gate-title")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
                className="transition-opacity duration-300 hover:opacity-70"
              >
                측정
              </button>
            )}
          </div>
        </div>
      </header>

      {mode ? (
        <div className="relative">
          <div className="overlay-veil" aria-hidden="true" />
          <div className="proscenium" />
          <div className="overlay-col">
            {unlockedMbti ? <CharacterParade winner={winner} dim={false} compact /> : null}

            {mode === "simple" && !unlockedMbti ? (
              <RelayDesk busy={busy} error={error} onSubmit={startRelayAnalyze} />
            ) : null}

            {mode === "simple" && unlockedMbti && shown ? (
              <>
                <MbtiCard analysis={shown} />
                <TerrainMap active={winner} onPick={setPeek} />
                {unlockedPrompts ? (
                  <PromptList prompts={shown.imagePrompts} />
                ) : (
                  <LockedPanel
                    kicker="이미지"
                    title="이미지 프롬프트 3개"
                    body="이 캐릭터로 그림을 그릴 때 쓰는 영어 문장입니다. 광고를 보면 복사할 수 있습니다."
                    action="광고 보고 받기"
                    onAction={() => setAd("prompts")}
                  />
                )}
              </>
            ) : null}

            {mode === "export" && !parsed ? (
              <>
                <section className="grid max-w-xl gap-3">
                  <p className="kicker">심층</p>
                  <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
                    대화 기록 JSON을 올리세요
                  </h1>
                  <p className="text-sm text-muted">
                    원문 대화는 서버로 보내지 않습니다. 이 기기에서만 읽습니다.
                  </p>
                </section>
                <DropZone busy={status === "parsing"} onFile={(f) => void onFile(f)} onSample={onSample} />
                {status === "parsing" ? (
                  <p className="text-sm text-muted">
                    읽는 중 · <span className="text-fg">{fileLabel}</span>
                  </p>
                ) : null}
                {status === "error" && error ? <p className="text-sm text-muted">{error}</p> : null}
                <HowExport />
              </>
            ) : null}

            {mode === "export" && parsed ? (
              <>
                {unlockedMbti && shown ? (
                  <MbtiCard analysis={shown} />
                ) : (
                  <LockedPanel
                    kicker="결과"
                    title="네가 쓰는 AI의 유형"
                    body="광고를 보면 MBTI와 캐릭터를 확인할 수 있습니다. 대화 원문은 보내지 않습니다."
                    action="광고 보고 결과 보기"
                    onAction={startExportAnalyze}
                  />
                )}
                <StatsPanel stats={parsed.stats} />
                <TerrainMap
                  active={winner}
                  onPick={unlockedMbti ? setPeek : undefined}
                  locked={!unlockedMbti}
                />
                {unlockedMbti && shown ? (
                  unlockedPrompts ? (
                    <PromptList prompts={shown.imagePrompts} />
                  ) : (
                    <LockedPanel
                      kicker="이미지"
                      title="이미지 프롬프트 3개"
                      body="이 캐릭터로 그림을 그릴 때 쓰는 영어 문장입니다. 광고를 보면 복사할 수 있습니다."
                      action="광고 보고 받기"
                      onAction={() => setAd("prompts")}
                    />
                  )
                ) : null}
              </>
            ) : null}

            <p className="text-xs text-subtle">
              간단은 AI가 준 JSON만 읽습니다. 심층은 이 기기에서만 파일을 엽니다.
            </p>
          </div>
        </div>
      ) : null}

      <GateModal open={mode === null} onPick={chooseMode} />

      <AdGate
        kind="mbti"
        open={ad === "mbti"}
        onClose={() => setAd(null)}
        onComplete={() => {
          setAd(null);
          unlockMbti();
        }}
      />
      <AdGate
        kind="prompts"
        open={ad === "prompts"}
        onClose={() => setAd(null)}
        onComplete={() => {
          setAd(null);
          unlockPrompts();
        }}
      />
    </div>
  );
}
