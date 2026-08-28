import { i as __toESM } from "../_runtime.mjs";
import { f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-kirSlODT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "잠시 문제가 생겼어요"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "예상하지 못한 오류예요. 화면을 다시 열어 주세요."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
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
var KEY$1 = "st-session-v1";
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
	adKey: null,
	fieldView: {
		stage: "gate",
		axes: null,
		locked: false,
		quadrant: null,
		caption: null
	}
};
var persistReady = false;
var didHydrate = false;
function writePersist(s) {
	if (typeof window === "undefined" || !persistReady) return;
	try {
		if (!s.digest && !s.soul) {
			sessionStorage.removeItem(KEY$1);
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
		sessionStorage.setItem(KEY$1, JSON.stringify(slice));
	} catch {}
}
function readPersist() {
	if (typeof window === "undefined") return {};
	try {
		const raw = sessionStorage.getItem(KEY$1);
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
	setFieldView: (fieldView) => set({ fieldView }),
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
		if (typeof window !== "undefined") sessionStorage.removeItem(KEY$1);
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
var SoulField = (0, import_react.lazy)(() => import("./soul-field-BWTBlofC.mjs").then((mod) => ({ default: mod.SoulField })));
var empty = () => () => {};
function SoulFieldHost() {
	const live = (0, import_react.useSyncExternalStore)(empty, () => true, () => false);
	const view = useAppStore((s) => s.fieldView);
	if (!live) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulField, {
			stage: view.stage,
			axes: view.axes,
			locked: view.locked,
			quadrant: view.quadrant,
			caption: view.caption
		})
	});
}
var KEY = "st-theme";
var current = "dark";
var listeners = /* @__PURE__ */ new Set();
function isTheme(v) {
	return v === "light" || v === "dark";
}
function detectTheme() {
	if (typeof window === "undefined") return "dark";
	try {
		const saved = localStorage.getItem(KEY);
		if (isTheme(saved)) return saved;
	} catch {}
	return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function getTheme() {
	return current;
}
function subscribeTheme(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function applyTheme(theme) {
	current = theme;
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.style.colorScheme = theme;
	const bg = getComputedStyle(root).getPropertyValue("--color-bg").trim() || (theme === "light" ? "#f2f4f6" : "#0e0e0e");
	const meta = document.querySelector("meta[name=\"theme-color\"]");
	if (meta) meta.setAttribute("content", bg);
	window.dispatchEvent(new CustomEvent("st-theme", { detail: theme }));
	listeners.forEach((fn) => fn());
}
function persistTheme(theme) {
	try {
		localStorage.setItem(KEY, theme);
	} catch {}
	applyTheme(theme);
}
function toggleTheme() {
	persistTheme(current === "light" ? "dark" : "light");
}
function bootTheme() {
	applyTheme(detectTheme());
}
if (typeof window !== "undefined") current = detectTheme();
var THEME_BOOT = `(function(){try{var k='st-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;
var styles_default = "/assets/styles-DNrW1AoB.css";
var APP_NAME = "소울타입";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "내 AI 성격 분석. 한 번 올리면 여러 번 분석할 수 있어요."
			},
			{
				name: "theme-color",
				content: "#0e0e0e"
			},
			{
				name: "color-scheme",
				content: "dark light"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&family=Spline+Sans:wght@300;400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ko",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulFieldHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$6 = () => import("./routes-BFd3SZ93.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./abuse-BjYl-gcD.mjs");
var Route$5 = createFileRoute("/abuse")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./duel-DFlRULhr.mjs");
var Route$4 = createFileRoute("/duel")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./love-DmG53h9m.mjs");
var Route$3 = createFileRoute("/love")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./now-MYhObe7Q.mjs");
var Route$2 = createFileRoute("/now")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./skill-wzu2KNxY.mjs");
var Route$1 = createFileRoute("/skill")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./soul-CnciIW-Q.mjs");
var Route = createFileRoute("/soul")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AbuseRoute: Route$5.update({
		id: "/abuse",
		path: "/abuse",
		getParentRoute: () => Route$7
	}),
	DuelRoute: Route$4.update({
		id: "/duel",
		path: "/duel",
		getParentRoute: () => Route$7
	}),
	LoveRoute: Route$3.update({
		id: "/love",
		path: "/love",
		getParentRoute: () => Route$7
	}),
	NowRoute: Route$2.update({
		id: "/now",
		path: "/now",
		getParentRoute: () => Route$7
	}),
	SkillRoute: Route$1.update({
		id: "/skill",
		path: "/skill",
		getParentRoute: () => Route$7
	}),
	SoulRoute: Route.update({
		id: "/soul",
		path: "/soul",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { toggleTheme as a, TESTS as c, relatedOf as d, testOf as f, subscribeTheme as i, TEST_IDS as l, bootTheme as n, useAppStore as o, getTheme as r, parseExport as s, router_exports as t, TEST_PATH as u };
