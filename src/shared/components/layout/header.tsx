import { mainNavigationItems } from "@/shared/constants/navigation";
import { Container } from "@/shared/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between">
        <a
          href="#top"
          className="text-xl font-black tracking-tight text-foreground"
          aria-label="GlobalTrail home"
        >
          GlobalTrail
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {mainNavigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-xs font-semibold uppercase tracking-[0.22em] text-muted-strong transition hover:text-foreground"
            >
              {item.label}
              {item.label === "Home" ? (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-foreground" />
              ) : null}
            </a>
          ))}
        </nav>

        <a
          href="#destinations"
          className="hidden size-10 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition hover:border-border-strong md:grid"
          aria-label="Search destinations"
        >
          <span className="text-lg leading-none">⌕</span>
        </a>

        <a
          href="#destinations"
          className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm md:hidden"
          aria-label="Open navigation"
        >
          <span className="text-lg leading-none">☰</span>
        </a>
      </Container>
    </header>
  );
}