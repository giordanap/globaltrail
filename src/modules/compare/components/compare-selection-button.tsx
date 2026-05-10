"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/core/router/routes";
import { useCompareStore } from "@/modules/compare/store";
import { getCompareSelectionCount } from "@/modules/compare/types";
import { cn } from "@/shared/utils/cn";

type CompareSelectionButtonProps = {
  countryCode: string;
  countryName: string;
  variant?: "card" | "detail";
  className?: string;
};

function getButtonLabel(isSelected: boolean, selectionCount: number) {
  if (isSelected) {
    return "Selected";
  }

  if (selectionCount === 0) {
    return "Compare";
  }

  if (selectionCount === 1) {
    return "Add second";
  }

  return "Replace compare";
}

export function CompareSelectionButton({
  countryCode,
  countryName,
  variant = "card",
  className,
}: CompareSelectionButtonProps) {
  const router = useRouter();
  const left = useCompareStore((state) => state.left);
  const right = useCompareStore((state) => state.right);
  const selectDestinationForCompare = useCompareStore(
    (state) => state.selectDestinationForCompare,
  );

  const normalizedCountryCode = countryCode.trim().toUpperCase();
  const isSelected =
    left === normalizedCountryCode || right === normalizedCountryCode;
  const selectionCount = getCompareSelectionCount({ left, right });

  function handleClick() {
    const nextSelection = selectDestinationForCompare(normalizedCountryCode);
    router.push(routes.compareSelection(nextSelection));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      aria-label={`Select ${countryName} for destination comparison`}
      className={cn(
        "micro-button inline-flex items-center justify-center rounded-control font-extrabold",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
        variant === "card" &&
          "min-h-10 border border-border bg-surface px-4 text-xs uppercase tracking-[0.16em] text-muted-strong shadow-sm hover:border-border-strong hover:bg-surface-soft hover:text-foreground",
        variant === "detail" &&
          "min-h-12 border border-border bg-surface px-6 text-sm text-foreground shadow-sm hover:border-border-strong hover:bg-surface-soft",
        isSelected &&
          "border-deep-ocean/20 bg-mist-blue text-deep-ocean shadow-sm hover:bg-mist-blue",
        className,
      )}
    >
      <span className="relative inline-flex items-center gap-2">
        {isSelected ? (
          <span
            aria-hidden="true"
            className="grid size-4 place-items-center rounded-full bg-deep-ocean text-[0.55rem] text-white"
          >
            ✓
          </span>
        ) : null}
        {getButtonLabel(isSelected, selectionCount)}
      </span>
    </button>
  );
}