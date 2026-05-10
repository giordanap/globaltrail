import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { howItWorksSteps } from "@/modules/home/data/home-content";

export function HowItWorksSection() {
  return (
    <section id="compare" className="content-auto bg-surface-muted py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Travel flow"
          title="How it works"
          description="GlobalTrail turns scattered destination signals into a simple flow for discovery, comparison and planning."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <Card
              key={step.title}
              className="relative overflow-hidden border border-white/70 p-8 text-center shadow-sm"
            >
              <div
                aria-hidden="true"
                className="absolute right-5 top-5 text-5xl font-black leading-none text-surface-muted"
              >
                0{index + 1}
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="mx-auto grid size-14 place-items-center rounded-2xl bg-surface-soft text-xl"
                >
                  {step.icon}
                </div>

                <h3 className="mt-6 text-lg font-black text-foreground">
                  {step.title}
                </h3>

                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-muted-strong">
                  {step.description}
                </p>

                <div className="mt-6 flex justify-center">
                  <Badge
                    variant={
                      index === 0 ? "ocean" : index === 1 ? "sage" : "sand"
                    }
                  >
                    Step {index + 1}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}