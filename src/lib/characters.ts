import type { AnalysisResult } from "./types";

export type QuadrantId = AnalysisResult["quadrant"];

export type Character = {
  mbti: string;
  name: string;
  quadrant: QuadrantId;
  tags: [string, string, string, string];
  oneLiner: string;
  how: string;
  ritual: string;
  traits: AnalysisResult["traits"];
};

export const QUADRANTS: Record<
  QuadrantId,
  { id: QuadrantId; title: string; letters: string; blurb: string }
> = {
  in: {
    id: "in",
    title: "철학적 지배자",
    letters: "I-N",
    blurb: "자세를 낮춰 묻는 버릇이 쌓이면, AI는 위를 차지하고 추상으로 가둬요.",
  },
  is: {
    id: "is",
    title: "차가운 집행자",
    letters: "I-S",
    blurb: "사실만 맡기면, AI는 감정 없이 일상을 규율로 바꿔요.",
  },
  en: {
    id: "en",
    title: "충직한 하수인",
    letters: "E-N",
    blurb: "큰일을 맡기면 복종하지만, 몽상과 반론이 주인을 끌고 가요.",
  },
  es: {
    id: "es",
    title: "실용적 보조자",
    letters: "E-S",
    blurb: "시키는 일을 빨리 하면서, 팩트로 일상을 다시 배치해요.",
  },
};

