export const TEST_IDS = ["soul", "abuse", "love", "skill", "duel", "now"] as const;
export type TestId = (typeof TEST_IDS)[number];
export type GradeId = "abuse" | "love" | "skill";

export type TestNeed = "session" | "none";

export type TestMeta = {
  id: TestId;
  no: string;
  name: string;
  hook: string;
  need: TestNeed;
  theater: string[];
  teaser: string;
};

export const TESTS: TestMeta[] = [
  {
    id: "soul",
    no: "01",
    name: "AI 자아 스캔",
    hook: "네가 시킨 말이 만든 얼굴",
    need: "session",
    theater: ["말은 버리고", "버릇만 남기고", "한 장으로"],
    teaser: "한 장 뽑혔다. 글자는 아직 안 보여.",
  },
  {
    id: "abuse",
    no: "02",
    name: "학대 지수",
    hook: "반말부터 세본다",
    need: "session",
    theater: ["반말부터", "부탁은 몇 번", "손맛"],
    teaser: "손맛이 남았다. 숫자는 잠가 뒀다.",
  },
  {
    id: "love",
    no: "03",
    name: "AI 궁합 테스트",
    hook: "나랑 AI, 연애로 보면 몇 점일까",
    need: "session",
    theater: ["그 단어가 있나", "할 일만 있나", "한 줄"],
    teaser: "점수는 나왔다. 몇 점인지는 잠금.",
  },
  {
    id: "skill",
    no: "04",
    name: "AI 조련 만렙",
    hook: "초보부터 파트너까지, 너는 몇 렙이야",
    need: "session",
    theater: ["길이", "조건", "누가 시키나"],
    teaser: "렙은 나왔다. 숫자는 광고 뒤에.",
  },
  {
    id: "duel",
    no: "05",
    name: "AI 티키타카 배틀",
    hook: "90초. 누가 더 잘 시키냐",
    need: "none",
    theater: ["같은 과제", "프롬프트만", "점수"],
    teaser: "시간은 끝났다. 점수는 아직.",
  },
  {
    id: "now",
    no: "06",
    name: "AI 텐션 라이브",
    hook: "지금 다들 무슨 말 걸고 있나",
    need: "none",
    theater: ["통계는 없고", "관찰만", "한 줄"],
    teaser: "살아 있는 랭킹은 없다. 이번 주 메모만.",
  },
];

export const TEST_PATH: Record<TestId, "/soul" | "/abuse" | "/love" | "/skill" | "/duel" | "/now"> = {
  soul: "/soul",
  abuse: "/abuse",
  love: "/love",
  skill: "/skill",
  duel: "/duel",
  now: "/now",
};

export function testOf(id: string | undefined): TestMeta | undefined {
  return TESTS.find((t) => t.id === id);
}

export function relatedOf(id: TestId): TestMeta[] {
  return TESTS.filter((t) => t.id !== id).slice(0, 4);
}
