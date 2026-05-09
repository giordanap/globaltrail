import type { QueryParams, QueryValue } from "@/core/http/http-types";

type BuildUrlOptions = {
  baseUrl: string;
  path: string;
  query?: QueryParams;
};

function normalizeBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "");
}

function normalizePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function appendQueryValue(
  searchParams: URLSearchParams,
  key: string,
  value: QueryValue,
) {
  if (value === null || value === undefined || value === "") {
    return;
  }

  searchParams.append(key, String(value));
}

export function buildUrl({ baseUrl, path, query }: BuildUrlOptions) {
  const url = new URL(`${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => appendQueryValue(url.searchParams, key, item));
      return;
    }

    appendQueryValue(url.searchParams, key, value);
  });

  return url.toString();
}