import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { createOrder, startPayment } from "../../api/public";
import { usePwa } from "../PwaContext";
import { useOnline } from "../useOnline";

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const { branch, cart, clearCart, orderType, setOrderType } = usePwa();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [payOnline, setPayOnline] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const online = useOnline();
  const navigate = useNavigate();

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = 0;
    return { subtotal, tax, total: subtotal + tax };
  }, [cart]);

  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";
  const dineInEnabled = branch?.dineInEnabled !== false;
  const takeawayEnabled = branch?.takeawayEnabled !== false;

  useEffect(() => {
    if (!dineInEnabled && !takeawayEnabled) return;
    if (!dineInEnabled && orderType === "DINE_IN") {
      setOrderType("TAKEAWAY");
    }
    if (!takeawayEnabled && orderType === "TAKEAWAY") {
      setOrderType("DINE_IN");
    }
  }, [dineInEnabled, takeawayEnabled, orderType, setOrderType]);

  const handleSubmit = async () => {
    if (!branch) {
      setError(t("pwa.selectBranchFirst"));
      return;
    }
    if (orderType === "DINE_IN" && !tableNumber.trim()) {
      setError(t("pwa.tableNumberRequired"));
      return;
    }
    if (orderType === "TAKEAWAY" && !pickupTime) {
      setError(t("pwa.pickupTimeRequired"));
      return;
    }
    if (cart.length === 0) {
      setError(t("pwa.cartEmpty"));
      return;
    }
    if (!online) {
      setError(t("pwa.offlineCheckout"));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder({
        branchId: branch.id,
        orderType,
        tableNumber: orderType === "DINE_IN" ? tableNumber : undefined,
        pickupTime: orderType === "TAKEAWAY" && pickupTime ? new Date(pickupTime).toISOString() : undefined,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        items: cart
      });
      clearCart();
      if (order.status === "PENDING_PAYMENT" || (orderType === "DINE_IN" && payOnline)) {
        const payment = await startPayment(order.id);
        window.location.href = payment.redirectUrl;
        return;
      }
      navigate(`/order/track/${order.code}?payment=skip`);
    } catch (err: any) {
      setError(err.message || t("pwa.genericError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pwa-card">
      <h2 className="pwa-section-title">{t("pwa.checkout")}</h2>
      {!online && <div className="pwa-toast pwa-warning">{t("pwa.offlineCheckout")}</div>}
      {error && <div className="pwa-toast pwa-warning">{error}</div>}
      {cart.length === 0 && (
        <div className="pwa-empty">
          {t("pwa.cartEmpty")} <Link to="/order">{t("pwa.backToMenu")}</Link>
        </div>
      )}
      {cart.length > 0 && (
        <div className="pwa-grid">
          <div className="pwa-form-row">
            <label>{t("pwa.orderType")}</label>
            <select
              className="pwa-select"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as "DINE_IN" | "TAKEAWAY")}
            >
              <option value="DINE_IN" disabled={!dineInEnabled}>
                {t("pwa.dineIn")}
              </option>
              <option value="TAKEAWAY" disabled={!takeawayEnabled}>
                {t("pwa.takeaway")}
              </option>
            </select>
          </div>

          {orderType === "DINE_IN" && (
            <div className="pwa-form-row">
              <label>{t("pwa.tableNumber")}</label>
              <input
                className="pwa-input"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
          )}

          {orderType === "TAKEAWAY" && (
            <div className="pwa-form-row">
              <label>{t("pwa.pickupTime")}</label>
              <input
                type="datetime-local"
                className="pwa-input"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          )}

          <div className="pwa-form-row">
            <label>{t("pwa.customerName")}</label>
            <input className="pwa-input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div className="pwa-form-row">
            <label>{t("pwa.customerPhone")}</label>
            <input
              type="tel"
              className="pwa-input"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          {orderType === "DINE_IN" && (
            <label className="pwa-inline">
              <input type="checkbox" checked={payOnline} onChange={(e) => setPayOnline(e.target.checked)} />
              {t("pwa.payOnlineOptional")}
            </label>
          )}

          <div className="pwa-card">
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
          </div>

          <button type="button" className="pwa-btn" disabled={submitting || !online} onClick={handleSubmit}>
            {submitting ? t("pwa.submitting") : t("pwa.placeOrder")}
          </button>
        </div>
      )}
    </section>
  );
}
