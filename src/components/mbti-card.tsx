import { AxisStack } from "@/components/axis-stack";
import { ArrowGlyph } from "@/components/hero-switch";
import { TypeMark } from "@/components/type-mark";
import type { AnalysisResult } from "@/lib/types";

export function MbtiCard({ analysis }: { analysis: AnalysisResult }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-raised">
      <div className="grid gap-8 p-6 md:grid-cols-[auto_1fr] md:p-8">
        <TypeMark mbti={analysis.mbti} className="size-28 text-accent md:size-36" />
        <div>
          <p className="text-sm text-accent">
            {analysis.quadrantTitle}
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">{analysis.headline}</h2>
          <p className="mt-4 font-serif text-2xl text-fg">{analysis.characterName}</p>
          <p className="mt-4 max-w-xl text-sm text-muted">{analysis.oneLiner}</p>
        </div>
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
            <li key={t.label} className="bg-raised px-6 py-5">
              <p className="text-sm text-accent">{t.label}</p>
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
    <div className="bg-raised px-6 py-5">
      <p className="text-sm text-accent">{title}</p>
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
    <section className="rounded-2xl bg-raised p-6 md:p-8">
      <p className="text-sm text-accent">{kicker}</p>
      <h2 className="mt-3 font-serif text-4xl tracking-tight">{title}</h2>
      <p className="mt-3 max-w-lg text-sm text-muted">{body}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-accent py-1.5 pr-5 pl-1.5 text-sm text-accent-fg transition-opacity duration-300 hover:opacity-70 active:scale-96"
      >
        <span className="grid size-8 place-items-center rounded-full bg-bg text-fg">
          <ArrowGlyph className="size-3.5" />
        </span>
        {action}
      </button>
    </section>
  );
}
