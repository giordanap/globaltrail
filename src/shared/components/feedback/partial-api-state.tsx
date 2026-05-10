import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type PartialApiStateSurface = "card" | "inline";
type PartialApiStateTone = "warning" | "soft" | "error";

type PartialApiStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  retryingLabel?: string;
  isRetrying?: boolean;
  onRetry?: () => void;
  surface?: PartialApiStateSurface;
  tone?: PartialApiStateTone;
  className?: string;
};

function getBadgeVariant(tone: PartialApiStateTone) {
  if (tone === "error") {
    return "terracotta";
  }

  if (tone === "soft") {
    return "sand";
  }

  return "sand";
}

function getStateRole(tone: PartialApiStateTone) {
  return tone === "error" ? "alert" : "status";
}

function PartialApiStateContent({
  eyebrow,
  title,
  description,
  icon,
  actionLabel = "Try again",
  retryingLabel = "Retrying...",
  isRetrying = false,
  onRetry,
  tone = "warning",
}: PartialApiStateProps) {
  return (
    <div role={getStateRole(tone)} aria-live={tone === "error" ? "assertive" : "polite"}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <Badge variant={getBadgeVariant(tone)}>{eyebrow}</Badge>

        {icon ? (
          <div
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-2xl bg-surface-soft text-xl text-muted-strong"
          >
            {icon}
          </div>
        ) : null}
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-foreground">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-muted-strong">
        {description}
      </p>

      {onRetry ? (
        <Button
          className="mt-6"
          onClick={onRetry}
          disabled={isRetrying}
          aria-busy={isRetrying}
          variant={tone === "soft" ? "secondary" : "primary"}
        >
          {isRetrying ? retryingLabel : actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function PartialApiState({
  surface = "card",
  className,
  ...props
}: PartialApiStateProps) {
  if (surface === "inline") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-surface px-4 py-5",
          className,
        )}
      >
        <PartialApiStateContent {...props} surface={surface} />
      </div>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <PartialApiStateContent {...props} surface={surface} />
    </Card>
  );
}