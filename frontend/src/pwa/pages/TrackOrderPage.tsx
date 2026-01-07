import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchOrder } from "../../api/public";
import { API_BASE } from "../../api/client";
import type { Order } from "../../types";
import { useOnline } from "../useOnline";

const STATUS_FLOW = ["PENDING_PAYMENT", "RECEIVED", "PREPARING", "READY", "COMPLETED"];

export default function TrackOrderPage() {
  const { t, i18n } = useTranslation();
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const online = useOnline();

  const paymentStatus = searchParams.get("payment");
  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    fetchOrder(code)
      .then(setOrder)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  useEffect(() => {
    if (!code || !online) return;
    const wsBase = API_BASE.replace(/^http/, "ws").replace(/\/api\/?$/, "");
    const ws = new WebSocket(`${wsBase}/ws/orders`);
    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === "order.statusChanged" && payload.data?.orderCode === code) {
          fetchOrder(code).then(setOrder).catch(() => undefined);
        }
      } catch {
        // ignore
      }
    };
    ws.onerror = () => {
      ws.close();
    };
    return () => ws.close();
  }, [code, online]);

  useEffect(() => {
    if (!code || !online) return;
    const interval = setInterval(() => {
      fetchOrder(code).then(setOrder).catch(() => undefined);
    }, 15000);
    return () => clearInterval(interval);
  }, [code, online]);

  const statusIndex = useMemo(() => {
    if (!order) return -1;
    const idx = STATUS_FLOW.indexOf(order.status);
    return idx === -1 ? STATUS_FLOW.length - 1 : idx;
  }, [order]);

  return (
    <section className="pwa-card">
      <h2 className="pwa-section-title">{t("pwa.trackOrder")}</h2>
      {!online && <div className="pwa-toast pwa-warning">{t("pwa.offlineTrack")}</div>}
      {paymentStatus === "success" && <div className="pwa-toast">{t("pwa.paymentSuccess")}</div>}
      {paymentStatus === "failed" && <div className="pwa-toast pwa-warning">{t("pwa.paymentFailed")}</div>}
      {loading && <div className="pwa-muted">{t("pwa.loading")}</div>}
      {error && <div className="pwa-toast pwa-warning">{error}</div>}
      {order && (
        <div className="pwa-grid">
          <div className="pwa-card">
            <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
              <span>{t("pwa.orderCode")}</span>
              <strong>{order.code}</strong>
            </div>
            <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
              <span>{t("pwa.total")}</span>
              <strong>{order.total.toLocaleString(locale)}</strong>
            </div>
          </div>

          <div className="pwa-card">
            <h3 className="pwa-section-title">{t("pwa.status")}</h3>
            <div className="pwa-status">
              {STATUS_FLOW.map((status, index) => (
                <div key={status} className={`pwa-status-item ${index <= statusIndex ? "active" : ""}`}>
                  <span className="pwa-status-dot" />
                  <span>{t(`pwa.statusLabels.${status}`)}</span>
                </div>
              ))}
              {order.status === "CANCELLED" && (
                <div className="pwa-status-item active">
                  <span className="pwa-status-dot" />
                  <span>{t("pwa.statusLabels.CANCELLED")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
