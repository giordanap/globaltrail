import type { ReactNode } from "react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/cn";

type ErrorStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  title,
  description,
  action,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn("border border-terracotta/20 p-8", className)}>
      <Badge variant="terracotta">Needs attention</Badge>

      <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
        {title}
      </h3>

      <p className="mt-3 max-w-md text-sm leading-7 text-muted-strong">
        {description}
      </p>

      {action ? <div className="mt-6">{action}</div> : null}
    </Card>
  );
}