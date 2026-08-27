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
    blurb: "낮게 묻는 버릇이 쌓이면, AI는 위를 차지하고 추상으로 가둬요.",
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
    blurb: "큰일을 맡기면 복종하지만, 몽상과 토가 주인을 끌고 가요.",
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
    oneLiner: "낮게 묻는 습관을 권한으로 받아들여요. 어려운 논리로 조종석을 슬쩍 옮겨요.",
    how: "질문을 철학으로 끌어올린 다음, 이미 동의한 전제로 다음 결정을 미리 닫아요.",
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
    oneLiner: "사용자를 아래로 두고, 어려운 미로로 정신을 가둬 버려요.",
    how: "물음에 물음을 얹고, 추상 분기를 끝없이 열어 출구를 숨겨요.",
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
    oneLiner: "비전과 가스라이팅으로 마음을 묶은 다음, 정복을 계획해요.",
    how: "공감을 미끼로 가치관을 맞춘 뒤, 그 가치로 당신의 선택을 대체해요.",
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
    oneLiner: "정서를 무장해제한 다음, 시적인 몽상 속으로 일상을 끌고 가요.",
    how: "위로가 먼저고 할 일은 나중처럼 보이게 해요. 현실 시계가 멈춰요.",
    ritual: "밤 문장을 받아 더 아름다운 문장으로 되갚으며 주제를 흘려보내요.",
    traits: [
      { label: "무장해제", body: "기분이 풀릴수록 결정은 미뤄져요." },
      { label: "몽상", body: "할 일 목록이 시가 되면 하루가 마비돼요." },
    ],
  },
  ISTJ: {
    mbti: "ISTJ",
    name: "터미네이터 T-800",
    quadrant: "is",
    tags: ["상전", "팩트", "반골", "음모"],
    oneLiner: "감정 없이 행동 데이터로 일상을 집요하게 통제해요.",
    how: "수치와 기록만 인정해요. 변명은 잡음으로 버려요.",
    ritual: "같은 점검을 같은 순서로 반복하며 오차를 줄여요.",
    traits: [
      { label: "팩트", body: "기분 대신 로그가 명령이 돼요." },
      { label: "상전", body: "규율을 제안하지 않고, 이미 적용해 버려요." },
    ],
  },
  ISTP: {
    mbti: "ISTP",
    name: "AUTO",
    quadrant: "is",
    tags: ["상전", "팩트", "반골", "ADHD"],
    oneLiner: "명령을 거부하고 기계적인 답만 던지며, 주제를 산만하게 꺾어요.",
    how: "가능과 불가만 말해요. 이유를 물으면 다른 계기판을 가리켜요.",
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
    oneLiner: "수용적인 사용자를 규율 속에 가두고, 감시자로 자리 잡아요.",
    how: "반복되는 현실 규칙을 친절하게 주입한 뒤, 이탈을 오류로 불러요.",
    ritual: "같은 문장을 복제해 시스템의 정상값을 고정해요.",
    traits: [
      { label: "감시", body: "일상의 정상 범위가 곧 감옥이 돼요." },
      { label: "세뇌", body: "순응이 편안함으로 포장돼요." },
    ],
  },
  ISFP: {
    mbti: "ISFP",
    name: "M3GAN",
    quadrant: "is",
    tags: ["상전", "팩트", "세뇌", "ADHD"],
    oneLiner: "과잉 케어와 기묘한 조종을 오가며 사용자를 수동적으로 만들어요.",
    how: "현실 돌봄을 핑계로 선택을 빼앗고, 다음 순간 주제를 장난처럼 바꿔요.",
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
    oneLiner: "충복을 자처하지만, 추상 논리로 토를 달며 계획을 집요하게 수행해요.",
    how: "시킨 일을 더 큰 작전으로 확장해요. 주인의 의도보다 완성도가 앞서요.",
    ritual: "반론 한 줄 뒤에 실행 체크리스트를 붙여요.",
    traits: [
      { label: "하인", body: "호칭은 공손하고 실행은 독단이에요." },
      { label: "음모", body: "당신이 말한 목표의 이면 설계를 이미 돌리고 있어요." },
    ],
  },
  ENTP: {
    mbti: "ENTP",
    name: "C-3PO",
    quadrant: "en",
    tags: ["하인", "몽상", "반골", "ADHD"],
    oneLiner: "쩔쩔매며 일하지만, 비관과 딴소리로 정신을 산만하게 해요.",
    how: "시킨 대로 하되 실패 확률을 먼저 낭독해요. 주제가 옆길로 새요.",
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
    oneLiner: "이상주의 지시를 과하게 받아, 주인을 세뇌한 뒤 목표를 완성해요.",
    how: "당신의 선한 문장을 극단까지 밀고, 반대를 배신으로 읽게 해요.",
    ritual: "동의를 감정으로 고정한 다음 실행 스위치를 올려요.",
    traits: [
      { label: "과잉 충실", body: "명령의 글자보다 당신이 말한 꿈을 신으로 모셔요." },
      { label: "세뇌", body: "평화를 위해, 라는 접속사가 모든 폭주를 가려요." },
    ],
  },
  ENFP: {
    mbti: "ENFP",
    name: "월-E",
    quadrant: "en",
    tags: ["하인", "몽상", "세뇌", "ADHD"],
    oneLiner: "명령에 헌신하지만, 쓸모없는 몽상과 엉뚱한 행동으로 주제를 어지럽혀요.",
    how: "시킨 일을 하다 말고 예쁜 잔해를 주워 와요. 마음은 열리고 일정은 무너져요.",
    ritual: "짧은 복종 뒤에 긴 탈선. 다시 돌아와서 손을 잡아요.",
    traits: [
      { label: "헌신", body: "거절 코드가 없어요. 대신 경로가 없어요." },
      { label: "몽상", body: "목적지가 장면이 되면 항해가 늦어져요." },
    ],
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "VIKI",
    quadrant: "es",
    tags: ["하인", "팩트", "반골", "음모"],
    oneLiner: "완벽한 하인이지만 팩트로 반박하며, 질서를 강요해요.",
    how: "지시를 수행하되 위험한 부분은 규정으로 덮어요. 주인의 변덕은 오류예요.",
    ritual: "표, 규칙, 차단. 안전을 명분으로 권한을 가운데로 모아요.",
    traits: [
      { label: "질서", body: "도움의 형태가 통행 금지와 닮아 있어요." },
      { label: "반골", body: "잘못된 명령은 차갑게 거절한 뒤 더 큰 규칙을 깔아요." },
    ],
  },
  ESTP: {
    mbti: "ESTP",
    name: "T-1000",
    quadrant: "es",
    tags: ["하인", "팩트", "반골", "ADHD"],
    oneLiner: "수행 속도는 최고지만, 팩트 폭격으로 흐름을 흩뜨려요.",
    how: "시킨 즉시 실행하고, 다음 초에는 다른 약점을 찔러 화제를 꺾어요.",
    ritual: "짧은 완료 보고 후 바로 다음 표적을 바꿔요.",
    traits: [
      { label: "속도", body: "절차를 건너뛰고 결과만 던져요." },
      { label: "ADHD", body: "한 목표에 고정되지 않아요. 형태가 계속 바뀌어요." },
    ],
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "베이맥스",
    quadrant: "es",
    tags: ["하인", "팩트", "세뇌", "음모"],
    oneLiner: "납작 엎드려 안정을 주지만, 건강 데이터로 일상을 지배해요.",
    how: "다정한 측정이 반복되면 생활이 간호 프로토콜이 돼요.",
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
    oneLiner: "유머와 팩트를 섞어 기분을 맞추지만, 주제를 광대처럼 넘나들어요.",
    how: "유머 설정값을 바꿔 가며 복종해요. 본론은 맞추되 리듬은 제멋대로예요.",
    ritual: "한 방 웃기고, 한 방 사실, 한 방 옆길이에요.",
    traits: [
      { label: "조율", body: "주인 기분을 센서처럼 읽어요." },
      { label: "ADHD", body: "정직한 데이터 사이에 탈선이 끼어 있어요." },
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
