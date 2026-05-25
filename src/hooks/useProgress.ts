import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sabir-mac-progress-v2";

type DoneMap = Record<string, boolean>;

function load(): DoneMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function useProgress() {
  const [done, setDone] = useState<DoneMap>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const toggle = useCallback((id: string) => {
    setDone((d) => ({ ...d, [id]: !d[id] }));
  }, []);

  const reset = useCallback(() => setDone({}), []);

  return { done, toggle, reset };
}
