#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl, checkedOutputPath } from "./browser-guard.mjs";

const url = checkedUrl(process.argv[2] || "http://127.0.0.1:8080/");
const outDir = checkedOutputPath(
  process.argv[3] || "/workspace/screenshots/ux",
  ["/workspace/screenshots"],
  "ux dir",
);

mkdirSync(outDir, { recursive: true });

const bugs = [];
const steps = [];

function note(step, extra = {}) {
  steps.push({ step, ...extra });
  console.log(`STEP ${steps.length}: ${step}`);
}

function bug(title, detail) {
  bugs.push({ title, detail });
  console.log(`BUG: ${title} — ${detail}`);
}

const browser = await chromium.launch({
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (err) => bug("pageerror", String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") bug("console.error", msg.text());
});

await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });

async function shot(name) {
  const path = `${outDir}/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  return path;
}

async function visible(text) {
  return page.getByText(text, { exact: false }).first().isVisible().catch(() => false);
}

async function clickText(text) {
  const loc = page.getByText(text, { exact: false }).first();
  await loc.waitFor({ state: "visible", timeout: 8000 });
  await loc.click();
}

// --- 1. Gate ---
note("gate");
await shot("01-gate");
if (!(await visible("네가 쓰는"))) bug("gate title missing", "히어로 제목이 안 보임");
if (!(await visible("지금 쓰는 AI에게"))) bug("simple cta missing", "간단 CTA 없음");
if (!(await visible("대화 기록 올리기"))) bug("export cta missing", "심층 CTA 없음");

const startBtn = page.getByRole("button", { name: "시작" });
if (await startBtn.count()) {
  await startBtn.click();
  await page.waitForTimeout(400);
  const stillGate = await visible("지금 쓰는 AI에게");
  const jumpedSimple = await visible("이 문장을 지금 쓰는 AI에");
  if (jumpedSimple && stillGate === false) {
    bug(
      "시작 버튼이 간단 모드로 강제 진입",
      "락인 화면에서 시작을 누르면 심층 선택 없이 간단 모드로 갑니다.",
    );
    await page.getByRole("button", { name: "처음으로" }).click().catch(() => {});
    await page.waitForTimeout(300);
  }
  await shot("02-after-start");
}

// --- 2. Simple mode ---
note("simple-enter");
await page.getByText("지금 쓰는 AI에게", { exact: false }).first().click();
await page.waitForTimeout(400);
await shot("03-simple-desk");
if (!(await visible("이 문장을 지금 쓰는 AI에"))) {
  bug("simple desk missing", "간단 모드 본문이 안 열림");
}

note("sample-json");
await clickText("예시 JSON");
await page.waitForTimeout(300);
const ta = page.locator("textarea");
const pasted = (await ta.inputValue().catch(() => "")).includes("st.v1");
if (!pasted) bug("sample json paste failed", "예시 JSON이 textarea에 안 들어감");
await shot("04-sample-pasted");

note("open-mbti-ad");
await clickText("광고 보고 결과 보기");
await page.waitForTimeout(400);
await shot("05-ad-mbti");
if (!(await visible("한낮노트"))) bug("mbti ad missing", "결과 광고 모달이 안 열림");

const openResult = page.getByRole("button", { name: "결과 열기" });
const t0 = Date.now();
await openResult.waitFor({ state: "visible", timeout: 2000 });
if (await openResult.isEnabled()) {
  bug("ad skippable immediately", "광고 타이머 전에 결과 열기가 활성화됨");
}
await openResult.waitFor({ state: "attached" });
await page.waitForFunction(
  () => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((el) => el.textContent?.includes("결과 열기"));
    return b && !b.disabled;
  },
  null,
  { timeout: 12000 },
);
const waited = Date.now() - t0;
note("ad-unlocked", { waitedMs: waited });
if (waited < 6000) bug("ad timer too short", `결과 광고 ${waited}ms 만에 열림`);

await openResult.click();
await page.waitForTimeout(600);
await shot("06-result");
if (!(await visible("네가 쓰는 AI의 MBTI는"))) {
  bug("result headline missing", "결과 헤드라인이 안 보임");
}
if (!(await visible("이미지 프롬프트 3개"))) {
  bug("prompt lock missing", "프롬프트 잠금 패널이 안 보임");
}

note("open-prompt-ad");
await clickText("광고 보고 받기");
await page.waitForTimeout(400);
await shot("07-ad-prompts");
await page.waitForFunction(
  () => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((el) => el.textContent?.includes("결과 열기"));
    return b && !b.disabled;
  },
  null,
  { timeout: 14000 },
);
await page.getByRole("button", { name: "결과 열기" }).click();
await page.waitForTimeout(500);
await shot("08-prompts");
if (!(await visible("이미지 프롬프트"))) {
  bug("prompts not unlocked", "두 번째 광고 후에도 프롬프트가 안 열림");
}

note("nav-wipes-state");
const before = await page.locator("h2").first().innerText().catch(() => "");
await page.getByRole("button", { name: "간단 모드" }).click();
await page.waitForTimeout(400);
const afterNav = await visible("네가 쓰는 AI의 MBTI는");
if (!afterNav && before.includes("MBTI")) {
  bug(
    "같은 모드 내비 클릭이 결과 삭제",
    "결과 화면에서 헤더 간단 모드를 누르면 분석이 리셋됩니다.",
  );
}
await shot("09-after-nav-simple");

// recover simple result path quickly via sample if wiped
if (!(await visible("네가 쓰는 AI의 MBTI는"))) {
  if (await visible("예시 JSON")) {
    await clickText("예시 JSON");
    await clickText("광고 보고 결과 보기");
    await page.waitForFunction(
      () => {
        const btns = [...document.querySelectorAll("button")];
        const b = btns.find((el) => el.textContent?.includes("결과 열기"));
        return b && !b.disabled;
      },
      null,
      { timeout: 12000 },
    );
    await page.getByRole("button", { name: "결과 열기" }).click();
    await page.waitForTimeout(400);
  }
}

note("reset");
await page.getByRole("button", { name: "처음으로" }).click();
await page.waitForTimeout(400);
await shot("10-reset");
if (!(await visible("지금 쓰는 AI에게"))) bug("reset failed", "처음으로가 게이트로 안 돌아감");

// --- 3. Export / sample ---
note("export-enter");
await page.getByText("대화 기록 올리기", { exact: false }).first().click();
await page.waitForTimeout(400);
await shot("11-export-desk");
if (!(await visible("대화 기록 JSON을 올리세요"))) {
  bug("export desk missing", "심층 모드 본문이 안 열림");
}

note("sample-export");
await clickText("샘플로 보기");
await page.waitForTimeout(800);
await shot("12-sample-stats");
if (!(await visible("이 기기에서 읽은 기록"))) {
  bug("stats missing", "샘플 파싱 후 통계가 안 보임");
}
if (!(await visible("네가 쓰는 AI의 유형"))) {
  bug("export lock missing", "심층 결과 잠금 패널이 안 보임");
}

note("export-ad");
await clickText("광고 보고 결과 보기");
await page.waitForFunction(
  () => {
    const btns = [...document.querySelectorAll("button")];
    const b = btns.find((el) => el.textContent?.includes("결과 열기"));
    return b && !b.disabled;
  },
  null,
  { timeout: 12000 },
);
await page.getByRole("button", { name: "결과 열기" }).click();
await page.waitForTimeout(600);
await shot("13-export-result");
if (!(await visible("네가 쓰는 AI의 MBTI는"))) {
  bug("export result missing", "심층 광고 후 결과가 안 보임");
}

note("terrain-peek");
const terrainBtn = page.locator("button").filter({ hasText: "HAL 9000" }).first();
if (await terrainBtn.count()) {
  await terrainBtn.click();
  await page.waitForTimeout(300);
  await shot("14-terrain-peek");
} else {
  const anyCell = page.locator("section button").first();
  if (await anyCell.count()) {
    await anyCell.click();
    await page.waitForTimeout(300);
    await shot("14-terrain-peek");
  }
}

note("ad-close-without-unlock");
await page.getByRole("button", { name: "처음으로" }).click();
await page.waitForTimeout(300);
await page.getByText("지금 쓰는 AI에게", { exact: false }).first().click();
await clickText("예시 JSON");
await clickText("광고 보고 결과 보기");
await page.waitForTimeout(400);
await page.getByRole("button", { name: "닫기" }).click();
await page.waitForTimeout(300);
const lockedAgain = await visible("광고 보고 결과 보기");
const leaked = await visible("네가 쓰는 AI의 MBTI는");
if (leaked) bug("ad close leaks result", "광고를 닫아도 결과가 보입니다.");
if (lockedAgain) {
  await clickText("광고 보고 결과 보기");
  const adAgain = await visible("한낮노트");
  if (!adAgain) bug("cannot reopen ad", "광고를 닫으면 다시 열 수 없습니다.");
}
await shot("15-ad-closed");

await browser.close();

const report = { url, steps, bugs, bugCount: bugs.length, outDir };
console.log(JSON.stringify(report, null, 2));
process.exit(bugs.some((b) => !b.title.startsWith("nav") && !b.title.startsWith("시작")) ? 1 : 0);
