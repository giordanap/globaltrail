import { Suspense } from "react";
import { CountriesPage } from "@/modules/countries/components/countries-page";
import { CountriesPageSkeleton } from "@/shared/components/feedback/route-loading-skeletons";

export default function Page() {
  return (
    <Suspense fallback={<CountriesPageSkeleton />}>
      <CountriesPage />
    </Suspense>
  );
}