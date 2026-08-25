import { cn } from "@/lib/utils";

const SHAPES: Record<string, string> = {
  E: "M4 4h16v6H4z",
  I: "M10 3h4v18h-4z",
  S: "M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z",
  N: "M4 20 L12 4 L20 20 Z",
  T: "M3 5h18v4H15v12H9V9H3z",
  F: "M4 4h16v4H8v4h10v4H8v8H4z",
  J: "M5 5h14v14H5z",
  P: "M4 6h16v4H4zm0 8h10v4H4z",
};

export function TypeMark({
  mbti,
  className,
}: {
  mbti: string;
  className?: string;
}) {
  const letters = mbti.slice(0, 4).toUpperCase().split("");
  return (
    <svg viewBox="0 0 88 88" className={cn("text-current", className)} aria-hidden="true">
      <circle cx="44" cy="44" r="42" fill="var(--color-bg)" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      {letters.map((ch, i) => {
        const x = 10 + (i % 2) * 34;
        const y = 10 + Math.floor(i / 2) * 34;
        return (
          <g key={`${ch}-${i}`} transform={`translate(${x} ${y})`}>
            <path
              d={SHAPES[ch] ?? SHAPES.I}
              transform="scale(0.72)"
              fill="currentColor"
              opacity={0.92}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("text-accent", className)} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="var(--color-raised)" />
      <path
        d="M16 6v20M6 16h20M8.8 8.8l14.4 14.4M23.2 8.8 8.8 23.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
