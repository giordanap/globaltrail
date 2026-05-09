import { QueryClient } from "@tanstack/react-query";
import { ProviderApiError } from "@/core/errors/provider-api-error";
import { queryGcTimes, queryStaleTimes } from "@/core/query/query-stale-times";

function shouldRetryQuery(failureCount: number, error: Error) {
  if (failureCount >= 2) {
    return false;
  }

  if (error instanceof ProviderApiError) {
    if (error.kind === "parse") {
      return false;
    }

    if (
      error.kind === "http" &&
      error.status !== undefined &&
      error.status >= 400 &&
      error.status < 500
    ) {
      return false;
    }
  }

  return true;
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: queryStaleTimes.countriesList,
        gcTime: queryGcTimes.medium,
        retry: shouldRetryQuery,
        retryDelay: (attemptIndex) =>
          Math.min(1000 * 2 ** attemptIndex, 8000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}