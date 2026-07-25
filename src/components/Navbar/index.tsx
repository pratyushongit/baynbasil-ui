"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { useCart } from "@/components/cart/CartProvider";
import { useScrollLock } from "@/lib/useScrollLock";

const GLOOCK = "var(--font-gloock), serif";

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menu, setMenu] = useState(false);

  useScrollLock(menu);

  const closeMenu = () => setMenu(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "18px clamp(20px,4vw,44px)",
          background: "color-mix(in srgb, var(--bg) 72%, transparent)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(246,237,221,.08)",
        }}
      >
        <Link
          href="/"
          aria-label={`${site.brand} — home`}
          style={{
            fontFamily: "var(--font-frunchy), Georgia, serif",
            // Responsive: larger on wider screens, safe on mobile.
            fontSize: "clamp(32px, 3.2vw, 46px)",
            letterSpacing: ".01em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {site.brand.split(/(B)/).map((part, i) =>
            part === "B" ? (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-tan-pearl), Georgia, serif",
                  fontSize: "0.65em",
                  display: "inline-block",
                  transform: "translateY(0.14em)",
                }}
              >
                B
              </span>
            ) : (
              <span
                key={i}
                style={{ display: "inline-block", transform: "translateY(0.06em)", whiteSpace: "pre" }}
              >
                {part}
              </span>
            ),
          )}
        </Link>

        <div
          data-navlinks
          style={{
            display: "flex",
            gap: 34,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "var(--mut)",
          }}
        >
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={openCart}
            style={{
              fontFamily: "var(--font-albert), sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              background: "var(--accent)",
              color: "var(--accentInk)",
              border: "none",
              borderRadius: 999,
              padding: "11px 22px",
              cursor: "pointer",
            }}
          >
            Cart &middot; {count}
          </button>

          <button
            data-burger
            onClick={() => setMenu((m) => !m)}
            aria-label="Menu"
            style={{
              width: 44,
              height: 44,
              background: "transparent",
              border: "none",
              color: "var(--cream)",
              cursor: "pointer",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <span style={burgerBar} />
            <span style={burgerBar} />
            <span style={burgerBar} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        aria-label="Mobile menu"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 70,
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
          padding: "0 36px",
          transition: "opacity .3s ease",
          opacity: menu ? 1 : 0,
          pointerEvents: menu ? "auto" : "none",
        }}
      >
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "transparent",
            border: "1px solid rgba(246,237,221,.3)",
            color: "var(--cream)",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          &#10005;
        </button>

        {site.nav.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={closeMenu}
            style={{ fontFamily: GLOOCK, fontSize: 42, color: "var(--cream)" }}
          >
            {l.label}
          </Link>
        ))}

        <Link
          href="/products"
          onClick={closeMenu}
          style={{
            marginTop: 22,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Browse all spices &#8594;
        </Link>
      </div>
    </>
  );
}

const burgerBar: React.CSSProperties = {
  width: 18,
  height: 2,
  background: "currentColor",
  display: "block",
};
