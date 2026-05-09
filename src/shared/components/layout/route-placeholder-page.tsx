import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { cn } from "@/shared/utils/cn";

type PlaceholderAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type RoutePlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  highlights: string[];
  panelTitle: string;
  panelDescription: string;
  primaryAction?: PlaceholderAction;
  secondaryAction?: PlaceholderAction;
  icon?: ReactNode;
};

export function RoutePlaceholderPage({
  eyebrow,
  title,
  description,
  badge,
  highlights,
  panelTitle,
  panelDescription,
  primaryAction,
  secondaryAction,
  icon = "◍",
}: RoutePlaceholderPageProps) {
  const actions = [primaryAction, secondaryAction].filter(Boolean);

  return (
    <main className="bg-background">
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <Badge variant="ocean">{badge}</Badge>

              <p className="travel-label mt-8 text-muted">{eyebrow}</p>

              <h1 className="travel-heading mt-4 max-w-3xl text-[clamp(3rem,5vw,5rem)] leading-[0.95] text-foreground">
                {title}
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-strong">
                {description}
              </p>

              {actions.length > 0 ? (
                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  {actions.map((action) =>
                    action ? (
                      <Link
                        key={action.label}
                        href={action.href}
                        className={cn(
                          "inline-flex min-h-12 min-w-44 items-center justify-center rounded-control px-6 text-sm font-extrabold transition",
                          "focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-deep-ocean/20",
                          action.variant === "secondary"
                            ? "border border-border bg-surface text-foreground shadow-sm hover:border-border-strong hover:bg-surface-soft"
                            : "bg-ink !text-white shadow-sm hover:bg-ink-soft",
                        )}
                      >
                        <span
                          className={cn(
                            "leading-none",
                            action.variant === "secondary"
                              ? "text-current"
                              : "!text-white",
                          )}
                        >
                          {action.label}
                        </span>
                      </Link>
                    ) : null,
                  )}
                </div>
              ) : null}
            </div>

            <Card className="relative overflow-hidden p-8">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-mist-blue/70 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 size-28 rounded-full bg-sage/70 blur-2xl" />

              <div className="relative">
                <div className="grid size-14 place-items-center rounded-2xl bg-surface-soft text-2xl text-foreground">
                  {icon}
                </div>

                <h2 className="mt-7 text-2xl font-black tracking-[-0.04em] text-foreground">
                  {panelTitle}
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-strong">
                  {panelDescription}
                </p>

                <div className="mt-8 grid gap-3">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-border bg-surface/80 px-4 py-3 text-sm font-semibold text-muted-strong"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}