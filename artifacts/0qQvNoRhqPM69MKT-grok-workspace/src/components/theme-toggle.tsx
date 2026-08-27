"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme } from "@/lib/theme";

const get = () => getTheme();
const server = () => "dark" as const;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, get, server);
  const next = theme === "light" ? "어두운 화면으로 바꾸기" : "밝은 화면으로 바꾸기";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={next}
      title={next}
      data-qa="theme-toggle"
    >
      {theme === "light" ? <Moon className="size-4" strokeWidth={2.2} /> : <Sun className="size-4" strokeWidth={2.2} />}
    </button>
  );
}
