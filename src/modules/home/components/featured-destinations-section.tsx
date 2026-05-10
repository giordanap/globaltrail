import Image from "next/image";
import { Badge } from "@/shared/components/ui/badge";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { featuredDestinations } from "@/modules/home/data/home-content";

export function FeaturedDestinationsSection() {
  return (
    <section id="destinations" className="content-auto bg-background py-16">
      <Container>
        <SectionHeader
          eyebrow="Curated atlas"
          title="Featured Destinations"
          description="A calm selection of destination cards shaped around visual discovery and practical travel signals."
          action={
            <a
              href="#top"
              className="hidden text-sm font-black text-foreground md:inline-flex"
            >
              View all →
            </a>
          }
        />

        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations.map((destination, index) => (
            <article
              key={destination.country}
              className="group relative h-[340px] overflow-hidden rounded-card bg-ink shadow-card md:h-[360px] lg:h-[390px]"
            >
              <Image
                src={destination.image}
                alt={`${destination.country} destination preview`}
                fill
                quality={74}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
                priority={index === 0}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-black/5" />

              <div className="absolute left-5 top-5">
                <Badge
                  variant="neutral"
                  className="border-white/20 bg-white/15 text-white backdrop-blur-md"
                >
                  {destination.signal}
                </Badge>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="travel-label text-white/75">
                  {destination.region}
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                  {destination.country}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/78">
                  {destination.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}