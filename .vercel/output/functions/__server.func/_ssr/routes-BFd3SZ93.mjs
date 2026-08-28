import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as TESTS, l as TEST_IDS, o as useAppStore, u as TEST_PATH } from "./router-kirSlODT.mjs";
import { n as ArrowGlyph, r as SiteShell, t as AdSlot } from "./ad-slot-Dg6SMEEA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BFd3SZ93.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const digest = useAppStore((s) => s.digest);
	const fileLabel = useAppStore((s) => s.fileLabel);
	const unlocks = useAppStore((s) => s.unlocks);
	const done = TEST_IDS.filter((id) => unlocks[id]).length;
	const next = TESTS.find((t) => !unlocks[t.id]) ?? TESTS[0];
	const remain = 6 - done;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		stage: "gate",
		home: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "소울타입 · 내 AI의 MBTI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						id: "hub-title",
						className: "hero-title tracking-tight",
						children: "내 AI 성격 분석"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-[15px] leading-relaxed text-muted",
						children: "매일 붙인 말투가 쌓이면, 쓰는 AI도 그 말투를 닮아요."
					}),
					digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[15px] text-fg",
						children: [
							"대화록 있음",
							fileLabel ? ` · ${fileLabel}` : "",
							". 바로 분석해도 돼요."
						]
					}) : null
				]
			}),
			digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sheet grid gap-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "어디까지 봤어요"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[28px] font-semibold tabular-nums leading-none",
							children: [done, "/6"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress-track",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${done / 6 * 100}%` } })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] text-muted",
						children: done === 0 ? "아직 시작 전이에요. 하나 열어보면 나머지도 자연스럽게 이어져요." : done === 6 ? "6개를 모두 봤어요." : `${remain}개가 남았어요. 다음 결과도 이어서 열어볼 수 있어요.`
					})
				]
			}) : null,
			next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: TEST_PATH[next.id],
				className: "feature-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "kicker",
							children: digest ? "이어서 볼게요" : "먼저 이걸로 시작해 봐요"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-[20px] font-semibold tracking-tight",
							children: next.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-[15px] text-muted",
							children: next.hook
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0" })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "hub" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "시험 목록",
				className: "sheet overflow-hidden px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker pt-5",
					children: "모든 분석"
				}), TESTS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [i === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" })
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: TEST_PATH[t.id],
					className: "cta-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-baseline gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums text-subtle",
							children: t.no
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-[17px] font-semibold leading-tight",
							children: [t.name, unlocks[t.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-sm font-medium text-accent",
								children: "완료"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-[14px] text-muted",
							children: t.hook
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0 text-subtle" })]
				})] }, t.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-subtle",
				children: "문장 하나, 또는 대화록 JSON이면 충분해요. 원문은 이 기기에서만 읽어요."
			})
		]
	});
}
//#endregion
export { Home as component };
