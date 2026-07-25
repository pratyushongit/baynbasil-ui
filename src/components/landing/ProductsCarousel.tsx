"use client";

import Link from "next/link";
import { useRef } from "react";
import ImageSlot from "@/components/ImageSlot";
import { useCart } from "@/components/cart/CartProvider";
import { useQuickView } from "@/components/product/QuickViewProvider";
import { featuredProducts } from "@/content/products";
import { sections } from "@/content/sections";
import { formatPrice } from "@/lib/format";

const GLOOCK = "var(--font-gloock), serif";
const { productsCarousel } = sections;

export default function ProductsCarousel() {
  const { add } = useCart();
  const { open } = useQuickView();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (dir: number) => {
    const t = trackRef.current;
    if (!t) return;
    const pitch = 344;
    const pad = parseFloat(getComputedStyle(t).paddingLeft) || 0;
    const cur = Math.round((t.scrollLeft - pad) / pitch);
    const target = pad + Math.max(0, cur + dir) * pitch;
    t.scrollTo({ left: Math.min(target, t.scrollWidth - t.clientWidth), behavior: "smooth" });
  };

  return (
    <section
      id="products"
      style={{
        position: "relative",
        padding: "clamp(70px,11vw,110px) 0 clamp(56px,9vw,90px)",
        overflow: "hidden",
        borderTop: "1px solid rgba(246,237,221,.08)",
      }}
    >
      {/* Heading + arrows */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 28,
          padding: "0 clamp(20px,5vw,64px)",
          marginBottom: 44,
        }}
      >
        <div data-reveal>
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
            {productsCarousel.eyebrow}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: GLOOCK,
              fontWeight: 400,
              fontSize: "clamp(32px,4.6vw,72px)",
              lineHeight: 1.02,
            }}
          >
            {productsCarousel.heading.line1}
            <br />
            {productsCarousel.heading.line2}
          </h2>
        </div>
        <div data-reveal style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={() => scrollTrack(-1)}
            aria-label="Previous products"
            className="hov-fill"
            style={arrowBtn}
          >
            &#8592;
          </button>
          <button
            onClick={() => scrollTrack(1)}
            aria-label="Next products"
            className="hov-fill"
            style={arrowBtn}
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        data-htrack
        ref={trackRef}
        style={{
          display: "flex",
          gap: 24,
          // Extra vertical padding leaves room for the card glow so the
          // track's overflow (forced by overflow-x:auto) can't clip it.
          padding: "20px clamp(20px,5vw,64px) 40px",
          overflowX: "auto",
          scrollSnapType: "x proximity",
          scrollPaddingLeft: "clamp(20px,5vw,64px)",
          scrollbarWidth: "none",
        }}
      >
        {featuredProducts.map((p) => (
          <div
            key={p.slug}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "min(300px,80vw)",
              flex: "none",
              scrollSnapAlign: "start",
            }}
          >
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
                placeholder={`pouch shot — ${p.name}`}
                sizes="(max-width: 768px) 80vw, 300px"
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
                    fontSize: 20,
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

        {/* Browse-all card */}
        <Link
          href={productsCarousel.viewAll.href}
          className="hov-ghost"
          style={{
            width: "min(280px,70vw)",
            flex: "none",
            scrollSnapAlign: "start",
            border: "1px dashed rgba(246,237,221,.3)",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            textAlign: "center",
            padding: 24,
            boxSizing: "border-box",
            color: "var(--cream)",
            transition: "all .3s ease",
          }}
        >
          <span style={{ fontFamily: GLOOCK, fontSize: 28, lineHeight: 1.2 }}>
            {productsCarousel.browseCard.line1}
            <br />
            {productsCarousel.browseCard.line2}
          </span>
          <span
            style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}
          >
            {productsCarousel.browseCard.cta}
          </span>
        </Link>
      </div>
    </section>
  );
}

const arrowBtn: React.CSSProperties = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: "transparent",
  border: "1px solid rgba(246,237,221,.35)",
  color: "var(--cream)",
  fontSize: 20,
  cursor: "pointer",
  transition: "all .25s",
};
