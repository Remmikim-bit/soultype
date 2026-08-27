"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "@/components/ad-slot";
import { THEATER_MS } from "@/lib/run-flow";

export function Theater({
  lines,
  ms = THEATER_MS,
}: {
  lines: string[];
  ms?: number;
}) {
  const [i, setI] = useState(0);
  const n = Math.max(lines.length, 1);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setI((k) => (k + 1) % n);
    }, Math.max(400, ms / n));
    return () => window.clearInterval(tick);
  }, [n, ms]);

  return (
    <section className="grid gap-5" data-phase="theater" data-qa="theater">
      <p key={i} className="theater-line text-[1.85rem] font-semibold tracking-tight md:text-4xl">
        {lines[i] ?? "잠시만요."}
      </p>
      <div className="progress-track">
        <div className="theater-bar h-full bg-accent" />
      </div>
      <AdSlot place="theater" />
    </section>
  );
}
