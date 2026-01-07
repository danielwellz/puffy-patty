import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Shift, UserSummary } from "../types";

type Props = {
  date: string;
};

type ShiftForm = {
  date: string;
  shiftType: "MORNING" | "EVENING";
  startTime: string;
  endTime: string;
  userId: string;
};

export function ShiftSchedulePage({ date }: Props) {
  const { t } = useTranslation();
  const { token, role } = useAuth();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [form, setForm] = useState<ShiftForm>({
    date,
    shiftType: "MORNING",
    startTime: "09:00",
    endTime: "17:00",
    userId: ""
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const start = date;
    const endDateObj = new Date(date);
    endDateObj.setDate(endDateObj.getDate() + 6);
    const end = endDateObj.toISOString().slice(0, 10);
    apiFetch<Shift[]>(`/shifts?startDate=${start}&endDate=${end}`, {}, token)
      .then(setShifts)
      .catch(() => {});
    if (role === "MANAGER") {
      apiFetch<UserSummary[]>("/users", {}, token)
        .then(setUsers)
        .catch(() => {});
    }
  }, [token, date, role]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, date }));
  }, [date]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await apiFetch("/shifts", { method: "POST", body: JSON.stringify(form) }, token);
      const res = await apiFetch<Shift[]>(`/shifts?startDate=${date}&endDate=${date}`, {}, token);
      setShifts(res);
      setForm((prev) => ({ ...prev, userId: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save shift");
    }
  };

  const groupedByDate = useMemo(() => {
    return shifts.reduce<Record<string, Shift[]>>((acc, shift) => {
      acc[shift.date] = acc[shift.date] ? [...acc[shift.date], shift] : [shift];
      return acc;
    }, {});
  }, [shifts]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.schedule")}</p>
          <h1>{t("schedule.title")}</h1>
        </div>
      </div>
      {role === "MANAGER" && (
        <article className="card">
          <h3>{t("schedule.create")}</h3>
          <form className="grid two-col" onSubmit={handleSubmit}>
            <label className="input">
              <span>{t("schedule.date")}</span>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("schedule.shift")}</span>
              <select
                value={form.shiftType}
                onChange={(e) => setForm({ ...form, shiftType: e.target.value as ShiftForm["shiftType"] })}
              >
                <option value="MORNING">{t("schedule.morning")}</option>
                <option value="EVENING">{t("schedule.evening")}</option>
              </select>
            </label>
            <label className="input">
              <span>{t("schedule.start")}</span>
              <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("schedule.end")}</span>
              <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
            </label>
            <label className="input">
              <span>{t("schedule.assign")}</span>
              <select value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} required>
                <option value="">{t("schedule.assign")}</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.phone}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn primary" type="submit">
              {t("schedule.save")}
            </button>
          </form>
          {error && <p className="status error">{error}</p>}
        </article>
      )}
      <div className="cards">
        <article className="card">
          <h3>{t("schedule.list")}</h3>
          <div className="chip-grid">
            {Object.entries(groupedByDate).map(([day, items]) => (
              <div key={day} className="stack">
                <strong>{day}</strong>
                {items.map((s) => (
                  <div key={s.id} className="pill ghost">
                    {s.shiftType === "MORNING" ? t("schedule.morning") : t("schedule.evening")} · {s.startTime} - {s.endTime} ·{" "}
                    {s.user?.name || s.user?.phone}
                  </div>
                ))}
              </div>
            ))}
            {shifts.length === 0 && <p className="status info">{t("status.loading")}</p>}
          </div>
        </article>
      </div>
    </div>
  );
}

export default ShiftSchedulePage;
