import type { GradeCard as Grade } from "@/lib/types";

export function GradeView({ card }: { card: Grade }) {
  return (
    <article className="sheet overflow-hidden">
      <div className="grid gap-3 p-6 md:p-8">
        <p className="kicker">{card.rank}</p>
        <p className="font-mono text-5xl tabular-nums tracking-tight">{card.score}</p>
        <h2 className="text-2xl font-semibold tracking-tight">{card.headline}</h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted">{card.oneLiner}</p>
        {card.shallow ? (
          <p className="text-[15px] text-subtle">문장이 너무 짧아요. 파일을 올리면 더 정확한 결과를 볼 수 있어요.</p>
        ) : null}
      </div>
      <p className="border-t border-line px-6 py-5 text-[15px] leading-relaxed text-muted md:px-8">
        {card.detail}
      </p>
      {card.traits.length > 0 ? (
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {card.traits.map((t) => (
            <li key={t.label} className="bg-bg/40 px-6 py-5">
              <p className="text-[15px] font-medium text-fg">{t.label}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
