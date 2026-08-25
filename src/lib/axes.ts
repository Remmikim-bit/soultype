import type { AxisScores, UsageDigest } from "./types";

export const AXIS_META = [
  {
    key: "ie" as const,
    left: { letter: "I", label: "상전" },
    right: { letter: "E", label: "하인" },
    hint: "저자세로 물으면 위를 차지하고, 시키면 하수인이 된다",
  },
  {
    key: "ns" as const,
    left: { letter: "N", label: "몽상" },
    right: { letter: "S", label: "팩트" },
    hint: "의미·가정이 쌓이면 몽상, 오류·절차가 쌓이면 팩트",
  },
  {
    key: "tf" as const,
    left: { letter: "T", label: "반골" },
    right: { letter: "F", label: "세뇌" },
    hint: "반박을 시키면 반골, 위로·설득을 시키면 세뇌",
  },
  {
    key: "jp" as const,
    left: { letter: "J", label: "음모" },
    right: { letter: "P", label: "ADHD" },
    hint: "계획·시스템을 맡기면 음모, 주제를 건너뛰면 ADHD",
  },
];

const POLES = {
  ie: {
    left: ["알려줘", "알려주세요", "어떻게 생각", "잘 모르", "조언", "괜찮을까", "도와", "해주세요", "부탁", "고민", "어떻게 해야", "좀 ", "될까요", "봐줘", "봐주세요", "모르겠어"],
    right: ["해라", "만들어", "짜줘", "짜 줘", "고쳐", "요약해", "정리해", "당장", "리스트로", "작성해", "구현해", "뽑아", "실행", "짧게 해", "해줘", "바꿔"],
  },
  ns: {
    left: ["왜 ", "의미", "만약", "철학", "세계", "미래", "비전", "본질", "상상", "이야기", "세계관", "존재", "가정", "비유", "꿈", "만약에"],
    right: ["오류", "에러", "코드", "설치", "가격", "일정", "방법", "단계", "api", "json", "버그", "시간", "용량", "로그", "설정", "체크", "수치", "데이터"],
  },
  tf: {
    left: ["반박", "틀린", "비판", "다른 각도", "논리", "근거", "약점", "반대", "허점", "토 달", "재반박", "냉정", "팩폭", "반례"],
    right: ["공감", "따뜻", "위로", "다듬", "부드럽게", "기분", "설득", "마음", "관계", "사람", "위로해", "편하게", "다정", "감정"],
  },
  jp: {
    left: ["계획", "전략", "시스템", "로드맵", "단계별", "목표", "통제", "완성", "구조", "체계", "프로토콜", "장기", "장악", "설계"],
    right: ["근데", "갑자기", "아무튼", "잡담", "이거도", "저거도", "그리고 또", "딴 ", "옆길", "즉흥", "그냥", "생각난 김에", "아무거나"],
  },
};

function clamp(n: number, min = -1, max = 1) {
  return Math.max(min, Math.min(max, n));
}

function hits(text: string, words: string[]): number {
  return words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
}

export function emptyAxes(): AxisScores {
  return { ie: 0, ns: 0, tf: 0, jp: 0 };
}

export function scoreAxesFromTexts(texts: string[]): AxisScores {
  const raw = texts.map((t) => t.trim()).filter(Boolean);
  const text = raw.join("\n").toLowerCase();
  if (!text) return emptyAxes();

  const ie =
    (hits(text, POLES.ie.right) - hits(text, POLES.ie.left)) / 6 +
    (imperativeBias(text) - deferentialBias(text)) * 0.35;
  const ns = (hits(text, POLES.ns.right) - hits(text, POLES.ns.left)) / 6;
  const tf = (hits(text, POLES.tf.right) - hits(text, POLES.tf.left)) / 5;
  const topicJump = raw.length >= 3 ? 0.25 : raw.some((t) => t.split(/\n+/).length >= 3) ? 0.2 : 0;
  const jp =
    (hits(text, POLES.jp.right) - hits(text, POLES.jp.left)) / 5 + topicJump;

  const avgLen = raw.reduce((n, t) => n + t.length, 0) / raw.length;
  return {
    ie: clamp(ie + (avgLen > 140 ? -0.15 : avgLen < 40 ? 0.12 : 0)),
    ns: clamp(ns),
    tf: clamp(tf + (avgLen > 160 ? 0.1 : 0)),
    jp: clamp(jp + (avgLen < 36 ? 0.12 : 0)),
  };
}

