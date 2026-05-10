"use client";

import type { FormEvent } from "react";
import { useTravelNotesStore } from "@/modules/notes/store";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type TravelNotesPanelProps = {
  countryCode: string;
  countryName: string;
};

const updatedAtFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function normalizeCountryCode(countryCode: string) {
  return countryCode.trim().toUpperCase();
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Saved recently";
  }

  return `Updated ${updatedAtFormatter.format(date)}`;
}

export function TravelNotesPanel({
  countryCode,
  countryName,
}: TravelNotesPanelProps) {
  const normalizedCountryCode = normalizeCountryCode(countryCode);
  const note = useTravelNotesStore((state) =>
    state.getNoteByCountry(normalizedCountryCode),
  );
  const saveNote = useTravelNotesStore((state) => state.saveNote);
  const removeNote = useTravelNotesStore((state) => state.removeNote);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const content = String(formData.get("content") ?? "");

    saveNote({
      countryCode: normalizedCountryCode,
      countryName,
      content,
    });
  }

  function handleRemoveNote() {
    removeNote(normalizedCountryCode);
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border bg-surface-warm p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant={note ? "sage" : "sand"}>
              {note ? "Saved note" : "Travel note"}
            </Badge>

            <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
              Keep private context for {countryName}.
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-strong">
              Capture reminders, ideas, timing details or local considerations
              you want to keep close while reviewing this destination.
            </p>
          </div>

          {note ? (
            <p className="rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-muted-strong">
              {formatUpdatedAt(note.updatedAt)}
            </p>
          ) : null}
        </div>
      </div>

      <form
        key={`${normalizedCountryCode}-${note?.updatedAt ?? "empty"}`}
        onSubmit={handleSubmit}
        className="p-6"
      >
        <label className="block">
          <span className="mb-2 block text-sm font-extrabold text-foreground">
            Destination note
          </span>

          <textarea
            name="content"
            defaultValue={note?.content ?? ""}
            placeholder="Write personal reminders, areas to research, local timing notes or reasons this country is interesting..."
            className="min-h-40 w-full rounded-control border border-border bg-surface px-4 py-3 text-sm leading-7 text-foreground shadow-sm transition placeholder:text-muted focus:border-deep-ocean focus:outline-none focus:ring-4 focus:ring-deep-ocean/10"
          />
        </label>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit">{note ? "Update note" : "Save note"}</Button>

          {note ? (
            <Button type="button" variant="secondary" onClick={handleRemoveNote}>
              Remove note
            </Button>
          ) : null}
        </div>

        {note ? (
          <div className="mt-5 rounded-2xl border border-border bg-surface-soft p-4">
            <p className="travel-label text-muted">Saved preview</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-strong">
              {note.content}
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-border bg-surface-soft p-4">
            <p className="travel-label text-muted">Empty note</p>
            <p className="mt-3 text-sm leading-7 text-muted-strong">
              Nothing saved for this destination yet. Add a short note when you
              want to remember why this country matters for a future plan.
            </p>
          </div>
        )}
      </form>
    </Card>
  );
}