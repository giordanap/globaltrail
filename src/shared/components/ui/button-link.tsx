import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 min-w-44 items-center justify-center rounded-control px-6 text-sm font-extrabold transition",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
        variant === "primary" &&
          "bg-ink !text-white shadow-sm hover:bg-ink-soft",
        variant === "secondary" &&
          "border border-border bg-surface text-foreground shadow-sm hover:border-border-strong hover:bg-surface-soft",
        className,
      )}
    >
      <span
        className={cn(
          "leading-none",
          variant === "primary" ? "!text-white" : "text-current",
        )}
      >
        {children}
      </span>
    </a>
  );
}