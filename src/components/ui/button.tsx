import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowGlyph } from "@/components/hero-switch";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-normal transition-[color,background-color,opacity,box-shadow,transform] duration-300 ease-in-out active:scale-96 disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-70",
        ghost: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:opacity-70",
        quiet: "bg-surface text-fg hover:opacity-70",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 text-xs px-3",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    arrow?: boolean;
  };

export function Button({ className, variant, size, arrow, children, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant, size }), arrow && "pr-1.5 pl-4", className)} {...props}>
      {children}
      {arrow ? (
        <span className="grid size-8 place-items-center rounded-full bg-bg text-fg">
          <ArrowGlyph className="size-3.5" />
        </span>
      ) : null}
    </button>
  );
}
