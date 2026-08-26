import type { QuadrantId } from "./characters";
import type { AxisScores } from "./types";

export type SoulStage = "gate" | "work" | "result";

export type SoulMorph = {
  sphere: number;
  box: number;
  torus: number;
  octa: number;
  drop: number;
  scale: number;
  warp: number;
};

export const QUAD_TOKEN: Record<QuadrantId, "--color-accent" | "--color-true" | "--color-bold" | "--color-soft"> = {
  in: "--color-bold",
  is: "--color-true",
  en: "--color-accent",
  es: "--color-soft",
};

export const FORM_LABEL: Record<keyof Omit<SoulMorph, "scale" | "warp">, string> = {
  sphere: "둥근 방울",
  box: "네모",
  torus: "도넛",
  octa: "가시",
  drop: "물방울",
};

function nrm(m: SoulMorph): SoulMorph {
  const s = m.sphere + m.box + m.torus + m.octa + m.drop || 1;
  return {
    ...m,
    sphere: m.sphere / s,
    box: m.box / s,
    torus: m.torus / s,
    octa: m.octa / s,
    drop: m.drop / s,
  };
}

function lobe(t: number, phase: number) {
  return Math.pow(Math.max(0, Math.sin(t * 0.26 + phase)), 1.8);
}

export function idleMorph(t: number): SoulMorph {
  return nrm({
    sphere: 0.16 + lobe(t, 0.1),
    box: 0.07 + lobe(t, 1.35),
    torus: 0.08 + lobe(t, 2.55),
    octa: 0.07 + lobe(t, 3.9),
    drop: 0.1 + lobe(t, 5.15),
    scale: 1.08 + 0.08 * Math.sin(t * 0.15),
    warp: 0.32 + 0.28 * Math.sin(t * 0.19 + 0.8),
  });
}

export function morphFromAxes(axes: AxisScores): SoulMorph {
  const feel = Math.max(0, axes.tf);
  const think = Math.max(0, -axes.tf);
  const sense = Math.max(0, axes.ns);
  const dream = Math.max(0, -axes.ns);
  const judge = Math.max(0, -axes.jp);
  const play = Math.max(0, axes.jp);
  return nrm({
    sphere: 0.1 + feel * 1.15 + dream * 0.28,
    box: 0.05 + sense * 1.25,
    torus: 0.05 + judge * 1.2,
    octa: 0.05 + think * 1.3,
    drop: 0.05 + play * 1.22,
    scale: 0.76 + ((axes.ie + 1) / 2) * 0.36,
    warp: 0.1 + dream * 0.9,
  });
}

export function dominantForm(m: SoulMorph): { key: keyof typeof FORM_LABEL; label: string } {
  const keys = ["sphere", "box", "torus", "octa", "drop"] as const;
  let key: (typeof keys)[number] = "sphere";
  let max = -1;
  for (const k of keys) {
    if (m[k] > max) {
      max = m[k];
      key = k;
    }
  }
  return { key, label: FORM_LABEL[key] };
}

export function lerpMorph(a: SoulMorph, b: SoulMorph, t: number): SoulMorph {
  const k = Math.min(1, Math.max(0, t));
  return {
    sphere: a.sphere + (b.sphere - a.sphere) * k,
    box: a.box + (b.box - a.box) * k,
    torus: a.torus + (b.torus - a.torus) * k,
    octa: a.octa + (b.octa - a.octa) * k,
    drop: a.drop + (b.drop - a.drop) * k,
    scale: a.scale + (b.scale - a.scale) * k,
    warp: a.warp + (b.warp - a.warp) * k,
  };
}

export function parseCssColor(value: string): [number, number, number] {
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = Number.parseInt(hex[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const rgb = v.match(/rgba?\(\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)/i);
  if (rgb) {
    const scale = Number(rgb[1]) > 1 ? 255 : 1;
    return [Number(rgb[1]) / scale, Number(rgb[2]) / scale, Number(rgb[3]) / scale];
  }
  return [0.55, 0.87, 0.55];
}

export function readTokenRgb(token: string): [number, number, number] {
  if (typeof document === "undefined") return [0.55, 0.87, 0.55];
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token);
  return parseCssColor(raw);
}

export function mixRgb(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function rgbToHex(rgb: [number, number, number]) {
  const to = (n: number) =>
    Math.round(Math.min(1, Math.max(0, n)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(rgb[0])}${to(rgb[1])}${to(rgb[2])}`;
}
