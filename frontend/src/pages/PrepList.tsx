import { FormEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { PrepListItem } from "../types";

type Props = {
  date: string;
};

export function PrepListPage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [items, setItems] = useState<PrepListItem[]>([]);
  const [template, setTemplate] = useState<string[]>([]);
  const [form, setForm] = useState({ itemName: "", quantity: "", unit: "" });
  const [error, setError] = useState<string | null>(null);

  const canEdit = role === "MANAGER" || role === "HEAD_CHEF";
  const canToggle = canEdit || role === "KITCHEN_STAFF";

  const load = useCallback(() => {
    if (!token) return;
    apiFetch<PrepListItem[]>(`/planning/prep-list?date=${date}`, {}, token)
      .then(setItems)
      .catch(() => setItems([]));
    apiFetch<{ itemName: string }[]>(`/planning/prep-template`, {}, token)
      .then((data) => setTemplate(data.map((d) => d.itemName)))
      .catch(() => setTemplate([]));
  }, [token, date]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    setError(null);
    try {
      await apiFetch("/planning/prep-list", { method: "POST", body: JSON.stringify({ ...form, date }) }, token);
      setForm({ itemName: "", quantity: "", unit: "" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    }
  };

  const handleGenerate = async () => {
    if (!token || !canEdit) return;
    await apiFetch("/planning/prep-list", { method: "POST", body: JSON.stringify({ template: true, date }) }, token);
    load();
  };

  const toggle = async (id: string, done: boolean) => {
    if (!token || !canToggle) return;
    await apiFetch(`/planning/prep-list/${id}`, { method: "PATCH", body: JSON.stringify({ done }) }, token);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.prep")}</p>
          <h1>{t("prep.title")}</h1>
        </div>
        {canEdit && (
          <button className="btn secondary" onClick={handleGenerate}>
            {t("prep.template")}
          </button>
        )}
      </div>
      {template.length > 0 && (
        <div className="pill-row">
          {template.map((name) => (
            <span key={name} className="pill ghost">
              {name}
            </span>
          ))}
        </div>
      )}
      {canEdit && (
        <article className="card">
          <h3>{t("prep.add")}</h3>
          <form className="grid three-col" onSubmit={handleAdd}>
            <label className="input">
              <span>{t("prep.item")}</span>
              <input value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("prep.quantity")}</span>
              <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>{t("prep.unit")}</span>
              <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
            </label>
            <button className="btn primary" type="submit">
              {t("buttons.add")}
            </button>
          </form>
          {error && <p className="status error">{error}</p>}
        </article>
      )}
      <div className="cards">
        <article className="card">
          <div className="stack">
            {items.map((item) => (
              <label key={item.id} className="check-row">
                <input type="checkbox" checked={item.done} onChange={(e) => toggle(item.id, e.target.checked)} disabled={!canToggle} />
                <span>
                  {item.itemName} {item.quantity} {item.unit}
                </span>
              </label>
            ))}
            {items.length === 0 && <p className="status info">{t("prep.empty")}</p>}
          </div>
        </article>
      </div>
    </div>
  );
}

export default PrepListPage;
