import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({
  label,
  helperText,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-extrabold text-foreground">
          {label}
        </span>
      ) : null}

      <input
        id={inputId}
        className={cn(
          "min-h-12 w-full rounded-control border border-border bg-surface px-4 text-sm text-foreground shadow-sm transition",
          "placeholder:text-muted focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10",
          className,
        )}
        {...props}
      />

      {helperText ? (
        <span className="mt-2 block text-xs leading-5 text-muted-strong">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}