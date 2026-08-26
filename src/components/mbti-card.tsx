import { AxisStack } from "@/components/axis-stack";
import { ArrowGlyph } from "@/components/hero-switch";
import { QUADRANT_TINT } from "@/lib/characters";
import type { AnalysisResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MbtiCard({ analysis }: { analysis: AnalysisResult }) {
  return (
    <article className={cn("overflow-hidden", QUADRANT_TINT[analysis.quadrant])}>
      <div className="grid gap-4 p-6 md:p-8">
        <p className="kicker">{analysis.quadrantTitle}</p>
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
          네가 쓰는 AI의 MBTI는 {analysis.mbti}야
        </h2>
        <p className="font-serif text-xl text-muted">{analysis.characterName}</p>
        <p className="max-w-xl text-sm leading-relaxed text-muted">{analysis.oneLiner}</p>
      </div>
      <div className="border-t border-line px-6 py-6 md:px-8">
        <AxisStack axes={analysis.axes} />
      </div>
      <div className="grid gap-px bg-line md:grid-cols-2">
        <Block title="이렇게 됩니다" body={analysis.howYouUse} />
        <Block title="당신의 말버릇" body={analysis.ritual} />
      </div>
      {analysis.traits.length > 0 ? (
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {analysis.traits.map((t) => (
            <li key={t.label} className="bg-bg/40 px-6 py-5">
              <p className="text-sm text-fg">{t.label}</p>
              <p className="mt-2 text-sm text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-bg/40 px-6 py-5">
      <p className="text-sm text-fg">{title}</p>
      <p className="mt-2 text-sm text-muted">{body}</p>
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
    <section className="sheet p-6 md:p-8">
      <p className="kicker">{kicker}</p>
      <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{body}</p>
      <button type="button" onClick={onAction} className="cta-row mt-4">
        <span className="font-serif text-xl">{action}</span>
        <ArrowGlyph className="size-5 shrink-0" />
      </button>
    </section>
  );
}
