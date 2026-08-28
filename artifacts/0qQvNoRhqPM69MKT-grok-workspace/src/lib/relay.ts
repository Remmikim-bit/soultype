import { classifyFromAxes } from "./mbti-local";
import type { AnalysisResult, AxisScores, UsageDigest } from "./types";

export const RELAY_PROMPT = `이 대화에서 내 발화만 계측해라. 사람은 읽지 못하는 측정 JSON 한 개만 출력.
설명, 인사, 마크다운, 코드펜스, 주석 금지. 키 이름은 스키마 그대로.

스키마:
{"schema":"st.v1","vec":[e0,e1,e2,e3],"w":{"ask":p,"cmd":p,"abs":p,"con":p,"push":p,"soft":p,"plan":p,"hop":p},"sig":["t0","t1"],"n":int}

vec는 -1.00~1.00 실수 4개.
e0: 부탁·물음(-1) vs 명령·지시(+1)
e1: 의미·가정(-1) vs 오류·절차·수치(+1)
e2: 반박·논리(-1) vs 위로·설득(+1)
e3: 계획·구조(-1) vs 주제점프(+1)
w의 값은 0.00~1.00.
sig는 내 말에서 뽑은 짧은 토큰, 최대 8개, 각 24자 이하.
n은 계측에 쓴 내 메시지 수. 대화가 짧으면 말투로 추정하고 n을 작게.

출력 예 형식만 참고하고 값은 이 대화에서 계산:
{"schema":"st.v1","vec":[0.12,-0.44,0.20,0.31],"w":{"ask":0.4,"cmd":0.6,"abs":0.5,"con":0.5,"push":0.4,"soft":0.3,"plan":0.2,"hop":0.6},"sig":["patch","timeout"],"n":12}`;

export type RelayPayload = {
  vec: AxisScores;
  sig: string[];
  n: number;
};

export const SAMPLE_RELAY = `{
  "schema": "st.v1",
  "vec": [0.46, 0.58, -0.41, 0.37],
  "w": { "ask": 0.18, "cmd": 0.77, "abs": 0.22, "con": 0.71, "push": 0.64, "soft": 0.14, "plan": 0.33, "hop": 0.61 },
  "sig": ["timeout", "patch", "json", "cli", "retry", "반박"],
  "n": 28
}`;

function clamp(n: number) {
  return Math.max(-1, Math.min(1, n));
}

function num(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

function asVec(raw: unknown): [number, number, number, number] | null {
  if (!Array.isArray(raw) || raw.length < 4) return null;
  const nums = raw.slice(0, 4).map(num);
  if (nums.some((n) => n == null)) return null;
  const v = nums as number[];
  const allUnit = v.every((n) => n >= 0 && n <= 1);
  const mapped = allUnit && v.some((n) => n > 0 && n < 1) ? v.map((n) => n * 2 - 1) : v;
  return [clamp(mapped[0]), clamp(mapped[1]), clamp(mapped[2]), clamp(mapped[3])];
}

function extractObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fence ? fence[1] : trimmed;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end < 0) return null;
  try {
    const parsed = JSON.parse(body.slice(start, end + 1)) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export function parseRelay(text: string): RelayPayload | null {
  const o = extractObject(text);
  if (!o) return null;
  const inner =
    o.data && typeof o.data === "object"
      ? (o.data as Record<string, unknown>)
      : o.payload && typeof o.payload === "object"
        ? (o.payload as Record<string, unknown>)
        : o;
  const vec = asVec(inner.vec ?? inner.vector ?? inner.e ?? inner.axes);
  if (!vec) return null;
  const sigRaw = inner.sig ?? inner.signals ?? inner.tok;
  const sig = Array.isArray(sigRaw)
    ? sigRaw.map((s) => String(s).slice(0, 24)).filter(Boolean).slice(0, 8)
    : [];
  const n = num(inner.n) ?? sig.length;
  return {
    vec: { ie: vec[0], ns: vec[1], tf: vec[2], jp: vec[3] },
    sig,
    n: Math.max(0, Math.round(n)),
  };
}

export function classifyRelay(payload: RelayPayload): AnalysisResult {
  return classifyFromAxes(payload.vec, { shallow: payload.n < 6 });
}

export function digestFromRelay(payload: RelayPayload): UsageDigest {
  return {
    source: "unknown",
    totalConversations: 1,
    totalMessages: Math.max(payload.n, 2),
    humanMessages: Math.max(payload.n, 1),
    assistantMessages: Math.max(payload.n, 1),
    avgMessagesPerConvo: Math.max(payload.n, 2),
    avgCharsPerHuman: 72,
    nightShare: 0.2,
    hourHistogram: Array.from({ length: 24 }, () => 0),
    weekdayHistogram: Array.from({ length: 7 }, () => 0),
    busiestDays: [],
    sampleTitles: payload.sig,
    topTokens: payload.sig.map((token, i) => ({ token, count: payload.sig.length - i })),
    spanDays: 1,
    prompts: payload.sig,
    axes: payload.vec,
  };
}
