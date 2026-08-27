"use client";

import { useEffect, useRef, useState } from "react";
import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { ContinueStrip } from "@/components/continue-strip";
import { LockedPanel } from "@/components/mbti-card";
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
    <div className="grid gap-5" data-phase={view} data-qa="duel-run">
      <section className="glass grid gap-2 p-5">
        <p className="kicker">
          {META.no} · {META.name} · {LIMIT}초
        </p>
        <h1 className="hero-title tracking-tight">{META.name}</h1>
        <p className="text-[15px] leading-relaxed text-muted">{META.hook}</p>
      </section>

      {view === "write" ? (
        <section className="grid gap-4">
          <div className="sheet p-5">
            <p className="kicker">{scene.title}</p>
            <p className="mt-2 text-[18px] font-semibold leading-snug">{scene.brief}</p>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            placeholder="너는 … 하지 마 … 형식은 …"
            className="w-full resize-y rounded-xl bg-surface px-4 py-3 text-[15px] text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              disabled={running ? prompt.trim().length < 8 : false}
              onClick={() => {
                if (running) finish(prompt);
                else setRunning(true);
              }}
            >
              {running ? "제출하기" : "시작하기"}
            </Button>
            <p className="text-[15px] tabular-nums text-muted">
              {running ? `${left}초 남았어요` : "시작하기를 누르면 초를 세기 시작해요."}
            </p>
          </div>
        </section>
      ) : null}

      {view === "theater" ? <Theater lines={META.theater} /> : null}

      {view === "teaser" ? (
        <>
          <LockedPanel
            kicker={META.name}
            title={META.teaser}
            body="점수와 빈칸을 바로 보여 드려요."
            action="광고 보고 결과 보기"
            onAction={() => setAdKey("duel:main")}
          />
          <AdSlot place="inline" />
        </>
      ) : null}

      {view === "result" && duel ? (
        <>
          <article className="sheet overflow-hidden">
            <div className="grid gap-2 p-5">
              <p className="kicker">{duel.rank}</p>
              <p className="text-5xl font-semibold tabular-nums">{duel.score}</p>
              <h2 className="text-[22px] font-semibold">이 한판에서 받은 점수예요</h2>
            </div>
            <ul className="grid gap-px bg-line md:grid-cols-2">
              {duel.notes.map((n) => (
                <li key={n.label} className="bg-bg/40 px-5 py-4">
                  <p className="text-[15px] font-medium text-fg">{n.label}</p>
                  <p className="mt-2 text-[15px] text-muted">{n.ok ? "들어 있어요" : "빠져 있어요"}</p>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-5 py-4 text-[15px] leading-relaxed text-muted">{duel.extraBody}</p>
          </article>
          <AdSlot place="inline" />
          <ContinueStrip current="duel" />
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
