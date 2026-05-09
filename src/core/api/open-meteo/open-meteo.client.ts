import { apiProviders } from "@/core/api/api-provider";
import { createProviderClient } from "@/core/http/provider-client";

export const openMeteoClient = createProviderClient(apiProviders.openMeteo);