import { create } from "zustand";
import type { AnalysisResult, ParsedExport } from "./types";

type Status = "idle" | "parsing" | "ready" | "analyzing" | "error";
type Mode = "simple" | "export" | null;

type AppState = {
  mode: Mode;
  status: Status;
  error: string | null;
  parsed: ParsedExport | null;
  analysis: AnalysisResult | null;
  unlockedMbti: boolean;
  unlockedPrompts: boolean;
  fileLabel: string | null;
  chooseMode: (mode: "simple" | "export") => void;
  setParsing: (label: string) => void;
  setReady: (parsed: ParsedExport, label: string) => void;
  setError: (message: string) => void;
  setAnalyzing: () => void;
  setAnalysis: (analysis: AnalysisResult) => void;
  unlockMbti: () => void;
  unlockPrompts: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  mode: null,
  status: "idle",
  error: null,
  parsed: null,
  analysis: null,
  unlockedMbti: false,
  unlockedPrompts: false,
  fileLabel: null,
  chooseMode: (mode) =>
    set((s) => {
      if (s.mode === mode) return s;
      return {
        mode,
        status: "idle" as const,
        error: null,
        parsed: null,
        analysis: null,
        unlockedMbti: false,
        unlockedPrompts: false,
        fileLabel: null,
      };
    }),
  setParsing: (label) =>
    set({
      mode: "export",
      status: "parsing",
      error: null,
      fileLabel: label,
      parsed: null,
      analysis: null,
      unlockedMbti: false,
      unlockedPrompts: false,
    }),
  setReady: (parsed, label) =>
    set({
      mode: "export",
      status: "ready",
      parsed,
      fileLabel: label,
      error: null,
    }),
  setError: (message) => set({ status: "error", error: message }),
  setAnalyzing: () => set({ status: "analyzing" }),
  setAnalysis: (analysis) => set({ analysis, status: "ready" }),
  unlockMbti: () => set({ unlockedMbti: true }),
  unlockPrompts: () => set({ unlockedPrompts: true }),
  reset: () =>
    set({
      mode: null,
      status: "idle",
      error: null,
      parsed: null,
      analysis: null,
      unlockedMbti: false,
      unlockedPrompts: false,
      fileLabel: null,
    }),
}));
