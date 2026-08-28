import { Link } from "@tanstack/react-router";
import { ArrowGlyph } from "@/components/hero-switch";
import { relatedOf, TEST_PATH, type TestId } from "@/lib/catalog";

export function RelatedTests({ current }: { current: TestId }) {
  const items = relatedOf(current);
  return (
    <section className="sheet overflow-hidden px-5">
      <p className="kicker pt-5">이런 분석도 있어요</p>
      {items.map((t) => (
        <Link key={t.id} to={TEST_PATH[t.id]} className="cta-row">
          <span>
            <span className="block font-mono text-xs tabular-nums text-subtle">{t.no}</span>
            <span className="block text-[17px] font-semibold leading-tight">
              {t.name}
              <span className="mt-1 block text-[14px] font-normal text-muted">{t.hook}</span>
            </span>
          </span>
          <ArrowGlyph className="size-5 shrink-0 text-subtle" />
        </Link>
      ))}
    </section>
  );
}
