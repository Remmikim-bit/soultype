import { AxisStack } from "@/components/axis-stack";
import { Button } from "@/components/ui/button";
import { QUADRANT_TINT } from "@/lib/characters";
import type { AnalysisResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MbtiCard({ analysis }: { analysis: AnalysisResult }) {
  return (
    <article className={cn("overflow-hidden rounded-xl", QUADRANT_TINT[analysis.quadrant])} data-qa="mbti-card">
      <div className="grid gap-3 p-5 md:p-6">
        <p className="kicker">{analysis.quadrantTitle}</p>
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          지금 쓰는 AI의 MBTI는 {analysis.mbti}이에요
        </h2>
        <p className="text-[17px] font-medium text-muted">{analysis.characterName}</p>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted">{analysis.oneLiner}</p>
      </div>
      <div className="border-t border-line px-5 py-5 md:px-6">
        <p className="kicker">말투가 기울어진 쪽</p>
        <div className="mt-4">
          <AxisStack axes={analysis.axes} />
        </div>
      </div>
      <div className="grid gap-px bg-line md:grid-cols-2">
        <Block title="이런 식으로 움직여요" body={analysis.howYouUse} />
        <Block title="이런 말버릇이에요" body={analysis.ritual} />
      </div>
      {analysis.traits.length > 0 ? (
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {analysis.traits.map((t) => (
            <li key={t.label} className="bg-bg/40 px-5 py-4">
              <p className="text-[15px] font-medium text-fg">{t.label}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-bg/40 px-5 py-4">
      <p className="text-[15px] font-medium text-fg">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function LockedPanel({
  kicker,
  title,
  body,
  action,
  onAction,
}: {
  kicker: string;
  title: string;
  body: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <section className="sheet p-5 md:p-6" data-qa="lock-panel">
      <p className="kicker">{kicker}</p>
      <h2 className="mt-2 text-[22px] font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">{body}</p>
      <Button className="mt-5 w-full" onClick={onAction} data-qa="lock-cta">
        {action}
      </Button>
    </section>
  );
}
