"use client";

import Link from "next/link";
import { useRef } from "react";
import ImageSlot from "@/components/ImageSlot";
import { useCart } from "@/components/cart/CartProvider";
import { featuredProducts } from "@/content/products";
import { sections } from "@/content/sections";
import { formatPrice } from "@/lib/format";

const GLOOCK = "var(--font-gloock), serif";
const { productsCarousel } = sections;

export default function ProductsCarousel() {
  const { add } = useCart();
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
            className="hov-card"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "min(320px,82vw)",
              flex: "none",
              scrollSnapAlign: "start",
              background: "linear-gradient(170deg,var(--panel),var(--panel2))",
              borderRadius: 20,
              padding: "10px 10px 18px",
              boxSizing: "border-box",
              transition: "box-shadow .3s ease",
            }}
          >
            <div
              style={{
                aspectRatio: "3 / 4",
                borderRadius: 12,
                overflow: "hidden",
                background: "rgba(0,0,0,.28)",
              }}
            >
              <ImageSlot
                src={p.image ? `/images/products/${p.image}` : undefined}
                placeholder={`pouch shot — ${p.name}`}
                sizes="(max-width: 768px) 82vw, 320px"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 18,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: GLOOCK,
                  fontWeight: 400,
                  fontSize: 25,
                  lineHeight: 1.1,
                  minHeight: "2.2em",
                }}
              >
                {p.name}
              </h3>
              <span
                style={{
                  fontSize: 12,
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
                margin: "8px 0 16px",
                fontSize: 14,
                lineHeight: 1.5,
                color: "rgba(246,237,221,.72)",
                minHeight: 42,
              }}
            >
              {p.note}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginTop: "auto",
              }}
            >
              <span style={{ fontFamily: GLOOCK, fontSize: 23, color: "var(--accent)" }}>
                {formatPrice(p.price)}
              </span>
              <button
                onClick={() =>
                  add({ slug: p.slug, name: p.name, size: p.weight, unit: p.price })
                }
                className="hov-fill"
                style={{
                  fontFamily: "var(--font-albert), sans-serif",
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: ".09em",
                  textTransform: "uppercase",
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1px solid rgba(246,237,221,.35)",
                  borderRadius: 999,
                  padding: "12px 20px",
                  cursor: "pointer",
                  transition: "all .25s",
                }}
              >
                Add to cart
              </button>
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
