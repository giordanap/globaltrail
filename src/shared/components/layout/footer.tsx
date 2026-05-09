import Link from "next/link";
import { BrandMark } from "@/shared/components/layout/brand-mark";
import { footerNavigationGroups } from "@/shared/constants/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { Container } from "@/shared/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr] lg:items-start">
          <div>
            <BrandMark />

            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-strong">
              Calm destination intelligence for exploring countries, comparing
              travel signals and planning more confident journeys.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="sage">Country insights</Badge>
              <Badge variant="sand">Travel planning</Badge>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNavigationGroups.map((group) => (
              <div key={group.title}>
                <h2 className="travel-label text-muted">{group.title}</h2>

                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-muted-strong underline-offset-4 transition hover:text-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-strong md:flex-row md:items-center md:justify-between">
          <p>© 2026 GlobalTrail. Built for smarter travel decisions.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Explore</span>
            <span>Compare</span>
            <span>Planner</span>
            <span>Favorites</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}