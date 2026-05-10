export type CountryTravelNote = {
  countryCode: string;
  countryName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type SaveCountryTravelNoteInput = {
  countryCode: string;
  countryName: string;
  content: string;
};

function normalizeCountryCode(value: string) {
  return value.trim().toUpperCase();
}

function normalizeText(value: string) {
  return value.trim();
}

export function createCountryTravelNote(
  input: SaveCountryTravelNoteInput,
): CountryTravelNote | null {
  const countryCode = normalizeCountryCode(input.countryCode);
  const countryName = normalizeText(input.countryName);
  const content = normalizeText(input.content);

  if (!countryCode || !content) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    countryCode,
    countryName: countryName || countryCode,
    content,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateCountryTravelNote(
  note: CountryTravelNote,
  input: SaveCountryTravelNoteInput,
): CountryTravelNote | null {
  const countryCode = normalizeCountryCode(input.countryCode);
  const countryName = normalizeText(input.countryName);
  const content = normalizeText(input.content);

  if (!countryCode || !content) {
    return null;
  }

  return {
    ...note,
    countryCode,
    countryName: countryName || note.countryName || countryCode,
    content,
    updatedAt: new Date().toISOString(),
  };
}