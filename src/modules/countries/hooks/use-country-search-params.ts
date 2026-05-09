"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCountrySearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q")?.trim() ?? "";

  const setQuery = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedQuery = nextQuery.trim();

      if (normalizedQuery) {
        params.set("q", normalizedQuery);
      } else {
        params.delete("q");
      }

      const nextSearch = params.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      router.replace(nextUrl, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const clearQuery = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  return {
    query,
    setQuery,
    clearQuery,
  };
}