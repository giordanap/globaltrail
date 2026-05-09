import type { SelectHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
};

export function Select({
  label,
  helperText,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-extrabold text-foreground">
          {label}
        </span>
      ) : null}

      <select
        id={selectId}
        className={cn(
          "min-h-12 w-full rounded-control border border-border bg-surface px-4 text-sm font-semibold text-foreground shadow-sm transition",
          "focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10",
          className,
        )}
        {...props}
      >
        {children}
      </select>

      {helperText ? (
        <span className="mt-2 block text-xs leading-5 text-muted-strong">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}