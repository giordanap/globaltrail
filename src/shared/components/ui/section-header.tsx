import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex gap-8",
        align === "left" && "items-end justify-between",
        align === "center" && "mx-auto max-w-2xl flex-col items-center text-center",
        className,
      )}
    >
      <div className={cn(align === "left" && "max-w-xl")}>
        {eyebrow ? (
          <p className="travel-label mb-3 text-muted">{eyebrow}</p>
        ) : null}

        <h2 className="travel-heading text-4xl text-foreground">{title}</h2>

        {description ? (
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-strong">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}