import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { PeriodicTask } from "../types";

export function PeriodicTasksPage() {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [tasks, setTasks] = useState<PeriodicTask[]>([]);

  const load = useCallback(() => {
    if (!token) return;
    apiFetch<PeriodicTask[]>("/tasks", {}, token)
      .then(setTasks)
      .catch(() => setTasks([]));
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const overdueIds = useMemo(() => {
    const today = new Date();
    return tasks
      .filter((task) => {
        if (!task.lastCompletedDate) return true;
        const last = new Date(task.lastCompletedDate);
        const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        return diff > task.frequencyDays;
      })
      .map((t) => t.id);
  }, [tasks]);

  const markDone = async (id: string) => {
    if (!token) return;
    await apiFetch(`/tasks/${id}/done`, { method: "PATCH" }, token);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.tasks")}</p>
          <h1>{t("tasks.title")}</h1>
        </div>
      </div>
      <article className="card">
        <div className="stack">
          {tasks.map((task) => (
            <div key={task.id} className={`pill ghost ${overdueIds.includes(task.id) ? "danger" : ""}`}>
              <div className="row">
                <strong>{task.taskName}</strong>
                <small>{`${task.frequencyDays}d`}</small>
              </div>
              <div className="row">
                <span>{task.lastCompletedDate ? task.lastCompletedDate : "—"}</span>
                {(role === "MANAGER" || role === "HEAD_CHEF") && (
                  <button className="btn secondary" onClick={() => markDone(task.id)}>
                    {t("tasks.markDone")}
                  </button>
                )}
              </div>
            </div>
          ))}
          {tasks.length === 0 && <p className="status info">{t("status.loading")}</p>}
        </div>
      </article>
    </div>
  );
}

export default PeriodicTasksPage;
