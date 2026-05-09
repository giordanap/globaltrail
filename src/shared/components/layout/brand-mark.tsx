import { cn } from "@/shared/utils/cn";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span
        className="grid size-10 place-items-center rounded-full bg-ink text-sm font-black text-white shadow-sm"
        aria-hidden="true"
      >
        ◍
      </span>

      {!compact ? (
        <span className="leading-none">
          <span className="block text-xl font-black tracking-tight text-foreground">
            GlobalTrail
          </span>
          <span className="mt-1 block text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-muted">
            Travel Intelligence
          </span>
        </span>
      ) : null}
    </div>
  );
}