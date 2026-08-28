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
