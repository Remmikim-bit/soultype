import type {
  ParsedConversation,
  ParsedExport,
  ParsedMessage,
  ParsedStats,
  Sender,
  UsageDigest,
} from "./types";

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

const STOP = new Set([
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
  "질문",
]);

export function toMillis(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return value < 1e12 ? Math.round(value * 1000) : Math.round(value);
  }
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n) && value.trim() !== "") {
      return n < 1e12 ? Math.round(n * 1000) : Math.round(n);
    }
    const d = Date.parse(value);
    return Number.isNaN(d) ? null : d;
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (obj.$date && typeof obj.$date === "object") {
      const inner = obj.$date as Record<string, unknown>;
      const long = inner.$numberLong ?? inner.$numberInt;
      return toMillis(long);
    }
    if (typeof obj.$numberLong === "string" || typeof obj.$numberLong === "number") {
      return toMillis(obj.$numberLong);
    }
  }
  return null;
}

function dayKeyKst(ms: number): string {
  const shifted = new Date(ms + KST_OFFSET_MS);
  return shifted.toISOString().slice(0, 10);
}

function hourKst(ms: number): number {
  return new Date(ms + KST_OFFSET_MS).getUTCHours();
}

function weekdayKst(ms: number): number {
  return new Date(ms + KST_OFFSET_MS).getUTCDay();
}

function asSender(role: unknown): Sender {
  const r = String(role ?? "").toLowerCase();
  if (r === "human" || r === "user") return "human";
  if (r === "assistant" || r === "bot" || r === "model") return "assistant";
  return "other";
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map(extractText).filter(Boolean).join("\n");
  }
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.text === "string") return o.text;
    if (typeof o.content === "string") return o.content;
    if (Array.isArray(o.parts)) return extractText(o.parts);
    if (Array.isArray(o.contents)) return extractText(o.contents);
  }
  return "";
}

function tokenize(title: string): string[] {
  return title
    .toLowerCase()
    .split(/[^a-z0-9가-힣]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOP.has(t) && !/^\d+$/.test(t));
}

function emptyStats(source: ParsedStats["source"]): ParsedStats {
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
    topTokens: [],
  };
}

function firstItem(raw: unknown): Record<string, unknown> | undefined {
  if (Array.isArray(raw)) return raw[0] as Record<string, unknown> | undefined;
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    if (Array.isArray(o.conversations)) {
      return o.conversations[0] as Record<string, unknown> | undefined;
    }
  }
  return undefined;
}

function detectSource(raw: unknown): ParsedStats["source"] {
  const first = firstItem(raw);
  if (!first) return "unknown";
  if (first.conversation && first.responses) return "grok";
  if (first.mapping || (first.create_time && first.title && !first.chat_messages)) return "chatgpt";
  if (first.chat_messages || first.uuid || first.name) return "claude";
  if (Array.isArray(raw)) return "chatgpt";
  return "grok";
}

function newId(prefix: string, n: number): string {
  return `${prefix}-${n}`;
}

function parseGrok(raw: Record<string, unknown>): ParsedConversation[] {
  const list = (raw.conversations as unknown[]) ?? [];
  const out: ParsedConversation[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const meta = (row.conversation ?? {}) as Record<string, unknown>;
    const responses = (row.responses ?? []) as unknown[];
    const messages: ParsedMessage[] = [];
    for (const r of responses) {
      if (!r || typeof r !== "object") continue;
      const wrap = r as Record<string, unknown>;
      const resp = (wrap.response ?? wrap) as Record<string, unknown>;
      const ts = toMillis(resp.create_time);
      if (ts == null) continue;
      const text = extractText(resp.message ?? resp.content);
      messages.push({
        id: String(resp._id ?? resp.id ?? newId("g", messages.length)),
        sender: asSender(resp.sender ?? resp.role),
        text,
        timestamp: ts,
      });
    }
    messages.sort((a, b) => a.timestamp - b.timestamp);
    const createTime = toMillis(meta.create_time) ?? messages[0]?.timestamp ?? Date.now();
    const modifyTime =
      toMillis(meta.modify_time) ?? messages[messages.length - 1]?.timestamp ?? createTime;
    out.push({
      id: String(meta.id ?? newId("c", out.length)),
      title: String(meta.title || "(제목 없음)"),
      createTime,
      modifyTime,
      messageCount: messages.length,
      humanCount: messages.filter((m) => m.sender === "human").length,
      assistantCount: messages.filter((m) => m.sender === "assistant").length,
      charCount: messages.reduce((n, m) => n + m.text.length, 0),
      messages,
    });
  }
  return out;
}

