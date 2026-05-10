import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type SkeletonBlockProps = HTMLAttributes<HTMLDivElement>;

export function SkeletonBlock({ className, ...props }: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        "travel-shimmer rounded-card bg-surface-muted/80",
        className,
      )}
      {...props}
    />
  );
}