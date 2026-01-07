import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { ChecklistRun, ChecklistType } from "../types";

type Props = {
  type: ChecklistType;
  date: string;
};

export function ChecklistPage({ type, date }: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [run, setRun] = useState<ChecklistRun | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    apiFetch<ChecklistRun>(`/checklists/${type}?date=${date}`, {}, token)
      .then(setRun)
      .catch(() => setRun(null));
  }, [token, type, date]);

  const toggle = async (idx: number) => {
    if (!token || !run) return;
    const updatedItems = run.items.map((item, i) => (i === idx ? { ...item, done: !item.done } : item));
    setRun({ ...run, items: updatedItems });
    await apiFetch(`/checklists/${type}?date=${run.date}`, { method: "PATCH", body: JSON.stringify({ items: updatedItems }) }, token);
    setStatus(t("checklists.saved"));
  };

  const titleKey = type === "open" ? "checklists.open" : type === "handover" ? "checklists.handover" : "checklists.close";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.dashboard")}</p>
          <h1>{t(titleKey)}</h1>
          <p className="lede">{t("checklists.instruction")}</p>
        </div>
      </div>
      <article className="card">
        <div className="pill-row">
          <span className="pill ghost">{date}</span>
          {status && <span className="pill success">{status}</span>}
        </div>
        <div className="stack" style={{ gap: "0.75rem", marginTop: "1rem" }}>
          {run?.items.map((item, idx) => (
            <label key={idx} className="check-row">
              <input type="checkbox" checked={item.done} onChange={() => toggle(idx)} />
              <span>{item.label}</span>
            </label>
          ))}
          {!run && <p className="status info">{t("checklists.empty")}</p>}
        </div>
      </article>
    </div>
  );
}

export default ChecklistPage;
