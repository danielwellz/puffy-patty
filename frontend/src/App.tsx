import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate
} from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.svg";
import heroGraphic from "./assets/hero.svg";

type InfoCard = { title: string; copy: string; stat?: string };

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "fa", label: "فا" }
];

type ProtectedProps = {
  token: string | null;
  role: string | null;
  allowedRoles: string[];
  children: React.ReactNode;
};

function ProtectedRoute({ token, role, allowedRoles, children }: ProtectedProps) {
  if (!token || !role) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(role)) {
    return <div className="status error" style={{ marginTop: "1rem" }}>Not authorized</div>;
  }
  return <>{children}</>;
}

type DashboardProps = { role: string | null; isRTL: boolean; shifts: any[]; attendanceStatus: any | null };

function Dashboard({ role, isRTL, shifts, attendanceStatus }: DashboardProps) {
  if (role === "MANAGER") return <ManagerDashboard isRTL={isRTL} />;
  if (role === "HEAD_CHEF") return <HeadChefDashboard isRTL={isRTL} shifts={shifts} />;
  return <StaffDashboard isRTL={isRTL} shifts={shifts} attendanceStatus={attendanceStatus} />;
}

const ManagerDashboard = ({ isRTL }: { isRTL: boolean }) => (
  <div className="cards">
    <article className="card">
      <h3>{isRTL ? "گزارش امروز" : "Today at a glance"}</h3>
      <p>{isRTL ? "وظایف معوق، ورود و خروج‌ها، هشدار مواد در حال اتمام." : "Pending tasks, clock-ins, expiring items."}</p>
      <Link className="btn primary" to="/logs">{isRTL ? "مشاهده گزارش" : "View logs"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "برنامه شیفت" : "Shift schedule"}</h3>
      <p>{isRTL ? "مدیریت شیفت‌ها و نقش‌ها." : "Manage shifts and roles."}</p>
      <Link className="btn secondary" to="/schedule">{isRTL ? "مدیریت شیفت" : "Manage shifts"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "خرید و آماده‌سازی" : "Shopping & Prep"}</h3>
      <p>{isRTL ? "ویرایش لیست خرید و آماده‌سازی روز." : "Edit shopping and prep lists."}</p>
      <div className="cta-row">
        <Link className="btn secondary" to="/shopping">{isRTL ? "لیست خرید" : "Shopping"}</Link>
        <Link className="btn secondary" to="/prep">{isRTL ? "لیست آماده‌سازی" : "Prep list"}</Link>
      </div>
    </article>
  </div>
);

const HeadChefDashboard = ({ isRTL, shifts }: { isRTL: boolean; shifts: any[] }) => {
  const nextShift = shifts[0];
  return (
  <div className="cards">
    <article className="card">
      <h3>{isRTL ? "آماده‌سازی امروز" : "Today’s prep"}</h3>
      <p>{isRTL ? "لیست آماده‌سازی و دستورهای ویژه." : "Prep list and specials."}</p>
      <Link className="btn primary" to="/prep">{isRTL ? "دیدن آماده‌سازی" : "View prep"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "کارهای دوره‌ای" : "Periodic tasks"}</h3>
      <p>{isRTL ? "بررسی و تایید چک لیست‌ها." : "Review periodic tasks."}</p>
      <Link className="btn secondary" to="/tasks">{isRTL ? "مشاهده" : "View tasks"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "گزارش روزانه" : "Daily logs"}</h3>
      <p>{isRTL ? "ثبت/مشاهده خرید و هدررفت." : "View purchase/waste logs."}</p>
      <Link className="btn secondary" to="/logs">{isRTL ? "ورود به لاگ" : "Go to logs"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "شیفت بعدی" : "Next shift"}</h3>
      <p>{nextShift ? `${nextShift.date} · ${nextShift.shiftType}` : isRTL ? "شیفتی ثبت نشده" : "No shift assigned"}</p>
    </article>
  </div>
);
};

const StaffDashboard = ({ isRTL, shifts, attendanceStatus }: { isRTL: boolean; shifts: any[]; attendanceStatus: any | null }) => {
  const nextShift = shifts[0];
  return (
  <div className="cards">
    <article className="card">
      <h3>{isRTL ? "چک لیست امروز" : "Today’s checklist"}</h3>
      <p>{isRTL ? "چک لیست شروع/تحویل/پایان شیفت." : "Opening/handover/closing checklist."}</p>
      <Link className="btn primary" to="/checklist">{isRTL ? "رفتن به چک لیست" : "Go to checklist"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "شیفت من" : "My shift"}</h3>
      <p>{nextShift ? `${nextShift.date} · ${nextShift.shiftType}` : isRTL ? "شیفتی ثبت نشده" : "No shift assigned"}</p>
      <Link className="btn secondary" to="/schedule">{isRTL ? "دیدن برنامه" : "View schedule"}</Link>
    </article>
    <article className="card">
      <h3>{isRTL ? "ورود/خروج" : "Clock in/out"}</h3>
      <p>{attendanceStatus ? (isRTL ? "حاضر" : "Clocked in") : isRTL ? "ثبت نشده" : "Not clocked in"}</p>
      <Link className="btn secondary" to="/clock">{isRTL ? "ثبت حضور" : "Clock in/out"}</Link>
    </article>
  </div>
);
};

