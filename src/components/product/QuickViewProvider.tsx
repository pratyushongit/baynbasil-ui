"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/content/products";
import { useScrollLock } from "@/lib/useScrollLock";

/**
 * Global quick-view state. Any surface (product grid, landing carousel …)
 * can call `open(product)` to slide in the shared detail drawer, mirroring
 * how the cart is wired. The drawer itself is <QuickViewDrawer />, mounted
 * once in the root layout.
 */
interface QuickViewCtx {
  sel: Product | null;
  open: (p: Product) => void;
  close: () => void;
}

const Ctx = createContext<QuickViewCtx | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [sel, setSel] = useState<Product | null>(null);
  const open = useCallback((p: Product) => setSel(p), []);
  const close = useCallback(() => setSel(null), []);

  // Freeze the page behind the drawer; only the drawer scrolls.
  useScrollLock(!!sel);

  // Escape closes the drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ sel, open, close }), [sel, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuickView() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuickView must be used within QuickViewProvider");
  return ctx;
}
