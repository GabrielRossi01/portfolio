import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false no servidor e durante a hidratação; true depois. Útil para adiar
 * recursos que não precisam estar no HTML inicial (imagens abaixo da dobra),
 * sem divergência de hidratação.
 */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
