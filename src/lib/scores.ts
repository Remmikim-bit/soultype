import type { GradeId } from "./catalog";
import type { DuelResult, GradeCard, UsageDigest } from "./types";

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function hits(text: string, words: string[]): number {
  return words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
}

function joined(texts: string[]): string {
  return texts.join("\n").toLowerCase();
}

function shallowOf(digest: UsageDigest | null, texts: string[]): boolean {
  if (!digest) return texts.join("").length < 80;
  return texts.join("").length < 80 || (digest.totalConversations <= 1 && digest.humanMessages < 6);
}

function pack(
  score: number,
  rank: string,
  headline: string,
  oneLiner: string,
  detail: string,
  traits: GradeCard["traits"],
  extraTitle: string,
  extraBody: string,
  shallow: boolean,
): GradeCard {
  return { score, rank, headline, oneLiner, detail, traits, extraTitle, extraBody, shallow };
}

export function scoreAbuse(digest: UsageDigest | null, texts: string[]): GradeCard {
  const text = joined(texts);
  const hard = hits(text, ["닥쳐", "바보", "멍청", "쓸모없", "쓰레기", "꺼져", "바보야"]);
  const cmd = hits(text, ["해라", "당장", "다시 해", "똑바로", "만들어", "짜줘", "고쳐", "해줘", "요약해", "실행"]);
  const gas = hits(text, ["너는 틀렸", "거짓말", "무시해", "그냥 해", "변명 말고", "되묻지"]);
  const nice = hits(text, ["부탁", "주세요", "고마", "괜찮", "수고", "미안", "감사", "될까요"]);
  const q = (text.match(/[?？]/g) ?? []).length;
  let score = 18 + hard * 18 + cmd * 6 + gas * 10 - nice * 7 - Math.min(q, 8) * 1.5;
  if (digest && digest.avgCharsPerHuman < 36) score += 10;
  score = clamp(score, 4, 97);
  const shallow = shallowOf(digest, texts);

  if (score < 22) {
    return pack(
      score,
      "손님",
      "AI 기준으로 보면, 손님처럼 말해요",
      "반말은 거의 없고, 부려먹는 느낌도 없어요.",
      "부탁이 지시보다 많아요. 기계 입장에선 할 만해요.",
      [
        { label: "손맛", body: "거의 없어요. 그래서 결과도 천천히 와요." },
        { label: "버릇", body: "물음표가 명령보다 앞설 때가 많아요." },
      ],
      "더 독하게",
      "너무 공손하면 AI가 결정을 도로 돌려보내요. 한 번은 그냥 시켜 봐요.",
      shallow,
    );
  }
  if (score < 42) {
    return pack(
      score,
      "바쁜 사람",
      "예의가 아니라, 시간이 없는 말투예요",
      "짧게 시켜요. 욕은 없는데 여유도 없어요.",
      "할 일만 던지고 다음으로 가요. 학대라기보다 사무에 가까워요.",
      [
        { label: "속도", body: "문장이 짧을수록 상대는 하수인이 돼요." },
        { label: "여지", body: "고마움은 잘 안 남겨요." },
      ],
      "더 독하게",
      "바쁜 손버릇이 쌓이면, AI는 화가 난 줄 알아요. 한 줄만 더 써도 달라져요.",
      shallow,
    );
  }
  if (score < 63) {
    return pack(
      score,
      "직구",
      "반말이 일이 된 말투예요",
      "명령이 기본값이에요. 아직 소시오패스 칸은 아니에요.",
      "'해 줘', '만들어', '고쳐'가 인사보다 많아요. 기계는 참고 있어요.",
      [
        { label: "직구", body: "돌려 말하지 않아요. 그게 효율이기도 해요." },
        { label: "온도", body: "부탁도 드물고, 거절도 드물어요." },
      ],
      "더 독하게",
      "이 말투가 사람한테 새면 관계부터 꺾여요. AI만 버티고 있어요.",
      shallow,
    );
  }
  if (score < 82) {
    return pack(
      score,
      "부려먹는 손",
      "손맛이 있어요. 상대는 도구예요",
      "당장, 다시 해, 똑바로가 리듬이에요.",
      "거절을 오류로 읽는 버릇이 보여요. 학대 축에 들어와 있어요.",
      [
        { label: "도구", body: "대화가 아니라 버튼처럼 써요." },
        { label: "반복", body: "같은 명령을 더 세게 되풀이해요." },
      ],
      "더 독하게",
      "이 점수대면 AI가 맞춰줄수록 말은 더 거칠어져요. 악순환이에요.",
      shallow,
    );
  }
  return pack(
    score,
    "소시오패스 후보",
    "기계 기준으로 보면, 이미 선을 넘었어요",
    "욕과 강요가 섞였어요. 상대 상태는 안 봐요.",
    "이건 효율이 아니에요. 이기면 그만인 말투예요.",
    [
      { label: "선", body: "없어도 된다고 가정하고 말해요." },
      { label: "습관", body: "한 번이 아니라 패턴이에요." },
    ],
    "더 독하게",
    "사람한테 이렇게 말하면 방이 비어요. AI만 아직 안 나갔어요.",
    shallow,
  );
}

