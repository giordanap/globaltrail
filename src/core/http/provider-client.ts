import type { ApiProviderConfig } from "@/core/api/api-provider";
import { fetchClient } from "@/core/http/fetch-client";
import type { FetchClientOptions } from "@/core/http/http-types";

export type ProviderClientRequestOptions<TBody = unknown> = Omit<
  FetchClientOptions<TBody>,
  "baseUrl" | "provider" | "path"
>;

export type ProviderClientReadOptions = Omit<
  ProviderClientRequestOptions<never>,
  "method" | "body"
>;

export type ProviderClientWriteOptions<TBody = unknown> = Omit<
  ProviderClientRequestOptions<TBody>,
  "method" | "body"
>;

export function createProviderClient(config: ApiProviderConfig) {
  return {
    request<TResponse, TBody = unknown>(
      path: string,
      options: ProviderClientRequestOptions<TBody> = {},
    ) {
      return fetchClient<TResponse, TBody>({
        ...options,
        baseUrl: config.baseUrl,
        path,
        provider: config.key,
        timeoutMs: options.timeoutMs ?? config.timeoutMs,
      });
    },

    get<TResponse>(path: string, options: ProviderClientReadOptions = {}) {
      return fetchClient<TResponse>({
        ...options,
        baseUrl: config.baseUrl,
        path,
        provider: config.key,
        method: "GET",
        timeoutMs: options.timeoutMs ?? config.timeoutMs,
      });
    },

    post<TResponse, TBody = unknown>(
      path: string,
      body: TBody,
      options: ProviderClientWriteOptions<TBody> = {},
    ) {
      return fetchClient<TResponse, TBody>({
        ...options,
        baseUrl: config.baseUrl,
        path,
        provider: config.key,
        method: "POST",
        body,
        timeoutMs: options.timeoutMs ?? config.timeoutMs,
      });
    },
  };
}