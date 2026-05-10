import { FavoritesPage } from "@/modules/favorites/components/favorites-page";
import { ClientOnly } from "@/shared/components/client/client-only";
import { ClientStateFallback } from "@/shared/components/feedback/client-state-fallback";

function FavoritesPageFallback() {
  return (
    <ClientStateFallback
      eyebrow="Saved destinations"
      icon="♡"
      title="Preparing your travel shortlist."
      description="Your saved destinations will appear here once the page is ready."
    />
  );
}

export default function Page() {
  return (
    <ClientOnly fallback={<FavoritesPageFallback />}>
      <FavoritesPage />
    </ClientOnly>
  );
}