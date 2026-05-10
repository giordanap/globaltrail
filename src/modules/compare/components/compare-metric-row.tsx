import type { ReactNode } from "react";

type CompareMetricRowProps = {
  label: string;
  leftValue: ReactNode;
  rightValue: ReactNode;
  helperText?: string;
};

function normalizeValue(value: ReactNode) {
  return value ?? "Unavailable";
}

export function CompareMetricRow({
  label,
  leftValue,
  rightValue,
  helperText,
}: CompareMetricRowProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[0.8fr_1fr_1fr] md:items-center">
      <div>
        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>

        {helperText ? (
          <p className="mt-1 text-xs leading-5 text-muted-strong">
            {helperText}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl bg-surface-soft p-3">
        <p className="text-sm font-black text-foreground">
          {normalizeValue(leftValue)}
        </p>
      </div>

      <div className="rounded-2xl bg-surface-soft p-3">
        <p className="text-sm font-black text-foreground">
          {normalizeValue(rightValue)}
        </p>
      </div>
    </div>
  );
}