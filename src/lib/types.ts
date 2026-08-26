export type Sender = "human" | "assistant" | "other";

export type ParsedMessage = {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
};

export type ParsedConversation = {
  id: string;
  title: string;
  createTime: number;
  modifyTime: number;
  messageCount: number;
  humanCount: number;
  assistantCount: number;
  charCount: number;
  messages: ParsedMessage[];
};

export type DayBucket = {
  date: string;
  conversations: number;
  messages: number;
  chars: number;
};

export type ParsedStats = {
  source: "grok" | "chatgpt" | "claude" | "unknown";
  totalConversations: number;
  totalMessages: number;
  humanMessages: number;
  assistantMessages: number;
  firstDate: number | null;
  lastDate: number | null;
  hourHistogram: number[];
  weekdayHistogram: number[];
  byDay: Record<string, DayBucket>;
  avgMessagesPerConvo: number;
  avgCharsPerHuman: number;
  nightShare: number;
  sampleTitles: string[];
  topTokens: { token: string; count: number }[];
};

export type ParsedExport = {
  conversations: ParsedConversation[];
  stats: ParsedStats;
};

/** -1 is the left pole (I/N/T/J), +1 is the right pole (E/S/F/P). */
export type AxisScores = {
  ie: number;
  ns: number;
  tf: number;
  jp: number;
};

export type UsageDigest = {
  source: ParsedStats["source"];
  totalConversations: number;
  totalMessages: number;
  humanMessages: number;
  assistantMessages: number;
  avgMessagesPerConvo: number;
  avgCharsPerHuman: number;
  nightShare: number;
  hourHistogram: number[];
  weekdayHistogram: number[];
  busiestDays: { date: string; messages: number }[];
  sampleTitles: string[];
  topTokens: { token: string; count: number }[];
  spanDays: number;
  prompts?: string[];
  axes?: AxisScores;
};

export type ImagePrompt = {
  title: string;
  prompt: string;
};

export type AnalysisResult = {
  mbti: string;
  typeName: string;
  characterName: string;
  quadrant: "in" | "is" | "en" | "es";
  quadrantTitle: string;
  tags: [string, string, string, string];
  headline: string;
  oneLiner: string;
  howYouUse: string;
  ritual: string;
  traits: { label: string; body: string }[];
  axes: AxisScores;
  imagePrompts: ImagePrompt[];
  fromAi: boolean;
  shallow: boolean;
};

export type GradeCard = {
  score: number;
  rank: string;
  headline: string;
  oneLiner: string;
  detail: string;
  traits: { label: string; body: string }[];
  extraTitle: string;
  extraBody: string;
  shallow: boolean;
};

export type DuelNote = { label: string; ok: boolean };

export type DuelResult = {
  scenario: string;
  prompt: string;
  score: number;
  rank: string;
  notes: DuelNote[];
  extraTitle: string;
  extraBody: string;
};
