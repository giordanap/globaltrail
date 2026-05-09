import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type BadgeVariant = "neutral" | "ocean" | "sage" | "sand" | "terracotta";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({
  children,
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em]",
        variant === "neutral" &&
          "border-border bg-surface text-muted-strong",
        variant === "ocean" &&
          "border-deep-ocean/15 bg-mist-blue text-deep-ocean-strong",
        variant === "sage" &&
          "border-sage-strong/15 bg-sage text-sage-strong",
        variant === "sand" &&
          "border-amber/20 bg-sand text-foreground",
        variant === "terracotta" &&
          "border-terracotta/20 bg-terracotta/10 text-terracotta",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
