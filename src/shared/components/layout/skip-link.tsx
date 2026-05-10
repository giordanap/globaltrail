export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:justify-center focus:rounded-control focus:bg-ink focus:px-5 focus:text-sm focus:font-extrabold focus:text-white focus:shadow-card"
    >
      Skip to main content
    </a>
  );
}