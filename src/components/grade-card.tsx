import type { GradeCard as Grade } from "@/lib/types";

export function GradeView({ card }: { card: Grade }) {
  return (
    <article className="sheet overflow-hidden">
      <div className="grid gap-3 p-6 md:p-8">
        <p className="kicker">{card.rank}</p>
        <p className="font-mono text-5xl tabular-nums tracking-tight">{card.score}</p>
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">{card.headline}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted">{card.oneLiner}</p>
        {card.shallow ? (
          <p className="text-sm text-subtle">문장이 짧다. 파일 올리면 더 독해진다.</p>
        ) : null}
      </div>
      <p className="border-t border-line px-6 py-5 text-sm leading-relaxed text-muted md:px-8">
        {card.detail}
      </p>
      {card.traits.length > 0 ? (
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {card.traits.map((t) => (
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
