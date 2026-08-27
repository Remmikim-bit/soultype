"use client";

import { AdGate } from "@/components/ad-gate";
import { AdSlot } from "@/components/ad-slot";
import { GradeView } from "@/components/grade-card";
import { LockedPanel } from "@/components/mbti-card";
import { RelatedTests } from "@/components/related-tests";
import { SessionIntake } from "@/components/session-intake";
import { Theater } from "@/components/theater";
import { ArrowGlyph } from "@/components/hero-switch";
import { testOf, type GradeId } from "@/lib/catalog";
import { useRunFlow } from "@/lib/run-flow";
import { gradeById } from "@/lib/scores";
import { useAppStore } from "@/lib/store";

const INTRO: Record<GradeId, { title: string; body: string }> = {
  abuse: { title: "반말부터 센다", body: "AI 입장에서 고소감 있는지." },
  love: { title: "연애, 몇 점이야", body: "AI가 본 네 연애. 결론은 나중에." },
  skill: { title: "만렙인지 복붙인지", body: "초보 챗봇부터 조련사까지. 렙은 숨긴다." },
};

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
  const copy = INTRO[id];

  const start = () => {
    if (!digest) return;
    startTheater();
    if (!card) setGrade(id, gradeById(id, digest, texts));
  };

  return (
    <div className="grid gap-10" data-phase={phase} data-qa={`${id}-run`}>
      <section className="glass grid max-w-xl gap-3 p-5 md:p-6">
        <p className="kicker">
          {meta.no} · {meta.name}
        </p>
        <h1 className="font-serif text-4xl tracking-tight md:text-6xl">{copy.title}</h1>
        <p className="text-sm text-muted">{copy.body}</p>
      </section>

      {phase === "in" && !digest ? <SessionIntake /> : null}

      {phase === "in" && digest ? (
        <button type="button" onClick={start} className="cta-row" data-qa="tear">
          <span>
            <span className="block font-serif text-2xl">뜯기</span>
            <span className="mt-1 block text-sm text-muted">
              {intake === "simple" ? "문장으로" : "올린 대화록으로"}
            </span>
          </span>
          <ArrowGlyph className="size-5 shrink-0" />
        </button>
      ) : null}

      {phase === "theater" ? <Theater lines={meta.theater} /> : null}

      {phase === "teaser" ? (
        <>
          <LockedPanel
            kicker={meta.name}
            title={meta.teaser}
            body="광고 보면 점수랑 한 줄을 연다."
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
            <section className="sheet p-6 md:p-8">
              <p className="kicker">{card.extraTitle}</p>
              <p className="mt-3 font-serif text-2xl">{card.extraBody}</p>
            </section>
          ) : (
            <LockedPanel
              kicker="한 줄 더"
              title={card.extraTitle}
              body="광고 한 번 더 보면 독하게 말한다."
              action="광고 보고 받기"
              onAction={() => setAdKey(`${id}:extra`)}
            />
          )}
          <AdSlot place="inline" />
          <RelatedTests current={id} />
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
