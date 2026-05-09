import { Container } from "@/shared/components/ui/container";

const footerLinks = ["Explore", "Compare", "Planner", "Favorites"];

const destinationSignals = [
  "Country insights",
  "Weather",
  "Currency",
  "Holidays",
];

export function Footer() {
  return (
    <footer className="bg-surface">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-black tracking-tight text-foreground">
            GlobalTrail
          </p>
          <p className="mt-2 max-w-[150px] text-xs leading-5 text-muted-strong">
            Global travel intelligence
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <p className="travel-label text-muted">Signals</p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-strong">
            {destinationSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-strong"
        >
          {footerLinks.map((link) => (
            <a key={link} href="#top" className="underline-offset-4 hover:underline">
              {link}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}