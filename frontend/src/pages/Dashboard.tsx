import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { ChecklistRun, PeriodicTask, PrepListItem, Shift } from "../types";

type Props = {
  date: string;
};

export function DashboardPage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [prep, setPrep] = useState<PrepListItem[]>([]);
  const [tasks, setTasks] = useState<PeriodicTask[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [checklist, setChecklist] = useState<ChecklistRun | null>(null);

  useEffect(() => {
    if (!token) return;
    apiFetch<PeriodicTask[]>("/tasks", {}, token)
      .then(setTasks)
      .catch(() => {});
    apiFetch<PrepListItem[]>(`/planning/prep-list?date=${date}`, {}, token)
      .then(setPrep)
      .catch(() => {});
    apiFetch<Shift[]>(`/shifts?startDate=${date}&endDate=${date}`, {}, token)
      .then(setShifts)
      .catch(() => {});
    apiFetch<ChecklistRun>(`/checklists/open?date=${date}`, {}, token)
      .then(setChecklist)
      .catch(() => {});
  }, [token, date]);

  const nextShift = useMemo(() => (shifts.length ? shifts[0] : null), [shifts]);
  const overdueTasks = useMemo(() => {
    const today = new Date();
    return tasks.filter((t) => {
      if (!t.lastCompletedDate) return true;
      const last = new Date(t.lastCompletedDate);
      const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      return diff > t.frequencyDays;
    });
  }, [tasks]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("layout.welcome")}</p>
          <h1>{t("dashboard.heading")}</h1>
        </div>
        {nextShift && (
          <div className="pill ghost">
            {t("dashboard.nextShift")}: {nextShift.date} · {nextShift.shiftType === "MORNING" ? t("schedule.morning") : t("schedule.evening")}
          </div>
        )}
      </div>
      <div className="cards">
        <article className="card">
          <h3>{t("dashboard.checklist")}</h3>
          <p>{checklist ? `${checklist.items.filter((i) => i.done).length}/${checklist.items.length}` : t("status.loading")}</p>
          <div className="cta-row">
            <Link className="btn primary" to="/checklists/open">
              {t("dashboard.view")}
            </Link>
          </div>
        </article>
        <article className="card">
          <h3>{t("dashboard.prepReady")}</h3>
          <p>{prep.length ? `${prep.filter((p) => p.done).length}/${prep.length}` : t("status.loading")}</p>
          <div className="cta-row">
            <Link className="btn secondary" to="/prep-list">
              {t("dashboard.view")}
            </Link>
          </div>
        </article>
        <article className="card">
          <h3>{t("dashboard.tasks")}</h3>
          <p>{overdueTasks.length > 0 ? `${overdueTasks.length} ${t("tasks.overdue")}` : t("status.success")}</p>
          <div className="cta-row">
            <Link className="btn secondary" to="/periodic-tasks">
              {t("dashboard.view")}
            </Link>
          </div>
        </article>
        <article className="card">
          <h3>{t("dashboard.logs")}</h3>
          <p>{t("shopping.title")}</p>
          <div className="cta-row">
            <Link className="btn secondary" to="/shopping-list">
              {t("nav.shopping")}
            </Link>
            <Link className="btn secondary" to="/prep-list">
              {t("nav.prep")}
            </Link>
          </div>
        </article>
        {role && (
          <article className="card">
            <h3>{t("dashboard.checklist")}</h3>
            <p>{t("nav.checklistClose")}</p>
            <div className="cta-row">
              <Link className="btn secondary" to="/checklists/close">
                {t("nav.checklistClose")}
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
