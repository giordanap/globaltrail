"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/core/router/routes";
import { BrandMark } from "@/shared/components/layout/brand-mark";
import { mainNavigationItems } from "@/shared/constants/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { Container } from "@/shared/components/ui/container";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href={routes.home} aria-label="GlobalTrail home">
          <BrandMark />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {mainNavigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== routes.home && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-xs font-extrabold uppercase tracking-[0.22em] text-muted-strong transition hover:text-foreground"
              >
                {item.label}
                {isActive ? (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-foreground" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Badge variant="ocean">Atlas mode</Badge>

          <Link
            href={routes.countries}
            className="inline-flex min-h-10 items-center justify-center rounded-control border border-border bg-surface px-5 text-sm font-extrabold text-foreground shadow-sm transition hover:border-border-strong hover:bg-surface-soft"
          >
            Explore
          </Link>
        </div>

        <Link
          href={routes.countries}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-surface px-4 text-xs font-extrabold uppercase tracking-[0.18em] text-foreground shadow-sm transition hover:border-border-strong md:hidden"
        >
          Explore
        </Link>
      </Container>
    </header>
  );
}