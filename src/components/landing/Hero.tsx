import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageSlot from "@/components/ImageSlot";
import { sections } from "@/content/sections";
import { site } from "@/content/site";

const GLOOCK = "var(--font-gloock), serif";
const { hero } = sections;

/**
 * Splits a line into per-character spans (`.hero-char`) for the blur reveal,
 * while wrapping each word in a nowrap box so a word never breaks across a
 * line — the layout stays identical to plain text.
 */
function SplitBlurText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {Array.from(word).map((ch, ci) => (
              <span key={ci} className="hero-char" style={{ display: "inline-block" }}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))",
        gap: "clamp(32px,5vw,48px)",
        alignItems: "center",
        padding: "clamp(110px,16vw,140px) clamp(20px,5vw,64px) clamp(56px,8vw,80px)",
        boxSizing: "border-box",
      }}
    >
      {/* Giant parallax word */}
      <div
        data-parallax
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "52%",
          fontFamily: GLOOCK,
          fontSize: "clamp(100px,24vw,380px)",
          lineHeight: 1,
          textAlign: "center",
          color: "transparent",
          WebkitTextStroke: "1px rgba(246,237,221,.10)",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {hero.parallaxWord}
      </div>

      {/* Copy column */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 720,
        }}
      >
        <div
          data-hero
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          <span
            style={{
              width: 34,
              height: 2,
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          {hero.eyebrow}
        </div>

        <h1
          aria-label={`${hero.title.line1} ${hero.title.line2}`}
          style={{
            margin: 0,
            fontFamily: GLOOCK,
            fontWeight: 400,
            // Sized so each phrase stays on one line within the column at every
            // width (the per-character split widens the text slightly).
            fontSize: "clamp(40px, 6.4vw, 100px)",
            lineHeight: 0.98,
            letterSpacing: "-.01em",
          }}
        >
          <span data-heroline aria-hidden="true" style={{ display: "block" }}>
            <SplitBlurText text={hero.title.line1} />
          </span>
          <span
            data-heroline
            aria-hidden="true"
            style={{ display: "block", fontStyle: "italic", color: "var(--accent)" }}
          >
            <SplitBlurText text={hero.title.line2} />
          </span>
        </h1>

        <p
          data-hero
          style={{
            margin: 0,
            maxWidth: "46ch",
            fontSize: 18,
            lineHeight: 1.65,
            color: "var(--mut)",
          }}
        >
          {hero.body}
        </p>

        <div data-hero style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href={hero.ctaPrimary.href}
            className="hov-accent"
            style={{
              background: "var(--accent)",
              color: "var(--accentInk)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: ".04em",
              padding: "16px 30px",
              borderRadius: 999,
            }}
          >
            {hero.ctaPrimary.label}
          </Link>
          <Link
            href={hero.ctaSecondary.href}
            className="hov-ghost"
            style={{
              border: "1px solid rgba(246,237,221,.3)",
              color: "var(--cream)",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: ".04em",
              padding: "16px 30px",
              borderRadius: 999,
            }}
          >
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </div>

      {/* Pouch image + rotating stamp */}
      <div data-hero data-heropack style={{ position: "relative", zIndex: 1, justifySelf: "center" }}>
        <div
          style={{
            width: "min(420px,78vw)",
            aspectRatio: "3 / 4",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--panel)",
            boxShadow: "0 40px 80px rgba(0,0,0,.5)",
            transform: "rotate(2.5deg)",
          }}
        >
          <ImageSlot
            src={`/images/${hero.imageFile}`}
            placeholder={hero.imagePlaceholder}
            priority
            sizes="(max-width: 1020px) 78vw, 420px"
          />
        </div>

        <div style={{ position: "absolute", top: -46, left: -46, width: 120, height: 120 }}>
          {/* Only the text ring rotates */}
          <svg
            viewBox="0 0 120 120"
            width="120"
            height="120"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, animation: "bnb-spin 18s linear infinite" }}
          >
            <defs>
              <path id="bnbring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <circle cx="60" cy="60" r="59" fill="var(--bg)" stroke="rgba(246,237,221,.18)" />
            <text
              fill="var(--accent)"
              fontSize="12.5"
              fontWeight="600"
              letterSpacing="2.5"
              fontFamily="var(--font-albert), sans-serif"
            >
              <textPath href="#bnbring">{hero.badge}</textPath>
            </text>
          </svg>
          {/* Static brand mark in the centre (does not rotate) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Image
              src="/brand-logo.png"
              alt={`${site.brand} logo`}
              width={62}
              height={62}
              priority
              style={{ width: 62, height: 62, objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
