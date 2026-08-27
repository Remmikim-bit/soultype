#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl, checkedOutputPath } from "./browser-guard.mjs";

const url = checkedUrl(process.argv[2] || "http://127.0.0.1:8080/?qa=1");
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
  console.log(`STEP ${steps.length}: ${step} @${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

function bug(title, detail) {
  bugs.push({ title, detail });
  console.log(`BUG: ${title} — ${detail}`);
}

const t0 = Date.now();
const browser = await chromium.launch({
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (err) => bug("pageerror", String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") bug("console.error", msg.text());
});

await page.goto(url, { waitUntil: "load", timeout: 20000 });
await waitEl("html[data-st-ready='1']", 2500).catch(() => {});
await page.waitForTimeout(200);

async function shot(name) {
  console.log(`SHOT skip ${name}`);
  return `${outDir}/${name}.png`;
}

async function visible(text) {
  return page.evaluate((t) => (document.body?.textContent || "").includes(t), text);
}

async function go(path) {
  const dest = new URL(path, url);
  dest.search = new URL(url).search;
  try {
    await page.goto(dest.toString(), { waitUntil: "load", timeout: 15000 });
  } catch (err) {
    console.log("goto retry", path, String(err).slice(0, 120));
    await page.goto(dest.toString(), { waitUntil: "domcontentloaded", timeout: 12000 });
  }
  await waitEl("html[data-st-ready='1']", 2500).catch(() => {});
  await page.waitForTimeout(150);
}

async function tap(text) {
  const started = Date.now();
  let found = false;
  while (Date.now() - started < 8000) {
    found = await page.evaluate(
      (t) => [...document.querySelectorAll("button")].some((el) => (el.textContent || "").includes(t)),
      text,
    );
    if (found) break;
    await page.waitForTimeout(150);
  }
  const clicked = await page.evaluate((t) => {
    const b = [...document.querySelectorAll("button")].find((el) => (el.textContent || "").includes(t));
    if (!b) return false;
    b.click();
    return true;
  }, text);
  if (!clicked) throw new Error(`no button: ${text}`);
  await page.waitForTimeout(200);
}

async function waitEl(sel, timeout = 8000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    const ok = await page.evaluate((s) => Boolean(document.querySelector(s)), sel);
    if (ok) return;
    await page.waitForTimeout(120);
  }
  throw new Error(`missing ${sel}`);
}

async function tapQa(qa) {
  const sel = `[data-qa="${qa}"]`;
  await waitEl(sel, 8000);
  const clicked = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!(el instanceof HTMLElement)) return false;
    el.click();
    return true;
  }, sel);
  if (!clicked) throw new Error(`no qa: ${qa}`);
  await page.waitForTimeout(200);
}

async function waitPhase(name, timeout = 10000) {
  await waitEl(`[data-phase="${name}"]`, timeout);
}

async function waitAndOpenResult(timeout = 20000) {
  await waitEl('[data-qa="ad-gate"]', 8000);
  const t0 = Date.now();
  let ready = false;
  while (Date.now() - t0 < timeout) {
    ready = await page.evaluate(() => {
      const b = document.querySelector('[data-qa="ad-unlock"]');
      return Boolean(b && !b.disabled);
    });
    if (ready) break;
    await page.waitForTimeout(200);
  }
  const waited = Date.now() - t0;
  if (!ready) throw new Error("결과 열기 never enabled");
  if (waited < 4000) bug("ad skippable immediately", `결과 열기가 ${waited}ms 만에 활성화됨`);
  await page.evaluate(() => {
    document.querySelector('[data-qa="ad-unlock"]')?.click();
  });
  return waited;
}

note("hub");
await shot("01-hub");
if (!(await visible("내 AI 성격 분석"))) bug("hub title missing", "허브 제목이 안 보임");
if (!(await visible("AI 자아 스캔"))) bug("soul card missing", "성격 항목 없음");
if (!(await visible("학대 지수"))) bug("abuse card missing", "학대 항목 없음");
if (!(await visible("AI 티키타카 배틀"))) bug("duel card missing", "한판 항목 없음");

note("soul-enter");
await go("/soul");
console.log("SOUL BODY", (await page.evaluate(() => document.body?.textContent || "")).slice(0, 400));
console.log("SOUL BTNS", await page.evaluate(() => [...document.querySelectorAll("button")].map((b) => (b.textContent || "").trim())));
if (!(await visible("AI 자아 스캔"))) bug("soul intro missing", "성격 인트로 없음");
await shot("02-soul-intro");
if (await visible("이미 성격이 있다")) bug("old copy leaked", "옛 게이트 카피가 남아 있음");
if (await visible("뒤에 떠 있는 유체")) bug("fluid spoiler", "유체를 성격으로 설명함");

note("simple-enter");
await tapQa("way-simple");
if (!(await visible("이 문장 넣고"))) bug("relay desk missing", "문장 데스크 없음");
await shot("03-simple-desk");

note("sample-json");
await tapQa("sample-relay");
await page.waitForTimeout(300);
const pasted = await page.evaluate(() => (document.querySelector("textarea")?.value || "").includes("st.v1"));
if (!pasted) bug("sample json paste failed", "예시 JSON이 textarea에 안 들어감");
await tapQa("paste-relay");
await page.waitForTimeout(400);
await shot("04-ready-to-tear");
if (!(await visible("분석 시작하기"))) bug("tear cta missing", "분석 시작하기 버튼 없음");

note("theater");
await tapQa("tear");
await waitPhase("theater", 5000);
await shot("05-theater");
await waitPhase("teaser", 10000);
console.log("AFTER THEATER", (await page.evaluate(() => document.body?.textContent || "")).slice(0, 500));
console.log("BTNS", await page.evaluate(() => [...document.querySelectorAll("button")].map((b) => (b.textContent || "").trim())));
await shot("06-teaser");
if (!(await visible("광고 보고 결과 보기"))) bug("teaser lock missing", "티저 잠금 없음");

note("open-mbti-ad");
await tapQa("lock-cta");
await page.waitForTimeout(400);
if (!(await visible("한낮노트"))) bug("mbti ad missing", "결과 광고 모달이 안 열림");
const waited = await waitAndOpenResult(20000);
note("ad-unlocked", { waitedMs: waited });
await waitPhase("result", 8000);
await page.waitForTimeout(400);
await shot("07-result");
if (!(await visible("네가 쓰는 AI의 MBTI는"))) {
  bug("result headline missing", "결과 헤드라인이 안 보임");
}
if (!(await visible("이미지 프롬프트 3개"))) {
  bug("prompt lock missing", "프롬프트 잠금 패널이 안 보임");
}

note("ad-close-without-unlock");
await go("/");
await page.waitForTimeout(400);
await shot("08-back-hub");
if (!(await visible("내 AI 성격 분석"))) bug("list nav failed", "목록이 허브로 안 감");
if (!(await visible("대화록 있음"))) bug("session lost", "허브로 돌아오니 기록이 사라짐");

note("reuse-session-abuse");
await go("/abuse");
await shot("09-abuse");
if (await visible("문장 하나")) {
  bug("session not reused", "학대 시험이 기록을 다시 받으려 함");
}
if (!(await visible("분석 시작하기"))) bug("abuse tear missing", "학대 분석 시작하기 없음");
await tapQa("tear");
await waitPhase("teaser", 10000);
await tapQa("lock-cta");
if (!(await visible("늦은우체국"))) bug("grade ad missing", "학대 광고 브랜드 없음");
await waitAndOpenResult(20000);
await waitPhase("result", 8000);
await page.waitForTimeout(400);
await shot("10-abuse-result");
if (
  !(
    (await visible("손맛")) ||
    (await visible("손님")) ||
    (await visible("직구")) ||
    (await visible("부려먹는")) ||
    (await visible("소시오패스")) ||
    (await visible("바쁜 사람"))
  )
) {
  bug("abuse result missing", "학대 결과가 안 보임");
}

note("reset-record");
await go("/");
await page.waitForTimeout(300);
await tap("기록 지우기");
await page.waitForTimeout(300);
await shot("11-cleared");
if (await visible("대화록 있음")) bug("clear failed", "기록 지우기가 안 됨");

note("export-path");
await go("/soul");
await tapQa("way-export");
await shot("12-export-desk");
if (!(await visible("대화록 여기"))) bug("dropzone missing", "파일 드롭존 없음");
await tapQa("sample-export");
await page.waitForTimeout(800);
if (!(await visible("분석 시작하기"))) bug("sample export failed", "샘플 후 분석 시작하기가 안 보임");
await tapQa("tear");
await waitPhase("teaser", 10000);
await tapQa("lock-cta");
await waitAndOpenResult(20000);
await waitPhase("result", 8000);
await page.waitForTimeout(400);
await shot("13-export-result");
if (!(await visible("네가 쓰는 AI의 MBTI는"))) {
  bug("export result missing", "심층 광고 후 결과가 안 보임");
}
if (!(await visible("한눈에 보는 내 사용 버릇"))) {
  bug("stats missing", "샘플 파싱 후 통계가 안 보임");
}

note("ad-dismiss");
console.log("dismiss: hub");
await go("/");
console.log("dismiss: clear");
await tap("기록 지우기");
console.log("dismiss: soul");
await go("/soul");
await tapQa("way-simple");
await tapQa("sample-relay");
await tapQa("paste-relay");
await tapQa("tear");
await waitPhase("teaser", 10000);
await tapQa("lock-cta");
await page.waitForTimeout(400);
await tapQa("ad-close");
await page.waitForTimeout(300);
const lockedAgain = await visible("광고 보고 결과 보기");
const leaked = await visible("네가 쓰는 AI의 MBTI는");
if (leaked) bug("ad close leaks result", "광고를 닫아도 결과가 보입니다.");
if (!lockedAgain) bug("cannot reopen teaser", "광고를 닫으면 티저가 사라집니다.");
await shot("14-ad-closed");

await browser.close();

const report = { url, steps, bugs, bugCount: bugs.length, outDir };
console.log(JSON.stringify(report, null, 2));
process.exit(bugs.length ? 1 : 0);
