'use client';

import { useEffect } from "react";

type ConvertBoxState = {
  boxes: unknown[];
  areasInUse?: unknown[];
};

type ConvertBoxStore = {
  state: ConvertBoxState;
  commit: (mutation: string, payload: unknown) => void;
};

type ConvertBoxRoot = {
  fetchBoxes: () => unknown;
  $store?: ConvertBoxStore;
  $nextTick?: (callback: () => void) => void;
};

type ConvertBoxInlineLoaderProps = {
  targetId: string;
  retryCount?: number;
  retryDelayMs?: number;
};

/**
 * Ensures the ConvertBox inline embed hydrates when navigating via client-side routing.
 * ConvertBox only attaches inline areas that exist during its initial boot.
 * When users hit /free-guide via a Next.js Link, the placeholder is rendered
 * after ConvertBox has already initialised, so the inline never mounts.
 * We poke the ConvertBox Vue app to refetch boxes until the target fills.
 */
export default function ConvertBoxInlineLoader({
  targetId,
  retryCount = 6,
  retryDelayMs = 700,
}: ConvertBoxInlineLoaderProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    if (target.childElementCount > 0) {
      return;
    }

    let attempts = 0;
    let isMounted = false;
    const timeoutIds: number[] = [];

    const observer = new MutationObserver(() => {
      if (target.childElementCount > 0) {
        isMounted = true;
        observer.disconnect();
      }
    });

    observer.observe(target, { childList: true });

    const findConvertBoxRoot = (): ConvertBoxRoot | null => {
      const bodyChildren = Array.from(document.body.children);
      for (const element of bodyChildren) {
        const vueKey = Object.keys(element).find((key) =>
          key.startsWith("__vue__"),
        );
        if (!vueKey) {
          continue;
        }
        const record = element as unknown as Record<string, unknown>;
        const instance = record[vueKey];
        if (
          instance &&
          typeof instance === "object" &&
          "fetchBoxes" in instance &&
          typeof (instance as { fetchBoxes: unknown }).fetchBoxes === "function"
        ) {
          return instance as ConvertBoxRoot;
        }
      }
      return null;
    };

    const resetBoxes = (root: ConvertBoxRoot) => {
      if (!root.$store || typeof root.$store.commit !== "function") {
        return;
      }
      try {
        root.$store.commit("setBoxes", []);
        const { state } = root.$store;
        if (state && typeof state === "object") {
          const typedState = state as ConvertBoxState;
          if (Array.isArray(typedState.areasInUse)) {
            typedState.areasInUse.length = 0;
          }
        }
      } catch {
        // ignore – best effort
      }
    };

    const triggerReload = () => {
      if (isMounted || target.childElementCount > 0) {
        return true;
      }

      const root = findConvertBoxRoot();
      if (!root) {
        return false;
      }

      const runFetch = () => {
        let result: unknown;
        try {
          result = root.fetchBoxes();
        } catch {
          return;
        }
        if (
          result &&
          typeof result === "object" &&
          "then" in result &&
          typeof (result as Promise<unknown>).then === "function"
        ) {
          (result as Promise<unknown>).catch(() => {
            /* swallow */
          });
        }
      };

      try {
        resetBoxes(root);
        if (typeof root.$nextTick === "function") {
          root.$nextTick(runFetch);
        } else {
          runFetch();
        }
      } catch {
        // ignore – retry will handle failures
      }

      return false;
    };

    const schedule = () => {
      if (isMounted) {
        return;
      }
      if (attempts >= retryCount) {
        observer.disconnect();
        return;
      }
      attempts += 1;
      const shouldStop = triggerReload();
      if (shouldStop) {
        observer.disconnect();
        return;
      }
      const timeoutId = window.setTimeout(schedule, retryDelayMs);
      timeoutIds.push(timeoutId);
    };

    // Give ConvertBox a brief window to boot before we retry.
    const initialTimeoutId = window.setTimeout(schedule, retryDelayMs);
    timeoutIds.push(initialTimeoutId);

    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [retryCount, retryDelayMs, targetId]);

  return null;
}
