import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Sun, r as Moon } from "../_libs/lucide-react.mjs";
import { a as toggleTheme, i as subscribeTheme, n as bootTheme, o as useAppStore, r as getTheme } from "./router-DuJ7K2QW.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ad-slot-sC1cFCbP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var get = () => getTheme();
var server = () => "dark";
function ThemeToggle() {
	const theme = (0, import_react.useSyncExternalStore)(subscribeTheme, get, server);
	const next = theme === "light" ? "어두운 화면으로 바꾸기" : "밝은 화면으로 바꾸기";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggleTheme,
		className: "theme-toggle",
		"aria-label": next,
		title: next,
		"data-qa": "theme-toggle",
		children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
			className: "size-4",
			strokeWidth: 2.2
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
			className: "size-4",
			strokeWidth: 2.2
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-accent", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "15",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			opacity: "0.7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 7v18M7 16h18M9.2 9.2l13.6 13.6M22.8 9.2 9.2 22.8",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round"
		})]
	});
}
function SiteShell({ stage, home, axes, locked, quadrant, caption, children }) {
	const digest = useAppStore((s) => s.digest);
	const clearRecord = useAppStore((s) => s.clearRecord);
	const rehydrate = useAppStore((s) => s.rehydrate);
	const setFieldView = useAppStore((s) => s.setFieldView);
	const hasSession = Boolean(digest);
	(0, import_react.useLayoutEffect)(() => {
		setFieldView({
			stage,
			axes: axes ?? null,
			locked: Boolean(locked),
			quadrant: quadrant ?? null,
			caption: caption ?? null
		});
	}, [
		stage,
		axes,
		locked,
		quadrant,
		caption,
		setFieldView
	]);
	(0, import_react.useEffect)(() => {
		bootTheme();
		rehydrate();
		document.documentElement.setAttribute("data-st-ready", "1");
		return () => document.documentElement.removeAttribute("data-st-ready");
	}, [rehydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden bg-transparent text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "pointer-events-none fixed inset-x-0 top-0 z-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "site-header mx-auto flex w-full max-w-[26.5rem] justify-center px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-bar pointer-events-auto flex w-full max-w-[26.5rem] items-center justify-between gap-3 px-3 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-h-11 items-center gap-2.5 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-base leading-none",
							children: "소울타입"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-[15px] text-muted",
						children: [
							hasSession ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearRecord,
								className: "min-h-11 px-2 transition-opacity duration-300 hover:opacity-70",
								children: "기록 지우기"
							}) : null,
							home ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "min-h-11 px-2 text-fg transition-opacity duration-300 hover:opacity-70",
								children: "홈"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})
						]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overlay-veil",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "proscenium" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overlay-col",
					children
				})
			]
		})]
	});
}
function ArrowGlyph({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 16 16",
		className: cn("size-4", className),
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.175 9H0V7h12.175L6.575 1.4 8 0l8 8-8 8-1.425-1.4L12.175 9Z" })
	});
}
var PLACES = {
	hub: {
		brand: "한낮노트",
		line: "기록은 이 기기에만 남아요.",
		hint: "홈 추천"
	},
	theater: {
		brand: "늦은우체국",
		line: "기다리는 동안 잠깐 보여 드려요.",
		hint: "분석 중"
	},
	inline: {
		brand: "잉크랩",
		line: "종이 위에 잉크만 남겨요.",
		hint: "이어서"
	}
};
function AdSlot({ place }) {
	const ad = PLACES[place];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "ad-slot",
		"aria-label": "광고",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ad-badge",
					children: "AD"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: ad.hint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[20px] font-semibold leading-tight",
				children: ad.brand
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[15px] text-muted",
				children: ad.line
			})
		]
	});
}
//#endregion
export { cn as i, ArrowGlyph as n, SiteShell as r, AdSlot as t };
