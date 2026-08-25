type DemoMsg = {
  sender: "human" | "assistant";
  text: string;
  offsetMin: number;
};

const THREADS: { title: string; day: number; hour: number; msgs: DemoMsg[] }[] = [
  {
    title: "n8n SSH 노드 타임아웃",
    day: 2,
    hour: 23,
    msgs: [
      { sender: "human", text: "SSH 노드가 120초에서 끊긴다. 재시도 전략 알려줘.", offsetMin: 0 },
      { sender: "assistant", text: "타임아웃과 재시도 횟수를 분리해서 잡아라.", offsetMin: 1 },
      { sender: "human", text: "stdout에서 JSON만 추출하는 코드도.", offsetMin: 4 },
      { sender: "assistant", text: "펜스와 중괄호 인덱스로 자르면 된다.", offsetMin: 5 },
    ],
  },
  {
    title: "포트폴리오 현금 캘린더",
    day: 5,
    hour: 8,
    msgs: [
      { sender: "human", text: "90일 현금 캘린더가 없으면 매수 금액을 왜 막아야 하지?", offsetMin: 0 },
      { sender: "assistant", text: "운영자금 가시성이 없을 때 사이징은 추측이 된다.", offsetMin: 2 },
    ],
  },
  {
    title: "한국어 숫자 읽기",
    day: 8,
    hour: 21,
    msgs: [
      { sender: "human", text: "2시와 15분을 음성으로 어떻게 읽나.", offsetMin: 0 },
      { sender: "assistant", text: "시는 고유어, 분은 한자어.", offsetMin: 1 },
      { sender: "human", text: "27도는?", offsetMin: 3 },
      { sender: "assistant", text: "이십칠도.", offsetMin: 4 },
    ],
  },
  {
    title: "CAD 공유폴더 렉",
    day: 11,
    hour: 9,
    msgs: [
      { sender: "human", text: "와이파이 공유에서 AP3D가 멈춘다.", offsetMin: 0 },
      { sender: "assistant", text: "유선 직결과 동기화 끄기를 먼저 분리해서 봐라.", offsetMin: 2 },
    ],
  },
  {
    title: "Grok 내보내기 JSON 구조",
    day: 18,
    hour: 14,
    msgs: [
      { sender: "human", text: "conversations 배열을 브라우저에서 파싱하고 싶다.", offsetMin: 0 },
      { sender: "assistant", text: "conversation 메타와 responses 배열을 펼치면 된다.", offsetMin: 1 },
      { sender: "human", text: "create_time이 $date 형태다.", offsetMin: 6 },
      { sender: "assistant", text: "밀리초 정수로 정규화해라.", offsetMin: 7 },
      { sender: "human", text: "Web Worker가 비용을 줄이나?", offsetMin: 12 },
      { sender: "assistant", text: "서버 비용은 그대로고, 화면 멈춤만 줄어든다.", offsetMin: 13 },
    ],
  },
  {
    title: "주말 일정 초안",
    day: 20,
    hour: 19,
    msgs: [
      { sender: "human", text: "친구에게 보낼 짧은 안내문 다듬어줘.", offsetMin: 0 },
      { sender: "assistant", text: "시간, 장소, 준비물 순으로 세 줄.", offsetMin: 1 },
    ],
  },
  {
    title: "Tesla 열선 위치",
    day: 24,
    hour: 7,
    msgs: [
      { sender: "human", text: "후방 유리 열선이 안쪽인가.", offsetMin: 0 },
      { sender: "assistant", text: "유리 안쪽 표면이다. 바깥에서 긁지 마라.", offsetMin: 1 },
    ],
  },
  {
    title: "이미지 프롬프트 톤",
    day: 27,
    hour: 1,
    msgs: [
      { sender: "human", text: "과장된 네온 없이 지적인 초상 프롬프트.", offsetMin: 0 },
      { sender: "assistant", text: "잉크 배경, 한 장의 종이, 기하 인장.", offsetMin: 2 },
      { sender: "human", text: "MBTI 네 글자를 인장처럼.", offsetMin: 8 },
      { sender: "assistant", text: "활자보다 면 분할이 먼저다.", offsetMin: 9 },
    ],
  },
];

function expandThreads() {
  const more = [
    "리비전 파일명 규칙",
    "원드라이브 용량",
    "평일 08시 크론",
    "JSON 스키마 검증",
    "텔레그램 성명 톤",
    "샘플 원장 totals",
    "DGRO 매수일",
    "환율 효과 기록",
    "브라우저 히스토리 시각화",
    "공개데이터 MCP",
    "도메인 갱신 비용",
    "점심 순대국밥",
    "Switch 게임 케이스",
    "영양정보 라벨",
    "배수 엘보 삭제",
    "복소수 표현",
  ];
  return more.map((title, i) => ({
    title,
    day: 3 + i * 2,
    hour: [8, 11, 14, 18, 22, 1, 9][i % 7],
    msgs: [
      { sender: "human" as const, text: `${title} 관련해서 짧게 정리해줘.`, offsetMin: 0 },
      { sender: "assistant" as const, text: `${title}의 핵심만 남기고 나머지는 버려라.`, offsetMin: 2 },
    ],
  }));
}

export function buildDemoExport() {
  const origin = Date.UTC(2026, 6, 1, 0, 0, 0);
  const threads = [...THREADS, ...expandThreads()];
  const conversations = threads.map((t, i) => {
    const base = origin + t.day * 86400000 + t.hour * 3600000;
    const responses = t.msgs.map((m, j) => ({
      response: {
        _id: `m-${i}-${j}`,
        conversation_id: `c-${i}`,
        sender: m.sender,
        message: m.text,
        create_time: { $date: { $numberLong: String(base + m.offsetMin * 60000) } },
      },
      share_link: null,
    }));
    return {
      conversation: {
        id: `c-${i}`,
        title: t.title,
        create_time: new Date(base).toISOString(),
        modify_time: new Date(base + t.msgs.length * 60000).toISOString(),
      },
      responses,
    };
  });
  return { conversations, projects: [], tasks: [], media_posts: [] };
}
