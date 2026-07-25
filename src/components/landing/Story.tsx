import ImageSlot from "@/components/ImageSlot";
import { sections } from "@/content/sections";

const GLOOCK = "var(--font-gloock), serif";
const { story } = sections;

export default function Story() {
  return (
    <section
      id="story"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
        gap: "clamp(40px,5vw,72px)",
        alignItems: "center",
        padding: "clamp(76px,12vw,120px) clamp(20px,5vw,64px)",
        borderTop: "1px solid rgba(246,237,221,.08)",
      }}
    >
      {/* Image + badge */}
      <div data-reveal style={{ position: "relative" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--panel2)",
          }}
        >
          <ImageSlot
            src={`/images/${story.imageFile}`}
            placeholder={story.imagePlaceholder}
            sizes="(max-width: 768px) 90vw, 520px"
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: -22,
            bottom: -22,
            background: "var(--accent)",
            color: "var(--accentInk)",
            borderRadius: 14,
            padding: "18px 22px",
            fontFamily: GLOOCK,
            fontSize: 20,
            lineHeight: 1.15,
            boxShadow: "0 18px 40px rgba(0,0,0,.4)",
          }}
        >
          {story.badge.line1}
          <br />
          <span
            style={{
              fontFamily: "var(--font-albert), sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".1em",
            }}
          >
            {story.badge.line2}
          </span>
        </div>
      </div>

      {/* Copy + stats */}
      <div>
        <div
          data-reveal
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}
        >
          {story.eyebrow}
        </div>
        <h2
          data-reveal
          style={{
            margin: "0 0 24px",
            fontFamily: GLOOCK,
            fontWeight: 400,
            fontSize: "clamp(30px,4.2vw,64px)",
            lineHeight: 1.05,
          }}
        >
          {story.heading}
        </h2>
        {story.body.map((para, i) => (
          <p
            key={i}
            data-reveal
            style={{
              margin: i === story.body.length - 1 ? "0 0 40px" : "0 0 16px",
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--mut)",
              maxWidth: "56ch",
            }}
          >
            {para}
          </p>
        ))}

        <div
          data-reveal
          style={{
            display: "flex",
            gap: "clamp(28px,4.5vw,52px) clamp(32px,5vw,52px)",
            flexWrap: "wrap",
          }}
        >
          {story.stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: GLOOCK,
                  fontSize: "clamp(38px,5vw,52px)",
                  lineHeight: 1,
                  color: "var(--accent)",
                }}
              >
                <span data-count={s.value}>0</span>
                {s.suffix}
              </div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--mut)",
                  marginTop: 8,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
