import { useCallback, useSyncExternalStore } from "react";

// No servidor (e na hidratação) devolve false; depois assume o valor real,
// sem diferença entre o HTML do servidor e o primeiro render do cliente.
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
