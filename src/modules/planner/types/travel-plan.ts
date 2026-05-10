export type TravelPlanStatus = "idea" | "planning" | "booked" | "completed";

export type TravelPlanDateRange = {
  startDate: string | null;
  endDate: string | null;
};

export type TravelPlanBudget = {
  amount: number | null;
  currencyCode: string | null;
};

export type TravelPlan = {
  id: string;
  title: string;
  destinationCode: string | null;
  destinationName: string | null;
  notes: string;
  status: TravelPlanStatus;
  dateRange: TravelPlanDateRange;
  budget: TravelPlanBudget;
  createdAt: string;
  updatedAt: string;
};

export type CreateTravelPlanInput = {
  title?: string;
  destinationCode?: string | null;
  destinationName?: string | null;
  notes?: string;
  status?: TravelPlanStatus;
  startDate?: string | null;
  endDate?: string | null;
  budgetAmount?: number | null;
  budgetCurrencyCode?: string | null;
};

export type UpdateTravelPlanInput = Partial<CreateTravelPlanInput>;

function createPlanId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `plan-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeText(value?: string | null) {
  return value?.trim() ?? "";
}

function normalizeNullableText(value?: string | null) {
  const normalizedValue = normalizeText(value);

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function normalizeDestinationCode(value?: string | null) {
  const normalizedValue = normalizeText(value).toUpperCase();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function normalizeCurrencyCode(value?: string | null) {
  const normalizedValue = normalizeText(value).toUpperCase();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function normalizeBudgetAmount(value?: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return null;
  }

  return value;
}

function getDefaultTitle(input: CreateTravelPlanInput) {
  const title = normalizeText(input.title);

  if (title.length > 0) {
    return title;
  }

  const destinationName = normalizeText(input.destinationName);

  if (destinationName.length > 0) {
    return `${destinationName} travel idea`;
  }

  const destinationCode = normalizeDestinationCode(input.destinationCode);

  if (destinationCode) {
    return `${destinationCode} travel idea`;
  }

  return "Untitled travel plan";
}

export function createTravelPlan(
  input: CreateTravelPlanInput = {},
): TravelPlan {
  const now = new Date().toISOString();

  return {
    id: createPlanId(),
    title: getDefaultTitle(input),
    destinationCode: normalizeDestinationCode(input.destinationCode),
    destinationName: normalizeNullableText(input.destinationName),
    notes: normalizeText(input.notes),
    status: input.status ?? "idea",
    dateRange: {
      startDate: normalizeNullableText(input.startDate),
      endDate: normalizeNullableText(input.endDate),
    },
    budget: {
      amount: normalizeBudgetAmount(input.budgetAmount),
      currencyCode: normalizeCurrencyCode(input.budgetCurrencyCode),
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTravelPlan(
  plan: TravelPlan,
  input: UpdateTravelPlanInput,
): TravelPlan {
  const destinationCode =
    typeof input.destinationCode === "undefined"
      ? plan.destinationCode
      : normalizeDestinationCode(input.destinationCode);

  const destinationName =
    typeof input.destinationName === "undefined"
      ? plan.destinationName
      : normalizeNullableText(input.destinationName);

  const title =
    typeof input.title === "undefined"
      ? plan.title
      : getDefaultTitle({
          ...input,
          destinationCode,
          destinationName,
        });

  return {
    ...plan,
    title,
    destinationCode,
    destinationName,
    notes:
      typeof input.notes === "undefined"
        ? plan.notes
        : normalizeText(input.notes),
    status: input.status ?? plan.status,
    dateRange: {
      startDate:
        typeof input.startDate === "undefined"
          ? plan.dateRange.startDate
          : normalizeNullableText(input.startDate),
      endDate:
        typeof input.endDate === "undefined"
          ? plan.dateRange.endDate
          : normalizeNullableText(input.endDate),
    },
    budget: {
      amount:
        typeof input.budgetAmount === "undefined"
          ? plan.budget.amount
          : normalizeBudgetAmount(input.budgetAmount),
      currencyCode:
        typeof input.budgetCurrencyCode === "undefined"
          ? plan.budget.currencyCode
          : normalizeCurrencyCode(input.budgetCurrencyCode),
    },
    updatedAt: new Date().toISOString(),
  };
}