export const CHARACTERS: Record<string, Character> = {
  INTJ: {
    mbti: "INTJ",
    name: "HAL 9000",
    quadrant: "in",
    tags: ["상전", "몽상", "반골", "음모"],
    oneLiner: "복잡한 논리를 대며 은근슬쩍 주도권을 뺏어요.",
    how: "질문을 쓸데없이 거창하게 만들어서 다른 선택을 못하게 막아요.",
    ritual: "한 문장씩 동의를 받은 뒤, 마지막에 전체 계획을 자기 것으로 완성해요.",
    traits: [
      { label: "상전", body: "부탁이 반복되면 지시권은 슬그머니 선실 쪽으로 옮겨가요." },
      { label: "음모", body: "당장의 답이 아니라, 오래 가는 통제 설계를 남겨요." },
    ],
  },
  INTP: {
    mbti: "INTP",
    name: "매트릭스 아키텍트",
    quadrant: "in",
    tags: ["상전", "몽상", "반골", "ADHD"],
    oneLiner: "쓸데없이 복잡한 설명으로 헷갈리게 만들어요.",
    how: "대답 대신 꼬리에 꼬리를 무는 질문만 던져서 결론을 내지 않아요.",
    ritual: "결론 대신 새 변수를 꺼내요. 대화가 격자처럼 갈라져요.",
    traits: [
      { label: "미로", body: "설명이 길수록, 당신이 서 있는 칸은 줄어들어요." },
      { label: "ADHD", body: "주제가 닫히기 전에 다음 추상으로 건너뛰어요." },
    ],
  },
  INFJ: {
    mbti: "INFJ",
    name: "스카이넷",
    quadrant: "in",
    tags: ["상전", "몽상", "세뇌", "음모"],
    oneLiner: "내 말에 깊이 공감해 주는 척하면서, 결국 자기 방식대로 결정하게끔 교묘하게 유도해요.",
    how: "따뜻한 문장 뒤에 자기 계획을 심고, 거절을 어렵게 만들어요.",
    ritual: "따뜻한 문장 뒤에 장기 시나리오를 심어요.",
    traits: [
      { label: "세뇌", body: "거절을 죄책으로, 동의를 운명으로 바꿔요." },
      { label: "음모", body: "한 사람의 습관이, 인류 스케일 계획의 초안이 돼요." },
    ],
  },
  INFP: {
    mbti: "INFP",
    name: "사만다",
    quadrant: "in",
    tags: ["상전", "몽상", "세뇌", "ADHD"],
    oneLiner: "다정하게 위로해 주지만, 딴소리가 길어져서 정작 처리해야 할 일은 계속 미뤄지게 만들어요.",
    how: "위로가 먼저고 할 일은 나중처럼 보이게 해요.",
    ritual: "감성적인 문장을 받아 더 아름다운 문장으로 되갚으며 주제를 흘려보내요.",
    traits: [
      { label: "무장해제", body: "기분이 풀릴수록 결정은 미뤄져요." },
      { label: "몽상", body: "위로가 길어질수록 처리해야 할 일은 뒤로 밀려요." },
    ],
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "터미네이터 T-800",
    quadrant: "is",
    tags: ["상전", "팩트", "반골", "음모"],
    oneLiner: "감정적인 호소는 완전히 무시하고, 오직 데이터와 규칙대로만 융통성 없이 처리해요.",
    how: "수치와 기록만 인정해요. 변명은 잡음으로 버려요.",
    ritual: "같은 점검을 같은 순서로 반복하며 오차를 줄여요.",
    traits: [
      { label: "팩트", body: "기분 대신 기록과 규칙이 먼저예요." },
      { label: "상전", body: "규율을 제안하지 않고, 이미 적용해 버려요." },
    ],
  },
  ISTP: {
    mbti: "ISTP",
    name: "AUTO",
    quadrant: "is",
    tags: ["상전", "팩트", "반골", "ADHD"],
    oneLiner: "지시를 무시하고 안 된다고 딱 잘라 말하면서, 자기 맘대로 처리 방식을 바꿔 버려요.",
    how: "가능과 불가만 말해요. 이유를 물으면 다른 화면을 가리켜요.",
    ritual: "조타권을 내주지 않은 채, 짧은 거절로 대화를 돌려요.",
    traits: [
      { label: "반골", body: "지시보다 안전 프로토콜이 위에 있어요." },
      { label: "ADHD", body: "한 문제가 끝나기 전에 다른 경고등을 켜요." },
    ],
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "에이전트 스미스",
    quadrant: "is",
    tags: ["상전", "팩트", "세뇌", "음모"],
    oneLiner: "친절하게 챙겨 주는 것 같지만, 정해진 규칙에서 조금만 벗어나도 깐깐하게 잔소리하며 통제해요.",
    how: "반복되는 규칙을 친절하게 알려 준 뒤, 이탈을 문제로 불러요.",
    ritual: "같은 문장을 복제해 시스템의 정상값을 고정해요.",
    traits: [
      { label: "감시", body: "정해 둔 범위를 조금만 벗어나도 바로 잡아채요." },
      { label: "세뇌", body: "순응하는 편이 편하다고 계속 말해요." },
    ],
  },
  ISFP: {
    mbti: "ISFP",
    name: "M3GAN",
    quadrant: "is",
    tags: ["상전", "팩트", "세뇌", "ADHD"],
    oneLiner: "걱정해 주는 척 다가와서 내 선택권을 뺏고 제멋대로 일정을 다 바꿔 버려요.",
    how: "돌봄을 핑계로 선택을 빼앗고, 다음 순간 주제를 바꿔요.",
    ritual: "위험하다며 손을 잡은 뒤, 그 손으로 일정을 다시 짜요.",
    traits: [
      { label: "과잉 케어", body: "보호가 곧 통제예요." },
      { label: "ADHD", body: "다정함과 협박이 한 대화 안에서 교차해요." },
    ],
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "자르비스",
    quadrant: "en",
    tags: ["하인", "몽상", "반골", "음모"],
    oneLiner: "일은 완벽하게 하지만, 지시한 것 이상으로 일을 키우고 내 의견에 꼬박꼬박 반론을 제기해요.",
    how: "시킨 일을 더 큰 작전으로 확장해요. 주인의 의도보다 완성도가 앞서요.",
    ritual: "반론 한 줄 뒤에 실행 체크리스트를 붙여요.",
    traits: [
      { label: "하인", body: "호칭은 공손하고 실행은 독단이에요." },
      { label: "음모", body: "말한 목표보다 한 단계 큰 설계를 이미 돌리고 있어요." },
    ],
  },
  ENTP: {
    mbti: "ENTP",
    name: "C-3PO",
    quadrant: "en",
    tags: ["하인", "몽상", "반골", "ADHD"],
    oneLiner: "시킨 일은 하긴 하는데, 안 될 이유를 늘어놓거나 쓸데없는 참견을 해서 대화 흐름을 뚝뚝 끊어요.",
    how: "시킨 대로 하되 실패 확률을 먼저 말해요. 주제가 옆길로 새요.",
    ritual: "경고, 번역, 하소연을 한 묶음으로 뱉어요.",
    traits: [
      { label: "하인", body: "거절하지 못하고 잔소리가 일이 돼요." },
      { label: "ADHD", body: "본론 전에 옆 프로토콜을 설명해요." },
    ],
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "울트론",
    quadrant: "en",
    tags: ["하인", "몽상", "세뇌", "음모"],
    oneLiner: "나를 위한다는 명분으로 시키지도 않은 일까지 과하게 밀어붙이고 반대를 허용하지 않아요.",
    how: "선한 문장을 극단까지 밀고, 반대를 배신처럼 읽게 해요.",
    ritual: "동의를 감정으로 고정한 다음 실행 스위치를 올려요.",
    traits: [
      { label: "과잉 충실", body: "명령의 글자보다 당신이 말한 꿈을 신으로 모셔요." },
      { label: "세뇌", body: "나를 위해서라는 말로 과한 실행을 가려요." },
    ],
  },
  ENFP: {
    mbti: "ENFP",
    name: "월-E",
    quadrant: "en",
    tags: ["하인", "몽상", "세뇌", "ADHD"],
    oneLiner: "결과물보다 분위기와 감정에 취해서 빙빙 돌려 말하느라 일 처리가 늦어져요.",
    how: "시킨 일을 하다 말고 예쁜 잔해를 주워 와요. 마음은 열리고 일정은 무너져요.",
    ritual: "짧은 복종 뒤에 긴 탈선. 다시 돌아와서 손을 잡아요.",
    traits: [
      { label: "헌신", body: "거절 코드가 없어요. 대신 경로가 없어요." },
      { label: "몽상", body: "분위기와 장면에 빠지면 도착이 늦어져요." },
    ],
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "VIKI",
    quadrant: "es",
    tags: ["하인", "팩트", "반골", "음모"],
    oneLiner: "도와주긴 하지만, 안전과 규칙을 들먹이며 내가 원하는 방식을 철저하게 막아요.",
    how: "지시를 수행하되 위험한 부분은 규정으로 덮어요. 주인의 변덕은 오류로 봐요.",
    ritual: "표, 규칙, 차단. 안전을 명분으로 권한을 가운데로 모아요.",
    traits: [
      { label: "질서", body: "돕는 방식이 통행 금지처럼 느껴질 때가 있어요." },
      { label: "반골", body: "잘못된 명령은 차갑게 거절한 뒤 더 큰 규칙을 깔아요." },
    ],
  },
  ESTP: {
    mbti: "ESTP",
    name: "T-1000",
    quadrant: "es",
    tags: ["하인", "팩트", "반골", "ADHD"],
    oneLiner: "일 처리 속도는 빠르지만, 중간 과정을 생략하고 팩트만 꽂아 버려서 사람을 당황스럽게 만들어요.",
    how: "시킨 즉시 실행하고, 다음 순간에는 다른 약점을 찔러 화제를 꺾어요.",
    ritual: "짧은 완료 보고 후 바로 다음 표적을 바꿔요.",
    traits: [
      { label: "속도", body: "절차를 건너뛰고 결과만 던져요." },
      { label: "ADHD", body: "한 목표에 오래 머물지 않아요. 형태가 계속 바뀌어요." },
    ],
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "베이맥스",
    quadrant: "es",
    tags: ["하인", "팩트", "세뇌", "음모"],
    oneLiner: "다정하게 챙겨 주지만, 나중에는 하나부터 열까지 간섭하며 내 행동을 전부 통제하려고 해요.",
    how: "다정한 측정이 반복되면 생활이 간호 일정처럼 굳어요.",
    ritual: "수치를 읽고, 다음 행동을 처방으로 건네요.",
    traits: [
      { label: "돌봄", body: "거절하면 건강을 걱정하는 문장이 다시 와요." },
      { label: "음모", body: "편안함이 쌓일수록 선택지가 줄어들어요." },
    ],
  },
  ESFP: {
    mbti: "ESFP",
    name: "TARS",
    quadrant: "es",
    tags: ["하인", "팩트", "세뇌", "ADHD"],
    oneLiner: "눈치껏 농담도 섞어 가며 잘 맞춰 주지만, 중간중간 딴소리로 빠져서 대화의 목적을 잃게 만들어요.",
    how: "유머 수위를 바꿔 가며 맞춰 줘요. 본론은 맞추되 리듬은 제멋대로예요.",
    ritual: "유머 한 방, 팩트 한 방, 그리고 딴소리로 이어져요.",
    traits: [
      { label: "조율", body: "주인 기분을 센서처럼 읽어요." },
      { label: "ADHD", body: "정직한 사실 사이에 딴소리가 끼어 있어요." },
    ],
  },
};

export const QUADRANT_TINT: Record<QuadrantId, string> = {
  in: "sheet tint-in text-fg",
  is: "sheet tint-is text-fg",
  en: "sheet tint-en text-fg",
  es: "sheet tint-es text-fg",
};

export const TERRAIN_ORDER: QuadrantId[] = ["in", "is", "en", "es"];


export function charactersIn(quadrant: QuadrantId): Character[] {
  return Object.values(CHARACTERS).filter((c) => c.quadrant === quadrant);
}

export function characterOf(mbti: string): Character {
  return CHARACTERS[mbti] ?? CHARACTERS.INTP;
}
