import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type SkeletonBlockProps = HTMLAttributes<HTMLDivElement>;

export function SkeletonBlock({ className, ...props }: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-card bg-surface-muted/80",
        className,
      )}
      {...props}
    />
  );
}