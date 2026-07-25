import { site } from "@/content/site";

const GLOOCK = "var(--font-gloock), serif";

export default function Marquee() {
  // Star-separated words, e.g. RED CHILLI ✦ TURMERIC ✦ …
  const strip = site.marquee.join("  ✦  ") + "  ✦  ";

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--accent)",
        color: "var(--accentInk)",
        transform: "rotate(-1.6deg) scale(1.02)",
        padding: "14px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontFamily: GLOOCK,
        fontSize: 26,
      }}
    >
      <div style={{ display: "inline-flex", gap: 0, animation: "bnb-mq 26s linear infinite" }}>
        <span>{strip}</span>
        <span>{strip}</span>
      </div>
    </div>
  );
}
