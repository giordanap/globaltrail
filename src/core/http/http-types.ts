import type { ApiProvider } from "@/core/api/api-provider";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export type FetchClientOptions<TBody = unknown> = {
  baseUrl: string;
  path: string;
  provider: ApiProvider;
  method?: HttpMethod;
  query?: QueryParams;
  headers?: HeadersInit;
  body?: TBody;
  timeoutMs?: number;
  signal?: AbortSignal;
  cache?: RequestCache;
  credentials?: RequestCredentials;
};