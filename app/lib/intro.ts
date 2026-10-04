"use client";
import { useSyncExternalStore } from "react";

// Tiny global store: flips to `true` once the intro loader has finished,
// so entrance animations across the page can start in sync with it.
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach(l => l());
}

export function isIntroDone() {
  return done;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}

// Shared easing curves
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