function parseChatGpt(raw: unknown[]): ParsedConversation[] {
  const out: ParsedConversation[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const conv = item as Record<string, unknown>;
    const mapping = (conv.mapping ?? {}) as Record<string, unknown>;
    const messages: ParsedMessage[] = [];
    for (const node of Object.values(mapping)) {
      if (!node || typeof node !== "object") continue;
      const n = node as Record<string, unknown>;
      const msg = n.message as Record<string, unknown> | undefined;
      if (!msg) continue;
      const author = (msg.author ?? {}) as Record<string, unknown>;
      const role = asSender(author.role);
      if (role === "other") continue;
      const content = (msg.content ?? {}) as Record<string, unknown>;
      const text = extractText(content.parts ?? content.text ?? msg.content);
      const ts = toMillis(msg.create_time) ?? toMillis(conv.create_time);
      if (ts == null) continue;
      messages.push({
        id: String(msg.id ?? n.id ?? messages.length),
        sender: role,
        text,
        timestamp: ts,
      });
    }
    messages.sort((a, b) => a.timestamp - b.timestamp);
    const createTime = toMillis(conv.create_time) ?? messages[0]?.timestamp ?? Date.now();
    const modifyTime =
      toMillis(conv.update_time) ?? messages[messages.length - 1]?.timestamp ?? createTime;
    out.push({
      id: String(conv.id ?? conv.conversation_id ?? newId("c", out.length)),
      title: String(conv.title || "(제목 없음)"),
      createTime,
      modifyTime,
      messageCount: messages.length,
      humanCount: messages.filter((m) => m.sender === "human").length,
      assistantCount: messages.filter((m) => m.sender === "assistant").length,
      charCount: messages.reduce((n, m) => n + m.text.length, 0),
      messages,
    });
  }
  return out;
}

function parseClaude(list: unknown[]): ParsedConversation[] {
  const out: ParsedConversation[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const conv = item as Record<string, unknown>;
    const msgsRaw = (conv.chat_messages ?? conv.messages ?? []) as unknown[];
    const messages: ParsedMessage[] = [];
    for (const m of msgsRaw) {
      if (!m || typeof m !== "object") continue;
      const msg = m as Record<string, unknown>;
      const ts =
        toMillis(msg.created_at) ?? toMillis(msg.create_time) ?? toMillis(msg.updated_at);
      if (ts == null) continue;
      messages.push({
        id: String(msg.uuid ?? msg.id ?? messages.length),
        sender: asSender(msg.sender ?? msg.role),
        text: extractText(msg.text ?? msg.content),
        timestamp: ts,
      });
    }
    messages.sort((a, b) => a.timestamp - b.timestamp);
    const createTime = toMillis(conv.created_at) ?? messages[0]?.timestamp ?? Date.now();
    out.push({
      id: String(conv.uuid ?? conv.id ?? newId("c", out.length)),
      title: String(conv.name ?? conv.title ?? "(제목 없음)"),
      createTime,
      modifyTime:
        toMillis(conv.updated_at) ?? messages[messages.length - 1]?.timestamp ?? createTime,
      messageCount: messages.length,
      humanCount: messages.filter((x) => x.sender === "human").length,
      assistantCount: messages.filter((x) => x.sender === "assistant").length,
      charCount: messages.reduce((n, x) => n + x.text.length, 0),
      messages,
    });
  }
  return out;
}

