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
uniform vec4 uW;
uniform float uDrop;
uniform float uScale;
uniform float uWarp;
uniform float uSteps;
uniform float uPresence;
uniform float uReduced;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float sdOcta(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdDrop(vec3 p) {
  p.y += 0.12;
  float k = clamp(-p.y * 0.7, 0.0, 1.4);
  p.xz *= 1.0 + k * 0.55;
  p.y *= 0.88;
  return length(p) - 0.62;
}

float map(vec3 p) {
  p.x -= uOffset.x * 1.15;
  p.y -= uOffset.y * 0.95;
  p.yz *= rot(uPtr.y * 0.42);
  p.xz *= rot(uTime * 0.11 + uPtr.x * 0.62);
  p /= max(uScale, 0.45);

  float w = uWarp * 0.16;
  p += w * vec3(
    sin(p.y * 2.1 + uTime * 0.55),
    sin(p.z * 1.9 + uTime * 0.48),
    sin(p.x * 2.0 + uTime * 0.52)
  );

  float d = 8.0;
  d = smin(d, sdSphere(p, 0.88) + (1.0 - uW.x) * 1.9, 0.2);
  d = smin(d, sdBox(p, vec3(0.58)) + (1.0 - uW.y) * 1.9, 0.16);
  d = smin(d, sdTorus(p, vec2(0.62, 0.22)) + (1.0 - uW.z) * 1.9, 0.18);
  d = smin(d, sdOcta(p, 1.02) + (1.0 - uW.w) * 1.9, 0.14);
  d = smin(d, sdDrop(p) + (1.0 - uDrop) * 1.9, 0.18);

  vec3 o1 = vec3(sin(uTime * 0.33) * 1.05, 0.12 + 0.48 * cos(uTime * 0.29), 0.18);
  vec3 o2 = vec3(cos(uTime * 0.27 + 1.4) * 0.9, -0.38 * sin(uTime * 0.31), -0.12);
  d = smin(d, sdSphere(p - o1, 0.22 + 0.1 * uDrop), 0.16);
  d = smin(d, sdSphere(p - o2, 0.18 + 0.08 * uW.x), 0.14);
  return d;
}

vec3 nrm(vec3 p) {
  vec2 e = vec2(0.0022, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

vec3 env(vec3 r) {
  float sky = smoothstep(-0.15, 1.0, r.y);
  vec3 c = mix(uBg, mix(uColA, uColB, 0.45) * 0.42, sky * 0.55);
  c += pow(max(r.y, 0.0), 5.0) * mix(uColB, vec3(1.0), 0.35) * 0.28;
  float win = pow(max(dot(normalize(r), normalize(vec3(0.25 + uPtr.x * 0.3, 0.55, 0.78))), 0.0), 36.0);
  c += vec3(0.92, 0.95, 1.0) * win * 0.72;
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 0.04, 2.52);
  vec3 rd = normalize(vec3(uv, -1.32));

  float t = 0.0;
  float hit = 0.0;
  for (int i = 0; i < 64; i++) {
    if (float(i) >= uSteps) break;
    float d = map(ro + rd * t);
    if (d < 0.0016) { hit = 1.0; break; }
    t += d;
    if (t > 7.5) break;
  }

  vec3 col = uBg;
  col += mix(uColA, uColB, 0.5 + 0.5 * uPtr.x) * 0.045 * smoothstep(1.2, 0.0, length(uv - vec2(uOffset.x, uOffset.y)));

  if (hit > 0.5) {
    vec3 p = ro + rd * t;
    vec3 n = nrm(p);
    vec3 v = -rd;
    float ndv = max(dot(n, v), 0.0);
    float fres = pow(1.0 - ndv, 3.2);
    vec3 rdir = reflect(rd, n);
    vec3 fdir = refract(rd, n, 0.97);
    if (dot(fdir, fdir) < 0.001) fdir = rdir;
    vec3 tint = mix(uColA, uColB, 0.28 + 0.45 * fres);
    vec3 glass = mix(env(fdir) * (0.35 + 0.9 * tint), env(rdir), mix(0.1, 0.9, fres));
    float spec = pow(max(dot(rdir, normalize(vec3(0.2 + uPtr.x, 0.72, 0.55))), 0.0), 42.0);
    vec3 ir = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + fres * 0.55 + uPtr.x * 0.06));
    col = glass;
    col += tint * 0.22 * pow(1.0 - ndv, 1.4);
    col += spec * mix(tint, vec3(1.0), 0.55) * 1.05;
    col += ir * fres * 0.14 * uPresence;
    float ao = clamp(map(p + n * 0.07) / 0.07, 0.4, 1.0);
    col *= ao;
  }

  float vig = smoothstep(1.38, 0.28, length(uv * vec2(0.7, 1.0)));
  col *= 0.9 + 0.1 * vig;
  col = mix(uBg, col, mix(0.28 + 0.25 * uPresence, 1.0, hit));
  if (uReduced > 0.5) col = mix(uBg, col, 0.85);
  gl_FragColor = vec4(col, 1.0);
}
`;
