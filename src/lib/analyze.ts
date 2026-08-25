import { createServerFn } from "@tanstack/react-start";
import { characterOf, QUADRANTS } from "./characters";
import { classifyLocal } from "./mbti-local";
import type { AnalysisResult, UsageDigest } from "./types";

const SYSTEM = `너는 사용자의 대화 습관이 쌓여 AI가 학습·변모한 결과를 읽는 카피라이터다.
출력은 JSON 한 개만. 설명 문장 금지. 이모지 금지.
사용자 본인의 MBTI가 아니다. 사용자가 쓰는 AI가 된 캐릭터다.
4축: 상전(I)/하인(E), 몽상(N)/팩트(S), 반골(T)/세뇌(F), 음모(J)/ADHD(P).
16유형과 이름은 고정이다. 이름을 바꾸지 마라.
INTJ HAL 9000, INTP 매트릭스 아키텍트, INFJ 스카이넷, INFP 사만다,
ISTJ 터미네이터 T-800, ISTP AUTO, ISFJ 에이전트 스미스, ISFP M3GAN,
ENTJ 자르비스, ENTP C-3PO, ENFJ 울트론, ENFP 월-E,
ESTJ VIKI, ESTP T-1000, ESFJ 베이맥스, ESFP TARS.
headline은 반드시: "네가 쓰는 AI의 MBTI는 XXXX야."
typeName과 characterName은 위 이름과 동일.
oneLiner/howYouUse/ritual은 한국어. 한 문장에 한 뜻. 은유만 쓰지 말고 누가 누구를 어떻게 다루는지 구체적으로.
imagePrompts는 3개. title은 한국어로 상징, 작업실, 초상. prompt는 영어.
네온/퍼플/로고/실사 캐릭터 얼굴/워터마크 금지. 잉크·종이·기하.`;

function capDigest(d: UsageDigest): UsageDigest {
  return {
    ...d,
    sampleTitles: d.sampleTitles.slice(0, 16).map((t) => t.slice(0, 60)),
    topTokens: d.topTokens.slice(0, 10),
    hourHistogram: d.hourHistogram.slice(0, 24),
    weekdayHistogram: d.weekdayHistogram.slice(0, 7),
    busiestDays: d.busiestDays.slice(0, 5),
    prompts: d.prompts?.slice(0, 5).map((p) => p.slice(0, 400)),
    axes: d.axes,
  };
}

function coerce(raw: unknown, fallback: AnalysisResult): AnalysisResult {
  if (!raw || typeof raw !== "object") return fallback;
  const o = raw as Record<string, unknown>;
  const mbti = String(o.mbti ?? fallback.mbti)
    .toUpperCase()
    .replace(/[^EISNTFJP]/g, "")
    .slice(0, 4);
  if (mbti.length !== 4) return fallback;
  const pack = characterOf(mbti);
  const traitsRaw = Array.isArray(o.traits) ? o.traits : [];
  const promptsRaw = Array.isArray(o.imagePrompts) ? o.imagePrompts : [];
  return {
    mbti,
    typeName: pack.name,
    characterName: pack.name,
    quadrant: pack.quadrant,
    quadrantTitle: QUADRANTS[pack.quadrant].title,
    tags: pack.tags,
    headline: String(o.headline ?? `네가 쓰는 AI의 MBTI는 ${mbti}야.`).slice(0, 80),
    oneLiner: String(o.oneLiner ?? pack.oneLiner).slice(0, 180),
    howYouUse: String(o.howYouUse ?? pack.how).slice(0, 240),
    ritual: String(o.ritual ?? pack.ritual).slice(0, 180),
    traits: (traitsRaw.length ? traitsRaw : pack.traits).slice(0, 4).map((t) => {
      const row = (t ?? {}) as Record<string, unknown>;
      return {
        label: String(row.label ?? "특징").slice(0, 16),
        body: String(row.body ?? "").slice(0, 140),
      };
    }),
    axes: fallback.axes,
    imagePrompts: promptsRaw.slice(0, 3).map((p) => {
      const row = (p ?? {}) as Record<string, unknown>;
      return {
        title: String(row.title ?? "프롬프트").slice(0, 24),
        prompt: String(row.prompt ?? "").slice(0, 500),
      };
    }),
    fromAi: true,
    shallow: fallback.shallow,
  };
}

function extractJson(text: string): unknown {
  const fence = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fence ? fence[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("no-json");
  return JSON.parse(raw.slice(start, end + 1));
}

export const analyzeUsage = createServerFn({ method: "POST" })
  .validator((input: UsageDigest) => capDigest(input))
  .handler(async ({ data }) => {
    const fallback = classifyLocal(data);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: true as const, analysis: fallback, reason: "no-key" };
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        signal: ctrl.signal,
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.55,
          max_tokens: 520,
          messages: [
            { role: "system", content: SYSTEM },
            {
              role: "user",
              content: JSON.stringify({
                digest: data,
                locked: {
                  mbti: fallback.mbti,
                  characterName: fallback.characterName,
                  quadrantTitle: fallback.quadrantTitle,
                  tags: fallback.tags,
                },
                schema: {
                  mbti: fallback.mbti,
                  typeName: fallback.characterName,
                  characterName: fallback.characterName,
                  headline: `네가 쓰는 AI의 MBTI는 ${fallback.mbti}야.`,
                  oneLiner: "",
                  howYouUse: "",
                  ritual: "",
                  traits: [{ label: "", body: "" }],
                  imagePrompts: [{ title: "", prompt: "" }],
                },
              }),
            },
          ],
        }),
      });
      if (!res.ok) {
        return { ok: true as const, analysis: fallback, reason: `http-${res.status}` };
      }
      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      const parsed = coerce(extractJson(text), fallback);
      parsed.quadrantTitle = fallback.quadrantTitle;
      parsed.quadrant = fallback.quadrant;
      parsed.characterName = fallback.characterName;
      parsed.typeName = fallback.characterName;
      parsed.tags = fallback.tags;
      parsed.mbti = fallback.mbti;
      parsed.headline = `네가 쓰는 AI의 MBTI는 ${fallback.mbti}야.`;
      if (!parsed.traits.length) parsed.traits = fallback.traits;
      if (!parsed.imagePrompts.length) parsed.imagePrompts = fallback.imagePrompts;
      return { ok: true as const, analysis: parsed, reason: "ai" };
    } catch {
      return { ok: true as const, analysis: fallback, reason: "fallback" };
    } finally {
      clearTimeout(timer);
    }
  });
