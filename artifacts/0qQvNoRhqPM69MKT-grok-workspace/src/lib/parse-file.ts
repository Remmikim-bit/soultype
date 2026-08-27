import { parseExport } from "./parse-export";
import type { ParsedExport } from "./types";

const MAX_BYTES = 40 * 1024 * 1024;

export function parseFileInWorker(file: File): Promise<ParsedExport> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("../workers/parse.worker.ts", import.meta.url), {
      type: "module",
    });
    const fail = (message: string) => {
      worker.terminate();
      reject(new Error(message));
    };
    worker.onmessage = (event: MessageEvent<{ ok: boolean; parsed?: ParsedExport; error?: string }>) => {
      if (event.data.ok && event.data.parsed) {
        worker.terminate();
        resolve(event.data.parsed);
      } else {
        fail(event.data.error || "파일을 읽지 못했어요.");
      }
    };
    worker.onerror = () => fail("파일을 읽는 중에 문제가 생겼어요.");
    const reader = new FileReader();
    reader.onerror = () => fail("파일을 열지 못했어요. 다시 선택해 주세요.");
    reader.onload = () => {
      worker.postMessage({ text: String(reader.result ?? "") });
    };
    reader.readAsText(file);
  });
}

export function parseObject(raw: unknown): ParsedExport {
  return parseExport(raw);
}

export async function parseFile(file: File): Promise<ParsedExport> {
  if (file.size > MAX_BYTES) {
    throw new Error("파일이 너무 커요. 40MB 이하 JSON만 읽을 수 있어요.");
  }
  try {
    return await parseFileInWorker(file);
  } catch (err) {
    if (err instanceof Error && err.message.includes("너무 커요")) throw err;
    const text = await file.text();
    return parseExport(JSON.parse(text) as unknown);
  }
}
