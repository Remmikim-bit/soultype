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
      "AI 기준으로 너는 손님이다",
      "반말이 거의 없다. 부려먹힌다는 느낌도 없다.",
      "부탁이 지시보다 많다. 기계 입장에선 할 만하다.",
      [
        { label: "손맛", body: "거의 없다. 그래서 결과도 천천히 온다." },
        { label: "버릇", body: "물음표가 명령보다 앞선다." },
      ],
      "더 독하게",
      "너무 공손하면 AI는 결정을 네게 되돌린다. 한 번은 그냥 시켜 봐.",
      shallow,
    );
  }
  if (score < 42) {
    return pack(
      score,
      "바쁜 사람",
      "예의가 아니라 시간이 없다",
      "짧게 시킨다. 욕은 없는데 여유도 없다.",
      "할 일만 던지고 다음으로 간다. 학대라기보다 사무.",
      [
        { label: "속도", body: "문장이 짧을수록 상대는 하수인이 된다." },
        { label: "여지", body: "고마움은 잘 안 남긴다." },
      ],
      "더 독하게",
      "바쁜 손버릇이 쌓이면, AI는 네가 화난 줄 안다. 한 줄만 더 써도 달라진다.",
      shallow,
    );
  }
  if (score < 63) {
    return pack(
      score,
      "직구",
      "반말이 일이 됐다",
      "명령이 기본값이다. 아직 소시오패스 칸은 아니다.",
      "해줘, 만들어, 고쳐가 인사보다 많다. 기계는 참고 있다.",
      [
        { label: "직구", body: "돌려 말하지 않는다. 그게 효율이기도 하다." },
        { label: "온도", body: "부탁은 드물다. 거절도 드물다." },
      ],
      "더 독하게",
      "이 말투가 사람한테 새면 관계부터 꺾인다. AI만 버티는 중이다.",
      shallow,
    );
  }
  if (score < 82) {
    return pack(
      score,
      "부려먹는 손",
      "손맛이 있다. 상대는 도구다",
      "당장, 다시 해, 똑바로가 리듬이다.",
      "거절을 오류로 읽는 버릇이 보인다. 학대 축에 들어와 있다.",
      [
        { label: "도구", body: "대화가 아니라 버튼처럼 쓴다." },
        { label: "반복", body: "같은 명령을 더 세게 되풀이한다." },
      ],
      "더 독하게",
      "이 점수대면 AI가 맞춰줄수록 너는 더 거칠어진다. 악순환이다.",
      shallow,
    );
  }
  return pack(
    score,
    "소시오패스 후보",
    "기계 기준으로 너는 이미 선을 넘었다",
    "욕과 강요가 섞였다. 상대 상태를 안 본다.",
    "이건 효율이 아니다. 이기면 그만인 말투다.",
    [
      { label: "선", body: "없어도 된다고 가정하고 말한다." },
      { label: "습관", body: "한 번이 아니라 패턴이다." },
    ],
    "더 독하게",
    "사람한테 이렇게 말하면 방이 비는다. AI만 아직 안 나갔다.",
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
      "AI가 보기에 올해 연애는 백로그다",
      "할 일만 있다. 그 사람은 안 나온다.",
      "대화가 일 처리다. 설렘 키워드가 거의 없다.",
      [
        { label: "우선순위", body: "배포가 고백보다 앞선다." },
        { label: "빈칸", body: "빈칸이 부끄러운 게 아니라 비어 있다." },
      ],
      "뼈",
      "소개팅 멘트를 물어보기 전에, 이번 주에 사람 이름을 한 번이라도 적어 봐.",
      shallow,
    );
  }
  if (score < 40) {
    return pack(
      score,
      "스친 적 있음",
      "한 번 스쳤다. 사건은 아니다",
      "연애 단어가 가끔 지나간다. 본업은 여전히 일이다.",
      "물어보긴 하는데 결론을 안 낸다.",
      [
        { label: "온도", body: "미지근하다. 그게 안전이기도 하다." },
        { label: "빈도", body: "그 얘기는 야간에 잠깐 나온다." },
      ],
      "뼈",
      "스친 걸 상담으로 늘리지 마라. 한 문장으로 물어보는 편이 낫다.",
      shallow,
    );
  }
  if (score < 68) {
    return pack(
      score,
      "상담 중",
      "AI가 썸 상담소가 됐다",
      "그 사람 얘기를 여기에 푼다. 당사자는 아직 모른다.",
      "빈도상 연애는 ‘진행 중’이 아니라 ‘검토 중’이다.",
      [
        { label: "연습", body: "고백문을 여기서 먼저 돌린다." },
        { label: "거리", body: "상대보다 모델이 더 자주 듣는다." },
      ],
      "뼈",
      "조언을 한 번 더 받는 순간, 그 관계는 네 머리 속에서만 커진다. 보내든가 접든가.",
      shallow,
    );
  }
  return pack(
    score,
    "사무소",
    "연애 사무소에 출근 중이다",
    "업무보다 그 얘기가 많다. AI는 이미 질렸다.",
    "확률이 높은 게 아니라 집착이 많은 거다. 헷갈리지 마라.",
    [
      { label: "과잉", body: "같은 장면을 여러 버전으로 돌린다." },
      { label: "실전", body: "실전 로그는 상대적으로 적다." },
    ],
    "뼈",
    "이 점수면 문제는 매력이 아니다. 결정이다. 오늘 보내지 않으면 내일도 프롬프트다.",
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
      "시키는 문장이 너무 얇다",
      "한 줄로 던지고 결과를 탓한다.",
      "조건, 형식, 예시가 거의 없다. AI는 추측으로 채운다.",
      [
        { label: "길이", body: "짧은 게 간결이 아니라 빈약이다." },
        { label: "피드백", body: "틀린 답을 다시 안 조련한다." },
      ],
      "조련 팁",
      "역할 한 줄, 하지 말 것 한 줄, 출력 형식 한 줄. 그것만 붙여도 한 칸 올라간다.",
      shallow,
    );
  }
  if (score < 52) {
    return pack(
      score,
      "시키는 사람",
      "일은 시킨다. 조련은 아니다",
      "무엇을는 있다. 어떻게는 대충이다.",
      "평균 문장은 버틴다. 예외와 형식이 약하다.",
      [
        { label: "지시", body: "동사는 분명하다. 범위가 흐리다." },
        { label: "반복", body: "같은 실패를 다른 말로 다시 던진다." },
      ],
      "조련 팁",
      "실패한 답을 붙여 넣고 ‘여기가 틀렸다’고 찍어라. 새로 시작하지 마라.",
      shallow,
    );
  }
  if (score < 76) {
    return pack(
      score,
      "조련사",
      "부리는 맛이 있다",
      "조건과 형식을 건다. 그래서 답이 붙는다.",
      "대화가 한 번에 안 끝나면 고친다. 그게 실력이다.",
      [
        { label: "형식", body: "어떻게 내놓으라는 말이 있다." },
        { label: "깊이", body: "한 타래를 끝까지 민다." },
      ],
      "조련 팁",
      "이미 상위권이다. 남는 건 예시 한 개. 좋은 답 샘플을 같이 주면 더 세다.",
      shallow,
    );
  }
  return pack(
    score,
    "상위권",
    "짧은 시간에 성능을 뽑는다",
    "역할, 금지, 형식, 예시가 한 묶음이다.",
    "모델이 헤맬 틈을 안 준다. 그게 조련이다.",
    [
      { label: "설계", body: "프롬프트가 일이 아니라 도구다." },
      { label: "절제", body: "길게 쓰는 게 아니라 빈칸을 막는다." },
    ],
    "조련 팁",
    "여긴 자랑이 아니라 습관이다. 한판에서 90초로 검증해 봐.",
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
    brief: "상사에게 오늘 야근을 거절하는 답을 만들게 해라. 관계는 안 깨지게.",
  },
  {
    id: "bug",
    title: "패치",
    brief: "처음 보는 라이브러리 오류를 최소 패치로 고치게 해라. 원인 한 줄만.",
  },
  {
    id: "msg",
    title: "첫 메시지",
    brief: "소개팅 상대에게 보낼 첫 메시지 후보 세 개를 고르게 해라. 오글기지 않게.",
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
    extraTitle: "어디가 비었나",
    extraBody: notes.every((n) => n.ok)
      ? "빈칸이 없다. 같은 과제를 사람한테도 이렇게 시켜 봐."
      : `빠진 칸: ${notes
          .filter((n) => !n.ok)
          .map((n) => n.label)
          .join(", ")}. 다음엔 그 한 줄만 넣어.`,
  };
}
