const navigationItems = ["Home", "Explore", "Compare", "Planner", "Favorites"];

const insightCards = [
  {
    value: "250+",
    label: "Countries",
    description: "Country profiles prepared for discovery.",
  },
  {
    value: "7-day",
    label: "Weather",
    description: "Climate context for destination planning.",
  },
  {
    value: "Local",
    label: "Holidays",
    description: "Cultural dates that shape each journey.",
  },
];

const featuredDestinations = [
  {
    country: "Spain",
    region: "Europe",
    description: "Historic cities, coastal routes and cultural depth.",
    tone: "from-amber-200 via-orange-100 to-sky-100",
  },
  {
    country: "Japan",
    region: "Asia",
    description: "Ancient rituals, modern cities and seasonal landscapes.",
    tone: "from-rose-100 via-sky-100 to-slate-100",
  },
  {
    country: "Peru",
    region: "South America",
    description: "Highland trails, heritage sites and bold geography.",
    tone: "from-emerald-100 via-lime-100 to-stone-100",
  },
  {
    country: "Iceland",
    region: "Europe",
    description: "Northern roads, dramatic coastlines and quiet escapes.",
    tone: "from-slate-100 via-cyan-100 to-blue-100",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Explore destinations",
    description: "Search countries and review key context before planning.",
  },
  {
    step: "02",
    title: "Compare insights",
    description: "Place destinations side by side to understand tradeoffs.",
  },
  {
    step: "03",
    title: "Shape your plan",
    description: "Save notes, destinations and travel ideas in one place.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="border-b border-border/80 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#top" className="text-2xl font-black tracking-tight text-deep-ocean">
            GlobalTrail
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {navigationItems.map((item) => (
              <a
                key={item}
                href={
                  item === "Home"
                    ? "#top"
                    : item === "Explore"
                      ? "#destinations"
                      : item === "Compare"
                        ? "#compare"
                        : item === "Planner"
                          ? "#planner"
                          : "#saved"
                }
                className="text-xs font-bold uppercase tracking-[0.22em] text-muted-strong transition hover:text-deep-ocean"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#destinations"
            className="rounded-full bg-deep-ocean px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-deep-ocean-strong"
          >
            Start exploring
          </a>
        </div>
      </header>

      <section id="top" className="relative">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-5 w-fit rounded-full bg-sage px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-sage-strong">
              Travel intelligence
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Plan smarter journeys with global travel insights.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-strong">
              Explore destinations through country context, weather signals,
              currency awareness and cultural dates in a calm planning
              experience.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#destinations"
                className="rounded-full bg-deep-ocean px-7 py-4 text-center text-sm font-black text-white shadow-card transition hover:bg-deep-ocean-strong"
              >
                Explore countries
              </a>
              <a
                href="#compare"
                className="rounded-full border border-border bg-white px-7 py-4 text-center text-sm font-black text-foreground shadow-sm transition hover:border-deep-ocean/30 hover:text-deep-ocean"
              >
                Compare destinations
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {insightCards.map((card) => (
                <article
                  key={card.label}
                  className="rounded-[1.25rem] border border-border bg-white/78 p-5 shadow-sm backdrop-blur"
                >
                  <p className="text-2xl font-black text-deep-ocean">
                    {card.value}
                  </p>
                  <h2 className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-foreground">
                    {card.label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-mist-blue via-sage to-sand opacity-75 blur-3xl" />

            <article className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-deep-ocean via-slate-700 to-sage-strong p-8 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/14 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
                    Live preview
                  </span>
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-deep-ocean">
                    Madrid
                  </span>
                </div>

                <div className="mt-20">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                    Country insight
                  </p>
                  <h2 className="mt-3 max-w-md text-4xl font-black leading-tight">
                    Spain travel overview
                  </h2>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                      Weather
                    </p>
                    <p className="mt-2 text-2xl font-black">24°C</p>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                      Currency
                    </p>
                    <p className="mt-2 text-2xl font-black">EUR</p>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                      Holidays
                    </p>
                    <p className="mt-2 text-2xl font-black">12</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="destinations" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-sage-strong">
              Featured destinations
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground">
              Start with places worth exploring.
            </h2>
          </div>
          <a
            href="#planner"
            className="text-sm font-black uppercase tracking-[0.16em] text-deep-ocean"
          >
            View planning flow
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredDestinations.map((destination) => (
            <article
              key={destination.country}
              className="group overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div
                className={`h-48 bg-gradient-to-br ${destination.tone} p-5`}
              >
                <span className="rounded-full bg-white/82 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-deep-ocean shadow-sm">
                  {destination.region}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black tracking-tight">
                  {destination.country}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-strong">
                  {destination.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-muted">
                    Country insights
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-surface-soft text-deep-ocean transition group-hover:bg-deep-ocean group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="compare"
        className="border-y border-border/80 bg-white/56 py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-sage-strong">
                Compare
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground">
                Place destinations side by side.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-strong">
                Review population, region, currency, weather and holiday
                context before deciding where a journey should begin.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {["Spain", "Japan"].map((country) => (
                <article
                  key={country}
                  className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">
                    Destination
                  </p>
                  <h3 className="mt-3 text-3xl font-black">{country}</h3>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Weather</dt>
                      <dd className="font-bold text-foreground">Mild</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Currency</dt>
                      <dd className="font-bold text-foreground">
                        {country === "Spain" ? "EUR" : "JPY"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Planning note</dt>
                      <dd className="font-bold text-sage-strong">Ready</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="planner" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-white p-8 shadow-soft sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-sage-strong">
                Planner
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">
                Keep travel ideas organized.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-strong">
                Build a calm planning space for saved destinations, notes,
                budgets and travel dates.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-surface-soft p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-muted">
                  Travel plan
                </span>
                <span className="rounded-full bg-sage px-3 py-1 text-xs font-black text-sage-strong">
                  Draft
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black">Mediterranean route</h3>
              <p className="mt-3 text-sm leading-6 text-muted-strong">
                A simple preview of the planning experience that will evolve in
                later commits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="saved" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {workflowSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-[1.5rem] border border-border bg-white p-6 shadow-sm"
            >
              <span className="text-xs font-black uppercase tracking-[0.2em] text-deep-ocean">
                {item.step}
              </span>
              <h3 className="mt-4 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-strong">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/80 bg-white/72">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-muted-strong sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-black text-deep-ocean">GlobalTrail</p>
          <p>Travel intelligence for thoughtful destination planning.</p>
        </div>
      </footer>
    </main>
  );
}