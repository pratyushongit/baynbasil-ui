"use client";

import { useEffect, useState } from "react";
import ImageSlot from "@/components/ImageSlot";
import { useCart } from "@/components/cart/CartProvider";
import { useQuickView } from "./QuickViewProvider";
import { sizeOptions, defaultSizeIndex } from "@/content/products";
import { formatPrice } from "@/lib/format";

const GLOOCK = "var(--font-gloock), serif";

/**
 * Shared product detail sidebar. Mounted once globally; slides in whenever
 * `useQuickView().open(product)` is called from anywhere (grid, carousel).
 */
export default function QuickViewDrawer() {
  const { sel, close } = useQuickView();
  const { add } = useCart();
  const [size, setSize] = useState(defaultSizeIndex);

  // Reset the chosen size each time a new product is opened.
  useEffect(() => {
    if (sel) setSize(defaultSizeIndex);
  }, [sel]);

  return (
    <>
      {/* Overlay (z-80) */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          background: "rgba(10,4,1,.6)",
          backdropFilter: "blur(3px)",
          transition: "opacity .35s ease",
          opacity: sel ? 1 : 0,
          pointerEvents: sel ? "auto" : "none",
        }}
      />

      {/* Drawer (z-90) — sits below the cart drawer (z-110) */}
      <aside
        aria-label="Quick view"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 90,
          width: "min(460px,94vw)",
          background: "var(--panel2)",
          boxShadow: "-30px 0 80px rgba(0,0,0,.5)",
          transition: "transform .45s cubic-bezier(.32,.72,.24,1)",
          transform: `translateX(${sel ? "0%" : "105%"})`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {sel && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 26px",
                borderBottom: "1px solid rgba(246,237,221,.1)",
                position: "sticky",
                top: 0,
                background: "var(--panel2)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {sel.category}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="hov-ghost"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "transparent",
                  border: "1px solid rgba(246,237,221,.3)",
                  color: "var(--cream)",
                  fontSize: 17,
                  cursor: "pointer",
                }}
              >
                &#10005;
              </button>
            </div>

            <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 22 }}>
              <div
                style={{
                  aspectRatio: "3 / 4",
                  maxHeight: "min(60vh, 520px)",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "rgba(0,0,0,.28)",
                }}
              >
                <ImageSlot
                  src={sel.image ? `/images/products/${sel.image}` : undefined}
                  placeholder={`detail shot — ${sel.name}`}
                  sizes="(max-width: 768px) 94vw, 460px"
                  priority
                />
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: GLOOCK,
                      fontWeight: 400,
                      fontSize: 34,
                      lineHeight: 1.05,
                    }}
                  >
                    {sel.name}
                  </h2>
                  <span
                    style={{
                      fontFamily: "var(--font-albert), sans-serif",
                      fontSize: 23,
                      fontWeight: 700,
                      letterSpacing: ".01em",
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatPrice(sel.price)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <span style={tag}>{sel.origin}</span>
                  <span style={tag}>Heat: {sel.heat}</span>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(246,237,221,.8)" }}>
                {sel.desc}
              </p>

              <div>
                <div style={detailLabel}>Ingredients</div>
                <p style={detailText}>{sel.ingredients}</p>
              </div>

              <div>
                <div style={detailLabel}>Best in</div>
                <p style={detailText}>{sel.use}</p>
              </div>

              <div>
                <div style={{ ...detailLabel, marginBottom: 10 }}>Size</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {sizeOptions.map((lbl, i) => {
                    const on = size === i;
                    return (
                      <button
                        key={lbl}
                        onClick={() => setSize(i)}
                        style={{
                          fontFamily: "var(--font-albert), sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          padding: "11px 18px",
                          borderRadius: 999,
                          cursor: "pointer",
                          transition: "all .2s",
                          background: on ? "var(--cream)" : "transparent",
                          color: on ? "var(--accentInk)" : "var(--mut)",
                          border: `1px solid ${on ? "var(--cream)" : "rgba(246,237,221,.3)"}`,
                        }}
                      >
                        {lbl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() =>
                  add({
                    slug: sel.slug,
                    name: sel.name,
                    size: sizeOptions[size],
                    unit: sel.price,
                  })
                }
                className="hov-accent"
                style={{
                  fontFamily: "var(--font-albert), sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  background: "var(--accent)",
                  color: "var(--accentInk)",
                  border: "none",
                  borderRadius: 999,
                  padding: "17px 28px",
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                Add to cart — {formatPrice(sel.price)}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

const tag: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  border: "1px solid rgba(246,237,221,.25)",
  borderRadius: 999,
  padding: "6px 13px",
  color: "var(--mut)",
};

const detailLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: 8,
};

const detailText: React.CSSProperties = {
  margin: 0,
  fontSize: 14.5,
  lineHeight: 1.6,
  color: "rgba(246,237,221,.75)",
};
