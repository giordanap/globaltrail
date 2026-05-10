import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Container } from "@/shared/components/ui/container";
import { Eyebrow } from "@/shared/components/ui/eyebrow";
import { StatCard } from "@/shared/components/ui/stat-card";
import { heroSignals, insightCards } from "@/modules/home/data/home-content";
import { withBasePath } from "@/core/router/base-path";

export function HeroSection() {
  return (
    <section id="top" className="overflow-hidden bg-background">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow className="mb-7">● Live travel insights</Eyebrow>

            <h1 className="travel-heading max-w-[560px] text-[clamp(3.2rem,5.4vw,5.6rem)] leading-[0.92] text-foreground">
              Plan smarter journeys with global travel insights.
            </h1>

            <p className="mt-8 max-w-[520px] text-[1.03rem] leading-8 text-muted-strong">
              Explore countries, weather, currencies and holidays in one
              peaceful travel dashboard designed for modern travelers.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#destinations">Explore countries</ButtonLink>

              <ButtonLink href="#compare" variant="secondary">
                Compare destinations
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroSignals.map((signal) => (
                <Badge key={signal} variant="neutral">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <article className="travel-panel relative w-full max-w-[610px] p-4 sm:p-6">
              <div className="absolute -right-10 -top-10 hidden size-32 rounded-full bg-mist-blue/70 blur-2xl lg:block" />
              <div className="absolute -bottom-8 -left-8 hidden size-28 rounded-full bg-sage/80 blur-2xl lg:block" />

              <div className="relative h-[420px] overflow-hidden rounded-card bg-ink sm:h-[510px] lg:h-[550px]">
                <Image
                  src={withBasePath("/images/globaltrail/hero-globe.webp")}
                  alt="Abstract globe representing global travel insights"
                  fill
                  priority
                  quality={78}
                  sizes="(min-width: 1280px) 610px, (min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />

                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-white/12 p-4 text-white shadow-soft backdrop-blur-md">
                  <p className="travel-label text-white/75">Atlas preview</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-lg font-black leading-none">4</p>
                      <p className="mt-1 text-xs text-white/70">signals</p>
                    </div>
                    <div>
                      <p className="text-lg font-black leading-none">7d</p>
                      <p className="mt-1 text-xs text-white/70">forecast</p>
                    </div>
                    <div>
                      <p className="text-lg font-black leading-none">Local</p>
                      <p className="mt-1 text-xs text-white/70">planning</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="content-auto-sm mt-16 grid gap-6 md:grid-cols-3">
          {insightCards.map((card) => (
            <StatCard
              key={card.value}
              icon={card.icon}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}