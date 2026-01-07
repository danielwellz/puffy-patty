import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePwa } from "../PwaContext";

const TAX_RATE = 0;

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const { cart, updateCartItem, updateNotes, removeFromCart } = usePwa();
  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  return (
    <section className="pwa-card">
      <h2 className="pwa-section-title">{t("pwa.cart")}</h2>
      {cart.length === 0 && <div className="pwa-empty">{t("pwa.cartEmpty")}</div>}
      {cart.map((item) => (
        <div key={item.menuItemId} className="pwa-menu-item" style={{ alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <strong>{i18n.language === "fa" ? item.nameFa : item.nameEn}</strong>
            <div className="pwa-inline" style={{ marginTop: "0.5rem" }}>
              <label className="pwa-muted">{t("pwa.qty")}</label>
              <input
                type="number"
                min={1}
                className="pwa-input"
                style={{ width: "90px" }}
                value={item.qty}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (Number.isFinite(next)) {
                    updateCartItem(item.menuItemId, next);
                  }
                }}
              />
              <span className="pwa-price">{(item.price * item.qty).toLocaleString(locale)}</span>
            </div>
            <textarea
              className="pwa-textarea"
              placeholder={t("pwa.notes")}
              value={item.notes || ""}
              onChange={(e) => updateNotes(item.menuItemId, e.target.value)}
              rows={2}
            />
          </div>
          <button type="button" className="pwa-btn secondary" onClick={() => removeFromCart(item.menuItemId)}>
            {t("pwa.remove")}
          </button>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="pwa-card" style={{ marginTop: "1rem" }}>
          <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
            <span>{t("pwa.subtotal")}</span>
              <strong>{totals.subtotal.toLocaleString(locale)}</strong>
          </div>
          <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
            <span>{t("pwa.tax")}</span>
              <strong>{totals.tax.toLocaleString(locale)}</strong>
          </div>
          <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
            <span>{t("pwa.total")}</span>
              <strong>{totals.total.toLocaleString(locale)}</strong>
          </div>
          <Link to="/order/checkout" className="pwa-btn" style={{ display: "inline-block", marginTop: "1rem" }}>
            {t("pwa.checkout")}
          </Link>
        </div>
      )}
    </section>
  );
}
