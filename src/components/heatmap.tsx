import type { DayBucket } from "@/lib/types";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function heatClass(value: number, max: number): string {
  if (value <= 0 || max <= 0) return "bg-heat-0";
  const t = value / max;
  if (t < 0.2) return "bg-heat-1";
  if (t < 0.4) return "bg-heat-2";
  if (t < 0.7) return "bg-heat-3";
  return "bg-heat-4";
}

export function Heatmap({ byDay }: { byDay: Record<string, DayBucket> }) {
  const dates = Object.keys(byDay).sort();
  if (dates.length === 0) {
    return <p className="text-sm text-muted">날짜 데이터가 없습니다.</p>;
  }
  const start = new Date(`${dates[0]}T00:00:00Z`);
  const end = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
  const startPad = start.getUTCDay();
  const days: string[] = [];
  for (let i = -startPad; i <= Math.round((end.getTime() - start.getTime()) / 86400000); i++) {
    const d = new Date(start.getTime() + i * 86400000);
    days.push(d.toISOString().slice(0, 10));
  }
  const weeks = Math.ceil(days.length / 7);
  const max = Math.max(1, ...Object.values(byDay).map((d) => d.messages));

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3">
        <div className="grid grid-rows-7 gap-[3px] py-px text-[10px] leading-3 text-subtle">
          {DAYS.map((d) => (
            <span key={d} className="h-[11px]">
              {d}
            </span>
          ))}
        </div>
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${weeks}, 11px)`,
            gridTemplateRows: "repeat(7, 11px)",
            gridAutoFlow: "column",
          }}
        >
          {days.map((date) => {
            const bucket = byDay[date];
            const v = bucket?.messages ?? 0;
            const inRange = date >= dates[0] && date <= dates[dates.length - 1];
            return (
              <span
                key={date}
                title={inRange ? `${date} · 메시지 ${v}` : ""}
                className={`block size-[11px] rounded-[2px] ${inRange ? heatClass(v, max) : "bg-transparent"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HourBars({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex h-24 items-end gap-1">
      {values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-sm bg-heat-3"
            style={{ height: `${Math.max(4, (v / max) * 100)}%` }}
          />
          {i % 6 === 0 ? (
            <span className="text-[10px] tabular-nums text-subtle">{i}</span>
          ) : (
            <span className="h-3" />
          )}
        </div>
      ))}
    </div>
  );
}
