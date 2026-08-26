import type { QuadrantId } from "./characters";
import type { AxisScores } from "./types";

export type SoulStage = "gate" | "work" | "result";

export type SoulParams = {
  verts: number;
  sharp: number;
  hull: number;
  size: number;
  warp: number;
  stretch: number;
};

export const QUAD_TOKEN: Record<QuadrantId, "--color-accent" | "--color-true" | "--color-bold" | "--color-soft"> = {
  in: "--color-bold",
  is: "--color-true",
  en: "--color-accent",
  es: "--color-soft",
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function idleParams(t: number): SoulParams {
  const s = (w: number, ph: number) => 0.5 + 0.5 * Math.sin(t * w + ph);
  return {
    verts: 0.15 + 3.8 * s(0.19, 0.15) + 2.1 * s(0.11, 1.3),
    sharp: 0.06 + 0.82 * s(0.15, 1.6),
    hull: 0.04 + 0.84 * s(0.13, 0.5),
    size: 0.62 + 0.08 * Math.sin(t * 0.21),
    warp: 0.16 + 0.38 * s(0.17, 2.0),
    stretch: 0.12 + 0.78 * s(0.2, 0.8),
  };
}

export function paramsFromAxes(axes: AxisScores): SoulParams {
  const feel = Math.max(0, axes.tf);
  const think = Math.max(0, -axes.tf);
  const sense = Math.max(0, axes.ns);
  const dream = Math.max(0, -axes.ns);
  const judge = Math.max(0, -axes.jp);
  const play = Math.max(0, axes.jp);
  return {
    verts: 0.8 + play * 4.2 + dream * 1.4 + think * 0.6,
    sharp: 0.1 + think * 0.82 + judge * 0.12,
    hull: 0.06 + sense * 0.72 + judge * 0.28,
    size: 0.58 + ((axes.ie + 1) / 2) * 0.18,
    warp: 0.06 + dream * 0.5 + feel * 0.12,
    stretch: 0.15 + feel * 0.7 + play * 0.15,
  };
}

export function paramLabel(p: SoulParams): string {
  if (p.verts < 0.8 && p.sharp < 0.38) return "곡면";
  if (p.verts < 1.7) return "물방울";
  if (p.hull > 0.52 && p.sharp > 0.4) return "결정";
  return "유체";
}

export function lerpParams(a: SoulParams, b: SoulParams, t: number): SoulParams {
  const k = clamp01(t);
  return {
    verts: a.verts + (b.verts - a.verts) * k,
    sharp: a.sharp + (b.sharp - a.sharp) * k,
    hull: a.hull + (b.hull - a.hull) * k,
    size: a.size + (b.size - a.size) * k,
    warp: a.warp + (b.warp - a.warp) * k,
    stretch: a.stretch + (b.stretch - a.stretch) * k,
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
