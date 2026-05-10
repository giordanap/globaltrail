import type { ReactNode } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";

type ClientStateFallbackProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

type ClientStatePanelFallbackProps = ClientStateFallbackProps;

export function ClientStateFallback({
  eyebrow,
  title,
  description,
  icon = "◇",
}: ClientStateFallbackProps) {
  return (
    <main className="bg-background">
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,242,0.7),_transparent_30rem),radial-gradient(circle_at_top_right,_rgba(239,227,207,0.48),_transparent_28rem)]" />

        <Container className="relative">
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[26rem] overflow-hidden bg-ink p-8 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(223,238,230,0.5),_transparent_20rem),radial-gradient(circle_at_bottom_right,_rgba(217,154,61,0.22),_transparent_18rem),linear-gradient(135deg,_rgba(11,18,32,0.98),_rgba(11,79,117,0.72))]" />

              <div className="relative flex min-h-[20rem] flex-col justify-end">
                <Badge
                  variant="neutral"
                  className="w-fit border-white/20 bg-white/15 text-white backdrop-blur-md"
                >
                  {eyebrow}
                </Badge>

                <div className="mt-8 grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/15 text-3xl shadow-soft backdrop-blur-md">
                  {icon}
                </div>

                <h1 className="travel-heading mt-6 max-w-2xl text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] text-white">
                  {title}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-8 text-white/76">
                  {description}
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}

export function ClientStatePanelFallback({
  eyebrow,
  title,
  description,
  icon = "◇",
}: ClientStatePanelFallbackProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border bg-surface-warm p-6">
        <Badge variant="sand">{eyebrow}</Badge>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-foreground">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-muted-strong">
          {description}
        </p>
      </div>

      <div className="p-6">
        <div className="grid size-14 place-items-center rounded-2xl bg-surface-soft text-2xl text-muted-strong">
          {icon}
        </div>

        <div className="mt-5 grid gap-3">
          <div className="h-4 max-w-sm rounded-full bg-surface-soft" />
          <div className="h-4 max-w-md rounded-full bg-surface-soft" />
          <div className="h-24 rounded-2xl bg-surface-soft" />
        </div>
      </div>
    </Card>
  );
}