import type { ReactNode } from "react";
import { Footer } from "@/shared/components/layout/footer";
import { Header } from "@/shared/components/layout/header";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}