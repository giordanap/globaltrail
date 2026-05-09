import { Suspense } from "react";
import { CountryDetailPage } from "@/modules/countries/components/country-detail-page";
import { CountryDetailSkeleton } from "@/modules/countries/components/country-detail-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<CountryDetailSkeleton />}>
      <CountryDetailPage />
    </Suspense>
  );
}