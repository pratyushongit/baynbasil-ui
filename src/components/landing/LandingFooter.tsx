import { site } from "@/content/site";

const GLOOCK = "var(--font-gloock), serif";
const { footer, contact, socials } = site;

export default function LandingFooter() {
  return (
    <footer
      id="contact"
      style={{ padding: "clamp(70px,11vw,110px) clamp(20px,5vw,64px) 40px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
          gap: "clamp(40px,5vw,64px)",
          alignItems: "start",
          paddingBottom: 72,
          borderBottom: "1px solid rgba(246,237,221,.12)",
        }}
      >
        {/* Contact */}
        <div>
          <h2
            data-reveal
            style={{
              margin: "0 0 28px",
              fontFamily: GLOOCK,
              fontWeight: 400,
              fontSize: "clamp(34px,5.4vw,86px)",
              lineHeight: 1,
            }}
          >
            {footer.headline.line1}
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
              {footer.headline.line2}
            </span>
          </h2>
          <div
            data-reveal
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 17,
              color: "var(--mut)",
            }}
          >
            <a href={`mailto:${contact.email}`} style={{ color: "var(--cream)" }}>
              {contact.email}
            </a>
            <span>{contact.phone}</span>
            <span>{contact.city}</span>
          </div>
        </div>

        {/* Newsletter + socials */}
        <div data-reveal>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--mut)",
              marginBottom: 16,
            }}
          >
            {footer.newsletter.label}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              placeholder={footer.newsletter.placeholder}
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid rgba(246,237,221,.3)",
                borderRadius: 999,
                padding: "15px 22px",
                color: "var(--cream)",
                fontFamily: "var(--font-albert), sans-serif",
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              className="hov-accent"
              style={{
                background: "var(--accent)",
                color: "var(--accentInk)",
                border: "none",
                borderRadius: 999,
                padding: "15px 26px",
                fontFamily: "var(--font-albert), sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: ".05em",
                cursor: "pointer",
              }}
            >
              {footer.newsletter.button}
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 26,
              marginTop: 36,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--mut)",
            }}
          >
            {socials.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 26,
          fontSize: 12.5,
          letterSpacing: ".06em",
          color: "rgba(246,237,221,.4)",
        }}
      >
        <span>{footer.copyright}</span>
        <span>{footer.tagline}</span>
      </div>
    </footer>
  );
}
