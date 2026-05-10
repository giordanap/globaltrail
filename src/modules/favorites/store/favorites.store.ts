"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storageKeys } from "@/core/storage/storage-keys";
import type { FavoriteDestination } from "@/modules/favorites/types/favorite-destination";

type FavoritesState = {
  favorites: FavoriteDestination[];
  addFavorite: (destination: FavoriteDestination) => void;
  removeFavorite: (code: string) => void;
  toggleFavorite: (destination: FavoriteDestination) => void;
  clearFavorites: () => void;
  isFavorite: (code: string) => boolean;
};

function normalizeCode(code: string) {
  return code.trim().toUpperCase();
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (destination) => {
        const code = normalizeCode(destination.code);

        set((state) => {
          const alreadySaved = state.favorites.some(
            (favorite) => normalizeCode(favorite.code) === code,
          );

          if (alreadySaved) {
            return state;
          }

          return {
            favorites: [
              {
                ...destination,
                code,
                savedAt: new Date().toISOString(),
              },
              ...state.favorites,
            ],
          };
        });
      },

      removeFavorite: (code) => {
        const normalizedCode = normalizeCode(code);

        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => normalizeCode(favorite.code) !== normalizedCode,
          ),
        }));
      },

      toggleFavorite: (destination) => {
        const code = normalizeCode(destination.code);

        if (get().isFavorite(code)) {
          get().removeFavorite(code);
          return;
        }

        get().addFavorite({
          ...destination,
          code,
        });
      },

      clearFavorites: () => {
        set({
          favorites: [],
        });
      },

      isFavorite: (code) => {
        const normalizedCode = normalizeCode(code);

        return get().favorites.some(
          (favorite) => normalizeCode(favorite.code) === normalizedCode,
        );
      },
    }),
    {
      name: storageKeys.favorites,
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    },
  ),
);