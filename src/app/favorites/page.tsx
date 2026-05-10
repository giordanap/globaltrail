import { FavoritesPage } from "@/modules/favorites/components/favorites-page";
import { ClientOnly } from "@/shared/components/client/client-only";
import { FavoritesPageSkeleton } from "@/shared/components/feedback/route-loading-skeletons";

export default function Page() {
  return (
    <ClientOnly fallback={<FavoritesPageSkeleton />}>
      <FavoritesPage />
    </ClientOnly>
  );
}