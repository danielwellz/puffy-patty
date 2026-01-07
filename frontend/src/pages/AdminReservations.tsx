import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchReservations, updateReservationStatus } from "../api/admin";
import { useAuth } from "../context/AuthContext";
import type { Reservation } from "../types";

export default function AdminReservationsPage() {
  const { t, i18n } = useTranslation();
  const { token, branchId } = useAuth();
  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReservations(branchId, token);
      setReservations(data);
    } catch (err: any) {
      setError(err.message || t("admin.genericError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [token, branchId]);

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await updateReservationStatus(id, status, token);
      load();
    } catch (err: any) {
      setError(err.message || t("admin.genericError"));
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>{t("admin.reservationsTitle")}</h1>
          <p>{t("admin.reservationsHint")}</p>
        </div>
        <button className="btn primary" type="button" onClick={load}>
          {t("admin.refresh")}
        </button>
      </header>

      {loading && <div className="card">{t("admin.loading")}</div>}
      {error && <div className="card">{error}</div>}
      {!loading && reservations.length === 0 && <div className="card">{t("admin.noReservations")}</div>}

      {reservations.map((reservation) => (
        <div key={reservation.id} className="card">
          <div className="row">
            <h2>{reservation.customerName}</h2>
            <span className="badge">{reservation.status}</span>
          </div>
          <div className="stack">
            <p>{t("admin.reservationTime", { time: new Date(reservation.startAt).toLocaleString(locale) })}</p>
            <p>{t("admin.partySize", { count: reservation.partySize })}</p>
            <p>{t("admin.customerPhone", { phone: reservation.customerPhone })}</p>
          </div>
          <div className="row">
            <button
              type="button"
              className="btn primary"
              disabled={reservation.status === "CONFIRMED"}
              onClick={() => updateStatus(reservation.id, "CONFIRMED")}
            >
              {t("admin.confirm")}
            </button>
            <button
              type="button"
              className="btn secondary"
              disabled={reservation.status === "DECLINED"}
              onClick={() => updateStatus(reservation.id, "DECLINED")}
            >
              {t("admin.decline")}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
