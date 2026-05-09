import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "travel-label w-fit rounded-full border border-border bg-surface px-4 py-1.5 text-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </p>
  );
}