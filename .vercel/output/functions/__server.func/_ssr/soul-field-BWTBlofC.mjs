import { i as __toESM } from "../_runtime.mjs";
import { y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as PlaneGeometry, c as Vector2, i as OrthographicCamera, l as Vector3, n as Color, o as Scene, r as Mesh, s as ShaderMaterial, t as WebGLRenderer, u as Vector4 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/soul-field-BWTBlofC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOUL_VERT = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;
var SOUL_FRAG = `
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform vec2 uOffset;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uBg;
uniform vec4 uForm;
uniform float uScale;
uniform float uWarp;
uniform float uSteps;
uniform float uPresence;
uniform float uReduced;
uniform float uStage;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

vec3 vertDir(int i) {
  if (i == 0) return vec3(0.0, -1.0, 0.0);
  if (i == 1) return vec3(0.9428, 0.3333, 0.0);
  if (i == 2) return vec3(-0.4714, 0.3333, 0.8165);
  if (i == 3) return vec3(-0.4714, 0.3333, -0.8165);
  if (i == 4) return vec3(0.0, 1.0, 0.0);
  return vec3(0.809, -0.15, 0.567);
}

float alive(float n, float i) {
  return smoothstep(i, i + 1.0, n);
}

vec3 blobCenter(int i, float t) {
  float aspect = uRes.x / max(uRes.y, 1.0);
  float xs = clamp(aspect * 0.46, 0.22, 0.68);
  vec2 pull = uPtr * 0.2;
  if (i == 0) {
    return vec3(
      xs * (0.58 * sin(t * 0.13) + 0.2 * sin(t * 0.31)) + pull.x * 0.34,
      0.54 * sin(t * 0.27) + 0.08 * sin(t * 0.59) + pull.y * 0.2,
      0.86 * sin(t * 0.17 + 0.4)
    );
  }
  if (i == 1) {
    return vec3(
      xs * (0.82 * cos(t * 0.15 + 1.25) + 0.14 * sin(t * 0.37)) + pull.x * 0.2,
      0.5 * sin(t * 0.21 + 2.15) + 0.04 + pull.y * 0.14,
      0.74 * cos(t * 0.19 + 1.05)
    );
  }
  return vec3(
    xs * (0.5 * sin(t * 0.19 + 2.55) - 0.16 * cos(t * 0.27)) - pull.x * 0.14,
    0.44 * sin(t * 0.33 + 4.05) - 0.05 + pull.y * 0.1,
    0.7 * sin(t * 0.14 + 1.7)
  );
}

float depthScale(float z) {
  return mix(0.44, 1.2, clamp(0.5 + 0.5 * z, 0.0, 1.0));
}

float field(vec3 p, vec4 form, float size) {
  float n = clamp(form.x, 0.0, 6.0);
  float sharp = clamp(form.y, 0.0, 1.0);
  float hull = clamp(form.z, 0.0, 1.0);
  float stretch = clamp(form.w, 0.0, 1.0);
  size = max(size, 0.12);

  float a0 = alive(n, 0.0);
  float drop = a0 * (1.0 - hull) * stretch;
  p.y *= mix(1.0, 0.68, drop);
  p.xz *= mix(1.0, 1.0 + max(-p.y, 0.0) * 0.5, drop);

  float rad = length(p);
  vec3 dir = p / max(rad, 1e-4);
  float sp = 0.0;
  float dH = rad - size * 1.05;
  float kFace = mix(0.3, 0.05, sharp);
  float kLobe = mix(1.65, 11.0, sharp);
  float amp = mix(0.18, 0.5, sharp);

  for (int i = 0; i < 6; i++) {
    float a = alive(n, float(i));
    vec3 v = vertDir(i);
    float lobe = pow(max(dot(dir, v), 0.0), kLobe);
    sp = smax(sp, a * lobe, 0.15);
    float plane = dot(p, v) - size * mix(1.85, 0.54, a);
    dH = smax(dH, plane, kFace);
  }

  float dS = rad - size * (1.0 + amp * sp);
  return mix(dS, dH, hull * mix(0.5, 1.0, uStage));
}

float map(vec3 p) {
  p.x -= uOffset.x;
  p.y -= uOffset.y;
  float t = uReduced > 0.5 ? 0.0 : uTime;
  p.xz *= rot(0.07 + 0.16 * sin(t * 0.08) + uPtr.x * 0.12);
  p.xy *= rot(0.07 * sin(t * 0.06) + uPtr.y * 0.07);

  float w = uWarp * 0.17;
  p += w * vec3(
    sin(p.y * 1.32 + t * 0.31),
    sin(p.z * 1.18 + t * 0.25),
    sin(p.x * 1.24 + t * 0.29)
  );
  p += w * 0.46 * vec3(
    sin(p.z * 2.08 + t * 0.17),
    sin(p.x * 1.98 + t * 0.2),
    sin(p.y * 1.88 + t * 0.22)
  );

  float s = max(uScale, 0.28);
  vec4 f = uForm;
  float merge = mix(0.3, 0.52, 0.5 + 0.5 * sin(t * 0.19));
  merge = mix(merge, 0.2, uStage * 0.48);

  vec3 c0 = blobCenter(0, t);
  vec3 c1 = blobCenter(1, t);
  vec3 c2 = blobCenter(2, t);

  float d = 8.0;
  d = smin(d, field(p - c0, f, s * 0.68 * depthScale(c0.z)), merge);
  d = smin(d, field(p - c1, f + vec4(1.05, -0.12, 0.14, 0.2), s * 0.5 * depthScale(c1.z)), merge);
  d = smin(d, field(p - c2, f + vec4(-0.75, 0.16, -0.12, 0.28), s * 0.36 * depthScale(c2.z)), merge * 0.88);
  return d;
}

vec3 nrm(vec3 p) {
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

vec3 env(vec3 r) {
  float sky = smoothstep(-0.28, 1.0, r.y);
  vec3 c = mix(uBg, mix(uColA, uColB, 0.48) * 0.66, sky * 0.76);
  c += pow(max(r.y, 0.0), 3.2) * mix(uColB, vec3(1.0), 0.5) * 0.48;
  float win = pow(max(dot(normalize(r), normalize(vec3(0.16, 0.64, 0.76))), 0.0), 16.0);
  c += vec3(1.0) * win * 0.92;
  float band = 0.5 + 0.5 * sin(r.x * 2.8 + r.y * 1.5 + uTime * 0.07);
  c += mix(uColA, uColB, band) * 0.1 * sky;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.02, 2.86);
  vec3 rd = normalize(vec3(uv, -1.2));

  float tHit = 0.0;
  float hit = 0.0;
  float minD = 8.0;
  for (int i = 0; i < 72; i++) {
    if (float(i) >= uSteps) break;
    float d = map(ro + rd * tHit);
    minD = min(minD, d);
    if (d < 0.0011) { hit = 1.0; break; }
    tHit += d * 0.86;
    if (tHit > 8.0) break;
  }

  float g = length(uv);
  float wash = 0.08 + 0.05 * sin(uTime * 0.05);
  vec3 col = mix(uBg, mix(uColA, uColB, 0.4) * 0.3, (1.0 - smoothstep(0.1, 1.25, g)) * wash);
  float aura = exp(-max(minD, 0.0) * 7.6) * uPresence;
  col += mix(uColA, uColB, 0.52) * aura * mix(0.24, 0.38, uStage);
  col += mix(uColA, uColB, 0.45) * exp(-max(uv.y + 0.62, 0.0) * 5.4) * 0.07 * uPresence;

  if (hit > 0.5) {
    vec3 p = ro + rd * tHit;
    vec3 n = nrm(p);
    vec3 v = -rd;
    float ndv = max(dot(n, v), 0.0);
    float ndl = max(dot(n, normalize(vec3(0.36, 0.88, 0.4))), 0.0);
    float fill = max(dot(n, normalize(vec3(-0.64, 0.1, 0.5))), 0.0);
    float rim = max(dot(n, normalize(vec3(-0.12, 0.32, 0.92))), 0.0);
    float fres = pow(1.0 - ndv, mix(2.05, 3.15, uStage));
    vec3 rdir = reflect(rd, n);
    vec3 tint = mix(uColA, uColB, 0.14 + 0.52 * fres);
    vec3 body = tint * (0.26 + 0.52 * ndl + 0.34 * fill + 0.2 * rim);
    vec3 glass = mix(tint * 0.5, env(rdir), mix(0.24, 0.88, fres));
    float spec = pow(max(dot(rdir, normalize(vec3(0.2, 0.8, 0.5))), 0.0), mix(16.0, 44.0, uStage));
    vec3 ir = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + fres * 0.9 + uPtr.x * 0.12 + uTime * 0.012));
    float sss = pow(1.0 - ndv, 1.28) * (0.38 + 0.42 * (1.0 - uStage));
    float caustic = 0.5 + 0.5 * sin(p.x * 3.6 + uTime * 0.28) * sin(p.y * 3.1 - uTime * 0.21);
    col = mix(body, glass, mix(0.36, 0.52, uStage));
    col += spec * mix(tint, vec3(1.0), 0.66) * mix(0.72, 1.2, uStage);
    col += fres * mix(tint, ir, 0.66) * mix(0.44, 0.74, uStage);
    col += uColB * sss * 0.58;
    col += tint * caustic * pow(ndv, 2.2) * 0.16;
    float ao = clamp(map(p + n * 0.042) / 0.042, 0.3, 1.0);
    col *= ao;
  }

  col = mix(uBg, col, mix(0.16 + 0.2 * uPresence, 0.97, hit));
  col *= 1.05;
  col = col * (0.9 + col) / (0.9 + col * col * 0.26 + col);
  if (uReduced > 0.5) col = mix(uBg, col, 0.84);
  gl_FragColor = vec4(col, 1.0);
}
`;
var QUAD_TOKEN = {
	in: "--color-bold",
	is: "--color-true",
	en: "--color-accent",
	es: "--color-soft"
};
function clamp01(n) {
	return Math.min(1, Math.max(0, n));
}
function idleParams(t) {
	const s = (w, ph) => .5 + .5 * Math.sin(t * w + ph);
	return {
		verts: 1.15 + 2.05 * s(.09, .2) + .7 * s(.05, 1.8),
		sharp: .07 + .28 * s(.07, 1.4),
		hull: .06 + .22 * s(.06, .55),
		size: .74 + .05 * Math.sin(t * .13),
		warp: .32 + .28 * s(.11, 1.7),
		stretch: .28 + .42 * s(.1, .7)
	};
}
function paramsFromAxes(axes) {
	const feel = Math.max(0, axes.tf);
	const think = Math.max(0, -axes.tf);
	const sense = Math.max(0, axes.ns);
	const dream = Math.max(0, -axes.ns);
	const judge = Math.max(0, -axes.jp);
	const play = Math.max(0, axes.jp);
	return {
		verts: .8 + play * 4.2 + dream * 1.4 + think * .6,
		sharp: .1 + think * .82 + judge * .12,
		hull: .06 + sense * .72 + judge * .28,
		size: .64 + (axes.ie + 1) / 2 * .16,
		warp: .12 + dream * .48 + feel * .14,
		stretch: .15 + feel * .7 + play * .15
	};
}
function lerpParams(a, b, t) {
	const k = clamp01(t);
	return {
		verts: a.verts + (b.verts - a.verts) * k,
		sharp: a.sharp + (b.sharp - a.sharp) * k,
		hull: a.hull + (b.hull - a.hull) * k,
		size: a.size + (b.size - a.size) * k,
		warp: a.warp + (b.warp - a.warp) * k,
		stretch: a.stretch + (b.stretch - a.stretch) * k
	};
}
function parseCssColor(value) {
	const v = value.trim();
	const hex = v.match(/^#([0-9a-f]{6})$/i);
	if (hex) {
		const n = Number.parseInt(hex[1], 16);
		return [
			(n >> 16 & 255) / 255,
			(n >> 8 & 255) / 255,
			(n & 255) / 255
		];
	}
	const rgb = v.match(/rgba?\(\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)/i);
	if (rgb) {
		const scale = Number(rgb[1]) > 1 ? 255 : 1;
		return [
			Number(rgb[1]) / scale,
			Number(rgb[2]) / scale,
			Number(rgb[3]) / scale
		];
	}
	return [
		.55,
		.87,
		.55
	];
}
function readTokenRgb(token) {
	if (typeof document === "undefined") return [
		.55,
		.87,
		.55
	];
	return parseCssColor(getComputedStyle(document.documentElement).getPropertyValue(token));
}
function mixRgb(a, b, t) {
	return [
		a[0] + (b[0] - a[0]) * t,
		a[1] + (b[1] - a[1]) * t,
		a[2] + (b[2] - a[2]) * t
	];
}
function rgbToHex(rgb) {
	const to = (n) => Math.round(Math.min(1, Math.max(0, n)) * 255).toString(16).padStart(2, "0");
	return `#${to(rgb[0])}${to(rgb[1])}${to(rgb[2])}`;
}
var damp = (cur, tgt, dt, tau) => {
	const k = 1 - Math.exp(-dt / tau);
	return cur + (tgt - cur) * k;
};
var clockOrigin = 0;
var holdStart = 0;
var holdMs = 0;
function originTime(now, visible) {
	if (!clockOrigin) clockOrigin = now;
	if (!visible) {
		if (!holdStart) holdStart = now;
		return (holdStart - clockOrigin - holdMs) * .001;
	}
	if (holdStart) {
		holdMs += now - holdStart;
		holdStart = 0;
	}
	return (now - clockOrigin - holdMs) * .001;
}
function layoutOffset() {
	const w = window.innerWidth || 1;
	const aspect = w / (window.innerHeight || 1);
	const mobile = w < 768;
	if (aspect >= 1.35 && w >= 960) return {
		x: 0,
		y: .04,
		scale: 1.08
	};
	if (mobile) return {
		x: 0,
		y: .22,
		scale: 1.02
	};
	return {
		x: .1,
		y: .06,
		scale: .96
	};
}
function SoulField({ stage, axes, locked, quadrant, caption }) {
	const hostRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const captionRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const propsRef = (0, import_react.useRef)({
		stage,
		axes,
		locked,
		quadrant,
		caption
	});
	propsRef.current = {
		stage,
		axes,
		locked,
		quadrant,
		caption
	};
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const host = hostRef.current;
		if (!canvas || !host) return;
		let renderer;
		try {
			renderer = new WebGLRenderer({
				canvas,
				antialias: false,
				alpha: false,
				preserveDrawingBuffer: true,
				powerPreference: "high-performance"
			});
		} catch {
			return;
		}
		const applyBg = () => {
			const bg = readTokenRgb("--color-bg");
			renderer.setClearColor(new Color(bg[0], bg[1], bg[2]), 1);
			uniforms.uBg.value.set(bg[0], bg[1], bg[2]);
			return bg;
		};
		const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const scene = new Scene();
		const uniforms = {
			uRes: { value: new Vector2(1, 1) },
			uTime: { value: 0 },
			uPtr: { value: new Vector2(0, 0) },
			uOffset: { value: new Vector2(0, .08) },
			uColA: { value: new Vector3(.24, .8, .43) },
			uColB: { value: new Vector3(.36, .39, .91) },
			uBg: { value: new Vector3(.055, .055, .055) },
			uForm: { value: new Vector4(.4, .2, .15, .3) },
			uScale: { value: .66 },
			uWarp: { value: .2 },
			uSteps: { value: 48 },
			uPresence: { value: 1 },
			uReduced: { value: 0 },
			uStage: { value: 0 }
		};
		applyBg();
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		const material = new ShaderMaterial({
			uniforms,
			vertexShader: SOUL_VERT,
			fragmentShader: SOUL_FRAG,
			depthTest: false,
			depthWrite: false
		});
		const mesh = new Mesh(new PlaneGeometry(2, 2), material);
		mesh.frustumCulled = false;
		scene.add(mesh);
		const ptr = {
			x: 0,
			y: 0,
			tx: 0,
			ty: 0
		};
		const params = idleParams(0);
		const colA = [
			.24,
			.8,
			.43
		];
		const colB = [
			.36,
			.39,
			.91
		];
		const offset = {
			x: 0,
			y: .08
		};
		let presence = 1;
		let stageMix = 0;
		let running = true;
		let last = performance.now();
		let visible = document.visibilityState !== "hidden";
		const pal = {
			accent: readTokenRgb("--color-accent"),
			truth: readTokenRgb("--color-true"),
			bold: readTokenRgb("--color-bold"),
			soft: readTokenRgb("--color-soft")
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
		const onPtr = (e) => {
			const w = window.innerWidth || 1;
			const h = window.innerHeight || 1;
			ptr.tx = e.clientX / w * 2 - 1;
			ptr.ty = -(e.clientY / h * 2 - 1);
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
		mo.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"]
		});
		const tick = (now) => {
			if (!running) return;
			const t = originTime(now, visible);
			if (!visible) return;
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			const p = propsRef.current;
			const reduced = reducedMq.matches;
			const tauPtr = reduced ? .08 : .55;
			ptr.x = damp(ptr.x, ptr.tx, dt, tauPtr);
			ptr.y = damp(ptr.y, ptr.ty, dt, tauPtr);
			const target = p.axes ? paramsFromAxes(p.axes) : idleParams(t);
			const tauMorph = p.axes ? p.locked ? .7 : .95 : .4;
			const blend = lerpParams(params, target, 1 - Math.exp(-dt / tauMorph));
			params.verts = blend.verts;
			params.sharp = blend.sharp;
			params.hull = blend.hull;
			params.size = blend.size;
			params.warp = blend.warp;
			params.stretch = blend.stretch;
			const ux = (ptr.x + 1) * .5;
			const uy = (ptr.y + 1) * .5;
			const top = mixRgb(pal.bold, pal.truth, ux);
			let a = mixRgb(mixRgb(pal.accent, pal.soft, ux), top, uy);
			let b = mixRgb(pal.accent, pal.truth, .35 + .3 * ux);
			if (p.quadrant && p.locked) {
				const q = readTokenRgb(QUAD_TOKEN[p.quadrant]);
				a = mixRgb(a, q, .62);
				b = mixRgb(b, q, .4);
			}
			colA[0] = damp(colA[0], a[0], dt, .7);
			colA[1] = damp(colA[1], a[1], dt, .7);
			colA[2] = damp(colA[2], a[2], dt, .7);
			colB[0] = damp(colB[0], b[0], dt, .85);
			colB[1] = damp(colB[1], b[1], dt, .85);
			colB[2] = damp(colB[2], b[2], dt, .85);
			const lay = layoutOffset();
			const ox = p.stage === "gate" ? lay.x : lay.x * .92;
			const oy = p.stage === "gate" ? lay.y : lay.y * .85;
			offset.x = damp(offset.x, ox, dt, .8);
			offset.y = damp(offset.y, oy, dt, .8);
			const want = p.stage === "gate" ? .96 : p.stage === "result" ? .9 : .86;
			presence = damp(presence, want, dt, .85);
			const stageTgt = p.stage === "result" ? 1 : p.stage === "work" ? .45 : 0;
			stageMix = damp(stageMix, stageTgt, dt, 1.1);
			uniforms.uTime.value = reduced ? uniforms.uTime.value : t;
			uniforms.uPtr.value.set(ptr.x, ptr.y);
			uniforms.uOffset.value.set(offset.x, offset.y);
			uniforms.uColA.value.set(colA[0], colA[1], colA[2]);
			uniforms.uColB.value.set(colB[0], colB[1], colB[2]);
			uniforms.uForm.value.set(params.verts, params.sharp, params.hull, params.stretch);
			uniforms.uScale.value = params.size * lay.scale * (1 + .035 * Math.sin(t * .37));
			uniforms.uWarp.value = params.warp;
			uniforms.uPresence.value = presence;
			uniforms.uStage.value = stageMix;
			const mood = rgbToHex(colA);
			host.style.setProperty("--mood", mood);
			document.documentElement.style.setProperty("--mood", mood);
			document.documentElement.style.setProperty("--mood-x", ptr.x.toFixed(3));
			document.documentElement.style.setProperty("--mood-y", ptr.y.toFixed(3));
			if (captionRef.current) captionRef.current.textContent = p.caption ?? "";
			renderer.render(scene, camera);
		};
		renderer.setAnimationLoop(tick);
		return () => {
			running = false;
			renderer.setAnimationLoop(null);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: hostRef,
		className: "soul-field",
		"data-stage": stage,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "soul-field-canvas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "soul-scrim" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				ref: formRef,
				className: "soul-form-label"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				ref: captionRef,
				className: "soul-caption"
			})
		]
	});
}
//#endregion
export { SoulField };
