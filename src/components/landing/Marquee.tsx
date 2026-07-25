import { site } from "@/content/site";

const GLOOCK = "var(--font-gloock), serif";

export default function Marquee() {
  // Star-separated words, e.g. RED CHILLI ✦ TURMERIC ✦ …
  // Repeat the list so a single sequence is wider than any viewport — the
  // two identical sequences + translateX(-50%) then loop with no visible gap.
  const strip = (site.marquee.join("  ✦  ") + "  ✦  ").repeat(2);

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
      <div style={{ display: "inline-flex", gap: 0, animation: "bnb-mq 130s linear infinite" }}>
        <span>{strip}</span>
        <span>{strip}</span>
      </div>
    </div>
  );
}
