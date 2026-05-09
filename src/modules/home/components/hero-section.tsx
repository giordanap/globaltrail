import Image from "next/image";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Container } from "@/shared/components/ui/container";
import { Eyebrow } from "@/shared/components/ui/eyebrow";
import { insightCards } from "@/modules/home/data/home-content";
import { withBasePath } from "@/core/router/base-path";

export function HeroSection() {
  return (
    <section id="top" className="bg-background">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Eyebrow className="mb-7">● Live travel insights</Eyebrow>

            <h1 className="travel-heading max-w-[560px] text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] text-foreground">
              Plan smarter journeys with global travel insights.
            </h1>

            <p className="mt-8 max-w-[510px] text-[1.02rem] leading-8 text-muted-strong">
              Explore countries, weather, currencies and holidays in one
              peaceful travel dashboard. Powered by real-time data for modern
              travelers.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#destinations">Explore countries</ButtonLink>

              <ButtonLink href="#compare" variant="secondary">
                Compare destinations
              </ButtonLink>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <article className="travel-panel w-full max-w-[590px] p-6">
              <div className="relative h-[470px] overflow-hidden rounded-card bg-ink sm:h-[510px] lg:h-[550px]">
                <Image
                  src={withBasePath("/images/globaltrail/hero-globe.webp")}
                  alt="Abstract globe representing global travel insights"
                  fill
                  priority
                  sizes="(min-width: 1024px) 590px, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {insightCards.map((card) => (
            <article key={card.value} className="travel-card p-7">
              <div className="grid size-10 place-items-center rounded-xl bg-surface-soft text-sm text-foreground">
                {card.icon}
              </div>

              <h2 className="mt-5 text-[2rem] font-black leading-none tracking-[-0.05em] text-foreground">
                {card.value}
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-strong">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}