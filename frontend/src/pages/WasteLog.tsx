import { FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { WasteLog as WasteLogType } from "../types";

type Props = {
  date: string;
};

export function WasteLogPage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [items, setItems] = useState<WasteLogType[]>([]);
  const [form, setForm] = useState({ itemName: "", quantity: "", reason: "" });

  const canEdit = role === "MANAGER" || role === "HEAD_CHEF";

  const load = useCallback(() => {
    if (!token) return;
    apiFetch<WasteLogType[]>(`/daily/waste?date=${date}`, {}, token)
      .then(setItems)
      .catch(() => setItems([]));
  }, [token, date]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    await apiFetch("/daily/waste", { method: "POST", body: JSON.stringify({ ...form, date }) }, token);
    setForm({ itemName: "", quantity: "", reason: "" });
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.waste")}</p>
          <h1>{t("logs.wasteTitle")}</h1>
        </div>
      </div>
      {canEdit && (
        <article className="card">
          <form className="grid three-col" onSubmit={submit}>
            <label className="input">
              <span>{t("shopping.item")}</span>
              <input value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("prep.quantity")}</span>
              <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>{t("logs.reason")}</span>
              <input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required />
            </label>
            <button className="btn primary" type="submit">
              {t("logs.submit")}
            </button>
          </form>
        </article>
      )}
      <article className="card">
        <div className="stack">
          {items.map((item) => (
            <div key={item.id} className="pill ghost">
              {item.itemName} {item.quantity} — {item.reason}
            </div>
          ))}
          {items.length === 0 && <p className="status info">{t("logs.empty")}</p>}
        </div>
      </article>
    </div>
  );
}

export default WasteLogPage;
