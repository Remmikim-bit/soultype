"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { QuadrantId } from "@/lib/characters";
import { SOUL_FRAG, SOUL_VERT } from "@/lib/soul-shader";
import {
  idleParams,
  lerpParams,
  mixRgb,
  paramsFromAxes,
  QUAD_TOKEN,
  readTokenRgb,
  rgbToHex,
  type SoulParams,
  type SoulStage,
} from "@/lib/soul-shape";
import type { AxisScores } from "@/lib/types";

type Props = {
  stage: SoulStage;
  axes: AxisScores | null;
  locked: boolean;
  quadrant: QuadrantId | null;
  caption?: string | null;
};

const damp = (cur: number, tgt: number, dt: number, tau: number) => {
  const k = 1 - Math.exp(-dt / tau);
  return cur + (tgt - cur) * k;
};

function layoutOffset() {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const aspect = w / h;
  const mobile = w < 768;
  if (aspect >= 1.35 && w >= 960) {
    return { x: Math.min(0.42, aspect * 0.26), y: 0.0, scale: 0.98 };
  }
  if (mobile) {
    return { x: 0.0, y: 0.22, scale: 1.02 };
  }
  return { x: 0.1, y: 0.06, scale: 0.96 };
}

export function SoulField({ stage, axes, locked, quadrant, caption }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLParagraphElement>(null);
  const propsRef = useRef({ stage, axes, locked, quadrant, caption });
  propsRef.current = { stage, axes, locked, quadrant, caption };

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const applyBg = () => {
      const bg = readTokenRgb("--color-bg");
      renderer.setClearColor(new THREE.Color(bg[0], bg[1], bg[2]), 1);
      uniforms.uBg.value.set(bg[0], bg[1], bg[2]);
      return bg;
    };

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();
    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPtr: { value: new THREE.Vector2(0, 0) },
      uOffset: { value: new THREE.Vector2(0, 0.08) },
      uColA: { value: new THREE.Vector3(0.24, 0.8, 0.43) },
      uColB: { value: new THREE.Vector3(0.36, 0.39, 0.91) },
      uBg: { value: new THREE.Vector3(0.055, 0.055, 0.055) },
      uForm: { value: new THREE.Vector4(0.4, 0.2, 0.15, 0.3) },
      uScale: { value: 0.66 },
      uWarp: { value: 0.2 },
      uSteps: { value: 48 },
      uPresence: { value: 1 },
      uReduced: { value: 0 },
    };
    applyBg();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: SOUL_VERT,
      fragmentShader: SOUL_FRAG,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    const params: SoulParams = idleParams(0);
    const colA: [number, number, number] = [0.24, 0.8, 0.43];
    const colB: [number, number, number] = [0.36, 0.39, 0.91];
    const offset = { x: 0, y: 0.08 };
    let presence = 1;
    let running = true;
    let last = performance.now();
    let visible = document.visibilityState !== "hidden";

    const pal = {
      accent: readTokenRgb("--color-accent"),
      truth: readTokenRgb("--color-true"),
      bold: readTokenRgb("--color-bold"),
      soft: readTokenRgb("--color-soft"),
    };

    const refreshPalette = () => {
      applyBg();
      pal.accent = readTokenRgb("--color-accent");
      pal.truth = readTokenRgb("--color-true");
      pal.bold = readTokenRgb("--color-bold");
      pal.soft = readTokenRgb("--color-soft");
    };

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setReduced = () => {
      uniforms.uReduced.value = reducedMq.matches ? 1 : 0;
    };
    setReduced();

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
      uniforms.uSteps.value = w < 768 ? 26 : 42;
    };
    resize();

    const onPtr = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      ptr.tx = (e.clientX / w) * 2 - 1;
      ptr.ty = -((e.clientY / h) * 2 - 1);
    };

    const onVis = () => {
      visible = document.visibilityState !== "hidden";
      last = performance.now();
    };

    window.addEventListener("pointermove", onPtr, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("st-theme", refreshPalette);
    document.addEventListener("visibilitychange", onVis);
    reducedMq.addEventListener("change", setReduced);
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const mo = new MutationObserver(refreshPalette);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const tick = (now: number) => {
      if (!running) return;
      requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;

      const p = propsRef.current;
      const reduced = reducedMq.matches;
      const tauPtr = reduced ? 0.08 : 0.55;
      ptr.x = damp(ptr.x, ptr.tx, dt, tauPtr);
      ptr.y = damp(ptr.y, ptr.ty, dt, tauPtr);

      const t = now * 0.001;
      const target = p.axes ? paramsFromAxes(p.axes) : idleParams(t);
      const tauMorph = p.axes ? (p.locked ? 0.7 : 0.95) : 0.4;
      const blend = lerpParams(params, target, 1 - Math.exp(-dt / tauMorph));
      params.verts = blend.verts;
      params.sharp = blend.sharp;
      params.hull = blend.hull;
      params.size = blend.size;
      params.warp = blend.warp;
      params.stretch = blend.stretch;

      const ux = (ptr.x + 1) * 0.5;
      const uy = (ptr.y + 1) * 0.5;
      const top = mixRgb(pal.bold, pal.truth, ux);
      const bot = mixRgb(pal.accent, pal.soft, ux);
      let a = mixRgb(bot, top, uy);
      let b = mixRgb(pal.accent, pal.truth, 0.35 + 0.3 * ux);
      if (p.quadrant && p.locked) {
        const q = readTokenRgb(QUAD_TOKEN[p.quadrant]);
        a = mixRgb(a, q, 0.62);
        b = mixRgb(b, q, 0.4);
      }
      colA[0] = damp(colA[0], a[0], dt, 0.7);
      colA[1] = damp(colA[1], a[1], dt, 0.7);
      colA[2] = damp(colA[2], a[2], dt, 0.7);
      colB[0] = damp(colB[0], b[0], dt, 0.85);
      colB[1] = damp(colB[1], b[1], dt, 0.85);
      colB[2] = damp(colB[2], b[2], dt, 0.85);

      const lay = layoutOffset();
      const ox = p.stage === "gate" ? lay.x : lay.x * 0.92;
      const oy = p.stage === "gate" ? lay.y : lay.y * 0.85;
      offset.x = damp(offset.x, ox, dt, 0.8);
      offset.y = damp(offset.y, oy, dt, 0.8);
      const want = p.stage === "gate" ? 0.94 : 0.84;
      presence = damp(presence, want, dt, 0.7);

      uniforms.uTime.value = reduced ? 0 : t;
      uniforms.uPtr.value.set(ptr.x, ptr.y);
      uniforms.uOffset.value.set(offset.x, offset.y);
      uniforms.uColA.value.set(colA[0], colA[1], colA[2]);
      uniforms.uColB.value.set(colB[0], colB[1], colB[2]);
      uniforms.uForm.value.set(params.verts, params.sharp, params.hull, params.stretch);
      uniforms.uScale.value = params.size * lay.scale;
      uniforms.uWarp.value = params.warp;
      uniforms.uPresence.value = presence;

      const mood = rgbToHex(colA);
      host.style.setProperty("--mood", mood);
      document.documentElement.style.setProperty("--mood", mood);
      document.documentElement.style.setProperty("--mood-x", ptr.x.toFixed(3));
      document.documentElement.style.setProperty("--mood-y", ptr.y.toFixed(3));

      if (captionRef.current) captionRef.current.textContent = p.caption ?? "";

      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("pointermove", onPtr);
      window.removeEventListener("resize", resize);
      window.removeEventListener("st-theme", refreshPalette);
      document.removeEventListener("visibilitychange", onVis);
      reducedMq.removeEventListener("change", setReduced);
      ro.disconnect();
      mo.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className="soul-field" data-stage={stage} aria-hidden="true">
      <canvas ref={canvasRef} className="soul-field-canvas" />
      <div className="soul-scrim" />
      <p ref={formRef} className="soul-form-label" />
      <p ref={captionRef} className="soul-caption" />
    </div>
  );
}
