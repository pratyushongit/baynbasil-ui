"use client";

import { useEffect } from "react";

/**
 * Lock background scroll while any overlay (cart, quick-view, mobile menu) is
 * open. A shared counter composes multiple locks: the body only unlocks once
 * every open overlay has released, so closing one drawer never re-enables page
 * scroll while another is still open.
 *
 * Each open overlay keeps its own inner scroll (its content uses overflow-y),
 * so only the drawer scrolls — the page behind it stays put.
 */
let locks = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    document.body.style.overflow = "hidden";
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) document.body.style.overflow = "";
    };
  }, [active]);
}
