"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}