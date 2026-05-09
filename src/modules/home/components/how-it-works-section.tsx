import { Container } from "@/shared/components/ui/container";
import { howItWorksSteps } from "@/modules/home/data/home-content";

export function HowItWorksSection() {
  return (
    <section id="compare" className="bg-surface-muted py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="travel-heading text-4xl text-foreground">
            How it works
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-strong">
            GlobalTrail aggregates destination signals to provide accurate,
            real-time travel intelligence without adding complexity to your
            planning flow.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {howItWorksSteps.map((step) => (
            <article key={step.title} className="text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-surface text-xl shadow-sm">
                {step.icon}
              </div>
              <h3 className="mt-6 text-lg font-black text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-muted-strong">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}