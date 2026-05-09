import { Container } from "@/shared/components/ui/container";

const footerLinks = ["API Stack", "Project Notes", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer className="bg-white">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xl font-black tracking-tight text-foreground">
            GlobalTrail
          </p>
          <p className="mt-2 max-w-[140px] text-xs leading-5 text-muted-strong">
            Global travel intelligence
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-muted">
              Powered by
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-strong">
            <span>REST Countries</span>
            <span>Open-Meteo</span>
            <span>Frankfurter</span>
            <span>Nager.Date</span>
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