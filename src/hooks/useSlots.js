import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "slotsLeft";

function readStoredSlots(defaultValue) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const numeric = Number(raw);
  if (Number.isFinite(numeric) && numeric >= 0) {
    return numeric;
  }

  return defaultValue;
}

function persistSlots(value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, String(value));
}

export default function useSlots(defaultValue = 15) {
  const initial = useMemo(() => readStoredSlots(defaultValue), [defaultValue]);
  const [slotsLeft, setSlotsLeft] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const timeoutMs = 4500;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    async function fetchSlots() {
      try {
        const response = await fetch("/api/slots", { signal: controller.signal });
        const contentType = response.headers.get("content-type") || "";
        const raw = await response.text();

        let body = null;
        try {
          body = raw ? JSON.parse(raw) : {};
        } catch {
          body = null;
        }

        if (!mounted) {
          return;
        }

        if (!response.ok) {
          throw new Error((body && body.error) || "Failed to load slots");
        }

        if (!contentType.includes("application/json") || !body) {
          throw new Error("Slots API returned an invalid response");
        }

        if (typeof body.slots_left !== "number") {
          throw new Error("Slots API payload missing slots_left");
        }

        setSlotsLeft(body.slots_left);
        persistSlots(body.slots_left);
      } catch (err) {
        if (mounted) {
          const message =
            err?.name === "AbortError"
              ? "Live slot count timed out. Showing last known value."
              : "Live slot count unavailable. Showing last known value.";
          setErrorMessage(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchSlots();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return { slotsLeft, loading, errorMessage };
}
