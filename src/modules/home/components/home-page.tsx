import { FeaturedDestinationsSection } from "@/modules/home/components/featured-destinations-section";
import { HeroSection } from "@/modules/home/components/hero-section";
import { HowItWorksSection } from "@/modules/home/components/how-it-works-section";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedDestinationsSection />
      <HowItWorksSection />
    </main>
  );
}