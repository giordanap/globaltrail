import { BrandMark } from "@/shared/components/layout/brand-mark";
import {
  mainNavigationItems,
  upcomingNavigationItems,
} from "@/shared/constants/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Container } from "@/shared/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="GlobalTrail home">
          <BrandMark />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {mainNavigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-xs font-extrabold uppercase tracking-[0.22em] text-muted-strong transition hover:text-foreground"
            >
              {item.label}
              {item.isActive ? (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-foreground" />
              ) : null}
            </a>
          ))}

          {upcomingNavigationItems.map((item) => (
            <span
              key={item.label}
              className="cursor-default text-xs font-extrabold uppercase tracking-[0.22em] text-muted/70"
              aria-disabled="true"
              title={item.description}
            >
              {item.label}
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Badge variant="ocean">Atlas mode</Badge>

          <ButtonLink href="#destinations" className="min-w-0 px-5" variant="secondary">
            Explore
          </ButtonLink>
        </div>

        <a
          href="#destinations"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-surface px-4 text-xs font-extrabold uppercase tracking-[0.18em] text-foreground shadow-sm transition hover:border-border-strong md:hidden"
        >
          Explore
        </a>
      </Container>
    </header>
  );
}