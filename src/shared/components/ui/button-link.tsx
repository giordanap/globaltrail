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
        "inline-flex min-h-12 min-w-44 items-center justify-center rounded-xl px-6 text-sm font-extrabold transition",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-foreground/20",
        variant === "primary" &&
          "bg-[#0b1220] !text-white shadow-sm hover:bg-[#172033]",
        variant === "secondary" &&
          "border border-[#d8dee6] bg-white text-[#111827] shadow-sm hover:border-[#111827]/30",
        className,
      )}
      style={variant === "primary" ? { color: "#ffffff" } : undefined}
    >
      <span
        className={cn(
          "leading-none",
          variant === "primary" ? "!text-white" : "text-current",
        )}
        style={variant === "primary" ? { color: "#ffffff" } : undefined}
      >
        {children}
      </span>
    </a>
  );
}