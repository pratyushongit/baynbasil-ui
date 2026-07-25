import { sections } from "@/content/sections";

const GLOOCK = "var(--font-gloock), serif";
const { whyUs } = sections;

export default function WhyUs() {
  return (
    <section
      id="why"
      style={{
        background: "var(--lightbg)",
        color: "var(--lightink)",
        padding: "clamp(76px,12vw,120px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        data-reveal
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "var(--panel)",
          marginBottom: 16,
        }}
      >
        {whyUs.eyebrow}
      </div>
      <h2
        data-reveal
        style={{
          margin: "0 0 64px",
          fontFamily: GLOOCK,
          fontWeight: 400,
          fontSize: "clamp(30px,4.2vw,64px)",
          lineHeight: 1.05,
          maxWidth: "18ch",
          color: "var(--lightink)",
        }}
      >
        {whyUs.heading}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: 40,
        }}
      >
        {whyUs.reasons.map((r) => (
          <div
            key={r.num}
            data-reveal
            style={{ borderTop: "2px solid var(--lightink)", paddingTop: 22 }}
          >
            <div style={{ fontFamily: GLOOCK, fontSize: 44, color: "var(--panel)" }}>{r.num}</div>
            <h3
              style={{
                margin: "16px 0 10px",
                fontFamily: GLOOCK,
                fontWeight: 400,
                fontSize: 23,
                lineHeight: 1.2,
                color: "var(--lightink)",
              }}
            >
              {r.title}
            </h3>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(42,18,5,.68)" }}>
              {r.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
