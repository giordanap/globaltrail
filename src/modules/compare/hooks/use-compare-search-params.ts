"use client";

import { useSearchParams } from "next/navigation";
import {
  createCompareSelection,
  type CompareSelection,
} from "@/modules/compare/types";

export function useCompareSearchParams(): CompareSelection {
  const searchParams = useSearchParams();

  return createCompareSelection({
    left: searchParams.get("left"),
    right: searchParams.get("right"),
  });
}