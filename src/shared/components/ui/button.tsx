import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-control font-extrabold transition disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
        size === "sm" && "min-h-10 px-4 text-xs",
        size === "md" && "min-h-12 px-6 text-sm",
        variant === "primary" && "bg-ink text-white shadow-sm hover:bg-ink-soft",
        variant === "secondary" &&
          "border border-border bg-surface text-foreground shadow-sm hover:border-border-strong hover:bg-surface-soft",
        variant === "ghost" &&
          "text-muted-strong hover:bg-surface-soft hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}