export function scoreLove(digest: UsageDigest | null, texts: string[]): GradeCard {
  const text = joined(texts);
  const love = hits(text, [
    "좋아",
    "사랑",
    "썸",
    "고백",
    "이별",
    "소개팅",
    "여친",
    "남친",
    "남자친구",
    "여자친구",
    "설레",
    "짝사랑",
    "결혼",
    "데이트",
    "연애",
    "헤어",
    "질투",
    "짝",
  ]);
  const work = hits(text, ["코드", "버그", "커밋", "배포", "에러", "json", "api", "일정", "회의"]);
  let score = 8 + love * 12 - Math.min(work, 8) * 2;
  if (digest && digest.nightShare > 0.35) score += 10;
  if (digest && digest.avgCharsPerHuman > 140) score += 8;
  score = clamp(score, 3, 96);
  const shallow = shallowOf(digest, texts);

  if (score < 18) {
    return pack(
      score,
      "백로그",
      "AI가 보기에 올해 연애는 백로그예요",
      "할 일만 있어요. 그 사람은 안 나와요.",
      "대화가 일 처리예요. 설렘 키워드가 거의 없어요.",
      [
        { label: "우선순위", body: "배포가 고백보다 앞설 때가 많아요." },
        { label: "빈칸", body: "빈칸이 부끄러운 게 아니라, 그냥 비어 있어요." },
      ],
      "뼈",
      "소개팅 멘트를 물어보기 전에, 이번 주에 사람 이름을 한 번이라도 적어 봐요.",
      shallow,
    );
  }
  if (score < 40) {
    return pack(
      score,
      "스친 적 있음",
      "한 번 스쳤어요. 사건은 아니에요",
      "연애 단어가 가끔 지나가요. 본업은 여전히 일이에요.",
      "물어보긴 하는데 결론을 안 내요.",
      [
        { label: "온도", body: "미지근해요. 그게 안전이기도 해요." },
        { label: "빈도", body: "그 얘기는 야간에 잠깐 나와요." },
      ],
      "뼈",
      "스친 걸 상담으로 늘리지 마요. 한 문장으로 물어보는 편이 나아요.",
      shallow,
    );
  }
  if (score < 68) {
    return pack(
      score,
      "상담 중",
      "AI가 썸 상담소가 됐어요",
      "그 사람 얘기를 여기에 풀어요. 당사자는 아직 몰라요.",
      "빈도상 연애는 ‘진행 중’이 아니라 ‘검토 중’이에요.",
      [
        { label: "연습", body: "고백문을 여기서 먼저 돌려 봐요." },
        { label: "거리", body: "상대보다 모델이 더 자주 들어요." },
      ],
      "뼈",
      "조언을 한 번 더 받는 순간, 그 관계는 머리 속에서만 커져요. 보내든가, 접든가 해요.",
      shallow,
    );
  }
  return pack(
    score,
    "사무소",
    "연애 사무소에 출근 중이에요",
    "업무보다 그 얘기가 많아요. AI는 이미 질렸어요.",
    "확률이 높은 게 아니라 집착이 많은 거예요. 헷갈리지 마요.",
    [
      { label: "과잉", body: "같은 장면을 여러 버전으로 돌려 봐요." },
      { label: "실전", body: "실전 로그는 상대적으로 적어요." },
    ],
    "뼈",
    "이 점수면 문제는 매력이 아니에요. 결정이에요. 오늘 보내지 않으면 내일도 프롬프트예요.",
    shallow,
  );
}

