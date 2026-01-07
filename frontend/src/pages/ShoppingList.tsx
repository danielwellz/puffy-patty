import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { ShoppingListItem } from "../types";

type Props = {
  date: string;
};

type ShoppingTemplateItem = { id: string; category: string; itemName: string };

export function ShoppingListPage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [template, setTemplate] = useState<ShoppingTemplateItem[]>([]);
  const [form, setForm] = useState({ itemName: "", quantity: "", unit: "" });

  const canEdit = role === "MANAGER";

  const load = useCallback(() => {
    if (!token) return;
    apiFetch<ShoppingListItem[]>(`/planning/shopping-list?date=${date}`, {}, token)
      .then(setItems)
      .catch(() => setItems([]));
    apiFetch<ShoppingTemplateItem[]>("/planning/shopping-template", {}, token)
      .then(setTemplate)
      .catch(() => setTemplate([]));
  }, [token, date]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    await apiFetch("/planning/shopping-list", { method: "POST", body: JSON.stringify({ ...form, date }) }, token);
    setForm({ itemName: "", quantity: "", unit: "" });
    load();
  };

  const handleGenerate = async () => {
    if (!token || !canEdit) return;
    await apiFetch("/planning/shopping-list", { method: "POST", body: JSON.stringify({ template: true, date }) }, token);
    load();
  };

  const toggle = async (id: string, acquired: boolean) => {
    if (!token || !canEdit) return;
    await apiFetch(`/planning/shopping-list/${id}`, { method: "PATCH", body: JSON.stringify({ acquired }) }, token);
    load();
  };

  const grouped = useMemo(() => {
    return items.reduce<Record<string, ShoppingListItem[]>>((acc, item) => {
      const category = item.category || "general";
      acc[category] = acc[category] ? [...acc[category], item] : [item];
      return acc;
    }, {});
  }, [items]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.shopping")}</p>
          <h1>{t("shopping.title")}</h1>
        </div>
        {canEdit && (
          <button className="btn secondary" onClick={handleGenerate}>
            {t("shopping.template")}
          </button>
        )}
      </div>
      {canEdit && (
        <article className="card">
          <h3>{t("shopping.add")}</h3>
          <form className="grid three-col" onSubmit={handleAdd}>
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
            <button className="btn primary" type="submit">
              {t("buttons.add")}
            </button>
          </form>
        </article>
      )}
      <div className="cards">
        {Object.entries(grouped).map(([category, list]) => (
          <article key={category} className="card">
            <h3>{category}</h3>
            <div className="stack">
              {list.map((item) => (
                <label key={item.id} className="check-row">
                  <input type="checkbox" checked={item.acquired} onChange={(e) => toggle(item.id, e.target.checked)} disabled={!canEdit} />
                  <span>
                    {item.itemName} {item.quantity} {item.unit}
                  </span>
                </label>
              ))}
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <article className="card">
            <p className="status info">{t("shopping.empty")}</p>
          </article>
        )}
      </div>
      {template.length > 0 && (
        <article className="card">
          <h3>{t("shopping.title")}</h3>
          <div className="chip-grid">
            {template.map((item) => (
              <span key={item.id} className="pill ghost">
                {item.category} · {item.itemName}
              </span>
            ))}
          </div>
        </article>
      )}
    </div>
  );
}

export default ShoppingListPage;
