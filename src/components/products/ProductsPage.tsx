"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ImageSlot from "@/components/ImageSlot";
import { useCart } from "@/components/cart/CartProvider";
import {
  products,
  categories,
  sizeOptions,
  defaultSizeIndex,
  type Product,
} from "@/content/products";
import { sections } from "@/content/sections";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/format";

const GLOOCK = "var(--font-gloock), serif";
const { productsHeader } = sections;

export default function ProductsPage() {
  const { add } = useCart();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [sel, setSel] = useState<Product | null>(null);
  const [size, setSize] = useState(defaultSizeIndex);

  const shown = products.filter((p) => filter === "All" || p.category === filter);
  const subtitle = productsHeader.subtitle.replace("{count}", String(products.length));

  const open = (p: Product) => {
    setSel(p);
    setSize(defaultSizeIndex);
  };
  const closeDrawer = () => setSel(null);

  // Escape closes the quick-view drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sel) setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  return (
    <>
      <Navbar />

      <div style={{ overflowX: "clip", minHeight: "100vh" }}>
        {/* Listing header */}
        <header style={{ padding: "clamp(120px,17vw,150px) clamp(16px,4vw,40px) 32px" }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 14,
            }}
          >
            {productsHeader.eyebrow}
          </div>
          <h1
            style={{
              margin: "0 0 12px",
              fontFamily: GLOOCK,
              fontWeight: 400,
              fontSize: "clamp(36px,5.6vw,86px)",
              lineHeight: 1,
            }}
          >
            {productsHeader.title.line1}
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              {productsHeader.title.line2}
            </span>
          </h1>
          <p style={{ margin: "0 0 36px", fontSize: 16, color: "var(--mut)" }}>{subtitle}</p>

          {/* Category filters */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {categories.map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  data-fpill
                  data-on={on ? "1" : "0"}
                  style={{
                    fontFamily: "var(--font-albert), sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: ".07em",
                    textTransform: "uppercase",
                    padding: "12px 22px",
                    borderRadius: 999,
                    cursor: "pointer",
                    transition: "all .25s",
                    background: on ? "var(--accent)" : "transparent",
                    color: on ? "var(--accentInk)" : "var(--mut)",
                    border: `1px solid ${on ? "var(--accent)" : "rgba(246,237,221,.3)"}`,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </header>

        {/* Product grid */}
        <main
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,270px),1fr))",
            gap: 20,
            padding: "4px clamp(16px,4vw,40px) 56px",
          }}
        >
          {shown.map((p) => (
            <div
              key={p.slug}
              className="hov-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(170deg,var(--panel),var(--panel2))",
                borderRadius: 20,
                padding: "10px 10px 16px",
                transition: "box-shadow .3s ease",
              }}
            >
              <div
                onClick={() => open(p)}
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "rgba(0,0,0,.28)",
                  cursor: "pointer",
                }}
              >
                <ImageSlot
                  src={p.image ? `/images/products/${p.image}` : undefined}
                  placeholder={`pouch — ${p.name}`}
                  sizes="(max-width: 768px) 100vw, 270px"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <h3
                  onClick={() => open(p)}
                  style={{
                    margin: 0,
                    fontFamily: GLOOCK,
                    fontWeight: 400,
                    fontSize: 19,
                    lineHeight: 1.15,
                    cursor: "pointer",
                  }}
                >
                  {p.name}
                </h3>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: ".1em",
                    color: "rgba(246,237,221,.55)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.weight}
                </span>
              </div>

              <p
                style={{
                  margin: "6px 0 14px",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "rgba(246,237,221,.72)",
                }}
              >
                {p.note}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-albert), sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: ".01em",
                    color: "var(--accent)",
                  }}
                >
                  {formatPrice(p.price)}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => open(p)} className="hov-details" style={detailsBtn}>
                    Details
                  </button>
                  <button
                    onClick={() =>
                      add({ slug: p.slug, name: p.name, size: p.weight, unit: p.price })
                    }
                    className="hov-fill"
                    style={addBtn}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

        {/* Minimal footer */}
        <footer
          style={{
            padding: "40px clamp(20px,5vw,64px)",
            borderTop: "1px solid rgba(246,237,221,.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 13,
            color: "rgba(246,237,221,.45)",
          }}
        >
          <span>{site.footer.productsCopyright}</span>
          <Link href={site.footer.productsLink.href} style={{ color: "var(--mut)" }}>
            {site.footer.productsLink.label}
          </Link>
        </footer>
      </div>

      {/* Quick-view overlay (z-80) */}
      <div
        onClick={closeDrawer}
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

      {/* Quick-view drawer (z-90) — separate from the cart drawer (z-110) */}
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
                onClick={closeDrawer}
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
                  borderRadius: 14,
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

const detailsBtn: React.CSSProperties = {
  fontFamily: "var(--font-albert), sans-serif",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  background: "transparent",
  color: "var(--mut)",
  border: "1px solid rgba(246,237,221,.25)",
  borderRadius: 999,
  padding: "11px 16px",
  cursor: "pointer",
  transition: "all .25s",
};

const addBtn: React.CSSProperties = {
  fontFamily: "var(--font-albert), sans-serif",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  background: "transparent",
  color: "var(--cream)",
  border: "1px solid rgba(246,237,221,.35)",
  borderRadius: 999,
  padding: "11px 16px",
  cursor: "pointer",
  transition: "all .25s",
};

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
