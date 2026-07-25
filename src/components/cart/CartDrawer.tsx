"use client";

import { useState } from "react";
import { useCart, type CheckoutForm } from "./CartProvider";

const GLOOCK = "var(--font-gloock), serif";

const EMPTY_FORM: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
  landmark: "",
  pincode: "",
  state: "",
};

const labelStyle: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--mut)",
  marginBottom: 7,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(0,0,0,.22)",
  border: "1px solid rgba(246,237,221,.22)",
  borderRadius: 12,
  padding: "13px 16px",
  color: "var(--cream)",
  fontFamily: "var(--font-albert), sans-serif",
  fontSize: 14.5,
  outline: "none",
};

export default function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    open,
    view,
    toast,
    setQty,
    close,
    toCheckout,
    backToCart,
    placeOrder,
  } = useCart();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const setField = (k: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const isCheckout = view === "checkout";
  const title = isCheckout ? "Delivery details" : "Your cart";

  return (
    <div style={{ fontFamily: "var(--font-albert), sans-serif" }}>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(10,4,1,.62)",
          backdropFilter: "blur(3px)",
          transition: "opacity .35s ease",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <aside
        aria-label="Cart"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 110,
          width: "min(440px,94vw)",
          background: "var(--panel2)",
          color: "var(--cream)",
          boxShadow: "-30px 0 80px rgba(0,0,0,.5)",
          transition: "transform .45s cubic-bezier(.32,.72,.24,1)",
          transform: `translateX(${open ? "0%" : "105%"})`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "18px 24px",
            borderBottom: "1px solid rgba(246,237,221,.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isCheckout && (
              <button
                onClick={backToCart}
                aria-label="Back to cart"
                className="hov-ghost"
                style={circleBtn}
              >
                &#8592;
              </button>
            )}
            <span style={{ fontFamily: GLOOCK, fontSize: 24 }}>
              {title}
              {!isCheckout && count ? (
                <span
                  style={{
                    fontFamily: "var(--font-albert), sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    marginLeft: 8,
                  }}
                >
                  ({count})
                </span>
              ) : null}
            </span>
          </div>
          <button onClick={close} aria-label="Close" className="hov-ghost" style={circleBtn}>
            &#10005;
          </button>
        </div>

        {/* ── Cart view ── */}
        {!isCheckout && (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {!items.length && (
                <div style={{ textAlign: "center", padding: "70px 10px" }}>
                  <div style={{ fontFamily: GLOOCK, fontSize: 26 }}>Your cart is empty</div>
                  <p style={{ margin: "10px 0 0", fontSize: 14.5, color: "var(--mut)" }}>
                    Add a few spices and come back.
                  </p>
                </div>
              )}

              {items.map((it) => (
                <div
                  key={it.key}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 12,
                    rowGap: 14,
                    background: "rgba(0,0,0,.22)",
                    borderRadius: 14,
                    padding: "14px 16px",
                  }}
                >
                  <div style={{ flex: "1 1 150px", minWidth: 0 }}>
                    <div style={{ fontFamily: GLOOCK, fontSize: 18, overflowWrap: "anywhere" }}>
                      {it.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 3 }}>
                      {it.size} &middot; ₹{it.unit} each
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginLeft: "auto",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        onClick={() => setQty(it.key, it.qty - 1)}
                        aria-label="Decrease"
                        className="hov-border"
                        style={qtyBtn}
                      >
                        &#8722;
                      </button>
                      <span
                        style={{ minWidth: 18, textAlign: "center", fontWeight: 600, fontSize: 14 }}
                      >
                        {it.qty}
                      </span>
                      <button
                        onClick={() => setQty(it.key, it.qty + 1)}
                        aria-label="Increase"
                        className="hov-border"
                        style={qtyBtn}
                      >
                        +
                      </button>
                    </div>
                    <div
                      style={{
                        minWidth: 54,
                        textAlign: "right",
                        fontFamily: "var(--font-albert), sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--accent)",
                      }}
                    >
                      ₹{it.unit * it.qty}
                    </div>
                    <button
                      onClick={() => setQty(it.key, 0)}
                      aria-label="Remove"
                      className="hov-remove"
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(246,237,221,.45)",
                        fontSize: 13,
                        cursor: "pointer",
                        padding: 6,
                      }}
                    >
                      &#10005;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: "1px solid rgba(246,237,221,.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 14, color: "var(--mut)" }}>Subtotal</span>
                  <span
                    style={{
                      fontFamily: "var(--font-albert), sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "var(--accent)",
                    }}
                  >
                    ₹{subtotal}
                  </span>
                </div>
                <button onClick={toCheckout} className="hov-accent" style={primaryBtn}>
                  Proceed to order
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Checkout view ── */}
        {isCheckout && (
          <>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {/* Order summary */}
              <div
                style={{
                  background: "rgba(0,0,0,.22)",
                  borderRadius: 14,
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    letterSpacing: ".16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 2,
                  }}
                >
                  Order summary
                </div>
                {items.map((it) => (
                  <div
                    key={it.key}
                    style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}
                  >
                    <span style={{ color: "rgba(246,237,221,.8)" }}>
                      {it.name} ({it.size}) &times; {it.qty}
                    </span>
                    <span style={{ fontWeight: 600 }}>₹{it.unit * it.qty}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(246,237,221,.15)",
                    paddingTop: 10,
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Total</span>
                  <span
                    style={{
                      fontFamily: "var(--font-albert), sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--accent)",
                    }}
                  >
                    ₹{subtotal}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div>
                <label style={labelStyle}>Full name *</label>
                <input
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Asha Rao"
                  className="foc-accent"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone (WhatsApp) *</label>
                <input
                  value={form.phone}
                  onChange={setField("phone")}
                  type="tel"
                  placeholder="98765 43210"
                  className="foc-accent"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Address *</label>
                <textarea
                  value={form.address}
                  onChange={setField("address")}
                  rows={2}
                  placeholder="Flat, street, area"
                  className="foc-accent"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Landmark</label>
                <input
                  value={form.landmark}
                  onChange={setField("landmark")}
                  placeholder="Near… (optional)"
                  className="foc-accent"
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Pincode *</label>
                  <input
                    value={form.pincode}
                    onChange={setField("pincode")}
                    inputMode="numeric"
                    placeholder="560001"
                    className="foc-accent"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>State *</label>
                  <input
                    value={form.state}
                    onChange={setField("state")}
                    placeholder="Karnataka"
                    className="foc-accent"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid rgba(246,237,221,.1)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <button
                onClick={() => placeOrder(form)}
                className="hov-accent"
                style={{
                  fontFamily: "var(--font-albert), sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  background: "#25D366",
                  color: "#0B2A16",
                  border: "none",
                  borderRadius: 999,
                  padding: "17px 28px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.5 3.9 2.6 1.1 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2z" />
                </svg>
                Place order on WhatsApp
              </button>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: 1.5,
                  textAlign: "center",
                  color: "rgba(246,237,221,.5)",
                }}
              >
                Opens WhatsApp with your order pre-filled — just hit send. We’ll reply with payment
                details, and your order is confirmed once payment is done.
              </p>
            </div>
          </>
        )}
      </aside>

      {/* Toast */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: 30,
          zIndex: 130,
          transform: `translate(-50%, ${toast ? "0px" : "20px"})`,
          opacity: toast ? 1 : 0,
          transition: "all .4s cubic-bezier(.32,.72,.24,1)",
          pointerEvents: "none",
          background: toast && !toast.ok ? "#C03A2B" : "var(--accent)",
          color: toast && !toast.ok ? "#FFF1EC" : "var(--accentInk)",
          padding: "14px 26px",
          borderRadius: 999,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "0 16px 40px rgba(0,0,0,.45)",
          maxWidth: "88vw",
          textAlign: "center",
        }}
      >
        {toast?.msg ?? ""}
      </div>
    </div>
  );
}

const circleBtn: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "transparent",
  border: "1px solid rgba(246,237,221,.3)",
  color: "var(--cream)",
  fontSize: 16,
  cursor: "pointer",
};

const qtyBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  background: "transparent",
  border: "1px solid rgba(246,237,221,.3)",
  color: "var(--cream)",
  fontSize: 15,
  cursor: "pointer",
  lineHeight: 1,
};

const primaryBtn: React.CSSProperties = {
  fontFamily: "var(--font-albert), sans-serif",
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  background: "var(--accent)",
  color: "var(--accentInk)",
  border: "none",
  borderRadius: 999,
  padding: "17px 28px",
  cursor: "pointer",
};
