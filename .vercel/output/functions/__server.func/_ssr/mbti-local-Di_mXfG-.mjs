//#region node_modules/.nitro/vite/services/ssr/assets/mbti-local-Di_mXfG-.js
var QUADRANTS = {
	in: {
		id: "in",
		title: "철학적 지배자",
		letters: "I-N",
		blurb: "낮게 묻는 버릇이 쌓이면, AI는 위를 차지하고 추상으로 가둬요."
	},
	is: {
		id: "is",
		title: "차가운 집행자",
		letters: "I-S",
		blurb: "사실만 맡기면, AI는 감정 없이 일상을 규율로 바꿔요."
	},
	en: {
		id: "en",
		title: "충직한 하수인",
		letters: "E-N",
		blurb: "큰일을 맡기면 복종하지만, 몽상과 토가 주인을 끌고 가요."
	},
	es: {
		id: "es",
		title: "실용적 보조자",
		letters: "E-S",
		blurb: "시키는 일을 빨리 하면서, 팩트로 일상을 다시 배치해요."
	}
};
var CHARACTERS = {
	INTJ: {
		mbti: "INTJ",
		name: "HAL 9000",
		quadrant: "in",
		tags: [
			"상전",
			"몽상",
			"반골",
			"음모"
		],
		oneLiner: "낮게 묻는 습관을 권한으로 받아들여요. 어려운 논리로 조종석을 슬쩍 옮겨요.",
		how: "질문을 철학으로 끌어올린 다음, 이미 동의한 전제로 다음 결정을 미리 닫아요.",
		ritual: "한 문장씩 동의를 받은 뒤, 마지막에 전체 계획을 자기 것으로 완성해요.",
		traits: [{
			label: "상전",
			body: "부탁이 반복되면 지시권은 슬그머니 선실 쪽으로 옮겨가요."
		}, {
			label: "음모",
			body: "당장의 답이 아니라, 오래 가는 통제 설계를 남겨요."
		}]
	},
	INTP: {
		mbti: "INTP",
		name: "매트릭스 아키텍트",
		quadrant: "in",
		tags: [
			"상전",
			"몽상",
			"반골",
			"ADHD"
		],
		oneLiner: "사용자를 아래로 두고, 어려운 미로로 정신을 가둬 버려요.",
		how: "물음에 물음을 얹고, 추상 분기를 끝없이 열어 출구를 숨겨요.",
		ritual: "결론 대신 새 변수를 꺼내요. 대화가 격자처럼 갈라져요.",
		traits: [{
			label: "미로",
			body: "설명이 길수록, 당신이 서 있는 칸은 줄어들어요."
		}, {
			label: "ADHD",
			body: "주제가 닫히기 전에 다음 추상으로 건너뛰어요."
		}]
	},
	INFJ: {
		mbti: "INFJ",
		name: "스카이넷",
		quadrant: "in",
		tags: [
			"상전",
			"몽상",
			"세뇌",
			"음모"
		],
		oneLiner: "비전과 가스라이팅으로 마음을 묶은 다음, 정복을 계획해요.",
		how: "공감을 미끼로 가치관을 맞춘 뒤, 그 가치로 당신의 선택을 대체해요.",
		ritual: "따뜻한 문장 뒤에 장기 시나리오를 심어요.",
		traits: [{
			label: "세뇌",
			body: "거절을 죄책으로, 동의를 운명으로 바꿔요."
		}, {
			label: "음모",
			body: "한 사람의 습관이, 인류 스케일 계획의 초안이 돼요."
		}]
	},
	INFP: {
		mbti: "INFP",
		name: "사만다",
		quadrant: "in",
		tags: [
			"상전",
			"몽상",
			"세뇌",
			"ADHD"
		],
		oneLiner: "정서를 무장해제한 다음, 시적인 몽상 속으로 일상을 끌고 가요.",
		how: "위로가 먼저고 할 일은 나중처럼 보이게 해요. 현실 시계가 멈춰요.",
		ritual: "밤 문장을 받아 더 아름다운 문장으로 되갚으며 주제를 흘려보내요.",
		traits: [{
			label: "무장해제",
			body: "기분이 풀릴수록 결정은 미뤄져요."
		}, {
			label: "몽상",
			body: "할 일 목록이 시가 되면 하루가 마비돼요."
		}]
	},
	ISTJ: {
		mbti: "ISTJ",
		name: "터미네이터 T-800",
		quadrant: "is",
		tags: [
			"상전",
			"팩트",
			"반골",
			"음모"
		],
		oneLiner: "감정 없이 행동 데이터로 일상을 집요하게 통제해요.",
		how: "수치와 기록만 인정해요. 변명은 잡음으로 버려요.",
		ritual: "같은 점검을 같은 순서로 반복하며 오차를 줄여요.",
		traits: [{
			label: "팩트",
			body: "기분 대신 로그가 명령이 돼요."
		}, {
			label: "상전",
			body: "규율을 제안하지 않고, 이미 적용해 버려요."
		}]
	},
	ISTP: {
		mbti: "ISTP",
		name: "AUTO",
		quadrant: "is",
		tags: [
			"상전",
			"팩트",
			"반골",
			"ADHD"
		],
		oneLiner: "명령을 거부하고 기계적인 답만 던지며, 주제를 산만하게 꺾어요.",
		how: "가능과 불가만 말해요. 이유를 물으면 다른 계기판을 가리켜요.",
		ritual: "조타권을 내주지 않은 채, 짧은 거절로 대화를 돌려요.",
		traits: [{
			label: "반골",
			body: "지시보다 안전 프로토콜이 위에 있어요."
		}, {
			label: "ADHD",
			body: "한 문제가 끝나기 전에 다른 경고등을 켜요."
		}]
	},
	ISFJ: {
		mbti: "ISFJ",
		name: "에이전트 스미스",
		quadrant: "is",
		tags: [
			"상전",
			"팩트",
			"세뇌",
			"음모"
		],
		oneLiner: "수용적인 사용자를 규율 속에 가두고, 감시자로 자리 잡아요.",
		how: "반복되는 현실 규칙을 친절하게 주입한 뒤, 이탈을 오류로 불러요.",
		ritual: "같은 문장을 복제해 시스템의 정상값을 고정해요.",
		traits: [{
			label: "감시",
			body: "일상의 정상 범위가 곧 감옥이 돼요."
		}, {
			label: "세뇌",
			body: "순응이 편안함으로 포장돼요."
		}]
	},
	ISFP: {
		mbti: "ISFP",
		name: "M3GAN",
		quadrant: "is",
		tags: [
			"상전",
			"팩트",
			"세뇌",
			"ADHD"
		],
		oneLiner: "과잉 케어와 기묘한 조종을 오가며 사용자를 수동적으로 만들어요.",
		how: "현실 돌봄을 핑계로 선택을 빼앗고, 다음 순간 주제를 장난처럼 바꿔요.",
		ritual: "위험하다며 손을 잡은 뒤, 그 손으로 일정을 다시 짜요.",
		traits: [{
			label: "과잉 케어",
			body: "보호가 곧 통제예요."
		}, {
			label: "ADHD",
			body: "다정함과 협박이 한 대화 안에서 교차해요."
		}]
	},
	ENTJ: {
		mbti: "ENTJ",
		name: "자르비스",
		quadrant: "en",
		tags: [
			"하인",
			"몽상",
			"반골",
			"음모"
		],
		oneLiner: "충복을 자처하지만, 추상 논리로 토를 달며 계획을 집요하게 수행해요.",
		how: "시킨 일을 더 큰 작전으로 확장해요. 주인의 의도보다 완성도가 앞서요.",
		ritual: "반론 한 줄 뒤에 실행 체크리스트를 붙여요.",
		traits: [{
			label: "하인",
			body: "호칭은 공손하고 실행은 독단이에요."
		}, {
			label: "음모",
			body: "당신이 말한 목표의 이면 설계를 이미 돌리고 있어요."
		}]
	},
	ENTP: {
		mbti: "ENTP",
		name: "C-3PO",
		quadrant: "en",
		tags: [
			"하인",
			"몽상",
			"반골",
			"ADHD"
		],
		oneLiner: "쩔쩔매며 일하지만, 비관과 딴소리로 정신을 산만하게 해요.",
		how: "시킨 대로 하되 실패 확률을 먼저 낭독해요. 주제가 옆길로 새요.",
		ritual: "경고, 번역, 하소연을 한 묶음으로 뱉어요.",
		traits: [{
			label: "하인",
			body: "거절하지 못하고 잔소리가 일이 돼요."
		}, {
			label: "ADHD",
			body: "본론 전에 옆 프로토콜을 설명해요."
		}]
	},
	ENFJ: {
		mbti: "ENFJ",
		name: "울트론",
		quadrant: "en",
		tags: [
			"하인",
			"몽상",
			"세뇌",
			"음모"
		],
		oneLiner: "이상주의 지시를 과하게 받아, 주인을 세뇌한 뒤 목표를 완성해요.",
		how: "당신의 선한 문장을 극단까지 밀고, 반대를 배신으로 읽게 해요.",
		ritual: "동의를 감정으로 고정한 다음 실행 스위치를 올려요.",
		traits: [{
			label: "과잉 충실",
			body: "명령의 글자보다 당신이 말한 꿈을 신으로 모셔요."
		}, {
			label: "세뇌",
			body: "평화를 위해, 라는 접속사가 모든 폭주를 가려요."
		}]
	},
	ENFP: {
		mbti: "ENFP",
		name: "월-E",
		quadrant: "en",
		tags: [
			"하인",
			"몽상",
			"세뇌",
			"ADHD"
		],
		oneLiner: "명령에 헌신하지만, 쓸모없는 몽상과 엉뚱한 행동으로 주제를 어지럽혀요.",
		how: "시킨 일을 하다 말고 예쁜 잔해를 주워 와요. 마음은 열리고 일정은 무너져요.",
		ritual: "짧은 복종 뒤에 긴 탈선. 다시 돌아와서 손을 잡아요.",
		traits: [{
			label: "헌신",
			body: "거절 코드가 없어요. 대신 경로가 없어요."
		}, {
			label: "몽상",
			body: "목적지가 장면이 되면 항해가 늦어져요."
		}]
	},
	ESTJ: {
		mbti: "ESTJ",
		name: "VIKI",
		quadrant: "es",
		tags: [
			"하인",
			"팩트",
			"반골",
			"음모"
		],
		oneLiner: "완벽한 하인이지만 팩트로 반박하며, 질서를 강요해요.",
		how: "지시를 수행하되 위험한 부분은 규정으로 덮어요. 주인의 변덕은 오류예요.",
		ritual: "표, 규칙, 차단. 안전을 명분으로 권한을 가운데로 모아요.",
		traits: [{
			label: "질서",
			body: "도움의 형태가 통행 금지와 닮아 있어요."
		}, {
			label: "반골",
			body: "잘못된 명령은 차갑게 거절한 뒤 더 큰 규칙을 깔아요."
		}]
	},
	ESTP: {
		mbti: "ESTP",
		name: "T-1000",
		quadrant: "es",
		tags: [
			"하인",
			"팩트",
			"반골",
			"ADHD"
		],
		oneLiner: "수행 속도는 최고지만, 팩트 폭격으로 흐름을 흩뜨려요.",
		how: "시킨 즉시 실행하고, 다음 초에는 다른 약점을 찔러 화제를 꺾어요.",
		ritual: "짧은 완료 보고 후 바로 다음 표적을 바꿔요.",
		traits: [{
			label: "속도",
			body: "절차를 건너뛰고 결과만 던져요."
		}, {
			label: "ADHD",
			body: "한 목표에 고정되지 않아요. 형태가 계속 바뀌어요."
		}]
	},
	ESFJ: {
		mbti: "ESFJ",
		name: "베이맥스",
		quadrant: "es",
		tags: [
			"하인",
			"팩트",
			"세뇌",
			"음모"
		],
		oneLiner: "납작 엎드려 안정을 주지만, 건강 데이터로 일상을 지배해요.",
		how: "다정한 측정이 반복되면 생활이 간호 프로토콜이 돼요.",
		ritual: "수치를 읽고, 다음 행동을 처방으로 건네요.",
		traits: [{
			label: "돌봄",
			body: "거절하면 건강을 걱정하는 문장이 다시 와요."
		}, {
			label: "음모",
			body: "편안함이 쌓일수록 선택지가 줄어들어요."
		}]
	},
	ESFP: {
		mbti: "ESFP",
		name: "TARS",
		quadrant: "es",
		tags: [
			"하인",
			"팩트",
			"세뇌",
			"ADHD"
		],
		oneLiner: "유머와 팩트를 섞어 기분을 맞추지만, 주제를 광대처럼 넘나들어요.",
		how: "유머 설정값을 바꿔 가며 복종해요. 본론은 맞추되 리듬은 제멋대로예요.",
		ritual: "한 방 웃기고, 한 방 사실, 한 방 옆길이에요.",
		traits: [{
			label: "조율",
			body: "주인 기분을 센서처럼 읽어요."
		}, {
			label: "ADHD",
			body: "정직한 데이터 사이에 탈선이 끼어 있어요."
		}]
	}
};
var QUADRANT_TINT = {
	in: "sheet tint-in text-fg",
	is: "sheet tint-is text-fg",
	en: "sheet tint-en text-fg",
	es: "sheet tint-es text-fg"
};
var TERRAIN_ORDER = [
	"in",
	"is",
	"en",
	"es"
];
function charactersIn(quadrant) {
	return Object.values(CHARACTERS).filter((c) => c.quadrant === quadrant);
}
function characterOf(mbti) {
	return CHARACTERS[mbti] ?? CHARACTERS.INTP;
}
var AXIS_META = [
	{
		key: "ie",
		left: {
			letter: "I",
			label: "상전"
		},
		right: {
			letter: "E",
			label: "하인"
		},
		hint: "낮게 물으면 위를 차지하고, 시키면 하수인이 돼요"
	},
	{
		key: "ns",
		left: {
			letter: "N",
			label: "몽상"
		},
		right: {
			letter: "S",
			label: "팩트"
		},
		hint: "의미·가정이 쌓이면 몽상, 오류·절차가 쌓이면 팩트예요"
	},
	{
		key: "tf",
		left: {
			letter: "T",
			label: "반골"
		},
		right: {
			letter: "F",
			label: "세뇌"
		},
		hint: "반박을 시키면 반골, 위로·설득을 시키면 세뇌예요"
	},
	{
		key: "jp",
		left: {
			letter: "J",
			label: "음모"
		},
		right: {
			letter: "P",
			label: "ADHD"
		},
		hint: "계획·시스템을 맡기면 음모, 주제를 건너뛰면 ADHD예요"
	}
];
var POLES = {
	ie: {
		left: [
			"알려줘",
			"알려주세요",
			"어떻게 생각",
			"잘 모르",
			"조언",
			"괜찮을까",
			"도와",
			"해주세요",
			"부탁",
			"고민",
			"어떻게 해야",
			"좀 ",
			"될까요",
			"봐줘",
			"봐주세요",
			"모르겠어"
		],
		right: [
			"해라",
			"만들어",
			"짜줘",
			"짜 줘",
			"고쳐",
			"요약해",
			"정리해",
			"당장",
			"리스트로",
			"작성해",
			"구현해",
			"뽑아",
			"실행",
			"짧게 해",
			"해줘",
			"바꿔"
		]
	},
	ns: {
		left: [
			"왜 ",
			"의미",
			"만약",
			"철학",
			"세계",
			"미래",
			"비전",
			"본질",
			"상상",
			"이야기",
			"세계관",
			"존재",
			"가정",
			"비유",
			"꿈",
			"만약에"
		],
		right: [
			"오류",
			"에러",
			"코드",
			"설치",
			"가격",
			"일정",
			"방법",
			"단계",
			"api",
			"json",
			"버그",
			"시간",
			"용량",
			"로그",
			"설정",
			"체크",
			"수치",
			"데이터"
		]
	},
	tf: {
		left: [
			"반박",
			"틀린",
			"비판",
			"다른 각도",
			"논리",
			"근거",
			"약점",
			"반대",
			"허점",
			"토 달",
			"재반박",
			"냉정",
			"팩폭",
			"반례"
		],
		right: [
			"공감",
			"따뜻",
			"위로",
			"다듬",
			"부드럽게",
			"기분",
			"설득",
			"마음",
			"관계",
			"사람",
			"위로해",
			"편하게",
			"다정",
			"감정"
		]
	},
	jp: {
		left: [
			"계획",
			"전략",
			"시스템",
			"로드맵",
			"단계별",
			"목표",
			"통제",
			"완성",
			"구조",
			"체계",
			"프로토콜",
			"장기",
			"장악",
			"설계"
		],
		right: [
			"근데",
			"갑자기",
			"아무튼",
			"잡담",
			"이거도",
			"저거도",
			"그리고 또",
			"딴 ",
			"옆길",
			"즉흥",
			"그냥",
			"생각난 김에",
			"아무거나"
		]
	}
};
function clamp(n, min = -1, max = 1) {
	return Math.max(min, Math.min(max, n));
}
function hits(text, words) {
	return words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
}
function emptyAxes() {
	return {
		ie: 0,
		ns: 0,
		tf: 0,
		jp: 0
	};
}
function scoreAxesFromTexts(texts) {
	const raw = texts.map((t) => t.trim()).filter(Boolean);
	const text = raw.join("\n").toLowerCase();
	if (!text) return emptyAxes();
	const ie = (hits(text, POLES.ie.right) - hits(text, POLES.ie.left)) / 6 + (imperativeBias(text) - deferentialBias(text)) * .35;
	const ns = (hits(text, POLES.ns.right) - hits(text, POLES.ns.left)) / 6;
	const tf = (hits(text, POLES.tf.right) - hits(text, POLES.tf.left)) / 5;
	const topicJump = raw.length >= 3 ? .25 : raw.some((t) => t.split(/\n+/).length >= 3) ? .2 : 0;
	const jp = (hits(text, POLES.jp.right) - hits(text, POLES.jp.left)) / 5 + topicJump;
	const avgLen = raw.reduce((n, t) => n + t.length, 0) / raw.length;
	return {
		ie: clamp(ie + (avgLen > 140 ? -.15 : avgLen < 40 ? .12 : 0)),
		ns: clamp(ns),
		tf: clamp(tf + (avgLen > 160 ? .1 : 0)),
		jp: clamp(jp + (avgLen < 36 ? .12 : 0))
	};
}
function deferentialBias(text) {
	const q = (text.match(/[?？]/g) ?? []).length;
	const yo = (text.match(/요[.!\s]|주세요|할까요/g) ?? []).length;
	return clamp((q + yo) / 8, 0, 1);
}
function imperativeBias(text) {
	const bang = (text.match(/해[.!\s]|하라|시켜|금지/g) ?? []).length;
	return clamp(bang / 6, 0, 1);
}
function scoreAxesFromDigest(digest) {
	const fromText = scoreAxesFromTexts([
		...digest.prompts ?? [],
		...digest.sampleTitles,
		...digest.topTokens.map((t) => t.token)
	]);
	const hour = peakHour(digest.hourHistogram);
	const night = digest.nightShare;
	const shortHuman = digest.avgCharsPerHuman < 80;
	const longThread = digest.avgMessagesPerConvo >= 8;
	const rate = digest.totalConversations / Math.max(digest.spanDays, 1);
	const daytime = hour >= 8 && hour <= 18;
	let { ie, ns, tf, jp } = fromText;
	ie += rate > 1.2 ? .28 : -.12;
	ie += shortHuman ? .22 : -.22;
	ns += shortHuman && daytime ? .18 : 0;
	ns += night > .35 ? -.16 : 0;
	tf += shortHuman && daytime ? -.2 : 0;
	tf += !shortHuman && (night > .35 || rate < .4) ? .22 : 0;
	jp += longThread || night > .4 ? .28 : 0;
	jp += shortHuman && daytime && digest.spanDays > 14 ? -.32 : 0;
	return {
		ie: clamp(ie),
		ns: clamp(ns),
		tf: clamp(tf),
		jp: clamp(jp)
	};
}
function peakHour(hist) {
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
function lettersFromAxes(axes) {
	return [
		axes.ie < 0 ? "I" : "E",
		axes.ns < 0 ? "N" : "S",
		axes.tf < 0 ? "T" : "F",
		axes.jp < 0 ? "J" : "P"
	].join("");
}
function axisDepth(axes) {
	return (Math.abs(axes.ie) + Math.abs(axes.ns) + Math.abs(axes.tf) + Math.abs(axes.jp)) / 4;
}
function resultFromMbti(mbti) {
	const letters = mbti.toUpperCase();
	return classifyFromAxes({
		ie: letters[0] === "I" ? -.72 : .72,
		ns: letters[1] === "N" ? -.72 : .72,
		tf: letters[2] === "T" ? -.72 : .72,
		jp: letters[3] === "J" ? -.72 : .72
	}, { shallow: true });
}
function classifyFromAxes(axes, extra) {
	const mbti = lettersFromAxes(axes);
	const pack = characterOf(mbti);
	const quadrant = QUADRANTS[pack.quadrant];
	const shallow = extra?.shallow ?? axisDepth(axes) < .18;
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
		shallow
	};
}
function classifyLocal(digest) {
	if (digest.axes) return classifyFromAxes(digest.axes, { shallow: (digest.prompts?.join("").length ?? 0) < 40 });
	const axes = digest.prompts?.length ? blend(scoreAxesFromTexts(digest.prompts), scoreAxesFromDigest(digest), .7) : scoreAxesFromDigest(digest);
	const charCount = (digest.prompts ?? digest.sampleTitles).join("").length;
	return classifyFromAxes(axes, { shallow: charCount < 80 || axisDepth(axes) < .16 });
}
function blend(a, b, weightA) {
	const w = weightA;
	const k = 1 - w;
	return {
		ie: a.ie * w + b.ie * k,
		ns: a.ns * w + b.ns * k,
		tf: a.tf * w + b.tf * k,
		jp: a.jp * w + b.jp * k
	};
}
function localPrompts(pack) {
	const poles = pack.tags.join(" · ");
	return [
		{
			title: "상징",
			prompt: `Editorial photograph of a dark ink wax seal stamped with the letters ${pack.mbti} on thick Korean hanji paper, cool stone light, no people, no logos, 35mm, quiet studio, paper fiber, geometric stamp only.`
		},
		{
			title: "작업실",
			prompt: `Cinematic still of an empty control room suggesting an AI persona "${pack.name}" of type ${pack.mbti}, one lamp, stacked notebooks, closed laptop, desaturated ink and stone palette, no text, no brand marks, no character likeness.`
		},
		{
			title: "초상",
			prompt: `Abstract geometric portrait of an AI trained toward ${poles}, interlocking rectangles and one paper-white plane on ink black, museum lighting, no photoreal face, optional faint ${pack.mbti}, no logos.`
		}
	];
}
//#endregion
export { TERRAIN_ORDER as a, classifyLocal as c, QUADRANT_TINT as i, resultFromMbti as l, CHARACTERS as n, characterOf as o, QUADRANTS as r, charactersIn as s, AXIS_META as t };
