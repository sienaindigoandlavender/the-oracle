"use client";

import { useState, useCallback } from "react";

interface OracleState {
  loading: boolean;
  error: string | null;
  result: string | null;
}

export function useOracle() {
  const [state, setState] = useState<OracleState>({ loading: false, error: null, result: null });

  const ask = useCallback(async (body: Record<string, unknown>): Promise<string | null> => {
    setState({ loading: true, error: null, result: null });
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      const data = await res.json();
      const result = typeof data.result === "string" ? data.result : JSON.stringify(data.result);
      setState({ loading: false, error: null, result });
      return result;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setState({ loading: false, error: msg, result: null });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, result: null });
  }, []);

  return { ...state, ask, reset };
}

// Structured ouija response
export function useOuijaOracle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (question: string): Promise<{ answer: "YES" | "NO" | "UNCERTAIN"; whisper: string } | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "ouija", question }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Spirits are silent");
      }

      const data = await res.json();
      setLoading(false);

      // result could be a string (JSON) or already parsed
      if (typeof data.result === "string") {
        try { return JSON.parse(data.result); } catch { return data.result; }
      }
      return data.result;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setLoading(false);
      return null;
    }
  }, []);

  return { loading, error, ask };
}
