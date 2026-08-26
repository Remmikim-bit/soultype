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
  p.yz *= rot(0.38);
  p.xz *= rot(0.55);
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdTorus(vec3 p, vec2 t) {
  p.yz *= rot(0.32);
  vec2 q = vec2(length(p.xy) - t.x, p.z);
  return length(q) - t.y;
}

float sdOcta(vec3 p, float s) {
  p.xz *= rot(0.2);
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdDrop(vec3 p) {
  p.y += 0.18;
  float k = clamp(-p.y * 1.15, 0.0, 2.0);
  p.xz *= 1.0 + k * 1.05;
  p.y *= 0.62;
  return length(p) - 0.5;
}

float map(vec3 p) {
  p.x -= uOffset.x * 1.15;
  p.y -= uOffset.y * 0.95;
  p.xz *= rot(0.22 + 0.1 * sin(uTime * 0.22) + uPtr.x * 0.14);
  p /= max(uScale, 0.45);

  float w = uWarp * 0.1;
  p += w * vec3(
    sin(p.y * 1.6 + uTime * 0.35),
    sin(p.z * 1.5 + uTime * 0.32),
    sin(p.x * 1.55 + uTime * 0.3)
  );

  float wSum = max(uW.x + uW.y + uW.z + uW.w + uDrop, 0.0001);
  float wS = uW.x / wSum;
  float wB = uW.y / wSum;
  float wT = uW.z / wSum;
  float wO = uW.w / wSum;
  float wD = uDrop / wSum;

  float dS = sdSphere(p, 0.82);
  float dB = sdBox(p, vec3(0.66));
  float dT = sdTorus(p, vec2(0.78, 0.17));
  float dO = sdOcta(p, 1.12);
  float dD = sdDrop(p);

  float dMix = dS * wS + dB * wB + dT * wT + dO * wO + dD * wD;
  float push = 1.15;
  float dHold = 8.0;
  dHold = min(dHold, dS + (1.0 - wS) * push);
  dHold = min(dHold, dB + (1.0 - wB) * push);
  dHold = min(dHold, dT + (1.0 - wT) * push);
  dHold = min(dHold, dO + (1.0 - wO) * push);
  dHold = min(dHold, dD + (1.0 - wD) * push);
  float dominate = max(wS, max(wB, max(wT, max(wO, wD))));
  float d = mix(dMix, dHold, smoothstep(0.58, 0.9, dominate));

  float organic = clamp(wS + wD, 0.0, 1.0);
  vec3 o1 = vec3(sin(uTime * 0.33) * 1.05, 0.08 + 0.4 * cos(uTime * 0.29), 0.14);
  vec3 o2 = vec3(cos(uTime * 0.27 + 1.4) * 0.9, -0.32 * sin(uTime * 0.31), -0.08);
  d = smin(d, sdSphere(p - o1, 0.15) + (1.0 - organic) * 2.8, 0.07);
  d = smin(d, sdSphere(p - o2, 0.11) + (1.0 - organic) * 2.8, 0.06);
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
    t += d;
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
