export const SOUL_VERT = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const SOUL_FRAG = /* glsl */ `
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
  if (i == 5) return vec3(0.809, -0.15, 0.567);
  if (i == 6) return vec3(-0.809, -0.15, 0.567);
  return vec3(0.0, 0.18, -0.984);
}

float alive(float n, float i) {
  return smoothstep(i, i + 1.0, n);
}

float map(vec3 p) {
  float n = clamp(uForm.x, 0.0, 8.0);
  float sharp = clamp(uForm.y, 0.0, 1.0);
  float hull = clamp(uForm.z, 0.0, 1.0);
  float stretch = clamp(uForm.w, 0.0, 1.0);
  float size = max(uScale, 0.35);

  p.x -= uOffset.x * 1.15;
  p.y -= uOffset.y * 0.95;
  p.xz *= rot(0.18 + 0.12 * sin(uTime * 0.19) + uPtr.x * 0.16);
  p.yz *= rot(uPtr.y * 0.12);

  float a0 = alive(n, 0.0);
  float drop = a0 * (1.0 - hull) * stretch;
  p.y *= mix(1.0, 0.7, drop);
  p.xz *= mix(1.0, 1.0 + max(-p.y, 0.0) * 0.42, drop);

  float w = uWarp * 0.11;
  p += w * vec3(
    sin(p.y * 1.7 + uTime * 0.32),
    sin(p.z * 1.5 + uTime * 0.28),
    sin(p.x * 1.6 + uTime * 0.3)
  );

  float rad = length(p);
  vec3 dir = p / max(rad, 1e-4);

  float sp = 0.0;
  float dH = rad - size * 1.04;
  float kFace = mix(0.26, 0.03, sharp);
  float kLobe = mix(2.4, 16.0, sharp);
  float amp = mix(0.2, 0.52, sharp);

  for (int i = 0; i < 8; i++) {
    float a = alive(n, float(i));
    vec3 v = vertDir(i);
    float lobe = pow(max(dot(dir, v), 0.0), kLobe);
    sp = smax(sp, a * lobe, 0.1);
    float plane = dot(p, v) - size * mix(1.9, 0.56, a);
    dH = smax(dH, plane, kFace);
  }

  float dS = rad - size * (1.0 + amp * sp);
  return mix(dS, dH, hull);
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
  float sky = smoothstep(-0.2, 1.0, r.y);
  vec3 c = mix(uBg, mix(uColA, uColB, 0.4) * 0.7, sky * 0.75);
  c += pow(max(r.y, 0.0), 4.0) * mix(uColB, vec3(1.0), 0.4) * 0.4;
  float win = pow(max(dot(normalize(r), normalize(vec3(0.2, 0.6, 0.75))), 0.0), 22.0);
  c += vec3(1.0) * win * 0.9;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.02, 2.82);
  vec3 rd = normalize(vec3(uv, -1.28));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 88; i++) {
    if (float(i) >= uSteps) break;
    float d = map(ro + rd * t);
    if (d < 0.001) { hit = 1.0; break; }
    t += d * 0.86;
    if (t > 8.0) break;
  }

  vec3 col = uBg;
  col += mix(uColA, uColB, 0.5) * 0.04 * smoothstep(1.15, 0.0, length(uv - vec2(uOffset.x, uOffset.y)));

  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = nrm(p);
    vec3 v = -rd;
    float ndv = max(dot(n, v), 0.0);
    float ndl = max(dot(n, normalize(vec3(0.4, 0.82, 0.45))), 0.0);
    float fill = max(dot(n, normalize(vec3(-0.55, 0.15, 0.5))), 0.0);
    float fres = pow(1.0 - ndv, 2.4);
    vec3 rdir = reflect(rd, n);
    vec3 tint = mix(uColA, uColB, 0.18 + 0.35 * fres);
    vec3 body = tint * (0.46 + 0.48 * ndl + 0.32 * fill);
    vec3 glass = mix(tint * 0.7, env(rdir), mix(0.15, 0.75, fres));
    float spec = pow(max(dot(rdir, normalize(vec3(0.25, 0.75, 0.5))), 0.0), 22.0);
    col = mix(body, glass, 0.2);
    col += spec * mix(tint, vec3(1.0), 0.5) * 1.25;
    col += fres * mix(tint, vec3(1.0), 0.45) * 0.9;
    float ao = clamp(map(p + n * 0.05) / 0.05, 0.32, 1.0);
    col *= ao;
  }

  col = mix(uBg, col, mix(0.18 + 0.18 * uPresence, 1.0, hit));
  if (uReduced > 0.5) col = mix(uBg, col, 0.85);
  gl_FragColor = vec4(col, 1.0);
}
`;
