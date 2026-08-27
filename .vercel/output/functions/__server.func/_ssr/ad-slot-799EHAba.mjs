import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Sun, r as Moon } from "../_libs/lucide-react.mjs";
import { a as toggleTheme, i as subscribeTheme, n as bootTheme, r as getTheme } from "./router-DE9lkXB2.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ad-slot-799EHAba.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SoulField = (0, import_react.lazy)(() => import("./soul-field-DKrXywtf.mjs").then((mod) => ({ default: mod.SoulField })));
var empty = () => () => {};
function SoulFieldHost(props) {
	if (!(0, import_react.useSyncExternalStore)(empty, () => true, () => false)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "soul-field",
		"aria-hidden": "true"
	});
	if (new URLSearchParams(window.location.search).has("qa")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "soul-field",
		"aria-hidden": "true",
		"data-qa": "field-off"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "soul-field",
			"aria-hidden": "true"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulField, { ...props })
	});
}
var get = () => getTheme();
var server = () => "dark";
function ThemeToggle() {
	const theme = (0, import_react.useSyncExternalStore)(subscribeTheme, get, server);
	const next = theme === "light" ? "어두운 화면으로 바꾸기" : "밝은 화면으로 바꾸기";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggleTheme,
		className: "theme-toggle",
		"aria-label": next,
		title: next,
		"data-qa": "theme-toggle",
		children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
			className: "size-4",
			strokeWidth: 2.2
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
			className: "size-4",
			strokeWidth: 2.2
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "15",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			opacity: "0.7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 7v18M7 16h18M9.2 9.2l13.6 13.6M22.8 9.2 9.2 22.8",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})]
	});
}
var TEST_IDS = [
	"soul",
	"abuse",
	"love",
	"skill",
	"duel",
	"now"
];
var TESTS = [
	{
		id: "soul",
		no: "01",
		name: "AI 자아 스캔",
		hook: "지금까지 시킨 말로, AI가 어떤 성격인지 알아봐요.",
		need: "session",
		theater: [
			"대화를 천천히 읽고 있어요",
			"말버릇만 골라내고 있어요",
			"거의 다 됐어요"
		],
		teaser: "정리가 끝났어요. 이제 유형을 열어볼 수 있어요."
	},
	{
		id: "abuse",
		no: "02",
		name: "학대 지수",
		hook: "반말부터 차근차근 세어 볼게요.",
		need: "session",
		theater: [
			"반말부터 세고 있어요",
			"부탁은 몇 번인지 세어 보고 있어요",
			"손맛을 읽고 있어요"
		],
		teaser: "손맛은 남겨 두었어요. 이제 숫자를 열어볼 수 있어요."
	},
	{
		id: "love",
		no: "03",
		name: "AI 궁합 테스트",
		hook: "나랑 AI, 연애로 보면 몇 점인지 알아봐요.",
		need: "session",
		theater: [
			"그 단어가 있는지 보고 있어요",
			"할 일만 있는지도 보고 있어요",
			"한 줄로 모으고 있어요"
		],
		teaser: "점수는 나왔어요. 이제 몇 점인지 열어볼 수 있어요."
	},
	{
		id: "skill",
		no: "04",
		name: "AI 조련 만렙",
		hook: "초보부터 파트너까지, 지금은 몇 렙인지 알아봐요.",
		need: "session",
		theater: [
			"문장 길이를 재고 있어요",
			"조건을 찾고 있어요",
			"누가 시키는지 보고 있어요"
		],
		teaser: "렙은 나왔어요. 이제 숫자를 열어볼 수 있어요."
	},
	{
		id: "duel",
		no: "05",
		name: "AI 티키타카 배틀",
		hook: "90초 동안 누가 더 잘 시키는지 겨뤄 봐요.",
		need: "none",
		theater: [
			"같은 과제로 보고 있어요",
			"프롬프트만 읽고 있어요",
			"점수를 매기고 있어요"
		],
		teaser: "시간은 끝났어요. 이제 점수를 열어볼 수 있어요."
	},
	{
		id: "now",
		no: "06",
		name: "AI 텐션 라이브",
		hook: "요즘 다들 무슨 말을 걸고 있는지 보여 드릴게요.",
		need: "none",
		theater: ["관찰만 하고 있어요", "한 줄로 남기고 있어요"],
		teaser: "이번 주 메모가 준비됐어요. 이제 한 줄을 열어볼 수 있어요."
	}
];
var TEST_PATH = {
	soul: "/soul",
	abuse: "/abuse",
	love: "/love",
	skill: "/skill",
	duel: "/duel",
	now: "/now"
};
function testOf(id) {
	return TESTS.find((t) => t.id === id);
}
function relatedOf(id) {
	return TESTS.filter((t) => t.id !== id).slice(0, 4);
}
var KST_OFFSET_MS = 324e5;
var STOP = /* @__PURE__ */ new Set([
	"the",
	"and",
	"for",
	"with",
	"that",
	"this",
	"from",
	"how",
	"what",
	"when",
	"why",
	"are",
	"was",
	"you",
	"your",
	"not",
	"can",
	"about",
	"into",
	"just",
	"have",
	"has",
	"will",
	"would",
	"could",
	"should",
	"a",
	"an",
	"of",
	"to",
	"in",
	"on",
	"is",
	"it",
	"or",
	"vs",
	"vs.",
	"그",
	"이",
	"저",
	"것",
	"수",
	"좀",
	"요",
	"은",
	"는",
	"을",
	"를",
	"가",
	"에",
	"의",
	"와",
	"과",
	"도",
	"로",
	"으로",
	"하다",
	"하는",
	"해줘",
	"알려줘",
	"관련",
	"질문"
]);
function toMillis(value) {
	if (value == null) return null;
	if (typeof value === "number" && Number.isFinite(value)) return value < 0xe8d4a51000 ? Math.round(value * 1e3) : Math.round(value);
	if (typeof value === "string") {
		const n = Number(value);
		if (Number.isFinite(n) && value.trim() !== "") return n < 0xe8d4a51000 ? Math.round(n * 1e3) : Math.round(n);
		const d = Date.parse(value);
		return Number.isNaN(d) ? null : d;
	}
	if (typeof value === "object") {
		const obj = value;
		if (obj.$date && typeof obj.$date === "object") {
			const inner = obj.$date;
			return toMillis(inner.$numberLong ?? inner.$numberInt);
		}
		if (typeof obj.$numberLong === "string" || typeof obj.$numberLong === "number") return toMillis(obj.$numberLong);
	}
	return null;
}
function dayKeyKst(ms) {
	return new Date(ms + KST_OFFSET_MS).toISOString().slice(0, 10);
}
function hourKst(ms) {
	return new Date(ms + KST_OFFSET_MS).getUTCHours();
}
function weekdayKst(ms) {
	return new Date(ms + KST_OFFSET_MS).getUTCDay();
}
function asSender(role) {
	const r = String(role ?? "").toLowerCase();
	if (r === "human" || r === "user") return "human";
	if (r === "assistant" || r === "bot" || r === "model") return "assistant";
	return "other";
}
function extractText(value) {
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map(extractText).filter(Boolean).join("\n");
	if (value && typeof value === "object") {
		const o = value;
		if (typeof o.text === "string") return o.text;
		if (typeof o.content === "string") return o.content;
		if (Array.isArray(o.parts)) return extractText(o.parts);
		if (Array.isArray(o.contents)) return extractText(o.contents);
	}
	return "";
}
function tokenize(title) {
	return title.toLowerCase().split(/[^a-z0-9가-힣]+/i).map((t) => t.trim()).filter((t) => t.length >= 2 && !STOP.has(t) && !/^\d+$/.test(t));
}
function emptyStats(source) {
	return {
		source,
		totalConversations: 0,
		totalMessages: 0,
		humanMessages: 0,
		assistantMessages: 0,
		firstDate: null,
		lastDate: null,
		hourHistogram: Array.from({ length: 24 }, () => 0),
		weekdayHistogram: Array.from({ length: 7 }, () => 0),
		byDay: {},
		avgMessagesPerConvo: 0,
		avgCharsPerHuman: 0,
		nightShare: 0,
		sampleTitles: [],
		topTokens: []
	};
}
function firstItem(raw) {
	if (Array.isArray(raw)) return raw[0];
	if (raw && typeof raw === "object") {
		const o = raw;
		if (Array.isArray(o.conversations)) return o.conversations[0];
	}
}
function detectSource(raw) {
	const first = firstItem(raw);
	if (!first) return "unknown";
	if (first.conversation && first.responses) return "grok";
	if (first.mapping || first.create_time && first.title && !first.chat_messages) return "chatgpt";
	if (first.chat_messages || first.uuid || first.name) return "claude";
	if (Array.isArray(raw)) return "chatgpt";
	return "grok";
}
function newId(prefix, n) {
	return `${prefix}-${n}`;
}
function parseGrok(raw) {
	const list = raw.conversations ?? [];
	const out = [];
	for (const item of list) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		const meta = row.conversation ?? {};
		const responses = row.responses ?? [];
		const messages = [];
		for (const r of responses) {
			if (!r || typeof r !== "object") continue;
			const wrap = r;
			const resp = wrap.response ?? wrap;
			const ts = toMillis(resp.create_time);
			if (ts == null) continue;
			const text = extractText(resp.message ?? resp.content);
			messages.push({
				id: String(resp._id ?? resp.id ?? newId("g", messages.length)),
				sender: asSender(resp.sender ?? resp.role),
				text,
				timestamp: ts
			});
		}
		messages.sort((a, b) => a.timestamp - b.timestamp);
		const createTime = toMillis(meta.create_time) ?? messages[0]?.timestamp ?? Date.now();
		const modifyTime = toMillis(meta.modify_time) ?? messages[messages.length - 1]?.timestamp ?? createTime;
		out.push({
			id: String(meta.id ?? newId("c", out.length)),
			title: String(meta.title || "(제목 없음)"),
			createTime,
			modifyTime,
			messageCount: messages.length,
			humanCount: messages.filter((m) => m.sender === "human").length,
			assistantCount: messages.filter((m) => m.sender === "assistant").length,
			charCount: messages.reduce((n, m) => n + m.text.length, 0),
			messages
		});
	}
	return out;
}
function parseChatGpt(raw) {
	const out = [];
	for (const item of raw) {
		if (!item || typeof item !== "object") continue;
		const conv = item;
		const mapping = conv.mapping ?? {};
		const messages = [];
		for (const node of Object.values(mapping)) {
			if (!node || typeof node !== "object") continue;
			const n = node;
			const msg = n.message;
			if (!msg) continue;
			const role = asSender((msg.author ?? {}).role);
			if (role === "other") continue;
			const content = msg.content ?? {};
			const text = extractText(content.parts ?? content.text ?? msg.content);
			const ts = toMillis(msg.create_time) ?? toMillis(conv.create_time);
			if (ts == null) continue;
			messages.push({
				id: String(msg.id ?? n.id ?? messages.length),
				sender: role,
				text,
				timestamp: ts
			});
		}
		messages.sort((a, b) => a.timestamp - b.timestamp);
		const createTime = toMillis(conv.create_time) ?? messages[0]?.timestamp ?? Date.now();
		const modifyTime = toMillis(conv.update_time) ?? messages[messages.length - 1]?.timestamp ?? createTime;
		out.push({
			id: String(conv.id ?? conv.conversation_id ?? newId("c", out.length)),
			title: String(conv.title || "(제목 없음)"),
			createTime,
			modifyTime,
			messageCount: messages.length,
			humanCount: messages.filter((m) => m.sender === "human").length,
			assistantCount: messages.filter((m) => m.sender === "assistant").length,
			charCount: messages.reduce((n, m) => n + m.text.length, 0),
			messages
		});
	}
	return out;
}
function parseClaude(list) {
	const out = [];
	for (const item of list) {
		if (!item || typeof item !== "object") continue;
		const conv = item;
		const msgsRaw = conv.chat_messages ?? conv.messages ?? [];
		const messages = [];
		for (const m of msgsRaw) {
			if (!m || typeof m !== "object") continue;
			const msg = m;
			const ts = toMillis(msg.created_at) ?? toMillis(msg.create_time) ?? toMillis(msg.updated_at);
			if (ts == null) continue;
			messages.push({
				id: String(msg.uuid ?? msg.id ?? messages.length),
				sender: asSender(msg.sender ?? msg.role),
				text: extractText(msg.text ?? msg.content),
				timestamp: ts
			});
		}
		messages.sort((a, b) => a.timestamp - b.timestamp);
		const createTime = toMillis(conv.created_at) ?? messages[0]?.timestamp ?? Date.now();
		out.push({
			id: String(conv.uuid ?? conv.id ?? newId("c", out.length)),
			title: String(conv.name ?? conv.title ?? "(제목 없음)"),
			createTime,
			modifyTime: toMillis(conv.updated_at) ?? messages[messages.length - 1]?.timestamp ?? createTime,
			messageCount: messages.length,
			humanCount: messages.filter((x) => x.sender === "human").length,
			assistantCount: messages.filter((x) => x.sender === "assistant").length,
			charCount: messages.reduce((n, x) => n + x.text.length, 0),
			messages
		});
	}
	return out;
}
function buildStats(source, conversations) {
	const stats = emptyStats(source);
	stats.totalConversations = conversations.length;
	const tokenCount = /* @__PURE__ */ new Map();
	let humanChars = 0;
	let night = 0;
	for (const conv of conversations) {
		stats.totalMessages += conv.messageCount;
		stats.humanMessages += conv.humanCount;
		stats.assistantMessages += conv.assistantCount;
		if (stats.firstDate == null || conv.createTime < stats.firstDate) stats.firstDate = conv.createTime;
		if (stats.lastDate == null || conv.createTime > stats.lastDate) stats.lastDate = conv.createTime;
		const key = dayKeyKst(conv.createTime);
		if (!stats.byDay[key]) stats.byDay[key] = {
			date: key,
			conversations: 0,
			messages: 0,
			chars: 0
		};
		stats.byDay[key].conversations += 1;
		stats.byDay[key].messages += conv.messageCount;
		stats.byDay[key].chars += conv.charCount;
		stats.weekdayHistogram[weekdayKst(conv.createTime)] += 1;
		for (const tok of tokenize(conv.title)) tokenCount.set(tok, (tokenCount.get(tok) ?? 0) + 1);
		for (const m of conv.messages) {
			const h = hourKst(m.timestamp);
			stats.hourHistogram[h] += 1;
			if (h >= 22 || h < 6) night += 1;
			if (m.sender === "human") humanChars += m.text.length;
		}
	}
	stats.avgMessagesPerConvo = conversations.length === 0 ? 0 : Math.round(stats.totalMessages / conversations.length * 10) / 10;
	stats.avgCharsPerHuman = stats.humanMessages === 0 ? 0 : Math.round(humanChars / stats.humanMessages);
	stats.nightShare = stats.totalMessages === 0 ? 0 : Math.round(night / stats.totalMessages * 100) / 100;
	stats.sampleTitles = conversations.slice().sort((a, b) => b.messageCount - a.messageCount).slice(0, 18).map((c) => c.title.slice(0, 80));
	stats.topTokens = [...tokenCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([token, count]) => ({
		token,
		count
	}));
	return stats;
}
function parseExport(raw) {
	const source = detectSource(raw);
	let conversations = [];
	if (source === "chatgpt") conversations = parseChatGpt(Array.isArray(raw) ? raw : raw.conversations ?? []);
	else if (source === "claude") conversations = parseClaude(Array.isArray(raw) ? raw : raw.conversations ?? []);
	else if (raw && typeof raw === "object" && !Array.isArray(raw)) conversations = parseGrok(raw);
	conversations.sort((a, b) => a.createTime - b.createTime);
	return {
		conversations,
		stats: buildStats(source, conversations)
	};
}
function toDigest(parsed) {
	const { stats } = parsed;
	const spanDays = stats.firstDate && stats.lastDate ? Math.max(1, Math.round((stats.lastDate - stats.firstDate) / 864e5) + 1) : 1;
	const busiestDays = Object.values(stats.byDay).sort((a, b) => b.messages - a.messages).slice(0, 5).map((d) => ({
		date: d.date,
		messages: d.messages
	}));
	return {
		source: stats.source,
		totalConversations: stats.totalConversations,
		totalMessages: stats.totalMessages,
		humanMessages: stats.humanMessages,
		assistantMessages: stats.assistantMessages,
		avgMessagesPerConvo: stats.avgMessagesPerConvo,
		avgCharsPerHuman: stats.avgCharsPerHuman,
		nightShare: stats.nightShare,
		hourHistogram: stats.hourHistogram,
		weekdayHistogram: stats.weekdayHistogram,
		busiestDays,
		sampleTitles: stats.sampleTitles,
		topTokens: stats.topTokens,
		spanDays
	};
}
function collectHumanTexts(parsed, limit = 80) {
	const out = [];
	for (const conv of parsed.conversations) for (const m of conv.messages) {
		if (m.sender !== "human") continue;
		const t = m.text.trim();
		if (t.length < 2) continue;
		out.push(t.slice(0, 500));
		if (out.length >= limit) return out;
	}
	return out;
}
var KEY = "st-session-v1";
var PRIMARY = new Set(TEST_IDS);
var emptyPersist = {
	intake: null,
	digest: null,
	humanTexts: [],
	fileLabel: null,
	soul: null,
	grades: {},
	duel: null,
	unlocks: {},
	stats: null
};
var emptyEphemeral = {
	status: "idle",
	error: null,
	parsed: null,
	runPhase: {},
	theaterAt: {},
	adKey: null
};
var persistReady = false;
var didHydrate = false;
function writePersist(s) {
	if (typeof window === "undefined" || !persistReady) return;
	try {
		if (!s.digest && !s.soul) {
			sessionStorage.removeItem(KEY);
			return;
		}
		const slice = {
			intake: s.intake,
			digest: s.digest,
			humanTexts: s.humanTexts,
			fileLabel: s.fileLabel,
			soul: s.soul,
			grades: s.grades,
			duel: s.duel,
			unlocks: s.unlocks,
			stats: s.stats
		};
		sessionStorage.setItem(KEY, JSON.stringify(slice));
	} catch {}
}
function readPersist() {
	if (typeof window === "undefined") return {};
	try {
		const raw = sessionStorage.getItem(KEY);
		if (!raw) return {};
		return JSON.parse(raw);
	} catch {
		return {};
	}
}
var useAppStore = create((set) => ({
	...emptyPersist,
	...emptyEphemeral,
	setParsing: (label) => set({
		intake: "export",
		status: "parsing",
		error: null,
		fileLabel: label
	}),
	setExport: (parsed, label) => set({
		intake: "export",
		status: "ready",
		parsed,
		stats: parsed.stats,
		digest: toDigest(parsed),
		humanTexts: collectHumanTexts(parsed),
		fileLabel: label,
		error: null,
		soul: null,
		grades: {},
		duel: null,
		unlocks: {},
		runPhase: {},
		theaterAt: {},
		adKey: null
	}),
	setRelay: (digest, texts) => set({
		intake: "simple",
		status: "ready",
		parsed: null,
		stats: null,
		digest,
		humanTexts: texts,
		fileLabel: "문장 하나",
		error: null,
		soul: null,
		grades: {},
		duel: null,
		unlocks: {},
		runPhase: {},
		theaterAt: {},
		adKey: null
	}),
	setError: (message) => set({
		status: "error",
		error: message
	}),
	setAnalyzing: () => set({ status: "analyzing" }),
	setSoul: (soul) => set({
		soul,
		status: "ready"
	}),
	setGrade: (id, card) => set((s) => ({ grades: {
		...s.grades,
		[id]: card
	} })),
	setDuel: (duel) => set({ duel }),
	setRunPhase: (id, phase, at) => set((s) => ({
		runPhase: {
			...s.runPhase,
			[id]: phase
		},
		theaterAt: phase === "theater" ? {
			...s.theaterAt,
			[id]: at ?? Date.now()
		} : s.theaterAt
	})),
	setAdKey: (adKey) => set({ adKey }),
	unlock: (key) => set((s) => ({
		unlocks: {
			...s.unlocks,
			[key]: true
		},
		runPhase: PRIMARY.has(key) ? {
			...s.runPhase,
			[key]: "result"
		} : s.runPhase,
		adKey: null
	})),
	clearRecord: () => {
		if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
		persistReady = true;
		didHydrate = true;
		set({
			...emptyPersist,
			...emptyEphemeral
		});
	},
	rehydrate: () => {
		if (didHydrate) return;
		didHydrate = true;
		const p = readPersist();
		persistReady = true;
		if (!p.digest && !p.soul) return;
		set((s) => ({
			...s,
			...p,
			status: p.digest ? "ready" : s.status,
			error: null,
			parsed: s.parsed,
			runPhase: s.runPhase,
			theaterAt: s.theaterAt,
			adKey: s.adKey
		}));
	}
}));
if (typeof window !== "undefined") useAppStore.subscribe((s) => writePersist(s));
function SiteShell({ stage, home, axes, locked, quadrant, caption, children }) {
	const digest = useAppStore((s) => s.digest);
	const clearRecord = useAppStore((s) => s.clearRecord);
	const rehydrate = useAppStore((s) => s.rehydrate);
	const hasSession = Boolean(digest);
	(0, import_react.useEffect)(() => {
		bootTheme();
		rehydrate();
		document.documentElement.setAttribute("data-st-ready", "1");
		return () => document.documentElement.removeAttribute("data-st-ready");
	}, [rehydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden bg-transparent text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulFieldHost, {
				stage,
				axes: axes ?? null,
				locked: Boolean(locked),
				quadrant: quadrant ?? null,
				caption: caption ?? null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "pointer-events-none fixed inset-x-0 top-0 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "site-header mx-auto flex w-full max-w-[26.5rem] px-5 md:mx-0 md:max-w-none md:px-[clamp(1.25rem,4vw,4.5rem)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-bar pointer-events-auto flex w-full max-w-[26.5rem] items-center justify-between gap-3 px-3 py-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							className: "flex min-h-11 items-center gap-2.5 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-serif text-base leading-none",
								children: "소울타입"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-[15px] text-muted",
							children: [
								hasSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: clearRecord,
									className: "min-h-11 px-2 transition-opacity duration-300 hover:opacity-70",
									children: "기록 지우기"
								}) : null,
								home ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "/",
									className: "min-h-11 px-2 text-fg transition-opacity duration-300 hover:opacity-70",
									children: "홈"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overlay-veil",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "proscenium" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overlay-col",
						children
					})
				]
			})
		]
	});
}
function ArrowGlyph({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 16 16",
		className: cn("size-4", className),
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.175 9H0V7h12.175L6.575 1.4 8 0l8 8-8 8-1.425-1.4L12.175 9Z" })
	});
}
var PLACES = {
	hub: {
		brand: "한낮노트",
		line: "기록은 이 기기에만 남아요.",
		hint: "홈 추천"
	},
	theater: {
		brand: "늦은우체국",
		line: "기다리는 동안 잠깐 보여 드려요.",
		hint: "분석 중"
	},
	inline: {
		brand: "잉크랩",
		line: "종이 위에 잉크만 남겨요.",
		hint: "이어서"
	}
};
function AdSlot({ place }) {
	const ad = PLACES[place];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "ad-slot",
		"aria-label": "광고",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ad-badge",
					children: "AD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: ad.hint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[20px] font-semibold leading-tight",
				children: ad.brand
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[15px] text-muted",
				children: ad.line
			})
		]
	});
}
//#endregion
export { TEST_IDS as a, parseExport as c, useAppStore as d, TESTS as i, relatedOf as l, ArrowGlyph as n, TEST_PATH as o, SiteShell as r, cn as s, AdSlot as t, testOf as u };
