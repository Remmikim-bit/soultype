import { create } from "zustand";
import { TEST_IDS, type GradeId } from "./catalog";
import { collectHumanTexts, toDigest } from "./parse-export";
import type {
  AnalysisResult,
  DuelResult,
  GradeCard,
  ParsedExport,
  ParsedStats,
  UsageDigest,
} from "./types";

type Status = "idle" | "parsing" | "ready" | "analyzing" | "error";
type Intake = "simple" | "export" | null;
export type RunPhase = "in" | "theater" | "teaser" | "result";

const KEY = "st-session-v1";
const PRIMARY = new Set<string>(TEST_IDS);

type PersistSlice = {
  intake: Intake;
  digest: UsageDigest | null;
  humanTexts: string[];
  fileLabel: string | null;
  soul: AnalysisResult | null;
  grades: Partial<Record<GradeId, GradeCard>>;
  duel: DuelResult | null;
  unlocks: Record<string, boolean>;
  stats: ParsedStats | null;
};

type AppState = PersistSlice & {
  status: Status;
  error: string | null;
  parsed: ParsedExport | null;
  runPhase: Record<string, RunPhase>;
  theaterAt: Record<string, number>;
  adKey: string | null;
  setParsing: (label: string) => void;
  setExport: (parsed: ParsedExport, label: string) => void;
  setRelay: (digest: UsageDigest, texts: string[]) => void;
  setError: (message: string) => void;
  setAnalyzing: () => void;
  setSoul: (soul: AnalysisResult) => void;
  setGrade: (id: GradeId, card: GradeCard) => void;
  setDuel: (duel: DuelResult) => void;
  setRunPhase: (id: string, phase: RunPhase, at?: number) => void;
  setAdKey: (key: string | null) => void;
  unlock: (key: string) => void;
  clearRecord: () => void;
  rehydrate: () => void;
};

const emptyPersist: PersistSlice = {
  intake: null,
  digest: null,
  humanTexts: [],
  fileLabel: null,
  soul: null,
  grades: {},
  duel: null,
  unlocks: {},
  stats: null,
};

const emptyEphemeral = {
  status: "idle" as Status,
  error: null as string | null,
  parsed: null as ParsedExport | null,
  runPhase: {} as Record<string, RunPhase>,
  theaterAt: {} as Record<string, number>,
  adKey: null as string | null,
};

let persistReady = false;
let didHydrate = false;

function writePersist(s: PersistSlice) {
  if (typeof window === "undefined" || !persistReady) return;
  try {
    if (!s.digest && !s.soul) {
      sessionStorage.removeItem(KEY);
      return;
    }
    const slice: PersistSlice = {
      intake: s.intake,
      digest: s.digest,
      humanTexts: s.humanTexts,
      fileLabel: s.fileLabel,
      soul: s.soul,
      grades: s.grades,
      duel: s.duel,
      unlocks: s.unlocks,
      stats: s.stats,
    };
    sessionStorage.setItem(KEY, JSON.stringify(slice));
  } catch {
    /* quota */
  }
}

function readPersist(): Partial<PersistSlice> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PersistSlice;
  } catch {
    return {};
  }
}

export const useAppStore = create<AppState>((set) => ({
  ...emptyPersist,
  ...emptyEphemeral,
  setParsing: (label) =>
    set({
      intake: "export",
      status: "parsing",
      error: null,
      fileLabel: label,
    }),
  setExport: (parsed, label) =>
    set({
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
      adKey: null,
    }),
  setRelay: (digest, texts) =>
    set({
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
      adKey: null,
    }),
  setError: (message) => set({ status: "error", error: message }),
  setAnalyzing: () => set({ status: "analyzing" }),
  setSoul: (soul) => set({ soul, status: "ready" }),
  setGrade: (id, card) => set((s) => ({ grades: { ...s.grades, [id]: card } })),
  setDuel: (duel) => set({ duel }),
  setRunPhase: (id, phase, at) =>
    set((s) => ({
      runPhase: { ...s.runPhase, [id]: phase },
      theaterAt:
        phase === "theater"
          ? { ...s.theaterAt, [id]: at ?? Date.now() }
          : s.theaterAt,
    })),
  setAdKey: (adKey) => set({ adKey }),
  unlock: (key) =>
    set((s) => ({
      unlocks: { ...s.unlocks, [key]: true },
      runPhase: PRIMARY.has(key) ? { ...s.runPhase, [key]: "result" } : s.runPhase,
      adKey: null,
    })),
  clearRecord: () => {
    if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
    persistReady = true;
    didHydrate = true;
    set({ ...emptyPersist, ...emptyEphemeral });
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
      adKey: s.adKey,
    }));
  },
}));

if (typeof window !== "undefined") {
  useAppStore.subscribe((s) => writePersist(s));
}