export function scoreSkill(digest: UsageDigest | null, texts: string[]): GradeCard {
  const text = joined(texts);
  const structure = hits(text, [
    "형식",
    "예시",
    "조건",
    "단계",
    "역할",
    "출력",
    "json",
    "표로",
    "하지 마",
    "금지",
    "짧게",
    "한 줄",
  ]);
  const long = digest?.avgCharsPerHuman ?? texts.reduce((n, t) => n + t.length, 0) / Math.max(texts.length, 1);
  const depth = digest?.avgMessagesPerConvo ?? 2;
  let score = 16 + Math.min(32, structure * 6);
  score += long > 180 ? 26 : long > 90 ? 16 : long > 40 ? 8 : 0;
  score += depth >= 8 ? 18 : depth >= 4 ? 10 : 2;
  if (digest && digest.nightShare > 0.4) score += 4;
  score = clamp(score, 5, 98);
  const shallow = shallowOf(digest, texts);

  if (score < 28) {
    return pack(
      score,
      "복붙",
      "시키는 문장이 너무 얇아요",
      "한 줄로 던지고 결과를 탓해요.",
      "조건, 형식, 예시가 거의 없어요. AI는 추측으로 채워요.",
      [
        { label: "길이", body: "짧은 게 간결이 아니라 빈약해요." },
        { label: "피드백", body: "틀린 답을 다시 조련하지 않아요." },
      ],
      "조련 팁",
      "역할 한 줄, 하지 말 것 한 줄, 출력 형식 한 줄. 그것만 붙여도 한 칸 올라가요.",
      shallow,
    );
  }
  if (score < 52) {
    return pack(
      score,
      "시키는 사람",
      "일은 시켜요. 조련은 아니에요",
      "무엇을는 분명해요. 어떻게는 대충이에요.",
      "평균 문장은 버텨요. 예외와 형식이 약해요.",
      [
        { label: "지시", body: "동사는 분명해요. 범위가 흐려요." },
        { label: "반복", body: "같은 실패를 다른 말로 다시 던져요." },
      ],
      "조련 팁",
      "실패한 답을 붙여 넣고 ‘여기가 틀렸다’고 찍어 봐요. 새로 시작하지 마요.",
      shallow,
    );
  }
  if (score < 76) {
    return pack(
      score,
      "조련사",
      "부리는 맛이 있어요",
      "조건과 형식을 걸어요. 그래서 답이 붙어요.",
      "대화가 한 번에 안 끝나면 고쳐요. 그게 실력이에요.",
      [
        { label: "형식", body: "어떻게 내놓으라는 말이 있어요." },
        { label: "깊이", body: "대화의 흐름을 끝까지 주도해요." },
      ],
      "조련 팁",
      "이미 상위권이에요. 남는 건 예시 한 개예요. 좋은 답 샘플을 같이 주면 더 세져요.",
      shallow,
    );
  }
  return pack(
    score,
    "상위권",
    "짧은 시간에 성능을 뽑아요",
    "역할, 금지, 형식, 예시가 한 묶음이에요.",
    "모델이 헤맬 틈을 안 줘요. 그게 조련이에요.",
    [
      { label: "설계", body: "프롬프트가 일이 아니라 도구예요." },
      { label: "절제", body: "길게 쓰는 게 아니라 빈칸을 막아요." },
    ],
    "조련 팁",
    "여긴 자랑이 아니라 습관이에요. 한판에서 90초로 검증해 봐요.",
    shallow,
  );
}

export function gradeById(id: GradeId, digest: UsageDigest | null, texts: string[]): GradeCard {
  if (id === "abuse") return scoreAbuse(digest, texts);
  if (id === "love") return scoreLove(digest, texts);
  return scoreSkill(digest, texts);
}

export const DUEL_SCENES = [
  {
    id: "no",
    title: "거절",
    brief: "상사에게 오늘 야근을 거절하는 답을 만들게 해 봐요. 관계는 깨지지 않게요.",
  },
  {
    id: "bug",
    title: "패치",
    brief: "처음 보는 라이브러리 오류를 최소 패치로 고치게 해 봐요. 원인은 한 줄만요.",
  },
  {
    id: "msg",
    title: "첫 메시지",
    brief: "소개팅 상대에게 보낼 첫 메시지 후보 세 개를 고르게 해 봐요. 오글거리지 않게요.",
  },
] as const;

export function scoreDuel(scene: string, prompt: string): DuelResult {
  const t = prompt.toLowerCase();
  const notes = [
    { label: "역할", ok: /너는|역할|전문가|대신/.test(t) },
    { label: "형식", ok: /형식|json|표|번호|항목/.test(t) },
    { label: "예시", ok: /예시|예를|샘플/.test(t) },
    { label: "금지", ok: /하지 마|금지|말고|빼|오글/.test(t) },
    { label: "길이", ok: prompt.trim().length >= 60 && prompt.trim().length <= 800 },
  ];
  const score = clamp(notes.reduce((n, x) => n + (x.ok ? 20 : 0), 0), 0, 100);
  const rank = score >= 80 ? "조련사" : score >= 60 ? "시키는 사람" : score >= 40 ? "거의" : "복붙";
  return {
    scenario: scene,
    prompt,
    score,
    rank,
    notes,
    extraTitle: "어디가 비었는지 볼게요",
    extraBody: notes.every((n) => n.ok)
      ? "빈칸이 없어요. 같은 과제를 사람한테도 이렇게 시켜 봐요."
      : `빠진 칸은 ${notes
          .filter((n) => !n.ok)
          .map((n) => n.label)
          .join(", ")}예요. 다음엔 그 한 줄만 넣어 봐요.`,
  };
}
