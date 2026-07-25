"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Image placeholder that mirrors the Claude Design `<image-slot>` empty state:
 * a faint tinted frame, a dashed ring, an image icon and a caption.
 *
 * Drop a real file at the `src` path (under /public) and it renders that photo
 * (optimized via next/image) instead — no code change needed. If the file is
 * missing, it falls back to the placeholder, so the site looks complete before
 * real images exist.
 *
 * Place inside a sized, `overflow:hidden` wrapper (as the design does); the
 * slot fills it.
 */

interface ImageSlotProps {
  /** Path under /public, e.g. "/images/products/red-chilli.jpg". Optional. */
  src?: string;
  /** Empty-state caption describing the intended image. */
  placeholder: string;
  /** Alt text when a real image is shown (defaults to the caption). */
  alt?: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Prioritise loading (use for the hero image). */
  priority?: boolean;
}

export default function ImageSlot({
  src,
  placeholder,
  alt,
  sizes = "(max-width: 768px) 90vw, 460px",
  priority,
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={alt ?? placeholder}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          style={{
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity .5s ease, transform .55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(127,127,127,.08)",
            color: "inherit",
            font: "13px/1.3 system-ui, -apple-system, sans-serif",
          }}
        >
          {/* dashed ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "1.5px dashed currentColor",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />
          {/* centred empty-state content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              textAlign: "center",
              padding: 12,
              boxSizing: "border-box",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.45 }}
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <div
              style={{
                maxWidth: "90%",
                fontWeight: 500,
                letterSpacing: ".01em",
                opacity: 0.75,
              }}
            >
              {placeholder}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
