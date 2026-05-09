import { ProviderApiError } from "@/core/errors/provider-api-error";
import { buildUrl } from "@/core/http/build-url";
import type { FetchClientOptions } from "@/core/http/http-types";

function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

function isUrlSearchParams(body: unknown): body is URLSearchParams {
  return (
    typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams
  );
}

function isBlob(body: unknown): body is Blob {
  return typeof Blob !== "undefined" && body instanceof Blob;
}

function isArrayBuffer(body: unknown): body is ArrayBuffer {
  return typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer;
}

function isNativeBody(body: unknown): body is BodyInit {
  return (
    typeof body === "string" ||
    isFormData(body) ||
    isUrlSearchParams(body) ||
    isBlob(body) ||
    isArrayBuffer(body)
  );
}

function createRequestBody(body: unknown): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (isNativeBody(body)) {
    return body;
  }

  return JSON.stringify(body);
}

function createHeaders(headers: HeadersInit | undefined, body: unknown) {
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (
    body !== undefined &&
    !isNativeBody(body) &&
    !requestHeaders.has("Content-Type")
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  return requestHeaders;
}

async function readErrorPayload(response: Response) {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  return text;
}

async function parseSuccessfulResponse<TResponse>(
  response: Response,
  options: FetchClientOptions,
  url: string,
): Promise<TResponse> {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();

  if (!text) {
    return undefined as TResponse;
  }

  const contentType = response.headers.get("content-type");
  const looksLikeJson = text.startsWith("{") || text.startsWith("[");

  if (contentType?.includes("application/json") || looksLikeJson) {
    try {
      return JSON.parse(text) as TResponse;
    } catch (error) {
      throw new ProviderApiError({
        kind: "parse",
        provider: options.provider,
        message: `Could not parse response from ${options.provider}.`,
        url,
        cause: error,
      });
    }
  }

  return text as TResponse;
}

export async function fetchClient<TResponse, TBody = unknown>(
  options: FetchClientOptions<TBody>,
): Promise<TResponse> {
  const {
    baseUrl,
    path,
    provider,
    method = "GET",
    query,
    headers,
    body,
    timeoutMs = 8_000,
    signal,
    cache,
    credentials,
  } = options;

  const url = buildUrl({ baseUrl, path, query });
  const controller = new AbortController();

  let didTimeout = false;

  const timeoutId = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeoutMs);

  const abortFromExternalSignal = () => {
    controller.abort();
  };

  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener("abort", abortFromExternalSignal, {
      once: true,
    });
  }

  try {
    const response = await fetch(url, {
      method,
      headers: createHeaders(headers, body),
      body: createRequestBody(body),
      signal: controller.signal,
      cache,
      credentials,
    });

    if (!response.ok) {
      const responseBody = await readErrorPayload(response);

      throw new ProviderApiError({
        kind: "http",
        provider,
        message: `${provider} responded with ${response.status} ${response.statusText}.`,
        status: response.status,
        statusText: response.statusText,
        url,
        responseBody,
      });
    }

    return parseSuccessfulResponse<TResponse>(response, options, url);
  } catch (error) {
    if (error instanceof ProviderApiError) {
      throw error;
    }

    throw new ProviderApiError({
      kind: didTimeout ? "timeout" : "network",
      provider,
      message: didTimeout
        ? `${provider} request timed out after ${timeoutMs}ms.`
        : `Could not reach ${provider}.`,
      url,
      cause: error,
    });
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromExternalSignal);
  }
}