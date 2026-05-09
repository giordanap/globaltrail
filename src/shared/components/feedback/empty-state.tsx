import type { ReactNode } from "react";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/cn";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("p-8 text-center", className)}>
      {icon ? (
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-surface-soft text-xl text-foreground">
          {icon}
        </div>
      ) : null}

      <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
        {title}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-strong">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}