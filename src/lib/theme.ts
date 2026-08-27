export type Theme = "light" | "dark";

const KEY = "st-theme";

type Listener = () => void;

let current: Theme = "dark";
const listeners = new Set<Listener>();

function isTheme(v: string | null): v is Theme {
  return v === "light" || v === "dark";
}

export function detectTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(KEY);
    if (isTheme(saved)) return saved;
  } catch {
    /* quota / private */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function getTheme(): Theme {
  return current;
}

export function subscribeTheme(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function applyTheme(theme: Theme) {
  current = theme;
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const bg = getComputedStyle(root).getPropertyValue("--color-bg").trim() || (theme === "light" ? "#f2f4f6" : "#0e0e0e");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", bg);
  window.dispatchEvent(new CustomEvent("st-theme", { detail: theme }));
  listeners.forEach((fn) => fn());
}

export function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* quota */
  }
  applyTheme(theme);
}

export function toggleTheme() {
  persistTheme(current === "light" ? "dark" : "light");
}

export function bootTheme() {
  applyTheme(detectTheme());
}

if (typeof window !== "undefined") {
  current = detectTheme();
}

export const THEME_BOOT = `(function(){try{var k='st-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;
