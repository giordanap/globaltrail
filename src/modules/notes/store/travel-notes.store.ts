"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storageKeys } from "@/core/storage/storage-keys";
import {
	createCountryTravelNote,
	updateCountryTravelNote,
	type CountryTravelNote,
	type SaveCountryTravelNoteInput,
} from "@/modules/notes/types";

type TravelNotesState = {
	notes: CountryTravelNote[];
	saveNote: (input: SaveCountryTravelNoteInput) => void;
	removeNote: (countryCode: string) => void;
	clearNotes: () => void;
	getNoteByCountry: (countryCode: string) => CountryTravelNote | undefined;
};

function normalizeCountryCode(countryCode: string) {
	return countryCode.trim().toUpperCase();
}

function sortByUpdatedAt(notes: CountryTravelNote[]) {
	return [...notes].sort((left, right) => {
		const leftTime = new Date(left.updatedAt).getTime();
		const rightTime = new Date(right.updatedAt).getTime();

		return rightTime - leftTime;
	});
}

export const useTravelNotesStore = create<TravelNotesState>()(
	persist(
		(set, get) => ({
			notes: [],

			saveNote: (input) => {
				const normalizedCountryCode = normalizeCountryCode(input.countryCode);

				if (!normalizedCountryCode) {
					return;
				}

				set((state) => {
					const existingNote = state.notes.find(
						(note) => note.countryCode === normalizedCountryCode,
					);

					if (!existingNote) {
						const createdNote = createCountryTravelNote({
							...input,
							countryCode: normalizedCountryCode,
						});

						if (!createdNote) {
							return state;
						}

						return {
							notes: sortByUpdatedAt([createdNote, ...state.notes]),
						};
					}

					const updatedNote = updateCountryTravelNote(existingNote, {
						...input,
						countryCode: normalizedCountryCode,
					});

					if (!updatedNote) {
						return state;
					}

					return {
						notes: sortByUpdatedAt(
							state.notes.map((note) =>
								note.countryCode === normalizedCountryCode ? updatedNote : note,
							),
						),
					};
				});
			},

			removeNote: (countryCode) => {
				const normalizedCountryCode = normalizeCountryCode(countryCode);

				set((state) => ({
					notes: state.notes.filter(
						(note) => note.countryCode !== normalizedCountryCode,
					),
				}));
			},

			clearNotes: () => {
				set({
					notes: [],
				});
			},

			getNoteByCountry: (countryCode) => {
				const normalizedCountryCode = normalizeCountryCode(countryCode);

				if (!normalizedCountryCode) {
					return undefined;
				}

				return get().notes.find(
					(note) => note.countryCode === normalizedCountryCode,
				);
			},
		}),
		{
			name: storageKeys.notes,
			storage: createJSONStorage(() => window.localStorage),
			partialize: (state) => ({
				notes: state.notes,
			}),
		},
	),
);
