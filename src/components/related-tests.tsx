import { ArrowGlyph } from "@/components/hero-switch";
import { relatedOf, TEST_PATH, type TestId } from "@/lib/catalog";

export function RelatedTests({ current }: { current: TestId }) {
  const items = relatedOf(current);
  return (
    <section className="grid gap-2">
      <p className="kicker">이런 것도 들킨다</p>
      {items.map((t) => (
        <a key={t.id} href={TEST_PATH[t.id]} className="cta-row">
          <span>
            <span className="block font-mono text-xs tabular-nums text-subtle">{t.no}</span>
            <span className="block font-serif text-2xl">
              {t.name}
              <span className="ml-3 text-lg text-muted">{t.hook}</span>
            </span>
          </span>
          <ArrowGlyph className="size-5 shrink-0" />
        </a>
      ))}
    </section>
  );
}
