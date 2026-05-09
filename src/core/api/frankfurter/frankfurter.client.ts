import { apiProviders } from "@/core/api/api-provider";
import { createProviderClient } from "@/core/http/provider-client";

export const frankfurterClient = createProviderClient(apiProviders.frankfurter);