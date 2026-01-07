import { FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { PurchaseLog as PurchaseLogType } from "../types";

type Props = {
  date: string;
};

export function PurchaseLogPage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [items, setItems] = useState<PurchaseLogType[]>([]);
  const [form, setForm] = useState({ itemName: "", quantity: "", unit: "", price: "" });

  const canEdit = role === "MANAGER" || role === "HEAD_CHEF";

  const load = useCallback(() => {
    if (!token) return;
    apiFetch<PurchaseLogType[]>(`/daily/purchases?date=${date}`, {}, token)
      .then(setItems)
      .catch(() => setItems([]));
  }, [token, date]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    await apiFetch("/daily/purchases", { method: "POST", body: JSON.stringify({ ...form, date }) }, token);
    setForm({ itemName: "", quantity: "", unit: "", price: "" });
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.purchases")}</p>
          <h1>{t("logs.purchaseTitle")}</h1>
        </div>
      </div>
      {canEdit && (
        <article className="card">
          <form className="grid four-col" onSubmit={submit}>
            <label className="input">
              <span>{t("shopping.item")}</span>
              <input value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("shopping.quantity")}</span>
              <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>{t("shopping.unit")}</span>
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
            </label>
            <label className="input">
              <span>{t("logs.price")}</span>
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
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
              {item.itemName} {item.quantity} {item.unit} {item.price && `- ${item.price}`}
            </div>
          ))}
          {items.length === 0 && <p className="status info">{t("logs.empty")}</p>}
        </div>
      </article>
    </div>
  );
}

export default PurchaseLogPage;
