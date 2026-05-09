import type { ReactNode } from "react";
import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/utils/cn";

type StatCardProps = {
  icon?: ReactNode;
  value: string;
  description: string;
  className?: string;
};

export function StatCard({
  icon,
  value,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-7", className)}>
      {icon ? (
        <div className="grid size-10 place-items-center rounded-xl bg-surface-soft text-sm text-foreground">
          {icon}
        </div>
      ) : null}

      <h3 className="mt-5 text-[2rem] font-black leading-none tracking-[-0.05em] text-foreground">
        {value}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-strong">{description}</p>
    </Card>
  );
}
