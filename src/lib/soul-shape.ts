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

export const FORM_KEYS = ["sphere", "box", "torus", "octa", "drop"] as const;
export type FormKey = (typeof FORM_KEYS)[number];

export const QUAD_TOKEN: Record<QuadrantId, "--color-accent" | "--color-true" | "--color-bold" | "--color-soft"> = {
  in: "--color-bold",
  is: "--color-true",
  en: "--color-accent",
  es: "--color-soft",
};

export const FORM_LABEL: Record<FormKey, string> = {
  sphere: "둥근 방울",
  box: "네모",
  torus: "도넛",
  octa: "가시",
  drop: "물방울",
};

const HOLD = 3.0;
const FADE = 2.2;
const SPAN = HOLD + FADE;

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

function emptyWeights(): Record<FormKey, number> {
  return { sphere: 0, box: 0, torus: 0, octa: 0, drop: 0 };
}

function withWeights(w: Record<FormKey, number>, scale: number, warp: number): SoulMorph {
  return nrm({
    sphere: w.sphere,
    box: w.box,
    torus: w.torus,
    octa: w.octa,
    drop: w.drop,
    scale,
    warp,
  });
}

function organicWarp(w: Record<FormKey, number>) {
  return 0.04 + 0.5 * (w.sphere + w.drop);
}

export function idleMorph(t: number): SoulMorph {
  const cycle = SPAN * FORM_KEYS.length;
  const x = ((t % cycle) + cycle) % cycle;
  const i = Math.floor(x / SPAN) % FORM_KEYS.length;
  const local = (x - i * SPAN) / SPAN;
  const fadeStart = HOLD / SPAN;
  const k = local < fadeStart ? 0 : (local - fadeStart) / (1 - fadeStart);
  const s = k * k * k * (k * (k * 6 - 15) + 10);
  const from = FORM_KEYS[i];
  const to = FORM_KEYS[(i + 1) % FORM_KEYS.length];
  const w = emptyWeights();
  w[from] += 1 - s;
  w[to] += s;
  return withWeights(w, 0.72, organicWarp(w));
}

export function morphFromAxes(axes: AxisScores): SoulMorph {
  const feel = Math.max(0, axes.tf);
  const think = Math.max(0, -axes.tf);
  const sense = Math.max(0, axes.ns);
  const dream = Math.max(0, -axes.ns);
  const judge = Math.max(0, -axes.jp);
  const play = Math.max(0, axes.jp);
  const raw = nrm({
    sphere: 0.08 + feel * 1.2 + dream * 0.22,
    box: 0.04 + sense * 1.35,
    torus: 0.04 + judge * 1.3,
    octa: 0.04 + think * 1.4,
    drop: 0.04 + play * 1.32,
    scale: 0.62 + ((axes.ie + 1) / 2) * 0.2,
    warp: 0,
  });
  const ranked = [...FORM_KEYS].sort((a, b) => raw[b] - raw[a]);
  const w = emptyWeights();
  w[ranked[0]] = 0.9;
  w[ranked[1]] = 0.1;
  return withWeights(w, raw.scale, 0.04 + dream * 0.5);
}

export function dominantForm(m: SoulMorph): { key: FormKey; label: string } {
  let key: FormKey = "sphere";
  let max = -1;
  for (const k of FORM_KEYS) {
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
