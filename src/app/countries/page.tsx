import { Suspense } from "react";
import { CountriesPage } from "@/modules/countries/components/countries-page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CountriesPage />
    </Suspense>
  );
}