import { useId, type SelectHTMLAttributes } from "react";
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
  const generatedId = useId();
  const selectId = id ?? props.name ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="block">
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-extrabold text-foreground"
        >
          {label}
        </label>
      ) : null}

      <select
        id={selectId}
        aria-describedby={helperId}
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
        <p id={helperId} className="mt-2 text-xs leading-5 text-muted-strong">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}