const SchedulePage = ({
  role,
  token,
  shifts,
  users,
  onRefresh
}: {
  role: string | null;
  token: string | null;
  shifts: any[];
  users: any[];
  onRefresh: () => void;
}) => {
  const [form, setForm] = useState({ date: "", shiftType: "MORNING", startTime: "08:00", endTime: "14:00", userId: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "MANAGER" || !token) return;
    await fetch("/api/shifts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
    });
    onRefresh();
  };

  const myShifts = role === "MANAGER" ? shifts : shifts;

  return (
    <div className="cards">
      <article className="card">
        <h3>Schedule</h3>
        <p>{role === "MANAGER" ? "Create and edit shifts." : "Your upcoming shifts."}</p>
        {role === "MANAGER" && (
          <form className="grid" onSubmit={handleCreate}>
            <label className="input">
              <span>Date</span>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </label>
            <label className="input">
              <span>Shift</span>
              <select value={form.shiftType} onChange={(e) => setForm({ ...form, shiftType: e.target.value })}>
                <option value="MORNING">Morning</option>
                <option value="EVENING">Evening</option>
              </select>
            </label>
            <label className="input">
              <span>Start</span>
              <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
            </label>
            <label className="input">
              <span>End</span>
              <input type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
            </label>
            <label className="input">
              <span>Assign</span>
              <select value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} required>
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.phone}
                  </option>
                ))}
              </select>
            </label>
            <button className="btn primary" type="submit">
              Save shift
            </button>
          </form>
        )}
        <div className="pill-row" style={{ marginTop: "1rem" }}>
          {myShifts.map((s) => (
            <span key={s.id} className="pill ghost">
              {s.date} · {s.shiftType} · {s.user?.name || s.user?.phone}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

const TasksPage = ({
  role,
  token,
  tasks,
  onRefresh
}: {
  role: string | null;
  token: string | null;
  tasks: any[];
  onRefresh: () => void;
}) => {
  const canToggle = role === "MANAGER" || role === "HEAD_CHEF";
  const markDone = async (id: string) => {
    if (!token || !canToggle) return;
    await fetch(`/api/tasks/${id}/done`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });
    onRefresh();
  };
  const today = new Date();
  const items = tasks.map((t) => {
    const last = t.lastCompletedDate ? new Date(t.lastCompletedDate) : null;
    const diffDays = last ? Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)) : Infinity;
    const overdue = diffDays > t.frequencyDays;
    return { ...t, overdue, diffDays };
  });
  return (
    <div className="cards">
      <article className="card">
        <h3>Periodic Tasks</h3>
        <p>Mark maintenance chores as done.</p>
        <div className="pill-row" style={{ display: "grid", gap: "8px", marginTop: "1rem" }}>
          {items.map((t) => (
            <div key={t.id} className="pill ghost" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" disabled={!canToggle} onChange={() => markDone(t.id)} />
              <div>
                <div>{t.taskName} · every {t.frequencyDays} days</div>
                <small style={{ color: t.overdue ? "red" : "inherit" }}>
                  {t.lastCompletedDate ? `Last: ${t.lastCompletedDate}` : "Never"} {t.overdue ? " (Overdue)" : ""}
                </small>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="status info">No periodic tasks.</p>}
        </div>
      </article>
    </div>
  );
};

const ShoppingPage = ({
  role,
  token,
  items,
  date,
  onRefresh
}: {
  role: string | null;
  token: string | null;
  items: any[];
  date: string;
  onRefresh: () => void;
}) => {
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", unit: "" });
  const canEdit = role === "MANAGER";

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    await fetch("/api/planning/shopping-list", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newItem, date })
    });
    setNewItem({ itemName: "", quantity: "", unit: "" });
    onRefresh();
  };

  const toggle = async (id: string, acquired: boolean) => {
    if (!token || !canEdit) return;
    await fetch(`/api/planning/shopping-list/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ acquired })
    });
    onRefresh();
  };

  return (
    <div className="cards">
      <article className="card">
        <h3>Shopping List for {date}</h3>
        {canEdit && (
          <form className="grid" onSubmit={addItem}>
            <label className="input">
              <span>Item</span>
              <input value={newItem.itemName} onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>Quantity</span>
              <input value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>Unit</span>
              <input value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })} />
            </label>
            <button className="btn primary" type="submit">Add</button>
          </form>
        )}
        <div className="pill-row" style={{ marginTop: "1rem", display: "grid", gap: "8px" }}>
          {items.map((i) => (
            <label key={i.id} className="pill ghost" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" checked={i.acquired} onChange={(e) => toggle(i.id, e.target.checked)} disabled={!canEdit} />
              <span>{i.itemName} {i.quantity} {i.unit}</span>
            </label>
          ))}
          {items.length === 0 && <p className="status info">No shopping items yet.</p>}
        </div>
      </article>
    </div>
  );
};

const PrepPage = ({
  role,
  token,
  items,
  date,
  onRefresh
}: {
  role: string | null;
  token: string | null;
  items: any[];
  date: string;
  onRefresh: () => void;
}) => {
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", unit: "" });

  const canEdit = role === "MANAGER" || role === "HEAD_CHEF";
  const canToggle = role === "MANAGER" || role === "HEAD_CHEF" || role === "KITCHEN_STAFF";

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !canEdit) return;
    await fetch("/api/planning/prep-list", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newItem, date })
    });
    setNewItem({ itemName: "", quantity: "", unit: "" });
    onRefresh();
  };

  const generateTemplate = async () => {
    if (!token || !canEdit) return;
    await fetch("/api/planning/prep-list", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ template: true, date })
    });
    onRefresh();
  };

  const toggle = async (id: string, done: boolean) => {
    if (!token || !canToggle) return;
    await fetch(`/api/planning/prep-list/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ done })
    });
    onRefresh();
  };

  return (
    <div className="cards">
      <article className="card">
        <h3>Prep List for {date}</h3>
        {canEdit && (
          <div className="cta-row" style={{ marginBottom: "0.75rem" }}>
            <button className="btn secondary" onClick={generateTemplate}>Use daily template</button>
          </div>
        )}
        {canEdit && (
          <form className="grid" onSubmit={addItem}>
            <label className="input">
              <span>Item</span>
              <input value={newItem.itemName} onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>Quantity</span>
              <input value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>Unit</span>
              <input value={newItem.unit} onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })} />
            </label>
            <button className="btn primary" type="submit">Add</button>
          </form>
        )}
        <div className="pill-row" style={{ marginTop: "1rem", display: "grid", gap: "8px" }}>
          {items.map((i) => (
            <label key={i.id} className="pill ghost" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" checked={i.done} onChange={(e) => toggle(i.id, e.target.checked)} disabled={!canToggle} />
              <span>{i.itemName} {i.quantity} {i.unit}</span>
            </label>
          ))}
          {items.length === 0 && <p className="status info">No prep items yet.</p>}
        </div>
      </article>
    </div>
  );
};

