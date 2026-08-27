"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { ContinueStrip } from "@/components/continue-strip";
import { GradeView } from "@/components/grade-card";
import { LockedPanel } from "@/components/mbti-card";
import { SessionIntake } from "@/components/session-intake";
import { Theater } from "@/components/theater";
import { Button } from "@/components/ui/button";
import { testOf, type GradeId } from "@/lib/catalog";
import { useRunFlow } from "@/lib/run-flow";
import { gradeById } from "@/lib/scores";
import { useAppStore } from "@/lib/store";

export function GradeRun({ id }: { id: GradeId }) {
  const meta = testOf(id)!;
  const digest = useAppStore((s) => s.digest);
  const texts = useAppStore((s) => s.humanTexts);
  const card = useAppStore((s) => s.grades[id]);
  const unlocks = useAppStore((s) => s.unlocks);
  const adKey = useAppStore((s) => s.adKey);
  const setGrade = useAppStore((s) => s.setGrade);
  const unlock = useAppStore((s) => s.unlock);
  const setAdKey = useAppStore((s) => s.setAdKey);
  const intake = useAppStore((s) => s.intake);
  const { phase, start: startTheater } = useRunFlow(id);

  const start = () => {
    if (!digest) return;
    startTheater();
    if (!card) setGrade(id, gradeById(id, digest, texts));
  };

  return (
    <div className="grid gap-5" data-phase={phase} data-qa={`${id}-run`}>
      <section className="glass grid gap-2 p-5">
        <p className="kicker">
          {meta.no} · {meta.name}
        </p>
        <h1 className="hero-title tracking-tight">{meta.name}</h1>
        <p className="text-[15px] leading-relaxed text-muted">{meta.hook}</p>
      </section>

      {phase === "in" && !digest ? <SessionIntake /> : null}

      {phase === "in" && digest ? (
        <div className="grid gap-2">
          <Button className="w-full" onClick={start} data-qa="tear">
            분석 시작하기
          </Button>
          <p className="text-[14px] text-muted">
            {intake === "simple"
              ? "붙여 넣은 문장으로 점수를 매겨 볼게요."
              : "올린 대화록으로 점수를 매겨 볼게요."}
          </p>
        </div>
      ) : null}

      {phase === "theater" ? <Theater lines={meta.theater} /> : null}

      {phase === "teaser" ? (
        <>
          <LockedPanel
            kicker={meta.name}
            title={meta.teaser}
            body="점수와 한 줄을 바로 보여 드려요."
            action="광고 보고 결과 보기"
            onAction={() => setAdKey(`${id}:main`)}
          />
          <AdSlot place="inline" />
        </>
      ) : null}

      {phase === "result" && card ? (
        <>
          <GradeView card={card} />
          {unlocks[`${id}:extra`] ? (
            <section className="sheet p-5">
              <p className="kicker">{card.extraTitle}</p>
              <p className="mt-2 text-[20px] font-semibold leading-snug">{card.extraBody}</p>
            </section>
          ) : (
            <LockedPanel
              kicker="한 줄 더"
              title={card.extraTitle}
              body="광고를 한 번 더 보면, 한 줄을 더 풀어 드려요."
              action="광고 보고 한 줄 더 보기"
              onAction={() => setAdKey(`${id}:extra`)}
            />
          )}
          <AdSlot place="inline" />
          <ContinueStrip current={id} />
        </>
      ) : null}

      <AdGate
        kind="grade"
        open={adKey === `${id}:main`}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock(id);
        }}
      />
      <AdGate
        kind="extra"
        open={adKey === `${id}:extra`}
        onClose={() => setAdKey(null)}
        onComplete={() => {
          unlock(`${id}:extra`);
        }}
      />
    </div>
  );
}
