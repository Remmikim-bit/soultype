import { parseExport } from "../lib/parse-export";

self.onmessage = (event: MessageEvent<{ text: string }>) => {
  try {
    const raw = JSON.parse(event.data.text) as unknown;
    const parsed = parseExport(raw);
    self.postMessage({ ok: true, parsed });
  } catch (err) {
    self.postMessage({
      ok: false,
      error: err instanceof Error ? err.message : "파일을 읽지 못했어요.",
    });
  }
};

export {};
