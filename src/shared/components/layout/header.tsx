"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/core/router/routes";
import { BrandMark } from "@/shared/components/layout/brand-mark";
import { mainNavigationItems } from "@/shared/constants/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { Container } from "@/shared/components/ui/container";
import { cn } from "@/shared/utils/cn";

function isRouteActive(pathname: string, href: string) {
  return pathname === href || (href !== routes.home && pathname.startsWith(href));
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href={routes.home}
            aria-label="GlobalTrail home"
            className="shrink-0"
          >
            <BrandMark />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {mainNavigationItems.map((item) => {
              const isActive = isRouteActive(pathname, item.href);

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
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface px-4 text-xs font-extrabold uppercase tracking-[0.16em] text-foreground shadow-sm transition hover:border-border-strong md:hidden"
          >
            Explore
          </Link>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="-mx-4 flex gap-2 overflow-x-auto border-t border-border px-4 py-3 md:-mx-6 md:px-6 lg:hidden"
        >
          {mainNavigationItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "inline-flex min-h-9 shrink-0 items-center justify-center rounded-full border px-4 text-[0.68rem] font-black uppercase tracking-[0.16em] transition",
                  isActive
                    ? "border-deep-ocean/20 bg-mist-blue text-deep-ocean"
                    : "border-border bg-surface text-muted-strong hover:border-border-strong hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}