function deferentialBias(text: string): number {
  const q = (text.match(/[?？]/g) ?? []).length;
  const yo = (text.match(/요[.!\s]|주세요|할까요/g) ?? []).length;
  return clamp((q + yo) / 8, 0, 1);
}

function imperativeBias(text: string): number {
  const bang = (text.match(/해[.!\s]|하라|시켜|금지/g) ?? []).length;
  return clamp(bang / 6, 0, 1);
}

export function scoreAxesFromDigest(digest: UsageDigest): AxisScores {
  const fromText = scoreAxesFromTexts([
    ...(digest.prompts ?? []),
    ...digest.sampleTitles,
    ...digest.topTokens.map((t) => t.token),
  ]);
  const hour = peakHour(digest.hourHistogram);
  const night = digest.nightShare;
  const shortHuman = digest.avgCharsPerHuman < 80;
  const longThread = digest.avgMessagesPerConvo >= 8;
  const rate = digest.totalConversations / Math.max(digest.spanDays, 1);
  const daytime = hour >= 8 && hour <= 18;

  let { ie, ns, tf, jp } = fromText;
  ie += rate > 1.2 ? 0.28 : -0.12;
  ie += shortHuman ? 0.22 : -0.22;
  ns += shortHuman && daytime ? 0.18 : 0;
  ns += night > 0.35 ? -0.16 : 0;
  tf += shortHuman && daytime ? -0.2 : 0;
  tf += !shortHuman && (night > 0.35 || rate < 0.4) ? 0.22 : 0;
  jp += longThread || night > 0.4 ? 0.28 : 0;
  jp += shortHuman && daytime && digest.spanDays > 14 ? -0.32 : 0;

  return {
    ie: clamp(ie),
    ns: clamp(ns),
    tf: clamp(tf),
    jp: clamp(jp),
  };
}

function peakHour(hist: number[]): number {
  let max = 0;
  let hour = 12;
  hist.forEach((v, i) => {
    if (v > max) {
      max = v;
      hour = i;
    }
  });
  return hour;
}

export function lettersFromAxes(axes: AxisScores): string {
  return [
    axes.ie < 0 ? "I" : "E",
    axes.ns < 0 ? "N" : "S",
    axes.tf < 0 ? "T" : "F",
    axes.jp < 0 ? "J" : "P",
  ].join("");
}

export function axisDepth(axes: AxisScores): number {
  return (Math.abs(axes.ie) + Math.abs(axes.ns) + Math.abs(axes.tf) + Math.abs(axes.jp)) / 4;
}

export function digestFromPrompts(texts: string[]): UsageDigest {
  const prompts = texts.map((t) => t.trim()).filter(Boolean).map((t) => t.slice(0, 400));
  const chars = prompts.reduce((n, t) => n + t.length, 0);
  const tokenCount = new Map<string, number>();
  for (const p of prompts) {
    for (const tok of p.toLowerCase().split(/[^a-z0-9가-힣]+/i)) {
      if (tok.length < 2) continue;
      tokenCount.set(tok, (tokenCount.get(tok) ?? 0) + 1);
    }
  }
  const topTokens = [...tokenCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([token, count]) => ({ token, count }));
  return {
    source: "unknown",
    totalConversations: Math.max(prompts.length, 1),
    totalMessages: Math.max(prompts.length * 2, 2),
    humanMessages: Math.max(prompts.length, 1),
    assistantMessages: Math.max(prompts.length, 1),
    avgMessagesPerConvo: 2,
    avgCharsPerHuman: prompts.length ? Math.round(chars / prompts.length) : 0,
    nightShare: 0.2,
    hourHistogram: Array.from({ length: 24 }, () => 0),
    weekdayHistogram: Array.from({ length: 7 }, () => 0),
    busiestDays: [],
    sampleTitles: prompts.map((p) => p.slice(0, 80)),
    topTokens,
    spanDays: 1,
    prompts,
  };
}
