"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ImageSlot from "@/components/ImageSlot";
import { useCart } from "@/components/cart/CartProvider";
import { useQuickView } from "@/components/product/QuickViewProvider";
import { products, categories } from "@/content/products";
import { sections } from "@/content/sections";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/format";

const GLOOCK = "var(--font-gloock), serif";
const { productsHeader } = sections;

export default function ProductsPage() {
  const { add } = useCart();
  const { open } = useQuickView();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const shown = products.filter((p) => filter === "All" || p.category === filter);
  const subtitle = productsHeader.subtitle.replace("{count}", String(products.length));

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
          className="product-grid"
          style={{
            display: "grid",
            gap: "48px 32px",
            padding: "10px clamp(20px,5vw,64px) 90px",
          }}
        >
          {shown.map((p) => (
            <div key={p.slug} style={{ display: "flex", flexDirection: "column" }}>
              <div
                onClick={() => open(p)}
                className="img-zoom"
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "rgba(0,0,0,.25)",
                  cursor: "pointer",
                }}
              >
                <ImageSlot
                  src={p.image ? `/images/products/${p.image}` : undefined}
                  placeholder={`pouch — ${p.name}`}
                  sizes="(max-width: 768px) 100vw, 250px"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    add({ slug: p.slug, name: p.name, size: p.weight, unit: p.price });
                  }}
                  aria-label={`Add ${p.name} to cart`}
                  className="hov-fill"
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: 12,
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(30,13,5,.82)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(246,237,221,.25)",
                    color: "var(--cream)",
                    fontSize: 20,
                    lineHeight: 1,
                    cursor: "pointer",
                    transition: "all .25s",
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 14,
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
                      fontFamily: "var(--font-albert), sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                      flex: "none",
                    }}
                  >
                    {formatPrice(p.price)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                    marginTop: 6,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      color: "rgba(246,237,221,.6)",
                    }}
                  >
                    {p.note}
                  </p>
                  <span
                    style={{
                      flex: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      color: "rgba(246,237,221,.5)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.weight}
                  </span>
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
    </>
  );
}
