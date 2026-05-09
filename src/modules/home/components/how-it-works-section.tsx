import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { howItWorksSteps } from "@/modules/home/data/home-content";

export function HowItWorksSection() {
  return (
    <section id="compare" className="bg-surface-muted py-20">
      <Container>
        <SectionHeader
          align="center"
          title="How it works"
          description="GlobalTrail aggregates destination signals to provide accurate, real-time travel intelligence without adding complexity to your planning flow."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <Card key={step.title} className="p-7 text-center shadow-sm">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-surface-soft text-xl">
                {step.icon}
              </div>
              <h3 className="mt-6 text-lg font-black text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-muted-strong">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}