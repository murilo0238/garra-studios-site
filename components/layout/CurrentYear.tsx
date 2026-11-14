"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Ano do copyright: vem do build no HTML estático e é atualizado no navegador. */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <>{year}</>;
}
