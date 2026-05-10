"use client";

import type { FavoriteDestination } from "@/modules/favorites/types";
import { useFavoritesStore } from "@/modules/favorites/store";
import { cn } from "@/shared/utils/cn";

type FavoriteToggleButtonProps = {
  destination: FavoriteDestination;
  variant?: "compact" | "default";
  className?: string;
};

export function FavoriteToggleButton({
  destination,
  variant = "default",
  className,
}: FavoriteToggleButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.isFavorite(destination.code),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(destination)}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remove ${destination.name} from saved destinations`
          : `Save ${destination.name} to saved destinations`
      }
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-black transition",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
        variant === "compact" && "size-10 text-base",
        variant === "default" && "min-h-12 gap-2 px-5 text-sm",
        isFavorite
          ? "border-terracotta/30 bg-terracotta/10 text-terracotta hover:bg-terracotta/15"
          : "border-border bg-surface text-muted-strong hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
      {variant === "default" ? (
        <span>{isFavorite ? "Saved" : "Save destination"}</span>
      ) : null}
    </button>
  );
}