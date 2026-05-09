import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
  variant?: "default" | "soft" | "ghost";
};

export function IconButton({
  children,
  label,
  variant = "default",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "grid size-10 place-items-center rounded-full text-foreground transition disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
        variant === "default" &&
          "border border-border bg-surface shadow-sm hover:border-border-strong",
        variant === "soft" && "bg-surface-soft hover:bg-surface-muted",
        variant === "ghost" && "hover:bg-surface-soft",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}