"use client";

import { useEffect, useRef, useState } from "react";
import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { LockedPanel } from "@/components/mbti-card";
import { RelatedTests } from "@/components/related-tests";
import { Theater } from "@/components/theater";
import { Button } from "@/components/ui/button";
import { testOf } from "@/lib/catalog";
import { useRunFlow } from "@/lib/run-flow";
import { DUEL_SCENES, scoreDuel } from "@/lib/scores";
import { useAppStore } from "@/lib/store";

const META = testOf("duel")!;
const LIMIT = 90;

export function DuelRun() {
  const duel = useAppStore((s) => s.duel);
  const setDuel = useAppStore((s) => s.setDuel);
  const unlocks = useAppStore((s) => s.unlocks);
  const unlock = useAppStore((s) => s.unlock);
  const adKey = useAppStore((s) => s.adKey);
  const setAdKey = useAppStore((s) => s.setAdKey);
  const { phase, start: startTheater } = useRunFlow("duel");
  const [scene] = useState(() => DUEL_SCENES[Math.floor(Math.random() * DUEL_SCENES.length)]);
  const [prompt, setPrompt] = useState("");
  const [left, setLeft] = useState(LIMIT);
  const [running, setRunning] = useState(false);
  const promptRef = useRef(prompt);
  promptRef.current = prompt;
  const unlocked = Boolean(unlocks.duel);

  const finish = (text: string) => {
    setRunning(false);
    const next = scoreDuel(scene.brief, text);
    setDuel(next);
    startTheater();
  };

  useEffect(() => {
    if (!running) return;
    if (left <= 0) {
      finish(promptRef.current);
      return;
    }
    const id = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(id);
  }, [running, left]);

  const view: "write" | "theater" | "teaser" | "result" = !duel
    ? "write"
    : phase === "theater"
      ? "theater"
      : unlocked
        ? "result"
        : "teaser";

  return (
    <div className="grid gap-10" data-phase={view} data-qa="duel-run">
      <section className="glass grid max-w-xl gap-3 p-5 md:p-6">
        <p className="kicker">
          {META.no} · {LIMIT}초
        </p>
        <h1 className="font-serif text-4xl tracking-tight md:text-6xl">같은 과제. 프롬프트만.</h1>
        <p className="text-sm text-muted">답을 쓰지 마라. AI에게 시킬 문장만.</p>
      </section>

      {view === "write" ? (
        <section className="grid gap-4">
          <div className="sheet p-5 md:p-6">
            <p className="kicker">{scene.title}</p>
            <p className="mt-2 font-serif text-2xl">{scene.brief}</p>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            placeholder="너는 … 하지 마 … 형식은 …"
            className="w-full resize-y rounded-xl bg-surface px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              disabled={running ? prompt.trim().length < 8 : false}
              onClick={() => {
                if (running) finish(prompt);
                else setRunning(true);
              }}
            >
              {running ? "제출" : "시작"}
            </Button>
            <p className="font-mono text-sm tabular-nums text-muted">
              {running ? `${left}초` : "시작 누르면 센다"}
            </p>
          </div>
        </section>
      ) : null}

      {view === "theater" ? <Theater lines={META.theater} /> : null}

      {view === "teaser" ? (
        <>
          <LockedPanel
            kicker="한판"
            title={META.teaser}
            body="광고 보면 점수랑 빈칸을 연다."
            action="광고 보고 결과 보기"
            onAction={() => setAdKey("duel:main")}
          />
          <AdSlot place="inline" />
        </>
      ) : null}

      {view === "result" && duel ? (
        <>
          <article className="sheet overflow-hidden">
            <div className="grid gap-3 p-6 md:p-8">
              <p className="kicker">{duel.rank}</p>
              <p className="font-mono text-5xl tabular-nums">{duel.score}</p>
              <h2 className="font-serif text-3xl">이 기기에서 네가 받은 점수</h2>
            </div>
            <ul className="grid gap-px bg-line md:grid-cols-2">
              {duel.notes.map((n) => (
                <li key={n.label} className="bg-bg/40 px-6 py-5">
                  <p className="text-sm text-fg">{n.label}</p>
                  <p className="mt-2 text-sm text-muted">{n.ok ? "들어 있다" : "빠졌다"}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-6 py-5 text-sm text-muted md:px-8">{duel.extraBody}</p>
          </article>
          <AdSlot place="inline" />
          <RelatedTests current="duel" />
        </>
      ) : null}

      <AdGate
        kind="grade"
        open={adKey === "duel:main"}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock("duel");
        }}
      />
    </div>
  );
}
