import type { ReactNode } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";

type StatePreviewCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function StatePreviewCard({
  eyebrow,
  title,
  description,
  children,
}: StatePreviewCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border bg-surface-warm p-5">
        <Badge variant="sand">{eyebrow}</Badge>

        <h2 className="mt-4 text-xl font-black tracking-[-0.04em] text-foreground">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-muted-strong">
          {description}
        </p>
      </div>

      <div className="p-5">{children}</div>
    </Card>
  );
}