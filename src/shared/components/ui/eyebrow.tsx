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
        "w-fit rounded-full bg-sage px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-sage-strong",
        className,
      )}
    >
      {children}
    </p>
  );
}