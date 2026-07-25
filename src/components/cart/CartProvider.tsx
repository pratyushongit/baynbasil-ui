"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { site } from "@/content/site";

const STORAGE_KEY = "bnb-cart-v1";

export interface CartItem {
  key: string;
  slug: string;
  name: string;
  size: string;
  unit: number;
  qty: number;
}

export interface AddPayload {
  slug: string;
  name: string;
  size: string;
  unit: number;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  pincode: string;
  state: string;
}

type CartView = "cart" | "checkout";
interface Toast {
  msg: string;
  ok: boolean;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  view: CartView;
  toast: Toast | null;
  add: (p: AddPayload) => void;
  setQty: (key: string, qty: number) => void;
  openCart: () => void;
  close: () => void;
  toCheckout: () => void;
  backToCart: () => void;
  placeOrder: (form: CheckoutForm) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Start empty on server + first client render, then hydrate from
  // localStorage in an effect — avoids a hydration mismatch on the count.
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<CartView>("cart");
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const showToast = useCallback((msg: string, ok: boolean) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, ok });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const add = useCallback(
    (p: AddPayload) => {
      setItems((prev) => {
        const key = `${p.slug}|${p.size}`;
        const existing = prev.find((i) => i.key === key);
        const next = existing
          ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { key, slug: p.slug, name: p.name, size: p.size, unit: p.unit, qty: 1 }];
        persist(next);
        return next;
      });
      showToast(`${p.name} (${p.size}) added to cart`, true);
    },
    [persist, showToast],
  );

  const setQty = useCallback(
    (key: string, qty: number) => {
      setItems((prev) => {
        const next = prev
          .map((i) => (i.key === key ? { ...i, qty } : i))
          .filter((i) => i.qty > 0);
        persist(next);
        if (!next.length) setView("cart");
        return next;
      });
    },
    [persist],
  );

  const openCart = useCallback(() => {
    setView("cart");
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const toCheckout = useCallback(() => setView("checkout"), []);
  const backToCart = useCallback(() => setView("cart"), []);

  const placeOrder = useCallback(
    (form: CheckoutForm) => {
      const digits = form.phone.replace(/\D/g, "");
      if (form.name.trim().length < 2) return showToast("Please enter your full name", false);
      if (digits.length < 10)
        return showToast("Please enter a valid 10-digit phone number", false);
      if (form.address.trim().length < 8)
        return showToast("Please enter your complete address", false);
      if (!/^\d{6}$/.test(form.pincode.trim()))
        return showToast("Please enter a valid 6-digit pincode", false);
      if (form.state.trim().length < 2) return showToast("Please enter your state", false);

      const subtotal = items.reduce((a, i) => a + i.unit * i.qty, 0);
      const lines = items.map(
        (it, i) => `${i + 1}. ${it.name} (${it.size}) x ${it.qty} — ₹${it.unit * it.qty}`,
      );
      const msg =
        `*Bay’n Basil — New Order*\n\n` +
        lines.join("\n") +
        `\n\n*Total: ₹${subtotal}*\n\n*Deliver to*\n` +
        `Name: ${form.name.trim()}\n` +
        `Phone: ${form.phone.trim()}\n` +
        `Address: ${form.address.trim()}\n` +
        `Landmark: ${form.landmark.trim() || "—"}\n` +
        `Pincode: ${form.pincode.trim()}\n` +
        `State: ${form.state.trim()}`;
      const num = site.whatsappNumber.replace(/\D/g, "");
      if (!num) {
        return showToast(
          "Ordering isn’t available right now — please try again later",
          false,
        );
      }
      const w = window.open(
        `https://wa.me/${num}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
      if (w) {
        setItems([]);
        persist([]);
        setView("cart");
        setOpen(false);
        showToast(
          "Order sent to WhatsApp — hit send; we’ll reply with payment details to confirm",
          true,
        );
      } else {
        showToast("Couldn’t open WhatsApp — please allow pop-ups and try again", false);
      }
    },
    [items, persist, showToast],
  );

  // Escape closes the drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const count = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, i) => a + i.unit * i.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    open,
    view,
    toast,
    add,
    setQty,
    openCart,
    close,
    toCheckout,
    backToCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
