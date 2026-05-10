"use client";

import { create } from "zustand";
import {
  createCompareSelection,
  getNextCompareSelection,
  normalizeCompareCode,
  type CompareSelection,
  type CompareSelectionInput,
  type CompareSide,
} from "@/modules/compare/types";

type CompareState = CompareSelection & {
  setCompareCode: (side: CompareSide, countryCode: string | null) => void;
  setCompareSelection: (selection: CompareSelectionInput) => void;
  selectDestinationForCompare: (countryCode: string) => CompareSelection;
  removeCompareCode: (side: CompareSide) => void;
  swapCompareSelection: () => void;
  clearCompareSelection: () => void;
};

export const useCompareStore = create<CompareState>()((set, get) => ({
  left: null,
  right: null,

  setCompareCode: (side, countryCode) => {
    const normalizedCode = normalizeCompareCode(countryCode);

    set((state) => {
      if (side === "left") {
        return {
          left: normalizedCode,
          right: state.right === normalizedCode ? null : state.right,
        };
      }

      return {
        left: state.left === normalizedCode ? null : state.left,
        right: normalizedCode,
      };
    });
  },

  setCompareSelection: (selection) => {
    set((state) => {
      const nextSelection = createCompareSelection({
        left:
          typeof selection.left === "undefined"
            ? state.left
            : selection.left,
        right:
          typeof selection.right === "undefined"
            ? state.right
            : selection.right,
      });

      if (
        nextSelection.left &&
        nextSelection.right &&
        nextSelection.left === nextSelection.right
      ) {
        return {
          left: nextSelection.left,
          right: null,
        };
      }

      return nextSelection;
    });
  },

  selectDestinationForCompare: (countryCode) => {
    const nextSelection = getNextCompareSelection(
      {
        left: get().left,
        right: get().right,
      },
      countryCode,
    );

    set(nextSelection);

    return nextSelection;
  },

  removeCompareCode: (side) => {
    set(() => ({
      [side]: null,
    }));
  },

  swapCompareSelection: () => {
    set((state) => ({
      left: state.right,
      right: state.left,
    }));
  },

  clearCompareSelection: () => {
    set({
      left: null,
      right: null,
    });
  },
}));