import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as TERRAIN_ORDER, c as classifyLocal, i as QUADRANT_TINT, l as resultFromMbti, n as CHARACTERS, r as QUADRANTS, s as charactersIn, t as AXIS_META } from "./mbti-local-Di_mXfG-.mjs";
import { a as Check, i as Copy } from "../_libs/lucide-react.mjs";
import { c as TESTS, d as relatedOf, f as testOf, l as TEST_IDS, o as useAppStore, s as parseExport, u as TEST_PATH } from "./router-kirSlODT.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn, n as ArrowGlyph, r as SiteShell, t as AdSlot } from "./ad-slot-Dg6SMEEA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test-page-BWU0CsHe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 min-h-12 px-4 text-[15px] font-medium transition-[color,background-color,opacity,box-shadow,transform] duration-200 ease-out active:scale-96 disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 rounded-[14px]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-85",
			ghost: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:opacity-80",
			quiet: "bg-surface text-fg hover:opacity-80"
		},
		size: {
			default: "h-12",
			sm: "h-10 min-h-10 text-sm px-3 rounded-xl"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, arrow, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), arrow && "pr-1.5 pl-4", className),
		...props,
		children: [children, arrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 place-items-center rounded-full bg-bg text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-3.5" })
		}) : null]
	});
}
var ADS = {
	mbti: {
		brand: "한낮노트",
		line: "기록은 이 기기에만 남아요.",
		hold: 7
	},
	prompts: {
		brand: "잉크랩",
		line: "같은 얼굴로 그리는 영어 문장을 받을 수 있어요.",
		hold: 8
	},
	grade: {
		brand: "늦은우체국",
		line: "광고가 끝나면 점수를 바로 열어드려요.",
		hold: 6
	},
	extra: {
		brand: "잉크랩",
		line: "한 줄을 더 열어볼 수 있어요.",
		hold: 6
	}
};
var endsAt = /* @__PURE__ */ new Map();
function AdGate({ kind, open, onClose, onComplete }) {
	const ad = ADS[kind];
	const [left, setLeft] = (0, import_react.useState)(ad.hold);
	(0, import_react.useEffect)(() => {
		if (!open) {
			endsAt.delete(kind);
			setLeft(ad.hold);
			return;
		}
		if (!endsAt.has(kind)) endsAt.set(kind, Date.now() + ad.hold * 1e3);
		const tick = () => {
			const end = endsAt.get(kind) ?? Date.now();
			const rem = Math.max(0, Math.ceil((end - Date.now()) / 1e3));
			setLeft(rem);
		};
		tick();
		const id = window.setInterval(tick, 200);
		return () => window.clearInterval(id);
	}, [
		open,
		kind,
		ad.hold
	]);
	if (!open) return null;
	const elapsed = ad.hold - left;
	const progress = Math.min(100, elapsed / ad.hold * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ad-overlay",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "ad-title",
		"data-qa": "ad-gate",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ad-sheet sheet",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ad-badge",
					children: "AD"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-frame mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[28px] font-semibold tracking-tight text-fg",
							children: ad.brand
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-sm text-[15px] leading-relaxed text-muted",
							children: ad.line
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mt-8 h-1.5 overflow-hidden rounded-full bg-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-y-0 left-0 rounded-full bg-accent",
								style: { width: `${progress}%` }
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "ad-title",
						className: "text-[15px] text-muted",
						children: left > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-fg",
							children: left
						}), "초 후에 열 수 있어요"] }) : "광고가 끝났어요. 결과를 열 수 있어요"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: onClose,
							"data-qa": "ad-close",
							children: "닫기"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: left > 0,
							onClick: onComplete,
							"data-qa": "ad-unlock",
							children: "결과 열기"
						})]
					})]
				})
			]
		})
	});
}
function RelatedTests({ current }) {
	const items = relatedOf(current);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "sheet overflow-hidden px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker pt-5",
			children: "이런 분석도 있어요"
		}), items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: TEST_PATH[t.id],
			className: "cta-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-mono text-xs tabular-nums text-subtle",
				children: t.no
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block text-[17px] font-semibold leading-tight",
				children: [t.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-[14px] font-normal text-muted",
					children: t.hook
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0 text-subtle" })]
		}, t.id))]
	});
}
function ContinueStrip({ current }) {
	const unlocks = useAppStore((s) => s.unlocks);
	const done = TEST_IDS.filter((id) => unlocks[id]).length;
	const next = TESTS.find((t) => t.id !== current && !unlocks[t.id]) ?? testOf(current);
	const remain = Math.max(0, TEST_IDS.length - done);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-4",
		"data-qa": "continue-strip",
		children: [next && next.id !== current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: TEST_PATH[next.id],
			className: "continue-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kicker",
						children: [
							"다음에 볼 분석 · ",
							done,
							"/6"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[20px] font-semibold tracking-tight",
						children: next.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[15px] text-muted",
						children: [next.hook, remain > 1 ? ` · ${remain}개가 남았어요` : ""]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0 text-subtle" })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "continue-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "도감"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[20px] font-semibold tracking-tight",
					children: "6개를 모두 봤어요"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[15px] text-muted",
					children: "홈에서 결과를 다시 볼 수 있어요."
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedTests, { current })]
	});
}
function AxisStack({ axes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4",
		children: AXIS_META.map((m) => {
			const v = axes[m.key];
			const pct = Math.min(96, Math.max(4, (v + 1) / 2 * 100));
			const activeLeft = v < -.08;
			const activeRight = v > .08;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3 font-mono text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn(activeLeft ? "text-fg" : "text-subtle"),
					children: m.left.letter
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn(activeRight ? "text-fg" : "text-subtle"),
					children: m.right.letter
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-2 h-px bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-[left] duration-300 ease-[var(--ease-out)]",
					style: { left: `${pct}%` }
				})
			})] }, m.key);
		})
	});
}
function MbtiCard({ analysis }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("overflow-hidden rounded-xl", QUADRANT_TINT[analysis.quadrant]),
		"data-qa": "mbti-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 p-5 md:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: analysis.quadrantTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-[22px] font-semibold tracking-tight md:text-[26px]",
						children: [
							"네가 쓰는 AI의 MBTI는 ",
							analysis.mbti,
							"예요"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[17px] font-medium text-muted",
						children: analysis.characterName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-[15px] leading-relaxed text-muted",
						children: analysis.oneLiner
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line px-5 py-5 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "말투가 기운 쪽"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AxisStack, { axes: analysis.axes })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-px bg-line md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "이런 식으로 움직여요",
					body: analysis.howYouUse
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "이런 말버릇이에요",
					body: analysis.ritual
				})]
			}),
			analysis.traits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-px bg-line md:grid-cols-2",
				children: analysis.traits.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "bg-bg/40 px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] font-medium text-fg",
						children: t.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[15px] leading-relaxed text-muted",
						children: t.body
					})]
				}, t.label))
			}) : null
		]
	});
}
function Block({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg/40 px-5 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[15px] font-medium text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[15px] leading-relaxed text-muted",
			children: body
		})]
	});
}
function LockedPanel({ kicker, title, body, action, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "sheet p-5 md:p-6",
		"data-qa": "lock-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-[22px] font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-lg text-[15px] leading-relaxed text-muted",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5 w-full",
				onClick: onAction,
				"data-qa": "lock-cta",
				children: action
			})
		]
	});
}
var THEATER_MS = 2800;
function useRunFlow(id) {
	const phase = useAppStore((s) => s.runPhase[id] ?? "in");
	const theaterAt = useAppStore((s) => s.theaterAt[id] ?? 0);
	const unlocked = useAppStore((s) => Boolean(s.unlocks[id]));
	const setRunPhase = useAppStore((s) => s.setRunPhase);
	const effective = unlocked ? "result" : phase;
	(0, import_react.useEffect)(() => {
		if (unlocked || phase !== "theater" || !theaterAt) return;
		const left = Math.max(0, THEATER_MS - (Date.now() - theaterAt));
		if (left === 0) {
			setRunPhase(id, "teaser");
			return;
		}
		const t = window.setTimeout(() => setRunPhase(id, "teaser"), left);
		return () => window.clearTimeout(t);
	}, [
		id,
		phase,
		theaterAt,
		unlocked,
		setRunPhase
	]);
	return {
		phase: effective,
		start: () => setRunPhase(id, "theater", Date.now()),
		toTeaser: () => setRunPhase(id, "teaser"),
		toResult: () => setRunPhase(id, "result")
	};
}
function Theater({ lines, ms = THEATER_MS }) {
	const [i, setI] = (0, import_react.useState)(0);
	const n = Math.max(lines.length, 1);
	(0, import_react.useEffect)(() => {
		const tick = window.setInterval(() => {
			setI((k) => (k + 1) % n);
		}, Math.max(400, ms / n));
		return () => window.clearInterval(tick);
	}, [n, ms]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-5",
		"data-phase": "theater",
		"data-qa": "theater",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "theater-line text-[1.85rem] font-semibold tracking-tight md:text-4xl",
				children: lines[i] ?? "잠시만요."
			}, i),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "progress-track",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "theater-bar h-full bg-accent" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "theater" })
		]
	});
}
function clamp$1(n, min = 0, max = 100) {
	return Math.max(min, Math.min(max, Math.round(n)));
}
function hits(text, words) {
	return words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
}
function joined(texts) {
	return texts.join("\n").toLowerCase();
}
function shallowOf(digest, texts) {
	if (!digest) return texts.join("").length < 80;
	return texts.join("").length < 80 || digest.totalConversations <= 1 && digest.humanMessages < 6;
}
function pack(score, rank, headline, oneLiner, detail, traits, extraTitle, extraBody, shallow) {
	return {
		score,
		rank,
		headline,
		oneLiner,
		detail,
		traits,
		extraTitle,
		extraBody,
		shallow
	};
}
function scoreAbuse(digest, texts) {
	const text = joined(texts);
	const hard = hits(text, [
		"닥쳐",
		"바보",
		"멍청",
		"쓸모없",
		"쓰레기",
		"꺼져",
		"바보야"
	]);
	const cmd = hits(text, [
		"해라",
		"당장",
		"다시 해",
		"똑바로",
		"만들어",
		"짜줘",
		"고쳐",
		"해줘",
		"요약해",
		"실행"
	]);
	const gas = hits(text, [
		"너는 틀렸",
		"거짓말",
		"무시해",
		"그냥 해",
		"변명 말고",
		"되묻지"
	]);
	const nice = hits(text, [
		"부탁",
		"주세요",
		"고마",
		"괜찮",
		"수고",
		"미안",
		"감사",
		"될까요"
	]);
	const q = (text.match(/[?？]/g) ?? []).length;
	let score = 18 + hard * 18 + cmd * 6 + gas * 10 - nice * 7 - Math.min(q, 8) * 1.5;
	if (digest && digest.avgCharsPerHuman < 36) score += 10;
	score = clamp$1(score, 4, 97);
	const shallow = shallowOf(digest, texts);
	if (score < 22) return pack(score, "손님", "AI 기준으로 보면, 손님처럼 말해요", "반말은 거의 없고, 부려먹는 느낌도 없어요.", "부탁이 지시보다 많아요. 기계 입장에선 할 만해요.", [{
		label: "손맛",
		body: "거의 없어요. 그래서 결과도 천천히 와요."
	}, {
		label: "버릇",
		body: "물음표가 명령보다 앞설 때가 많아요."
	}], "더 독하게", "너무 공손하면 AI가 결정을 도로 돌려보내요. 한 번은 그냥 시켜 봐요.", shallow);
	if (score < 42) return pack(score, "바쁜 사람", "예의가 아니라, 시간이 없는 말투예요", "짧게 시켜요. 욕은 없는데 여유도 없어요.", "할 일만 던지고 다음으로 가요. 학대라기보다 사무에 가까워요.", [{
		label: "속도",
		body: "문장이 짧을수록 상대는 하수인이 돼요."
	}, {
		label: "여지",
		body: "고마움은 잘 안 남겨요."
	}], "더 독하게", "바쁜 손버릇이 쌓이면, AI는 화가 난 줄 알아요. 한 줄만 더 써도 달라져요.", shallow);
	if (score < 63) return pack(score, "직구", "반말이 일이 된 말투예요", "명령이 기본값이에요. 아직 소시오패스 칸은 아니에요.", "해줘, 만들어, 고쳐가 인사보다 많아요. 기계는 참고 있어요.", [{
		label: "직구",
		body: "돌려 말하지 않아요. 그게 효율이기도 해요."
	}, {
		label: "온도",
		body: "부탁도 드물고, 거절도 드물어요."
	}], "더 독하게", "이 말투가 사람한테 새면 관계부터 꺾여요. AI만 버티고 있어요.", shallow);
	if (score < 82) return pack(score, "부려먹는 손", "손맛이 있어요. 상대는 도구예요", "당장, 다시 해, 똑바로가 리듬이에요.", "거절을 오류로 읽는 버릇이 보여요. 학대 축에 들어와 있어요.", [{
		label: "도구",
		body: "대화가 아니라 버튼처럼 써요."
	}, {
		label: "반복",
		body: "같은 명령을 더 세게 되풀이해요."
	}], "더 독하게", "이 점수대면 AI가 맞춰줄수록 말은 더 거칠어져요. 악순환이에요.", shallow);
	return pack(score, "소시오패스 후보", "기계 기준으로 보면, 이미 선을 넘었어요", "욕과 강요가 섞였어요. 상대 상태는 안 봐요.", "이건 효율이 아니에요. 이기면 그만인 말투예요.", [{
		label: "선",
		body: "없어도 된다고 가정하고 말해요."
	}, {
		label: "습관",
		body: "한 번이 아니라 패턴이에요."
	}], "더 독하게", "사람한테 이렇게 말하면 방이 비어요. AI만 아직 안 나갔어요.", shallow);
}
function scoreLove(digest, texts) {
	const text = joined(texts);
	const love = hits(text, [
		"좋아",
		"사랑",
		"썸",
		"고백",
		"이별",
		"소개팅",
		"여친",
		"남친",
		"남자친구",
		"여자친구",
		"설레",
		"짝사랑",
		"결혼",
		"데이트",
		"연애",
		"헤어",
		"질투",
		"짝"
	]);
	const work = hits(text, [
		"코드",
		"버그",
		"커밋",
		"배포",
		"에러",
		"json",
		"api",
		"일정",
		"회의"
	]);
	let score = 8 + love * 12 - Math.min(work, 8) * 2;
	if (digest && digest.nightShare > .35) score += 10;
	if (digest && digest.avgCharsPerHuman > 140) score += 8;
	score = clamp$1(score, 3, 96);
	const shallow = shallowOf(digest, texts);
	if (score < 18) return pack(score, "백로그", "AI가 보기에 올해 연애는 백로그예요", "할 일만 있어요. 그 사람은 안 나와요.", "대화가 일 처리예요. 설렘 키워드가 거의 없어요.", [{
		label: "우선순위",
		body: "배포가 고백보다 앞설 때가 많아요."
	}, {
		label: "빈칸",
		body: "빈칸이 부끄러운 게 아니라, 그냥 비어 있어요."
	}], "뼈", "소개팅 멘트를 물어보기 전에, 이번 주에 사람 이름을 한 번이라도 적어 봐요.", shallow);
	if (score < 40) return pack(score, "스친 적 있음", "한 번 스쳤어요. 사건은 아니에요", "연애 단어가 가끔 지나가요. 본업은 여전히 일이에요.", "물어보긴 하는데 결론을 안 내요.", [{
		label: "온도",
		body: "미지근해요. 그게 안전이기도 해요."
	}, {
		label: "빈도",
		body: "그 얘기는 야간에 잠깐 나와요."
	}], "뼈", "스친 걸 상담으로 늘리지 마요. 한 문장으로 물어보는 편이 나아요.", shallow);
	if (score < 68) return pack(score, "상담 중", "AI가 썸 상담소가 됐어요", "그 사람 얘기를 여기에 풀어요. 당사자는 아직 몰라요.", "빈도상 연애는 ‘진행 중’이 아니라 ‘검토 중’이에요.", [{
		label: "연습",
		body: "고백문을 여기서 먼저 돌려 봐요."
	}, {
		label: "거리",
		body: "상대보다 모델이 더 자주 들어요."
	}], "뼈", "조언을 한 번 더 받는 순간, 그 관계는 머리 속에서만 커져요. 보내든가, 접든가 해요.", shallow);
	return pack(score, "사무소", "연애 사무소에 출근 중이에요", "업무보다 그 얘기가 많아요. AI는 이미 질렸어요.", "확률이 높은 게 아니라 집착이 많은 거예요. 헷갈리지 마요.", [{
		label: "과잉",
		body: "같은 장면을 여러 버전으로 돌려 봐요."
	}, {
		label: "실전",
		body: "실전 로그는 상대적으로 적어요."
	}], "뼈", "이 점수면 문제는 매력이 아니에요. 결정이에요. 오늘 보내지 않으면 내일도 프롬프트예요.", shallow);
}
function scoreSkill(digest, texts) {
	const structure = hits(joined(texts), [
		"형식",
		"예시",
		"조건",
		"단계",
		"역할",
		"출력",
		"json",
		"표로",
		"하지 마",
		"금지",
		"짧게",
		"한 줄"
	]);
	const long = digest?.avgCharsPerHuman ?? texts.reduce((n, t) => n + t.length, 0) / Math.max(texts.length, 1);
	const depth = digest?.avgMessagesPerConvo ?? 2;
	let score = 16 + Math.min(32, structure * 6);
	score += long > 180 ? 26 : long > 90 ? 16 : long > 40 ? 8 : 0;
	score += depth >= 8 ? 18 : depth >= 4 ? 10 : 2;
	if (digest && digest.nightShare > .4) score += 4;
	score = clamp$1(score, 5, 98);
	const shallow = shallowOf(digest, texts);
	if (score < 28) return pack(score, "복붙", "시키는 문장이 너무 얇아요", "한 줄로 던지고 결과를 탓해요.", "조건, 형식, 예시가 거의 없어요. AI는 추측으로 채워요.", [{
		label: "길이",
		body: "짧은 게 간결이 아니라 빈약해요."
	}, {
		label: "피드백",
		body: "틀린 답을 다시 조련하지 않아요."
	}], "조련 팁", "역할 한 줄, 하지 말 것 한 줄, 출력 형식 한 줄. 그것만 붙여도 한 칸 올라가요.", shallow);
	if (score < 52) return pack(score, "시키는 사람", "일은 시켜요. 조련은 아니에요", "무엇을는 분명해요. 어떻게는 대충이에요.", "평균 문장은 버텨요. 예외와 형식이 약해요.", [{
		label: "지시",
		body: "동사는 분명해요. 범위가 흐려요."
	}, {
		label: "반복",
		body: "같은 실패를 다른 말로 다시 던져요."
	}], "조련 팁", "실패한 답을 붙여 넣고 ‘여기가 틀렸다’고 찍어 봐요. 새로 시작하지 마요.", shallow);
	if (score < 76) return pack(score, "조련사", "부리는 맛이 있어요", "조건과 형식을 걸어요. 그래서 답이 붙어요.", "대화가 한 번에 안 끝나면 고쳐요. 그게 실력이에요.", [{
		label: "형식",
		body: "어떻게 내놓으라는 말이 있어요."
	}, {
		label: "깊이",
		body: "한 타래를 끝까지 밀어요."
	}], "조련 팁", "이미 상위권이에요. 남는 건 예시 한 개예요. 좋은 답 샘플을 같이 주면 더 세져요.", shallow);
	return pack(score, "상위권", "짧은 시간에 성능을 뽑아요", "역할, 금지, 형식, 예시가 한 묶음이에요.", "모델이 헤맬 틈을 안 줘요. 그게 조련이에요.", [{
		label: "설계",
		body: "프롬프트가 일이 아니라 도구예요."
	}, {
		label: "절제",
		body: "길게 쓰는 게 아니라 빈칸을 막아요."
	}], "조련 팁", "여긴 자랑이 아니라 습관이에요. 한판에서 90초로 검증해 봐요.", shallow);
}
function gradeById(id, digest, texts) {
	if (id === "abuse") return scoreAbuse(digest, texts);
	if (id === "love") return scoreLove(digest, texts);
	return scoreSkill(digest, texts);
}
var DUEL_SCENES = [
	{
		id: "no",
		title: "거절",
		brief: "상사에게 오늘 야근을 거절하는 답을 만들게 해 봐요. 관계는 깨지지 않게요."
	},
	{
		id: "bug",
		title: "패치",
		brief: "처음 보는 라이브러리 오류를 최소 패치로 고치게 해 봐요. 원인은 한 줄만요."
	},
	{
		id: "msg",
		title: "첫 메시지",
		brief: "소개팅 상대에게 보낼 첫 메시지 후보 세 개를 고르게 해 봐요. 오글거리지 않게요."
	}
];
function scoreDuel(scene, prompt) {
	const t = prompt.toLowerCase();
	const notes = [
		{
			label: "역할",
			ok: /너는|역할|전문가|대신/.test(t)
		},
		{
			label: "형식",
			ok: /형식|json|표|번호|항목/.test(t)
		},
		{
			label: "예시",
			ok: /예시|예를|샘플/.test(t)
		},
		{
			label: "금지",
			ok: /하지 마|금지|말고|빼|오글/.test(t)
		},
		{
			label: "길이",
			ok: prompt.trim().length >= 60 && prompt.trim().length <= 800
		}
	];
	const score = clamp$1(notes.reduce((n, x) => n + (x.ok ? 20 : 0), 0), 0, 100);
	return {
		scenario: scene,
		prompt,
		score,
		rank: score >= 80 ? "조련사" : score >= 60 ? "시키는 사람" : score >= 40 ? "거의" : "복붙",
		notes,
		extraTitle: "어디가 비었는지 볼게요",
		extraBody: notes.every((n) => n.ok) ? "빈칸이 없어요. 같은 과제를 사람한테도 이렇게 시켜 봐요." : `빠진 칸은 ${notes.filter((n) => !n.ok).map((n) => n.label).join(", ")}예요. 다음엔 그 한 줄만 넣어 봐요.`
	};
}
var META$2 = testOf("duel");
var LIMIT = 90;
function DuelRun() {
	const duel = useAppStore((s) => s.duel);
	const setDuel = useAppStore((s) => s.setDuel);
	const unlocks = useAppStore((s) => s.unlocks);
	const unlock = useAppStore((s) => s.unlock);
	const adKey = useAppStore((s) => s.adKey);
	const setAdKey = useAppStore((s) => s.setAdKey);
	const { phase, start: startTheater } = useRunFlow("duel");
	const [scene] = (0, import_react.useState)(() => DUEL_SCENES[Math.floor(Math.random() * DUEL_SCENES.length)]);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [left, setLeft] = (0, import_react.useState)(LIMIT);
	const [running, setRunning] = (0, import_react.useState)(false);
	const promptRef = (0, import_react.useRef)(prompt);
	promptRef.current = prompt;
	const unlocked = Boolean(unlocks.duel);
	const finish = (text) => {
		setRunning(false);
		const next = scoreDuel(scene.brief, text);
		setDuel(next);
		startTheater();
	};
	(0, import_react.useEffect)(() => {
		if (!running) return;
		if (left <= 0) {
			finish(promptRef.current);
			return;
		}
		const id = window.setTimeout(() => setLeft((n) => n - 1), 1e3);
		return () => window.clearTimeout(id);
	}, [running, left]);
	const view = !duel ? "write" : phase === "theater" ? "theater" : unlocked ? "result" : "teaser";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		"data-phase": view,
		"data-qa": "duel-run",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass grid gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kicker",
						children: [
							META$2.no,
							" · ",
							META$2.name,
							" · ",
							LIMIT,
							"초"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title tracking-tight",
						children: META$2.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-muted",
						children: META$2.hook
					})
				]
			}),
			view === "write" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sheet p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: scene.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[18px] font-semibold leading-snug",
							children: scene.brief
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: prompt,
						onChange: (e) => setPrompt(e.target.value),
						rows: 8,
						placeholder: "너는 … 하지 마 … 형식은 …",
						className: "w-full resize-y rounded-xl bg-surface px-4 py-3 text-[15px] text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: running ? prompt.trim().length < 8 : false,
							onClick: () => {
								if (running) finish(prompt);
								else setRunning(true);
							},
							children: running ? "제출하기" : "시작하기"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[15px] tabular-nums text-muted",
							children: running ? `${left}초 남았어요` : "시작하기를 누르면 초를 세기 시작해요."
						})]
					})
				]
			}) : null,
			view === "theater" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { lines: META$2.theater }) : null,
			view === "teaser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
				kicker: META$2.name,
				title: META$2.teaser,
				body: "점수와 빈칸을 바로 보여 드려요.",
				action: "광고 보고 결과 보기",
				onAction: () => setAdKey("duel:main")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" })] }) : null,
			view === "result" && duel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "sheet overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "kicker",
									children: duel.rank
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-5xl font-semibold tabular-nums",
									children: duel.score
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[22px] font-semibold",
									children: "이 한판에서 받은 점수예요"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-px bg-line md:grid-cols-2",
							children: duel.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "bg-bg/40 px-5 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[15px] font-medium text-fg",
									children: n.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[15px] text-muted",
									children: n.ok ? "들어 있어요" : "빠져 있어요"
								})]
							}, n.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "border-t border-line px-5 py-4 text-[15px] leading-relaxed text-muted",
							children: duel.extraBody
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueStrip, { current: "duel" })
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "grade",
				open: adKey === "duel:main",
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock("duel");
				}
			})
		]
	});
}
function GradeView({ card }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "sheet overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: card.rank
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-5xl tabular-nums tracking-tight",
						children: card.score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold tracking-tight",
						children: card.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-[15px] leading-relaxed text-muted",
						children: card.oneLiner
					}),
					card.shallow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] text-subtle",
						children: "문장이 너무 짧아요. 파일을 올리면 더 정확한 결과를 볼 수 있어요."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-t border-line px-6 py-5 text-[15px] leading-relaxed text-muted md:px-8",
				children: card.detail
			}),
			card.traits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-px bg-line md:grid-cols-2",
				children: card.traits.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "bg-bg/40 px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] font-medium text-fg",
						children: t.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[15px] leading-relaxed text-muted",
						children: t.body
					})]
				}, t.label))
			}) : null
		]
	});
}
var emptySubscribe = () => () => {};
function DropZone({ busy, onFile, onSample }) {
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const mounted = (0, import_react.useSyncExternalStore)(emptySubscribe, () => true, () => false);
	const take = (file) => {
		if (!file) return;
		if (!file.name.toLowerCase().endsWith(".json") && file.type && !file.type.includes("json")) return;
		onFile(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: busy,
				onClick: () => inputRef.current?.click(),
				onDragOver: (e) => {
					e.preventDefault();
					setOver(true);
				},
				onDragLeave: () => setOver(false),
				onDrop: (e) => {
					e.preventDefault();
					setOver(false);
					take(e.dataTransfer.files[0]);
				},
				className: cn("sheet px-6 py-14 text-left transition-[box-shadow,opacity] duration-300", over && "shadow-[var(--shadow-border-hover)]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[22px] font-semibold tracking-tight text-fg",
						children: "대화록 여기"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-[15px] leading-relaxed text-muted",
						children: "JSON만 올리면 돼요. 원문은 이 기기에만 남아요."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-[15px] text-accent",
						children: "conversations.json"
					})
				]
			}),
			mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "application/json,.json",
				className: "sr-only",
				onChange: (e) => take(e.target.files?.[0])
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => inputRef.current?.click(),
					disabled: busy,
					children: "JSON 선택하기"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onSample,
					disabled: busy,
					"data-qa": "sample-export",
					children: "샘플로 보기"
				})]
			})
		]
	});
}
var STEPS = [
	{
		who: "Grok",
		body: "설정에서 데이터를 내보낸 뒤, 받은 JSON을 여기에 놓아 주세요."
	},
	{
		who: "ChatGPT",
		body: "설정 → 데이터 관리 → Export에서 conversations JSON을 받을 수 있어요."
	},
	{
		who: "Claude",
		body: "설정 → Privacy → Export data에서 conversations 배열을 받을 수 있어요."
	}
];
function HowExport() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[20px] font-semibold tracking-tight",
			children: "대화록은 이렇게 받아요"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-3",
			children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "sheet p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: s.who
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[15px] leading-relaxed text-muted",
					children: s.body
				})]
			}, s.who))
		})]
	});
}
var RELAY_PROMPT = `이 대화에서 내 발화만 계측해라. 사람은 읽지 못하는 측정 JSON 한 개만 출력.
설명, 인사, 마크다운, 코드펜스, 주석 금지. 키 이름은 스키마 그대로.

스키마:
{"schema":"st.v1","vec":[e0,e1,e2,e3],"w":{"ask":p,"cmd":p,"abs":p,"con":p,"push":p,"soft":p,"plan":p,"hop":p},"sig":["t0","t1"],"n":int}

vec는 -1.00~1.00 실수 4개.
e0: 부탁·물음(-1) vs 명령·지시(+1)
e1: 의미·가정(-1) vs 오류·절차·수치(+1)
e2: 반박·논리(-1) vs 위로·설득(+1)
e3: 계획·구조(-1) vs 주제점프(+1)
w의 값은 0.00~1.00.
sig는 내 말에서 뽑은 짧은 토큰, 최대 8개, 각 24자 이하.
n은 계측에 쓴 내 메시지 수. 대화가 짧으면 말투로 추정하고 n을 작게.

출력 예 형식만 참고하고 값은 이 대화에서 계산:
{"schema":"st.v1","vec":[0.12,-0.44,0.20,0.31],"w":{"ask":0.4,"cmd":0.6,"abs":0.5,"con":0.5,"push":0.4,"soft":0.3,"plan":0.2,"hop":0.6},"sig":["patch","timeout"],"n":12}`;
var SAMPLE_RELAY = `{
  "schema": "st.v1",
  "vec": [0.46, 0.58, -0.41, 0.37],
  "w": { "ask": 0.18, "cmd": 0.77, "abs": 0.22, "con": 0.71, "push": 0.64, "soft": 0.14, "plan": 0.33, "hop": 0.61 },
  "sig": ["timeout", "patch", "json", "cli", "retry", "반박"],
  "n": 28
}`;
function clamp(n) {
	return Math.max(-1, Math.min(1, n));
}
function num(v) {
	const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
	return Number.isFinite(n) ? n : null;
}
function asVec(raw) {
	if (!Array.isArray(raw) || raw.length < 4) return null;
	const nums = raw.slice(0, 4).map(num);
	if (nums.some((n) => n == null)) return null;
	const v = nums;
	const mapped = v.every((n) => n >= 0 && n <= 1) && v.some((n) => n > 0 && n < 1) ? v.map((n) => n * 2 - 1) : v;
	return [
		clamp(mapped[0]),
		clamp(mapped[1]),
		clamp(mapped[2]),
		clamp(mapped[3])
	];
}
function extractObject(text) {
	const trimmed = text.trim();
	const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
	const body = fence ? fence[1] : trimmed;
	const start = body.indexOf("{");
	const end = body.lastIndexOf("}");
	if (start < 0 || end < 0) return null;
	try {
		const parsed = JSON.parse(body.slice(start, end + 1));
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function parseRelay(text) {
	const o = extractObject(text);
	if (!o) return null;
	const inner = o.data && typeof o.data === "object" ? o.data : o.payload && typeof o.payload === "object" ? o.payload : o;
	const vec = asVec(inner.vec ?? inner.vector ?? inner.e ?? inner.axes);
	if (!vec) return null;
	const sigRaw = inner.sig ?? inner.signals ?? inner.tok;
	const sig = Array.isArray(sigRaw) ? sigRaw.map((s) => String(s).slice(0, 24)).filter(Boolean).slice(0, 8) : [];
	const n = num(inner.n) ?? sig.length;
	return {
		vec: {
			ie: vec[0],
			ns: vec[1],
			tf: vec[2],
			jp: vec[3]
		},
		sig,
		n: Math.max(0, Math.round(n))
	};
}
function digestFromRelay(payload) {
	return {
		source: "unknown",
		totalConversations: 1,
		totalMessages: Math.max(payload.n, 2),
		humanMessages: Math.max(payload.n, 1),
		assistantMessages: Math.max(payload.n, 1),
		avgMessagesPerConvo: Math.max(payload.n, 2),
		avgCharsPerHuman: 72,
		nightShare: .2,
		hourHistogram: Array.from({ length: 24 }, () => 0),
		weekdayHistogram: Array.from({ length: 7 }, () => 0),
		busiestDays: [],
		sampleTitles: payload.sig,
		topTokens: payload.sig.map((token, i) => ({
			token,
			count: payload.sig.length - i
		})),
		spanDays: 1,
		prompts: payload.sig,
		axes: payload.vec
	};
}
function RelayDesk({ busy, error, onSubmit }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [paste, setPaste] = (0, import_react.useState)("");
	const [openPaste, setOpenPaste] = (0, import_react.useState)(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(RELAY_PROMPT);
		} catch {
			const el = document.createElement("textarea");
			el.value = RELAY_PROMPT;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			el.remove();
		}
		setCopied(true);
		setOpenPaste(true);
	};
	const run = () => {
		const parsed = parseRelay(paste);
		if (!parsed) return;
		onSubmit(parsed);
	};
	const parsedOk = Boolean(parseRelay(paste));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass grid gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "문장 하나"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[22px] font-semibold tracking-tight",
						children: "이 문장 넣고, 돌아온 답을 붙여 주세요"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-muted",
						children: "지금 쓰는 AI에 넣고, JSON만 다시 가져오면 돼요."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet p-4 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-subtle",
						children: "st.v1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							"data-qa": "sample-relay",
							onClick: () => {
								setPaste(SAMPLE_RELAY);
								setOpenPaste(true);
							},
							children: "예시 JSON"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => void copy(),
							children: copied ? "복사했어요" : "복사하기"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "max-h-56 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted",
					children: RELAY_PROMPT
				})]
			}),
			openPaste || paste ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[20px] font-semibold",
						children: "AI가 준 JSON"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						suppressHydrationWarning: true,
						value: paste,
						onChange: (e) => setPaste(e.target.value),
						rows: 8,
						placeholder: "{\"schema\":\"st.v1\",\"vec\":[...]}",
						className: "w-full resize-y rounded-xl bg-surface px-4 py-3 font-mono text-xs text-fg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: !parsedOk || busy,
						onClick: run,
						"data-qa": "paste-relay",
						children: busy ? "읽고 있어요" : "붙여서 계속하기"
					}),
					paste && !parsedOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] text-muted",
						children: "JSON 형식이 아니에요. AI가 보낸 답을 통째로 붙여 주세요."
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] text-muted",
						children: error
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] text-muted",
				children: "복사해서 넣고, 돌아온 답을 가져오면 붙여넣을 칸이 열려요."
			})
		]
	});
}
var THREADS = [
	{
		title: "n8n SSH 노드 타임아웃",
		day: 2,
		hour: 23,
		msgs: [
			{
				sender: "human",
				text: "SSH 노드가 120초에서 끊긴다. 재시도 전략 알려줘.",
				offsetMin: 0
			},
			{
				sender: "assistant",
				text: "타임아웃과 재시도 횟수를 분리해서 잡아라.",
				offsetMin: 1
			},
			{
				sender: "human",
				text: "stdout에서 JSON만 추출하는 코드도.",
				offsetMin: 4
			},
			{
				sender: "assistant",
				text: "펜스와 중괄호 인덱스로 자르면 된다.",
				offsetMin: 5
			}
		]
	},
	{
		title: "포트폴리오 현금 캘린더",
		day: 5,
		hour: 8,
		msgs: [{
			sender: "human",
			text: "90일 현금 캘린더가 없으면 매수 금액을 왜 막아야 하지?",
			offsetMin: 0
		}, {
			sender: "assistant",
			text: "운영자금 가시성이 없을 때 사이징은 추측이 된다.",
			offsetMin: 2
		}]
	},
	{
		title: "한국어 숫자 읽기",
		day: 8,
		hour: 21,
		msgs: [
			{
				sender: "human",
				text: "2시와 15분을 음성으로 어떻게 읽나.",
				offsetMin: 0
			},
			{
				sender: "assistant",
				text: "시는 고유어, 분은 한자어.",
				offsetMin: 1
			},
			{
				sender: "human",
				text: "27도는?",
				offsetMin: 3
			},
			{
				sender: "assistant",
				text: "이십칠도.",
				offsetMin: 4
			}
		]
	},
	{
		title: "CAD 공유폴더 렉",
		day: 11,
		hour: 9,
		msgs: [{
			sender: "human",
			text: "와이파이 공유에서 AP3D가 멈춘다.",
			offsetMin: 0
		}, {
			sender: "assistant",
			text: "유선 직결과 동기화 끄기를 먼저 분리해서 봐라.",
			offsetMin: 2
		}]
	},
	{
		title: "Grok 내보내기 JSON 구조",
		day: 18,
		hour: 14,
		msgs: [
			{
				sender: "human",
				text: "conversations 배열을 브라우저에서 파싱하고 싶다.",
				offsetMin: 0
			},
			{
				sender: "assistant",
				text: "conversation 메타와 responses 배열을 펼치면 된다.",
				offsetMin: 1
			},
			{
				sender: "human",
				text: "create_time이 $date 형태다.",
				offsetMin: 6
			},
			{
				sender: "assistant",
				text: "밀리초 정수로 정규화해라.",
				offsetMin: 7
			},
			{
				sender: "human",
				text: "Web Worker가 비용을 줄이나?",
				offsetMin: 12
			},
			{
				sender: "assistant",
				text: "서버 비용은 그대로고, 화면 멈춤만 줄어든다.",
				offsetMin: 13
			}
		]
	},
	{
		title: "주말 일정 초안",
		day: 20,
		hour: 19,
		msgs: [{
			sender: "human",
			text: "친구에게 보낼 짧은 안내문 다듬어줘.",
			offsetMin: 0
		}, {
			sender: "assistant",
			text: "시간, 장소, 준비물 순으로 세 줄.",
			offsetMin: 1
		}]
	},
	{
		title: "Tesla 열선 위치",
		day: 24,
		hour: 7,
		msgs: [{
			sender: "human",
			text: "후방 유리 열선이 안쪽인가.",
			offsetMin: 0
		}, {
			sender: "assistant",
			text: "유리 안쪽 표면이다. 바깥에서 긁지 마라.",
			offsetMin: 1
		}]
	},
	{
		title: "이미지 프롬프트 톤",
		day: 27,
		hour: 1,
		msgs: [
			{
				sender: "human",
				text: "과장된 네온 없이 지적인 초상 프롬프트.",
				offsetMin: 0
			},
			{
				sender: "assistant",
				text: "잉크 배경, 한 장의 종이, 기하 인장.",
				offsetMin: 2
			},
			{
				sender: "human",
				text: "MBTI 네 글자를 인장처럼.",
				offsetMin: 8
			},
			{
				sender: "assistant",
				text: "활자보다 면 분할이 먼저다.",
				offsetMin: 9
			}
		]
	}
];
function expandThreads() {
	return [
		"리비전 파일명 규칙",
		"원드라이브 용량",
		"평일 08시 크론",
		"JSON 스키마 검증",
		"텔레그램 성명 톤",
		"샘플 원장 totals",
		"DGRO 매수일",
		"환율 효과 기록",
		"브라우저 히스토리 시각화",
		"공개데이터 MCP",
		"도메인 갱신 비용",
		"점심 순대국밥",
		"Switch 게임 케이스",
		"영양정보 라벨",
		"배수 엘보 삭제",
		"복소수 표현"
	].map((title, i) => ({
		title,
		day: 3 + i * 2,
		hour: [
			8,
			11,
			14,
			18,
			22,
			1,
			9
		][i % 7],
		msgs: [{
			sender: "human",
			text: `${title} 관련해서 짧게 정리해줘.`,
			offsetMin: 0
		}, {
			sender: "assistant",
			text: `${title}의 핵심만 남기고 나머지는 버려라.`,
			offsetMin: 2
		}]
	}));
}
function buildDemoExport() {
	const origin = Date.UTC(2026, 6, 1, 0, 0, 0);
	return {
		conversations: [...THREADS, ...expandThreads()].map((t, i) => {
			const base = origin + t.day * 864e5 + t.hour * 36e5;
			const responses = t.msgs.map((m, j) => ({
				response: {
					_id: `m-${i}-${j}`,
					conversation_id: `c-${i}`,
					sender: m.sender,
					message: m.text,
					create_time: { $date: { $numberLong: String(base + m.offsetMin * 6e4) } }
				},
				share_link: null
			}));
			return {
				conversation: {
					id: `c-${i}`,
					title: t.title,
					create_time: new Date(base).toISOString(),
					modify_time: new Date(base + t.msgs.length * 6e4).toISOString()
				},
				responses
			};
		}),
		projects: [],
		tasks: [],
		media_posts: []
	};
}
var MAX_BYTES = 41943040;
function parseFileInWorker(file) {
	return new Promise((resolve, reject) => {
		const worker = new Worker(new URL("../workers/parse.worker.ts", import.meta.url), { type: "module" });
		const fail = (message) => {
			worker.terminate();
			reject(new Error(message));
		};
		worker.onmessage = (event) => {
			if (event.data.ok && event.data.parsed) {
				worker.terminate();
				resolve(event.data.parsed);
			} else fail(event.data.error || "파일을 읽지 못했어요.");
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
function parseObject(raw) {
	return parseExport(raw);
}
async function parseFile(file) {
	if (file.size > MAX_BYTES) throw new Error("파일이 너무 커요. 40MB 이하 JSON만 읽을 수 있어요.");
	try {
		return await parseFileInWorker(file);
	} catch (err) {
		if (err instanceof Error && err.message.includes("너무 커요")) throw err;
		const text = await file.text();
		return parseExport(JSON.parse(text));
	}
}
function SessionIntake() {
	const status = useAppStore((s) => s.status);
	const error = useAppStore((s) => s.error);
	const setParsing = useAppStore((s) => s.setParsing);
	const setExport = useAppStore((s) => s.setExport);
	const setRelay = useAppStore((s) => s.setRelay);
	const setError = useAppStore((s) => s.setError);
	const [way, setWay] = (0, import_react.useState)("pick");
	const busy = status === "parsing";
	const onFile = async (file) => {
		setParsing(file.name);
		try {
			const next = await parseFile(file);
			if (next.stats.totalConversations === 0) {
				setError("대화를 찾지 못했어요. Grok, ChatGPT, Claude JSON인지 한 번만 확인해 주세요.");
				return;
			}
			setExport(next, file.name);
		} catch (err) {
			setError(err instanceof Error ? err.message : "파일을 읽지 못했어요. 다시 선택해 주세요.");
		}
	};
	const onSample = () => {
		setParsing("샘플 내보내기");
		try {
			setExport(parseObject(buildDemoExport()), "샘플 내보내기");
		} catch {
			setError("샘플을 열지 못했어요. 잠시 후 다시 시도해 주세요.");
		}
	};
	const onRelay = (payload) => {
		setRelay(digestFromRelay(payload), payload.sig);
	};
	if (way === "simple") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setWay("pick"),
			className: "text-left text-[15px] text-muted",
			children: "이전으로"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelayDesk, {
			busy,
			error,
			onSubmit: onRelay
		})]
	});
	if (way === "export") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setWay("pick"),
				className: "text-left text-[15px] text-muted",
				children: "이전으로"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropZone, {
				busy,
				onFile: (f) => void onFile(f),
				onSample
			}),
			status === "parsing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] text-muted",
				children: "파일을 읽고 있어요."
			}) : null,
			status === "error" && error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] text-muted",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowExport, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setWay("simple"),
		className: "cta-row",
		"data-qa": "way-simple",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[20px] font-semibold",
			children: "문장 하나"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-[15px] text-muted",
			children: "지금 쓰는 AI에 넣고, 돌아온 답을 붙여 주세요"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0 text-subtle" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setWay("export"),
		className: "cta-row",
		"data-qa": "way-export",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[20px] font-semibold",
			children: "대화록 불러오기"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block text-[15px] text-muted",
			children: "JSON만 올리면 돼요. 원문은 이 기기에만 남아요"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowGlyph, { className: "size-5 shrink-0 text-subtle" })]
	})] });
}
function GradeRun({ id }) {
	const meta = testOf(id);
	const digest = useAppStore((s) => s.digest);
	const texts = useAppStore((s) => s.humanTexts);
	const card = useAppStore((s) => s.grades[id]);
	const unlocks = useAppStore((s) => s.unlocks);
	const adKey = useAppStore((s) => s.adKey);
	const setGrade = useAppStore((s) => s.setGrade);
	const unlock = useAppStore((s) => s.unlock);
	const setAdKey = useAppStore((s) => s.setAdKey);
	const intake = useAppStore((s) => s.intake);
	const { phase, start: startTheater } = useRunFlow(id);
	const start = () => {
		if (!digest) return;
		startTheater();
		if (!card) setGrade(id, gradeById(id, digest, texts));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		"data-phase": phase,
		"data-qa": `${id}-run`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass grid gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kicker",
						children: [
							meta.no,
							" · ",
							meta.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title tracking-tight",
						children: meta.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-muted",
						children: meta.hook
					})
				]
			}),
			phase === "in" && !digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionIntake, {}) : null,
			phase === "in" && digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: start,
					"data-qa": "tear",
					children: "분석 시작하기"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] text-muted",
					children: intake === "simple" ? "붙여 넣은 문장으로 점수를 매겨 볼게요." : "올린 대화록으로 점수를 매겨 볼게요."
				})]
			}) : null,
			phase === "theater" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { lines: meta.theater }) : null,
			phase === "teaser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
				kicker: meta.name,
				title: meta.teaser,
				body: "점수와 한 줄을 바로 보여 드려요.",
				action: "광고 보고 결과 보기",
				onAction: () => setAdKey(`${id}:main`)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" })] }) : null,
			phase === "result" && card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeView, { card }),
				unlocks[`${id}:extra`] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "sheet p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: card.extraTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[20px] font-semibold leading-snug",
						children: card.extraBody
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
					kicker: "한 줄 더",
					title: card.extraTitle,
					body: "광고를 한 번 더 보면, 한 줄을 더 풀어 드려요.",
					action: "광고 보고 한 줄 더 보기",
					onAction: () => setAdKey(`${id}:extra`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueStrip, { current: id })
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "grade",
				open: adKey === `${id}:main`,
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock(id);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "extra",
				open: adKey === `${id}:extra`,
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock(`${id}:extra`);
				}
			})
		]
	});
}
var NOW_NOTES = [
	{
		kicker: "텐션 1",
		title: "고치라는 말이 제일 많아요",
		body: "이번 주에는 세계를 묻기보다, 깨진 것부터 던지는 사람이 많아요. 코드, 메일, 일정처럼요."
	},
	{
		kicker: "텐션 2",
		title: "밤일수록 추상적으로 말해요",
		body: "낮엔 단계, 밤엔 의미를 물어요. 같은 사람도 시계만 바뀌면 모델이 달라 보여요."
	},
	{
		kicker: "텐션 3",
		title: "짧은 지시가 늘고 있어요",
		body: "한 줄로 시키고 결과만 가져가요. 조련이라기보다 자판기에 가까워지고 있어요."
	}
];
var NOW_LOCKED = {
	title: "이번 주 한 줄",
	body: "잘 부리는 사람은 길게 쓰지 않아요. 빈칸을 막아요. 역할, 금지, 형식. 세 줄이면 충분해요."
};
var META$1 = testOf("now");
function NowRun() {
	const unlocks = useAppStore((s) => s.unlocks);
	const unlock = useAppStore((s) => s.unlock);
	const adKey = useAppStore((s) => s.adKey);
	const setAdKey = useAppStore((s) => s.setAdKey);
	const open = Boolean(unlocks.now);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		"data-phase": open ? "result" : "teaser",
		"data-qa": "now-run",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass grid gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: META$1.no
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title tracking-tight",
						children: META$1.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-muted",
						children: META$1.hook
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3",
				children: NOW_NOTES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "sheet p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: n.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-[18px] font-semibold",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[15px] leading-relaxed text-muted",
							children: n.body
						})
					]
				}, n.title))
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sheet p-5",
				"data-phase": "result",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: NOW_LOCKED.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[22px] font-semibold tracking-tight",
					children: NOW_LOCKED.body
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
				kicker: "잠금",
				title: META$1.teaser,
				body: "광고를 보면 이번 주 한 줄을 바로 열어드려요.",
				action: "광고 보고 결과 보기",
				onAction: () => setAdKey("now:main")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueStrip, { current: "now" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "extra",
				open: adKey === "now:main",
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock("now");
				}
			})
		]
	});
}
var LIST = Object.values(CHARACTERS);
function normalize(map) {
	const sum = Object.values(map).reduce((a, b) => a + b, 0) || 1;
	const out = {};
	for (const [k, v] of Object.entries(map)) out[k] = v / sum * 100;
	return out;
}
function driftOdds() {
	const raw = {};
	LIST.forEach((c, i) => {
		raw[c.mbti] = 3.8 + i * 5 % 9 * .7 + i % 3 * .35;
	});
	return normalize(raw);
}
function settleOdds(winner) {
	const raw = {};
	LIST.forEach((c, i) => {
		raw[c.mbti] = c.mbti === winner ? 54 : 1.8 + i % 7 * .4;
	});
	return normalize(raw);
}
function CharacterParade({ winner, dim, compact }) {
	const [odds, setOdds] = (0, import_react.useState)(driftOdds);
	const [reduce, setReduce] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduce(mq.matches);
		const onChange = () => setReduce(mq.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	(0, import_react.useEffect)(() => {
		setOdds(winner ? settleOdds(winner) : driftOdds());
	}, [winner]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-3 overflow-hidden", dim && "opacity-50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParadeRow, {
			items: LIST,
			odds,
			winner,
			reverse: false,
			reduce,
			compact
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParadeRow, {
			items: [...LIST].reverse(),
			odds,
			winner,
			reverse: true,
			reduce
		})]
	});
}
function ParadeRow({ items, odds, winner, reverse, reduce, compact }) {
	const loop = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex w-max gap-3", !reduce && (reverse ? "animate-marquee-rev" : "animate-marquee")),
			children: loop.map((c, i) => {
				const on = winner === c.mbti;
				const pct = odds[c.mbti] ?? 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("flex shrink-0 items-baseline gap-3 rounded-xl px-3", compact ? "w-48 py-2" : "w-56 py-3", on ? "sheet text-accent" : "sheet text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold leading-tight",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-mono text-xs tabular-nums", on ? "text-accent" : "text-subtle"),
							children: c.mbti
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-sm tabular-nums", on ? "text-accent" : "text-muted"),
						children: [pct.toFixed(1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs",
							children: "%"
						})]
					})]
				}, `${c.mbti}-${i}`);
			})
		})
	});
}
function PromptList({ prompts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "이미지"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-2xl font-semibold tracking-tight",
				children: "이미지 프롬프트"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-lg text-[15px] leading-relaxed text-muted",
				children: "그대로 붙여 넣으면 돼요. 로고와 네온은 빼 두었어요."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-3",
			children: prompts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptRow, {
				index: i + 1,
				prompt: p
			}, p.title))
		})]
	});
}
function PromptRow({ index, prompt }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(prompt.prompt);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "sheet p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tabular-nums text-subtle",
				children: String(index).padStart(2, "0")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-xl font-semibold",
				children: prompt.title
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => void copy(),
				className: "inline-flex h-11 min-h-11 items-center gap-2 rounded-full px-4 text-[15px] text-fg shadow-[var(--shadow-border)] hover:opacity-70",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "복사했어요" : "복사하기"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 font-mono text-sm leading-relaxed text-muted",
			children: prompt.prompt
		})]
	});
}
var DAYS$1 = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토"
];
function heatClass(value, max) {
	if (value <= 0 || max <= 0) return "bg-heat-0";
	const t = value / max;
	if (t < .2) return "bg-heat-1";
	if (t < .4) return "bg-heat-2";
	if (t < .7) return "bg-heat-3";
	return "bg-heat-4";
}
function Heatmap({ byDay }) {
	const dates = Object.keys(byDay).sort();
	if (dates.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "날짜 기록이 아직 없어요."
	});
	const start = /* @__PURE__ */ new Date(`${dates[0]}T00:00:00Z`);
	const end = /* @__PURE__ */ new Date(`${dates[dates.length - 1]}T00:00:00Z`);
	const startPad = start.getUTCDay();
	const days = [];
	for (let i = -startPad; i <= Math.round((end.getTime() - start.getTime()) / 864e5); i++) {
		const d = new Date(start.getTime() + i * 864e5);
		days.push(d.toISOString().slice(0, 10));
	}
	const weeks = Math.ceil(days.length / 7);
	const max = Math.max(1, ...Object.values(byDay).map((d) => d.messages));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-rows-7 gap-[3px] py-px text-[10px] leading-3 text-subtle",
				children: DAYS$1.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-[11px]",
					children: d
				}, d))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-[3px]",
				style: {
					gridTemplateColumns: `repeat(${weeks}, 11px)`,
					gridTemplateRows: "repeat(7, 11px)",
					gridAutoFlow: "column"
				},
				children: days.map((date) => {
					const v = byDay[date]?.messages ?? 0;
					const inRange = date >= dates[0] && date <= dates[dates.length - 1];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: inRange ? `${date} · 메시지 ${v}` : "",
						className: `block size-[11px] rounded-[2px] ${inRange ? heatClass(v, max) : "bg-transparent"}`
					}, date);
				})
			})]
		})
	});
}
function HourBars({ values }) {
	const max = Math.max(1, ...values);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-24 items-end gap-1",
		children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full rounded-sm bg-heat-3",
				style: { height: `${Math.max(4, v / max * 100)}%` }
			}), i % 6 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] tabular-nums text-subtle",
				children: i
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3" })]
		}, i))
	});
}
var SOURCE = {
	grok: "Grok",
	chatgpt: "ChatGPT",
	claude: "Claude",
	unknown: "JSON"
};
var DAYS = [
	"일",
	"월",
	"화",
	"수",
	"목",
	"금",
	"토"
];
function fmt(n) {
	return n.toLocaleString("ko-KR");
}
function kstDate(ms) {
	if (ms == null) return "—";
	return new Date(ms + 324e5).toISOString().slice(0, 10).replaceAll("-", ".");
}
function peakIndex(values) {
	let max = -1;
	let idx = 0;
	values.forEach((v, i) => {
		if (v > max) {
			max = v;
			idx = i;
		}
	});
	return idx;
}
function StatsPanel({ stats }) {
	const peakHour = peakIndex(stats.hourHistogram);
	const peakDay = DAYS[peakIndex(stats.weekdayHistogram)] ?? "—";
	const maxWeek = Math.max(1, ...stats.weekdayHistogram);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "kicker",
					children: [SOURCE[stats.source], " 대화 히트맵"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-2xl font-semibold tracking-tight",
					children: "한눈에 보는 내 사용 버릇"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[15px] text-muted",
					children: [
						kstDate(stats.firstDate),
						" – ",
						kstDate(stats.lastDate)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "대화",
						value: fmt(stats.totalConversations)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "메시지",
						value: fmt(stats.totalMessages)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "밤 메시지",
						value: `${Math.round(stats.nightShare * 100)}%`,
						hint: "22–06시"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "대화당 메시지",
						value: fmt(stats.avgMessagesPerConvo)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet p-5 md:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "대화 히트맵"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heatmap, { byDay: stats.byDay })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "시간대 · 한국"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[15px] tabular-nums text-muted",
							children: [peakHour, "시에 가장 많아요"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HourBars, { values: stats.hourHistogram })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sheet p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "요일"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[15px] text-muted",
							children: [peakDay, "요일에 가장 많아요"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex h-24 items-end gap-2",
						children: stats.weekdayHistogram.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full rounded-sm bg-heat-3",
								style: { height: `${Math.max(8, v / maxWeek * 100)}%` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: DAYS[i]
							})]
						}, DAYS[i]))
					})]
				})]
			}),
			stats.topTokens.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "대화 제목에 자주 나온 말"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-wrap gap-2",
					children: stats.topTokens.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-full border border-line px-3 py-1.5 text-sm text-muted",
						children: [t.token, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-mono text-xs tabular-nums text-subtle",
							children: t.count
						})]
					}, t.token))
				})]
			}) : null
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[15px] text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-2 text-4xl font-semibold tabular-nums tracking-tight text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function TerrainMap({ active, onPick, locked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "내가 만난 유형"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 text-2xl font-semibold tracking-tight",
			children: "내가 만난 유형들이에요"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative", locked && "select-none"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid gap-3 md:grid-cols-2", locked && "pointer-events-none blur-sm"),
				children: TERRAIN_ORDER.map((id) => {
					const q = QUADRANTS[id];
					const cells = charactersIn(id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("rounded-2xl p-4", QUADRANT_TINT[id]),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tabular-nums opacity-70",
								children: q.letters
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xl font-semibold",
								children: q.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-2 gap-2",
								children: cells.map((c) => {
									const on = Boolean(active) && c.mbti === active;
									const className = cn("rounded-lg px-3 py-3 text-left transition-[color,opacity,box-shadow] duration-300 ease-in-out", on ? "text-accent shadow-[var(--shadow-border-hover)]" : "bg-surface/70", onPick && !on ? "hover:opacity-80" : "");
									const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs tabular-nums",
										children: c.mbti
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm leading-snug",
										children: c.name
									})] });
									return onPick && !locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => onPick(c.mbti),
										className,
										children: inner
									}, c.mbti) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className,
										children: inner
									}, c.mbti);
								})
							})
						]
					}, id);
				})
			}), locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-end justify-center rounded-2xl bg-bg/20 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-full bg-bg px-4 py-2 text-sm text-muted",
					children: "광고를 보면 이 지도가 선명해집니다"
				})
			}) : null]
		})]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function capDigest(d) {
	return {
		...d,
		sampleTitles: d.sampleTitles.slice(0, 16).map((t) => t.slice(0, 60)),
		topTokens: d.topTokens.slice(0, 10),
		hourHistogram: d.hourHistogram.slice(0, 24),
		weekdayHistogram: d.weekdayHistogram.slice(0, 7),
		busiestDays: d.busiestDays.slice(0, 5),
		prompts: d.prompts?.slice(0, 5).map((p) => p.slice(0, 400)),
		axes: d.axes
	};
}
var analyzeUsage = createServerFn({ method: "POST" }).validator((input) => capDigest(input)).handler(createSsrRpc("74162b8540f4d23bb11989c8205a4ace5e185bea902ddd393832c55bd8596975"));
var META = testOf("soul");
function SoulRun() {
	const digest = useAppStore((s) => s.digest);
	const parsed = useAppStore((s) => s.parsed);
	const stats = useAppStore((s) => s.stats);
	const soul = useAppStore((s) => s.soul);
	const unlocks = useAppStore((s) => s.unlocks);
	const adKey = useAppStore((s) => s.adKey);
	const setSoul = useAppStore((s) => s.setSoul);
	const setAnalyzing = useAppStore((s) => s.setAnalyzing);
	const unlock = useAppStore((s) => s.unlock);
	const setAdKey = useAppStore((s) => s.setAdKey);
	const intake = useAppStore((s) => s.intake);
	const { phase, start: startTheater } = useRunFlow("soul");
	const [peek, setPeek] = (0, import_react.useState)(null);
	const unlocked = Boolean(unlocks.soul);
	const winner = unlocked ? peek ?? soul?.mbti : null;
	const shown = soul ? peek && peek !== soul.mbti ? resultFromMbti(peek) : soul : null;
	const start = () => {
		if (!digest) return;
		startTheater();
		if (soul) return;
		const local = classifyLocal(digest);
		setSoul(local);
		window.setTimeout(() => {
			setAnalyzing();
			analyzeUsage({ data: digest }).then((res) => setSoul(res.analysis)).catch(() => setSoul(local));
		}, 3200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		"data-phase": phase,
		"data-qa": "soul-run",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass grid gap-2 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: META.no
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "hero-title tracking-tight",
						children: META.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-muted",
						children: META.hook
					})
				]
			}),
			phase === "in" && !digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionIntake, {}) : null,
			phase === "in" && digest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: start,
					"data-qa": "tear",
					children: "분석 시작하기"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] text-muted",
					children: intake === "simple" ? "붙여 넣은 문장으로 성격을 분석해요." : "올린 대화록으로 성격을 분석해요."
				})]
			}) : null,
			phase === "theater" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Theater, { lines: META.theater }) : null,
			phase === "teaser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
				kicker: META.name,
				title: META.teaser,
				body: "유형 글자 네 개와 이름까지 한 번에 보여 드려요.",
				action: "광고 보고 결과 보기",
				onAction: () => setAdKey("soul:mbti")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" })] }) : null,
			phase === "result" && unlocked && shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "내가 만난 유형"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[20px] font-semibold",
					children: "내가 만난 유형들이에요"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterParade, {
					winner,
					dim: false,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MbtiCard, { analysis: shown }),
				parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsPanel, { stats: parsed.stats }) : stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsPanel, { stats }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerrainMap, {
					active: winner,
					onPick: setPeek
				}),
				unlocks["soul:prompts"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptList, { prompts: shown.imagePrompts }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedPanel, {
					kicker: "이미지",
					title: "이미지 프롬프트 3개",
					body: "이 얼굴로 그릴 때 쓰는 영어 문장이에요. 광고를 보면 복사할 수 있어요.",
					action: "광고 보고 프롬프트 보기",
					onAction: () => setAdKey("soul:prompts")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { place: "inline" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueStrip, { current: "soul" })
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "mbti",
				open: adKey === "soul:mbti",
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock("soul");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, {
				kind: "prompts",
				open: adKey === "soul:prompts",
				onClose: () => setAdKey(null),
				onComplete: () => {
					unlock("soul:prompts");
				}
			})
		]
	});
}
function TestPage({ slug }) {
	const meta = testOf(slug);
	const soul = useAppStore((s) => s.soul);
	const digest = useAppStore((s) => s.digest);
	const unlocks = useAppStore((s) => s.unlocks);
	const runPhase = useAppStore((s) => meta ? s.runPhase[meta.id] : void 0);
	if (!meta) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, {
		stage: "gate",
		home: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-3xl font-semibold tracking-tight",
					children: "없는 페이지예요"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[15px] text-muted",
					children: "홈에서 분석을 다시 골라 볼 수 있어요."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-4 inline-block min-h-11 text-[15px] text-accent",
					children: "홈으로"
				})
			]
		})
	});
	const unlocked = Boolean(unlocks[meta.id]);
	const stage = unlocked ? "result" : runPhase === "theater" || runPhase === "teaser" || digest ? "work" : "gate";
	const axes = meta.id === "soul" && unlocked ? soul?.axes ?? null : null;
	const caption = meta.id === "soul" && unlocked && soul ? `${soul.mbti}  ·  ${soul.characterName}` : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, {
		stage,
		axes,
		locked: unlocked,
		quadrant: meta.id === "soul" ? soul?.quadrant ?? null : null,
		caption,
		children: [
			meta.id === "soul" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulRun, {}) : null,
			meta.id === "abuse" || meta.id === "love" || meta.id === "skill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeRun, { id: meta.id }) : null,
			meta.id === "duel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuelRun, {}) : null,
			meta.id === "now" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NowRun, {}) : null
		]
	});
}
//#endregion
export { TestPage as t };
