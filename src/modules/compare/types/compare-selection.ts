export type CompareSide = "left" | "right";

export type CompareSelection = {
  left: string | null;
  right: string | null;
};

export type CompareSelectionInput = Partial<CompareSelection>;

export function normalizeCompareCode(value?: string | null) {
  const normalizedValue = value?.trim().toUpperCase() ?? "";

  return normalizedValue.length > 0 ? normalizedValue : null;
}

export function createCompareSelection(
  input: CompareSelectionInput = {},
): CompareSelection {
  return {
    left: normalizeCompareCode(input.left),
    right: normalizeCompareCode(input.right),
  };
}

export function getOppositeCompareSide(side: CompareSide): CompareSide {
  return side === "left" ? "right" : "left";
}

export function getNextCompareSelection(
  currentSelection: CompareSelection,
  countryCode: string,
): CompareSelection {
  const code = normalizeCompareCode(countryCode);

  if (!code) {
    return currentSelection;
  }

  if (!currentSelection.left) {
    return {
      left: code,
      right: currentSelection.right,
    };
  }

  if (currentSelection.left === code) {
    return {
      left: null,
      right: currentSelection.right,
    };
  }

  if (!currentSelection.right) {
    return {
      left: currentSelection.left,
      right: code,
    };
  }

  if (currentSelection.right === code) {
    return {
      left: currentSelection.left,
      right: null,
    };
  }

  return {
    left: code,
    right: null,
  };
}

export function getCompareSelectionCount(selection: CompareSelection) {
  return [selection.left, selection.right].filter(Boolean).length;
}