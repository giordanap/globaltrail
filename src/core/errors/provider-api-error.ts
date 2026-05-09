import type { ApiProvider } from "@/core/api/api-provider";

export type ProviderErrorKind = "http" | "network" | "timeout" | "parse";

type ProviderApiErrorDetails = {
  kind: ProviderErrorKind;
  provider: ApiProvider;
  message: string;
  status?: number;
  statusText?: string;
  url?: string;
  responseBody?: unknown;
  cause?: unknown;
};

export class ProviderApiError extends Error {
  readonly kind: ProviderErrorKind;
  readonly provider: ApiProvider;
  readonly status?: number;
  readonly statusText?: string;
  readonly url?: string;
  readonly responseBody?: unknown;
  readonly cause?: unknown;

  constructor(details: ProviderApiErrorDetails) {
    super(details.message);

    this.name = "ProviderApiError";
    this.kind = details.kind;
    this.provider = details.provider;
    this.status = details.status;
    this.statusText = details.statusText;
    this.url = details.url;
    this.responseBody = details.responseBody;
    this.cause = details.cause;
  }
}