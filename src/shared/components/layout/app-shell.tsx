import type { ReactNode } from "react";
import { Footer } from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";
import { SkipLink } from "@/shared/components/layout/skip-link";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />

      <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>

      <Footer />
    </div>
  );
}