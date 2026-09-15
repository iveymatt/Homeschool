"use client";
import { useEffect, useRef, useState } from "react";

// Persists state to localStorage under `key`, scoped by whatever the caller
// puts in the key (e.g. the date) so state naturally resets on a new day.
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);
  const writeGuard = useRef(false);

  useEffect(() => {
    writeGuard.current = false;
    setLoaded(false);
    try {
      const raw = window.localStorage.getItem(key);
      setValue(raw ? (JSON.parse(raw) as T) : initialValue);
    } catch {
      setValue(initialValue);
    }
    writeGuard.current = true;
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!writeGuard.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage unavailable (private mode, quota, etc.) — state still works in-memory
    }
  }, [key, value]);

  return [value, setValue, loaded];
}