const LogsPage = ({
  role,
  token,
  purchases,
  waste,
  date,
  onRefresh
}: {
  role: string | null;
  token: string | null;
  purchases: any[];
  waste: any[];
  date: string;
  onRefresh: () => void;
}) => {
  const [purchaseForm, setPurchaseForm] = useState({ itemName: "", quantity: "", unit: "", price: "" });
  const [wasteForm, setWasteForm] = useState({ itemName: "", quantity: "", reason: "" });

  const canPurchase = role === "MANAGER" || role === "HEAD_CHEF";
  const canWaste = role === "MANAGER" || role === "HEAD_CHEF";

  const submitPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !canPurchase) return;
    await fetch("/api/daily/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...purchaseForm, date })
    });
    setPurchaseForm({ itemName: "", quantity: "", unit: "", price: "" });
    onRefresh();
  };

  const submitWaste = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !canWaste) return;
    await fetch("/api/daily/waste", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...wasteForm, date })
    });
    setWasteForm({ itemName: "", quantity: "", reason: "" });
    onRefresh();
  };

  return (
    <div className="cards">
      <article className="card">
        <h3>Daily Purchases ({date})</h3>
        {canPurchase && (
          <form className="grid" onSubmit={submitPurchase}>
            <label className="input">
              <span>Item</span>
              <input value={purchaseForm.itemName} onChange={(e) => setPurchaseForm({ ...purchaseForm, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>Quantity</span>
              <input value={purchaseForm.quantity} onChange={(e) => setPurchaseForm({ ...purchaseForm, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>Unit</span>
              <input value={purchaseForm.unit} onChange={(e) => setPurchaseForm({ ...purchaseForm, unit: e.target.value })} />
            </label>
            <label className="input">
              <span>Price</span>
              <input value={purchaseForm.price} onChange={(e) => setPurchaseForm({ ...purchaseForm, price: e.target.value })} />
            </label>
            <button className="btn primary" type="submit">Add</button>
          </form>
        )}
        <div className="pill-row" style={{ marginTop: "1rem", display: "grid", gap: "8px" }}>
          {purchases.map((p) => (
            <div key={p.id} className="pill ghost">
              {p.itemName} {p.quantity} {p.unit} {p.price ? `- ${p.price}` : ""}
            </div>
          ))}
          {purchases.length === 0 && <p className="status info">No purchases logged.</p>}
        </div>
      </article>

      <article className="card">
        <h3>Daily Waste ({date})</h3>
        {canWaste && (
          <form className="grid" onSubmit={submitWaste}>
            <label className="input">
              <span>Item</span>
              <input value={wasteForm.itemName} onChange={(e) => setWasteForm({ ...wasteForm, itemName: e.target.value })} required />
            </label>
            <label className="input">
              <span>Quantity</span>
              <input value={wasteForm.quantity} onChange={(e) => setWasteForm({ ...wasteForm, quantity: e.target.value })} />
            </label>
            <label className="input">
              <span>Reason</span>
              <input value={wasteForm.reason} onChange={(e) => setWasteForm({ ...wasteForm, reason: e.target.value })} required />
            </label>
            <button className="btn primary" type="submit">Add</button>
          </form>
        )}
        <div className="pill-row" style={{ marginTop: "1rem", display: "grid", gap: "8px" }}>
          {waste.map((w) => (
            <div key={w.id} className="pill ghost">
              {w.itemName} {w.quantity} — {w.reason}
            </div>
          ))}
          {waste.length === 0 && <p className="status info">No waste logged.</p>}
        </div>
      </article>
    </div>
  );
};

const RecipesPage = () => (
  <div className="cards">
    <article className="card">
      <h3>Recipes</h3>
      <p>Read-only recipes; future filters per role.</p>
    </article>
  </div>
);

const ChecklistPage = ({ role }: { role: string | null }) => (
  <div className="cards">
    <article className="card">
      <h3>Checklist</h3>
      <p>{role === "KITCHEN_STAFF" ? "Mark steps as done." : "View checklist items."}</p>
    </article>
  </div>
);

const ClockPage = ({ token, status, onRefresh }: { token: string | null; status: any; onRefresh: () => void }) => {
  const clock = async (path: "clock-in" | "clock-out") => {
    if (!token) return;
    await fetch(`/api/attendance/${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
    });
    onRefresh();
  };

  return (
    <div className="cards">
      <article className="card">
        <h3>Clock In/Out</h3>
        {status ? <p className="status info">Clocked in since {new Date(status.clockInTime).toLocaleTimeString()}</p> : <p>Not clocked in</p>}
        {!status && (
          <button className="btn primary" onClick={() => clock("clock-in")}>
            Clock In
          </button>
        )}
        {status && (
          <button className="btn secondary" style={{ marginTop: "0.5rem" }} onClick={() => clock("clock-out")}>
            Clock Out
          </button>
        )}
      </article>
    </div>
  );
};

const ExpirationPage = ({ info }: { info: { item: string; shelf: string }[] }) => (
  <div className="cards">
    <article className="card">
      <h3>Expiration Guide</h3>
      <p>Reference shelf-life for key items.</p>
      <div className="pill-row" style={{ display: "grid", gap: "8px", marginTop: "1rem" }}>
        {info.map((i) => (
          <div key={i.item} className="pill ghost">
            <strong>{i.item}</strong> — {i.shelf}
          </div>
        ))}
      </div>
    </article>
  </div>
);

function AppContent() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const isRTL = direction === "rtl";
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [authStep, setAuthStep] = useState<"send" | "verify" | "password" | "authed">("send");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasPassword, setHasPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [shifts, setShifts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<any | null>(null);
  const [shoppingItems, setShoppingItems] = useState<any[]>([]);
  const [prepItems, setPrepItems] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [waste, setWaste] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const expirationInfo = [
    { item: "Raw ground beef", shelf: "2-3 days (chilled)" },
    { item: "Marinated chicken", shelf: "Same day" },
    { item: "Parmesan dip", shelf: "3 days chilled" },
    { item: "Pizza dough", shelf: "48h chilled" },
    { item: "Fresh herbs", shelf: "2 days" }
  ];

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
    document.body.classList.toggle("rtl", isRTL);
  }, [direction, i18n.language, isRTL]);

  const categories = t("categories", { returnObjects: true }) as Record<string, string>;
  const sustainKeys: Array<"carbon" | "water" | "local"> = ["carbon", "water", "local"];
  const sustainCards: InfoCard[] = sustainKeys.map((key) =>
    t(`sustain.cards.${key}`, { returnObjects: true }) as InfoCard
  );
  const aboutCards: InfoCard[] = [
    t("about.quality", { returnObjects: true }) as InfoCard,
    t("about.sauces", { returnObjects: true }) as InfoCard,
    t("about.community", { returnObjects: true }) as InfoCard
  ];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    if (!token) {
      setBranchId(null);
      return;
    }
    try {
      const decoded = jwtDecode<{ role?: string; branchId?: string }>(token);
      if (decoded.role) setRole(decoded.role);
      if (decoded.branchId) setBranchId(decoded.branchId);
    } catch {
      /* ignore */
    }
  }, [token]);

  const decodedRole = role;

  const callApi = async (path: string, payload: unknown, authToken?: string) => {
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || "Request failed");
    }
    return data;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await callApi("auth/send-code", { phone });
      setAuthStep("verify");
      setMessage(i18n.language === "fa" ? "کد ارسال شد." : "Code sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const result = await callApi("auth/verify-code", { phone, code });
      setToken(result.token);
      setRole(result.role);
      setHasPassword(result.hasPassword);
      setIsNewUser(result.isNewUser);
      setAuthStep(result.hasPassword ? "authed" : "password");
      setMessage(i18n.language === "fa" ? "ورود انجام شد." : "Logged in.");
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await callApi("auth/set-password", { password }, token);
      setAuthStep("authed");
      setHasPassword(true);
      setMessage(i18n.language === "fa" ? "رمز ثبت شد." : "Password saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set password");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const result = await callApi("auth/login", { phone, password });
      setToken(result.token);
      setRole(result.role);
      setAuthStep("authed");
      setMessage(i18n.language === "fa" ? "ورود انجام شد." : "Logged in.");
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const navLinks = useMemo(() => {
    if (!decodedRole) {
      return [
        { to: "/", label: t("nav.menu") },
        { to: "/#story", label: t("nav.story") },
        { to: "/#contact", label: t("nav.contact") }
      ];
    }
    if (decodedRole === "MANAGER") {
      return [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/schedule", label: "Shift Schedule" },
        { to: "/tasks", label: "Periodic Tasks" },
        { to: "/shopping", label: "Shopping" },
        { to: "/prep", label: "Prep" },
        { to: "/logs", label: "Daily Logs" },
        { to: "/expiration", label: "Expiration" }
      ];
    }
    if (decodedRole === "HEAD_CHEF") {
      return [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/prep", label: "Prep" },
        { to: "/tasks", label: "Tasks" },
        { to: "/logs", label: "Daily Logs" },
        { to: "/recipes", label: "Recipes" },
        { to: "/expiration", label: "Expiration" }
      ];
    }
    return [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/schedule", label: "My Schedule" },
      { to: "/checklist", label: "Checklist" },
      { to: "/clock", label: "Clock In/Out" },
      { to: "/recipes", label: "Recipes" }
    ];
  }, [decodedRole, t]);

  const refreshShifts = () => {
    if (!token || !decodedRole) return;
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`/api/shifts?startDate=${selectedDate}&endDate=${selectedDate}`, { headers })
      .then((res) => res.json())
      .then((data) => setShifts(data || []))
      .catch(() => {});
  };

  const refreshAttendance = () => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };
    fetch("/api/attendance/status", { headers })
      .then((res) => res.json())
      .then((data) => setAttendanceStatus(data && data.id ? data : null))
      .catch(() => setAttendanceStatus(null));
  };

  useEffect(() => {
    if (!token || !decodedRole) return;
    const headers = { Authorization: `Bearer ${token}` };
    if (decodedRole === "MANAGER") {
      fetch("/api/users", { headers })
        .then((res) => res.json())
        .then((data) => setUsers(data || []))
        .catch(() => {});
    }
    refreshShifts();
    refreshAttendance();
    fetch(`/api/planning/shopping-list?date=${selectedDate}`, { headers })
      .then((res) => res.json())
      .then((data) => setShoppingItems(data || []))
      .catch(() => {});
    fetch(`/api/planning/prep-list?date=${selectedDate}`, { headers })
      .then((res) => res.json())
      .then((data) => setPrepItems(data || []))
      .catch(() => {});
    fetch(`/api/tasks`, { headers })
      .then((res) => res.json())
      .then((data) => setTasks(data || []))
      .catch(() => {});
    fetch(`/api/daily/purchases?date=${selectedDate}`, { headers })
      .then((res) => res.json())
      .then((data) => setPurchases(data || []))
      .catch(() => {});
    fetch(`/api/daily/waste?date=${selectedDate}`, { headers })
      .then((res) => res.json())
      .then((data) => setWaste(data || []))
      .catch(() => {});
  }, [token, decodedRole, selectedDate]);

  return (
    <div className={`app ${isRTL ? "rtl" : ""}`}>
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="Puffy Patty" />
          <div className="brand-meta">
            <p className="brand-kicker">{t("hero.eyebrow")}</p>
            <p className="brand-location">{t("hero.location")}</p>
          </div>
        </div>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="badge">{t("meta.hours")}</span>
        {branchId && <span className="badge">Branch: {branchId}</span>}
        <div className="lang-switch" role="group" aria-label="Switch language">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={i18n.language === lang.code ? "active" : ""}
              type="button"
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </header>

      <main className="shell">
        <div className="section-heading" style={{ marginBottom: "1rem" }}>
          {token && (
            <label className="input" style={{ maxWidth: 240 }}>
              <span>{isRTL ? "تاریخ" : "Date"}</span>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </label>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero" id="home">
                  <div className="hero-copy">
                    <p className="eyebrow">{t("menu.eyebrow")}</p>
                    <h1 className="hero-title">{t("hero.tagline")}</h1>
                    <p className="lede">{t("menu.copy")}</p>
                    <div className="cta-row">
                      <a className="btn primary" href="#menu">
                        {t("hero.ctaPrimary")}
                      </a>
                      <a className="btn secondary" href="#contact">
                        {t("hero.ctaSecondary")}
                      </a>
                    </div>
                    <div className="hero-card">
                      <span className="pill">{t("hero.cardLabel")}</span>
                      <p>{t("hero.cardCopy")}</p>
                      <div className="meta-line">
                        <span>{t("meta.hours")}</span>
                        <span>· {t("meta.currency")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hero-visual" aria-hidden="true">
                    <img src={heroGraphic} alt="" />
                    <div className="tile">{t("menu.tariff")}</div>
                  </div>
                </section>

                <section className="section" id="menu">
                  <div className="section-heading">
                    <p className="eyebrow">{t("menu.eyebrow")}</p>
                    <h2>{t("menu.title")}</h2>
                    <p className="lede">{t("menu.copy")}</p>
                  </div>
                  <div className="pill-row" role="list">
                    {Object.entries(categories).map(([key, label]) => (
                      <span key={key} className="pill ghost" role="listitem">
                        {label}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="section" id="story">
                  <div className="section-heading">
                    <p className="eyebrow">{t("about.eyebrow")}</p>
                    <h2>{t("about.title")}</h2>
                    <p className="lede">{t("about.copy")}</p>
                  </div>
                  <div className="cards">
                    {aboutCards.map((card) => (
                      <article className="card" key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.copy}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="section" id="sustainability">
                  <div className="section-heading">
                    <p className="eyebrow">{t("sustain.eyebrow")}</p>
                    <h2>{t("sustain.title")}</h2>
                    <p className="lede">{t("sustain.copy")}</p>
                  </div>
                  <div className="cards">
                    {sustainCards.map((card) => (
                      <article className="card" key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.copy}</p>
                        {card.stat && (
                          <div className="stat">
                            <span>{card.stat}</span>
                            <small>{t("sustain.eyebrow")}</small>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </section>

                <section className="section auth-section" id="login">
                  <div className="section-heading">
                    <p className="eyebrow">Login</p>
                    <h2>{isRTL ? "ورود با پیامک" : "SMS login"}</h2>
                    <p className="lede">
                      {isRTL
                        ? "شماره همراهت را وارد کن، کد دریافت کن و رمز بساز."
                        : "Enter your phone, get a code, and set a password for next time."}
                    </p>
                  </div>
                  <div className="auth-card">
                    <form onSubmit={authStep === "verify" ? handleVerifyCode : handleSendCode}>
                      <label className="input">
                        <span>{isRTL ? "شماره همراه" : "Phone number"}</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={isRTL ? "09xxxxxxxxx" : "+98..."}
                          required
                        />
                      </label>

                      {authStep !== "send" && (
                        <label className="input">
                          <span>{isRTL ? "کد" : "Code"}</span>
                          <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="1234"
                            required
                          />
                        </label>
                      )}

                      <button className="btn primary" type="submit" disabled={loading}>
                        {authStep === "send"
                          ? isRTL
                            ? "ارسال کد"
                            : "Send code"
                          : isRTL
                            ? "تأیید کد"
                            : "Verify code"}
                      </button>
                    </form>

                    <div className="divider">
                      <span>{isRTL ? "یا" : "or"}</span>
                    </div>

                    <form onSubmit={handlePasswordLogin}>
                      <label className="input">
                        <span>{isRTL ? "رمز عبور" : "Password"}</span>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={isRTL ? "••••••" : "Your password"}
                          required
                        />
                      </label>
                      <button className="btn secondary" type="submit" disabled={loading}>
                        {isRTL ? "ورود با رمز" : "Login with password"}
                      </button>
                    </form>

                    {authStep === "password" && token && (
                      <form onSubmit={handleSetPassword}>
                        <label className="input">
                          <span>{isRTL ? "رمز جدید" : "Set password"}</span>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isRTL ? "••••••" : "Choose a password"}
                            required
                          />
                        </label>
                        <button className="btn primary" type="submit" disabled={loading}>
                          {isRTL ? "ثبت رمز" : "Save password"}
                        </button>
                      </form>
                    )}

                    {message && <p className="status success">{message}</p>}
                    {error && <p className="status error">{error}</p>}
                    {token && (
                      <p className="status token">
                        {isRTL ? "توکن دریافت شد." : "JWT issued."}{" "}
                        <span className="pill ghost">{token.slice(0, 18)}...</span>
                      </p>
                    )}
                    {isNewUser && <p className="status info">{isRTL ? "کاربر جدید" : "Welcome, new user."}</p>}
                    {!hasPassword && authStep === "authed" && (
                      <p className="status info">
                        {isRTL ? "می‌توانید رمز هم تنظیم کنید." : "You can set a password above for faster logins."}
                      </p>
                    )}
                    {decodedRole && (
                      <p className="status info">
                        {isRTL ? "نقش شما:" : "Your role:"} <strong>{decodedRole}</strong>
                      </p>
                    )}
                  </div>
                </section>

                <section className="section" id="roles">
                  <div className="section-heading">
                    <p className="eyebrow">{isRTL ? "سطوح دسترسی" : "Role-based access"}</p>
                    <h2>{isRTL ? "آنچه می‌بینی بسته به نقش است" : "What you see depends on your role"}</h2>
                    <p className="lede">
                      {isRTL
                        ? "مدیران می‌توانند نقش‌ها را تغییر دهند، سرآشپزها دستورها را ببینند، و کارکنان آشپزخانه فقط وظایف خود را می‌بینند."
                        : "Managers can change roles, head chefs can view recipes, and kitchen staff only see their tasks."}
                    </p>
                  </div>
                  <div className="cards">
                    <article className="card">
                      <h3>{isRTL ? "پنل مدیریت" : "Manager Panel"}</h3>
                      {decodedRole === "MANAGER" ? (
                        <p>{isRTL ? "می‌توانید نقش‌ها را ارتقا دهید و داده‌ها را ویرایش کنید." : "You can promote roles and edit data."}</p>
                      ) : (
                        <p className="status error">
                          {isRTL ? "دسترسی ندارید." : "Not authorized for manager tools."}
                        </p>
                      )}
                    </article>
                    <article className="card">
                      <h3>{isRTL ? "سرآشپز" : "Head Chef"}</h3>
                      {decodedRole === "HEAD_CHEF" || decodedRole === "MANAGER" ? (
                        <p>{isRTL ? "به دستورها و تایید روزانه دسترسی دارید." : "Can access recipes and approve daily logs."}</p>
                      ) : (
                        <p className="status error">
                          {isRTL ? "دسترسی ندارید." : "Not authorized for head chef area."}
                        </p>
                      )}
                    </article>
                    <article className="card">
                      <h3>{isRTL ? "کادر آشپزخانه" : "Kitchen Staff"}</h3>
                      {decodedRole ? (
                        <p>
                          {isRTL
                            ? "می‌توانید چک‌لیست‌ها و وظایف روزانه خود را ببینید."
                            : "You can see checklists and your daily tasks."}
                        </p>
                      ) : (
                        <p className="status error">{isRTL ? "ابتدا وارد شوید." : "Login to view your tasks."}</p>
                      )}
                    </article>
                  </div>
                </section>

                <section className="section" id="manager-only">
                  <div className="section-heading">
                    <p className="eyebrow">{isRTL ? "مدیریت" : "Manager-only"}</p>
                    <h2>{isRTL ? "شیفت، کارهای دوره‌ای، خرید، آماده‌سازی" : "Shifts, tasks, shopping, prep"}</h2>
                    <p className="lede">
                      {isRTL
                        ? "ویرایش فقط برای مدیران فعال است. سایر نقش‌ها می‌توانند مشاهده کنند."
                        : "Editing is manager-only. Others can view."}
                    </p>
                  </div>
                  <div className="cards">
                    <article className={`card ${decodedRole === "MANAGER" ? "" : "manager-only"}`} data-lock="Managers only">
                      <h3>{isRTL ? "برنامه شیفت" : "Shift Schedule"}</h3>
                      <p>{isRTL ? "مشاهده برای همه، ویرایش فقط مدیر." : "Viewable by all, editable by manager only."}</p>
                      <div className="cta-row">
                        <button className="btn primary" disabled={decodedRole !== "MANAGER"}>
                          {isRTL ? "افزودن شیفت" : "Add Shift"}
                        </button>
                        {decodedRole !== "MANAGER" && (
                          <span className="status error">{isRTL ? "فقط مدیر" : "Managers only"}</span>
                        )}
                      </div>
                    </article>
                    <article className={`card ${decodedRole === "MANAGER" ? "" : "manager-only"}`} data-lock="Managers only">
                      <h3>{isRTL ? "کارهای دوره‌ای" : "Periodic Tasks"}</h3>
                      <p>{isRTL ? "تنها مدیر می‌تواند اضافه یا حذف کند." : "Only manager can add/remove."}</p>
                      <div className="cta-row">
                        <button className="btn secondary" disabled={decodedRole !== "MANAGER"}>
                          {isRTL ? "ویرایش کار" : "Edit Task"}
                        </button>
                      </div>
                    </article>
                    <article className={`card ${decodedRole === "MANAGER" ? "" : "manager-only"}`} data-lock="Managers only">
                      <h3>{isRTL ? "لیست خرید" : "Shopping List"}</h3>
                      <p>{isRTL ? "سایر نقش‌ها فقط مشاهده می‌کنند." : "Others can view only."}</p>
                      <div className="cta-row">
                        <button className="btn secondary" disabled={decodedRole !== "MANAGER"}>
                          {isRTL ? "افزودن آیتم" : "Add Item"}
                        </button>
                      </div>
                    </article>
                    <article className={`card ${decodedRole === "MANAGER" ? "" : "manager-only"}`} data-lock="Managers only">
                      <h3>{isRTL ? "لیست آماده‌سازی" : "Prep List"}</h3>
                      <p>{isRTL ? "چک لیست همه، ویرایش مدیر." : "Checklists for all, edits for manager."}</p>
                      <div className="cta-row">
                        <button className="btn secondary" disabled={decodedRole !== "MANAGER"}>
                          {isRTL ? "ویرایش" : "Edit"}
                        </button>
                      </div>
                    </article>
                  </div>
                </section>

                <section className="section" id="contact">
                  <div className="section-heading">
                    <p className="eyebrow">{t("contact.eyebrow")}</p>
                    <h2>{t("contact.title")}</h2>
                    <p className="lede">{t("contact.copy")}</p>
                  </div>
                  <div className="contact-grid">
                    <div className="contact-card">
                      <strong>{t("contact.address")}</strong>
                      <p>{t("contact.hours")}</p>
                    </div>
                    <div className="contact-card">
                      <strong>{t("contact.phone")}</strong>
                      <p>{t("contact.instagram")}</p>
                    </div>
                  </div>
                </section>

                <footer className="footer">
                  <p>{t("footer.note")}</p>
                </footer>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                <Dashboard role={decodedRole} isRTL={isRTL} shifts={shifts} attendanceStatus={attendanceStatus} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                <SchedulePage role={decodedRole} token={token} shifts={shifts} users={users} onRefresh={() => refreshShifts()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                <TasksPage role={decodedRole} token={token} tasks={tasks} onRefresh={() => {
                  if (!token) return;
                  fetch(`/api/tasks`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => res.json())
                    .then((data) => setTasks(data || []));
                }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER"]}>
                <ShoppingPage role={decodedRole} token={token} items={shoppingItems} date={selectedDate} onRefresh={() => {
                  if (!token) return;
                  fetch(`/api/planning/shopping-list?date=${selectedDate}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => res.json())
                    .then((data) => setShoppingItems(data || []));
                }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prep"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                <PrepPage role={decodedRole} token={token} items={prepItems} date={selectedDate} onRefresh={() => {
                  if (!token) return;
                  fetch(`/api/planning/prep-list?date=${selectedDate}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((res) => res.json())
                    .then((data) => setPrepItems(data || []));
                }} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                <LogsPage
                  role={decodedRole}
                  token={token}
                  purchases={purchases}
                  waste={waste}
                  date={selectedDate}
                  onRefresh={() => {
                    if (!token) return;
                    const headers = { Authorization: `Bearer ${token}` };
                    fetch(`/api/daily/purchases?date=${selectedDate}`, { headers })
                      .then((res) => res.json())
                      .then((data) => setPurchases(data || []));
                    fetch(`/api/daily/waste?date=${selectedDate}`, { headers })
                      .then((res) => res.json())
                      .then((data) => setWaste(data || []));
                  }}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                <RecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expiration"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                <ExpirationPage info={expirationInfo} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checklist"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["KITCHEN_STAFF", "MANAGER", "HEAD_CHEF"]}>
                <ChecklistPage role={decodedRole} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clock"
            element={
              <ProtectedRoute token={token} role={decodedRole} allowedRoles={["KITCHEN_STAFF", "MANAGER", "HEAD_CHEF"]}>
                <ClockPage token={token} status={attendanceStatus} onRefresh={() => refreshAttendance()} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
