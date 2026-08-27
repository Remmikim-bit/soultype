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
    hook: "지금까지 시킨 말로, AI가 어떤 성격인지 알아봐요.",
    need: "session",
    theater: ["대화를 천천히 읽고 있어요", "말버릇만 골라내고 있어요", "거의 다 됐어요"],
    teaser: "정리가 끝났어요. 이제 유형을 열어볼 수 있어요.",
  },
  {
    id: "abuse",
    no: "02",
    name: "학대 지수",
    hook: "반말부터 차근차근 세어 볼게요.",
    need: "session",
    theater: ["반말부터 세고 있어요", "부탁은 몇 번인지 세어 보고 있어요", "손맛을 읽고 있어요"],
    teaser: "손맛은 남겨 두었어요. 이제 숫자를 열어볼 수 있어요.",
  },
  {
    id: "love",
    no: "03",
    name: "AI 궁합 테스트",
    hook: "나랑 AI, 연애로 보면 몇 점인지 알아봐요.",
    need: "session",
    theater: ["그 단어가 있는지 보고 있어요", "할 일만 있는지도 보고 있어요", "한 줄로 모으고 있어요"],
    teaser: "점수는 나왔어요. 이제 몇 점인지 열어볼 수 있어요.",
  },
  {
    id: "skill",
    no: "04",
    name: "AI 조련 만렙",
    hook: "초보부터 파트너까지, 지금은 몇 렙인지 알아봐요.",
    need: "session",
    theater: ["문장 길이를 재고 있어요", "조건을 찾고 있어요", "누가 시키는지 보고 있어요"],
    teaser: "렙은 나왔어요. 이제 숫자를 열어볼 수 있어요.",
  },
  {
    id: "duel",
    no: "05",
    name: "AI 티키타카 배틀",
    hook: "90초 동안 누가 더 잘 시키는지 겨뤄 봐요.",
    need: "none",
    theater: ["같은 과제로 보고 있어요", "프롬프트만 읽고 있어요", "점수를 매기고 있어요"],
    teaser: "시간은 끝났어요. 이제 점수를 열어볼 수 있어요.",
  },
  {
    id: "now",
    no: "06",
    name: "AI 텐션 라이브",
    hook: "요즘 다들 무슨 말을 걸고 있는지 보여 드릴게요.",
    need: "none",
    theater: ["관찰만 하고 있어요", "한 줄로 남기고 있어요"],
    teaser: "이번 주 메모가 준비됐어요. 이제 한 줄을 열어볼 수 있어요.",
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
