import { Suspense } from "react";
import { PlannerPage } from "@/modules/planner/components/planner-page";

function PlannerPageFallback() {
  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-card border border-border bg-surface p-8 shadow-panel">
            <p className="travel-label text-muted">Travel planner</p>
            <div className="mt-5 h-12 max-w-xl rounded-2xl bg-surface-soft" />
            <div className="mt-4 h-5 max-w-2xl rounded-full bg-surface-soft" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="h-36 rounded-card bg-surface-soft" />
              <div className="h-36 rounded-card bg-surface-soft" />
              <div className="h-36 rounded-card bg-surface-soft" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PlannerPageFallback />}>
      <PlannerPage />
    </Suspense>
  );
}