import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useLocalityFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const locality = useMemo(() => searchParams.get("locality") ?? "", [searchParams]);

  const setLocality = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set("locality", value);
        } else {
          next.delete("locality");
        }
        return next;
      }, { replace: true });
    },
    [setSearchParams]
  );

  const clearLocality = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("locality");
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  return { locality, setLocality, clearLocality };
}
