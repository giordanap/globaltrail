"use client";

import { useCallback, useState } from "react";

const recentCountrySearchesKey = "globaltrail-recent-country-searches-v1";
const maxRecentSearches = 5;

function normalizeSearch(value: string) {
  return value.trim();
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readRecentSearches() {
  if (!canUseLocalStorage()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(recentCountrySearchesKey);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter((item): item is string => typeof item === "string")
      .map(normalizeSearch)
      .filter(Boolean)
      .slice(0, maxRecentSearches);
  } catch {
    return [];
  }
}

function writeRecentSearches(searches: string[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(
    recentCountrySearchesKey,
    JSON.stringify(searches),
  );
}

function removeRecentSearches() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(recentCountrySearchesKey);
}

export function useRecentCountrySearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    readRecentSearches(),
  );

  const addRecentSearch = useCallback((query: string) => {
    const normalizedQuery = normalizeSearch(query);

    if (!normalizedQuery) {
      return;
    }

    setRecentSearches((currentSearches) => {
      const nextSearches = [
        normalizedQuery,
        ...currentSearches.filter(
          (search) => search.toLowerCase() !== normalizedQuery.toLowerCase(),
        ),
      ].slice(0, maxRecentSearches);

      writeRecentSearches(nextSearches);

      return nextSearches;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    removeRecentSearches();
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
}