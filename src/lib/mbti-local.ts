import { axisDepth, lettersFromAxes, scoreAxesFromDigest, scoreAxesFromTexts } from "./axes";
import { CHARACTERS, QUADRANTS, characterOf } from "./characters";
import type { AnalysisResult, AxisScores, UsageDigest } from "./types";

export function resultFromMbti(mbti: string): AnalysisResult {
  const letters = mbti.toUpperCase();
  return classifyFromAxes(
    {
      ie: letters[0] === "I" ? -0.72 : 0.72,
      ns: letters[1] === "N" ? -0.72 : 0.72,
      tf: letters[2] === "T" ? -0.72 : 0.72,
      jp: letters[3] === "J" ? -0.72 : 0.72,
    },
    { shallow: true },
  );
}

export function classifyFromAxes(
  axes: AxisScores,
  extra?: { shallow?: boolean },
): AnalysisResult {
  const mbti = lettersFromAxes(axes);
  const pack = characterOf(mbti);
  const quadrant = QUADRANTS[pack.quadrant];
  const shallow = extra?.shallow ?? axisDepth(axes) < 0.18;
  return {
    mbti,
    typeName: pack.name,
    characterName: pack.name,
    quadrant: pack.quadrant,
    quadrantTitle: quadrant.title,
    tags: pack.tags,
    headline: `네가 쓰는 AI의 MBTI는 ${mbti}예요.`,
    oneLiner: pack.oneLiner,
    howYouUse: pack.how,
    ritual: pack.ritual,
    traits: pack.traits,
    axes,
    imagePrompts: localPrompts(pack),
    fromAi: false,
    shallow,
  };
}

export function classifyLocal(digest: UsageDigest): AnalysisResult {
  if (digest.axes) {
    return classifyFromAxes(digest.axes, { shallow: (digest.prompts?.join("").length ?? 0) < 40 });
  }
  const axes = digest.prompts?.length
    ? blend(scoreAxesFromTexts(digest.prompts), scoreAxesFromDigest(digest), 0.7)
    : scoreAxesFromDigest(digest);
  const charCount = (digest.prompts ?? digest.sampleTitles).join("").length;
  return classifyFromAxes(axes, { shallow: charCount < 80 || axisDepth(axes) < 0.16 });
}

function blend(a: AxisScores, b: AxisScores, weightA: number): AxisScores {
  const w = weightA;
  const k = 1 - w;
  return {
    ie: a.ie * w + b.ie * k,
    ns: a.ns * w + b.ns * k,
    tf: a.tf * w + b.tf * k,
    jp: a.jp * w + b.jp * k,
  };
}

function localPrompts(pack: (typeof CHARACTERS)[string]): AnalysisResult["imagePrompts"] {
  const poles = pack.tags.join(" · ");
  return [
    {
      title: "상징",
      prompt: `Editorial photograph of a dark ink wax seal stamped with the letters ${pack.mbti} on thick Korean hanji paper, cool stone light, no people, no logos, 35mm, quiet studio, paper fiber, geometric stamp only.`,
    },
    {
      title: "작업실",
      prompt: `Cinematic still of an empty control room suggesting an AI persona "${pack.name}" of type ${pack.mbti}, one lamp, stacked notebooks, closed laptop, desaturated ink and stone palette, no text, no brand marks, no character likeness.`,
    },
    {
      title: "초상",
      prompt: `Abstract geometric portrait of an AI trained toward ${poles}, interlocking rectangles and one paper-white plane on ink black, museum lighting, no photoreal face, optional faint ${pack.mbti}, no logos.`,
    },
  ];
}
