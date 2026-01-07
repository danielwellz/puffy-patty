import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createReservation, fetchBranches } from "../../api/public";
import { Branch } from "../../types";
import { usePwa } from "../PwaContext";
import { useOnline } from "../useOnline";

export default function ReservationPage() {
  const { t } = useTranslation();
  const { branch, setBranch } = usePwa();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [startAt, setStartAt] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const online = useOnline();

  useEffect(() => {
    fetchBranches()
      .then((data) => setBranches(data.filter((item) => item.reservationsEnabled !== false)))
      .catch(() => undefined);
  }, []);

  const submit = async () => {
    if (!branch) {
      setError(t("pwa.selectBranchFirst"));
      return;
    }
    if (branch.reservationsEnabled === false) {
      setError(t("pwa.reserveDisabled"));
      return;
    }
    if (!startAt) {
      setError(t("pwa.reserveTimeRequired"));
      return;
    }
    if (!online) {
      setError(t("pwa.offlineReserve"));
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createReservation({
        branchId: branch.id,
        startAt: new Date(startAt).toISOString(),
        partySize,
        customerName,
        customerPhone
      });
      setSuccess(t("pwa.reserveSuccess"));
      setStartAt("");
      setCustomerName("");
      setCustomerPhone("");
    } catch (err: any) {
      setError(err.message || t("pwa.genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pwa-card">
      <h2 className="pwa-section-title">{t("pwa.reserve")}</h2>
      {!online && <div className="pwa-toast pwa-warning">{t("pwa.offlineReserve")}</div>}
      {error && <div className="pwa-toast pwa-warning">{error}</div>}
      {success && <div className="pwa-toast">{success}</div>}

      <div className="pwa-form-row">
        <label>{t("pwa.branchSelect")}</label>
        <select
          className="pwa-select"
          value={branch?.id || ""}
          onChange={(e) => {
            const selected = branches.find((b) => b.id === e.target.value) || null;
            setBranch(selected);
          }}
        >
          <option value="">{t("pwa.branchUnset")}</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pwa-form-row">
        <label>{t("pwa.reserveTime")}</label>
        <input
          type="datetime-local"
          className="pwa-input"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
        />
      </div>

      <div className="pwa-form-row">
        <label>{t("pwa.partySize")}</label>
        <input
          type="number"
          min={1}
          className="pwa-input"
          value={partySize}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isFinite(next)) {
              setPartySize(next);
            }
          }}
        />
      </div>

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

      <button type="button" className="pwa-btn" disabled={loading || !online} onClick={submit}>
        {loading ? t("pwa.submitting") : t("pwa.reserve")}
      </button>
    </section>
  );
}
