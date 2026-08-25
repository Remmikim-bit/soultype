import { cn } from "@/lib/utils";

export function HeroSwitch({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hero-switch relative flex h-28 w-52 items-center rounded-full p-3 md:h-44 md:w-80 md:p-4",
        "animate-switch-float",
        className,
      )}
      aria-hidden="true"
    >
      <div className="hero-switch-knob grid size-20 place-items-center rounded-full md:size-36">
        <svg viewBox="0 0 24 24" className="size-7 text-fg md:size-12" fill="none">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-4", className)} fill="currentColor" aria-hidden="true">
      <path d="M12.175 9H0V7h12.175L6.575 1.4 8 0l8 8-8 8-1.425-1.4L12.175 9Z" />
    </svg>
  );
}
