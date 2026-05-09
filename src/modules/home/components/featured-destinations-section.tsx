import Image from "next/image";
import { Container } from "@/shared/components/ui/container";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { featuredDestinations } from "@/modules/home/data/home-content";

export function FeaturedDestinationsSection() {
  return (
    <section id="destinations" className="bg-background py-16">
      <Container>
        <SectionHeader
          title="Featured Destinations"
          description="Our curated selection of sought-after travel insights for the current season."
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
          {featuredDestinations.map((destination) => (
            <article
              key={destination.country}
              className="group relative h-[310px] overflow-hidden rounded-card bg-ink shadow-sm md:h-[330px] lg:h-[350px]"
            >
              <Image
                src={destination.image}
                alt={`${destination.country} destination preview`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="travel-label text-white/78">
                  {destination.region}
                </p>
                <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                  {destination.country}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}