function buildStats(
  source: ParsedStats["source"],
  conversations: ParsedConversation[],
): ParsedStats {
  const stats = emptyStats(source);
  stats.totalConversations = conversations.length;
  const tokenCount = new Map<string, number>();
  let humanChars = 0;
  let night = 0;

  for (const conv of conversations) {
    stats.totalMessages += conv.messageCount;
    stats.humanMessages += conv.humanCount;
    stats.assistantMessages += conv.assistantCount;
    if (stats.firstDate == null || conv.createTime < stats.firstDate) {
      stats.firstDate = conv.createTime;
    }
    if (stats.lastDate == null || conv.createTime > stats.lastDate) {
      stats.lastDate = conv.createTime;
    }
    const key = dayKeyKst(conv.createTime);
    if (!stats.byDay[key]) {
      stats.byDay[key] = { date: key, conversations: 0, messages: 0, chars: 0 };
    }
    stats.byDay[key].conversations += 1;
    stats.byDay[key].messages += conv.messageCount;
    stats.byDay[key].chars += conv.charCount;
    stats.weekdayHistogram[weekdayKst(conv.createTime)] += 1;
    for (const tok of tokenize(conv.title)) {
      tokenCount.set(tok, (tokenCount.get(tok) ?? 0) + 1);
    }
    for (const m of conv.messages) {
      const h = hourKst(m.timestamp);
      stats.hourHistogram[h] += 1;
      if (h >= 22 || h < 6) night += 1;
      if (m.sender === "human") humanChars += m.text.length;
    }
  }

  stats.avgMessagesPerConvo =
    conversations.length === 0
      ? 0
      : Math.round((stats.totalMessages / conversations.length) * 10) / 10;
  stats.avgCharsPerHuman =
    stats.humanMessages === 0 ? 0 : Math.round(humanChars / stats.humanMessages);
  stats.nightShare =
    stats.totalMessages === 0 ? 0 : Math.round((night / stats.totalMessages) * 100) / 100;
  stats.sampleTitles = conversations
    .slice()
    .sort((a, b) => b.messageCount - a.messageCount)
    .slice(0, 18)
    .map((c) => c.title.slice(0, 80));
  stats.topTokens = [...tokenCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([token, count]) => ({ token, count }));
  return stats;
}

export function parseExport(raw: unknown): ParsedExport {
  const source = detectSource(raw);
  let conversations: ParsedConversation[] = [];
  if (source === "chatgpt") {
    const list = Array.isArray(raw)
      ? raw
      : ((raw as Record<string, unknown>).conversations as unknown[]) ?? [];
    conversations = parseChatGpt(list);
  } else if (source === "claude") {
    const list = Array.isArray(raw)
      ? raw
      : ((raw as Record<string, unknown>).conversations as unknown[]) ?? [];
    conversations = parseClaude(list);
  } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    conversations = parseGrok(raw as Record<string, unknown>);
  }
  conversations.sort((a, b) => a.createTime - b.createTime);
  return { conversations, stats: buildStats(source, conversations) };
}

export function toDigest(parsed: ParsedExport): UsageDigest {
  const { stats } = parsed;
  const spanDays =
    stats.firstDate && stats.lastDate
      ? Math.max(1, Math.round((stats.lastDate - stats.firstDate) / (24 * 60 * 60 * 1000)) + 1)
      : 1;
  const busiestDays = Object.values(stats.byDay)
    .sort((a, b) => b.messages - a.messages)
    .slice(0, 5)
    .map((d) => ({ date: d.date, messages: d.messages }));
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
    spanDays,
  };
}

export function collectHumanTexts(parsed: ParsedExport, limit = 80): string[] {
  const out: string[] = [];
  for (const conv of parsed.conversations) {
    for (const m of conv.messages) {
      if (m.sender !== "human") continue;
      const t = m.text.trim();
      if (t.length < 2) continue;
      out.push(t.slice(0, 500));
      if (out.length >= limit) return out;
    }
  }
  return out;
}

