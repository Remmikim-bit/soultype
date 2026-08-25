import { Heatmap, HourBars } from "@/components/heatmap";
import type { ParsedStats } from "@/lib/types";

const SOURCE: Record<ParsedStats["source"], string> = {
  grok: "Grok",
  chatgpt: "ChatGPT",
  claude: "Claude",
  unknown: "JSON",
};

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

function kstDate(ms: number | null) {
  if (ms == null) return "—";
  const d = new Date(ms + 9 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10).replaceAll("-", ".");
}

function peakIndex(values: number[]) {
  let max = -1;
  let idx = 0;
  values.forEach((v, i) => {
    if (v > max) {
      max = v;
      idx = i;
    }
  });
  return idx;
}

export function StatsPanel({ stats }: { stats: ParsedStats }) {
  const peakHour = peakIndex(stats.hourHistogram);
  const peakDay = DAYS[peakIndex(stats.weekdayHistogram)] ?? "—";
  const maxWeek = Math.max(1, ...stats.weekdayHistogram);

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-accent">{SOURCE[stats.source]} 사용 기록</p>
          <h2 className="mt-1 font-serif text-4xl tracking-tight">이 기기에서 읽은 기록</h2>
        </div>
        <p className="text-sm text-muted">
          {kstDate(stats.firstDate)} – {kstDate(stats.lastDate)}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="대화" value={fmt(stats.totalConversations)} />
        <Stat label="메시지" value={fmt(stats.totalMessages)} />
        <Stat label="밤 메시지" value={`${Math.round(stats.nightShare * 100)}%`} hint="22–06시" />
        <Stat label="대화당 메시지" value={fmt(stats.avgMessagesPerConvo)} />
      </dl>

      <div className="rounded-2xl bg-raised p-5 md:p-6">
        <p className="text-sm text-accent">일별 메시지</p>
        <div className="mt-4">
          <Heatmap byDay={stats.byDay} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-raised p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-accent">시간대 · 한국</p>
            <p className="font-mono text-sm tabular-nums text-muted">{peakHour}시에 가장 많음</p>
          </div>
          <div className="mt-4">
            <HourBars values={stats.hourHistogram} />
          </div>
        </div>
        <div className="rounded-2xl bg-raised p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-accent">요일</p>
            <p className="text-sm text-muted">{peakDay}요일에 가장 많음</p>
          </div>
          <div className="mt-6 flex h-24 items-end gap-2">
            {stats.weekdayHistogram.map((v, i) => (
              <div key={DAYS[i]} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-sm bg-heat-3"
                  style={{ height: `${Math.max(8, (v / maxWeek) * 100)}%` }}
                />
                <span className="text-xs text-subtle">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {stats.topTokens.length > 0 ? (
        <div className="rounded-2xl bg-raised p-5">
          <p className="text-sm text-accent">대화 제목에 자주 나온 말</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stats.topTokens.map((t) => (
              <li
                key={t.token}
                className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
              >
                {t.token}
                <span className="ml-2 font-mono text-xs tabular-nums text-subtle">{t.count}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-raised px-4 py-5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-2 font-serif text-4xl tabular-nums tracking-tight text-accent">{value}</dd>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}
