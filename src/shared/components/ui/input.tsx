import { useId, type InputHTMLAttributes } from "react";
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
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className="block">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-extrabold text-foreground"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        aria-describedby={helperId}
        className={cn(
          "min-h-12 w-full rounded-control border border-border bg-surface px-4 text-sm text-foreground shadow-sm transition",
          "placeholder:text-muted focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10",
          className,
        )}
        {...props}
      />

      {helperText ? (
        <p id={helperId} className="mt-2 text-xs leading-5 text-muted-strong">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}