import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "soft" | "warm";
};

export function Card({
  children,
  variant = "default",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "micro-card rounded-card border border-transparent shadow-panel",
        variant === "default" && "bg-surface",
        variant === "soft" && "bg-surface-soft",
        variant === "warm" && "bg-surface-warm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}