import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Sidebar, SidebarLink } from "./components/Sidebar";
import DashboardPage from "./pages/Dashboard";
import ShiftSchedulePage from "./pages/ShiftSchedule";
import ChecklistPage from "./pages/Checklist";
import PrepListPage from "./pages/PrepList";
import ShoppingListPage from "./pages/ShoppingList";
import WasteLogPage from "./pages/WasteLog";
import PurchaseLogPage from "./pages/PurchaseLog";
import PeriodicTasksPage from "./pages/PeriodicTasks";
import ExpirationTrackerPage from "./pages/ExpirationTracker";
import RecipesPage from "./pages/Recipes";
import LoginPage from "./pages/Login";
import NotAuthorizedPage from "./pages/NotAuthorized";
import AdminReservationsPage from "./pages/AdminReservations";
import PwaLayout from "./pwa/PwaLayout";
import { PwaProvider } from "./pwa/PwaContext";
import OrderPage from "./pwa/pages/OrderPage";
import CartPage from "./pwa/pages/CartPage";
import CheckoutPage from "./pwa/pages/CheckoutPage";
import TrackOrderPage from "./pwa/pages/TrackOrderPage";
import ReservationPage from "./pwa/pages/ReservationPage";

const navLinksForRole = (role: string | null, t: (key: string) => string): SidebarLink[] => {
  if (!role) return [];
  if (role === "MANAGER") {
    return [
      { to: "/dashboard", label: t("nav.dashboard") },
      { to: "/schedule", label: t("nav.schedule") },
      { to: "/checklists/open", label: t("nav.checklistOpen") },
      { to: "/checklists/handover", label: t("nav.checklistHandover") },
      { to: "/checklists/close", label: t("nav.checklistClose") },
      { to: "/prep-list", label: t("nav.prep") },
      { to: "/shopping-list", label: t("nav.shopping") },
      { to: "/purchase-log", label: t("nav.purchases") },
      { to: "/waste-log", label: t("nav.waste") },
      { to: "/periodic-tasks", label: t("nav.tasks") },
      { to: "/expiration-tracker", label: t("nav.expiration") },
      { to: "/recipes", label: t("nav.recipes") },
      { to: "/admin/reservations", label: t("nav.reservations") }
    ];
  }
  if (role === "HEAD_CHEF") {
    return [
      { to: "/dashboard", label: t("nav.dashboard") },
      { to: "/schedule", label: t("nav.schedule") },
      { to: "/checklists/open", label: t("nav.checklistOpen") },
      { to: "/checklists/close", label: t("nav.checklistClose") },
      { to: "/prep-list", label: t("nav.prep") },
      { to: "/shopping-list", label: t("nav.shopping") },
      { to: "/purchase-log", label: t("nav.purchases") },
      { to: "/waste-log", label: t("nav.waste") },
      { to: "/periodic-tasks", label: t("nav.tasks") },
      { to: "/expiration-tracker", label: t("nav.expiration") },
      { to: "/recipes", label: t("nav.recipes") },
      { to: "/admin/reservations", label: t("nav.reservations") }
    ];
  }
  return [
    { to: "/dashboard", label: t("nav.dashboard") },
    { to: "/schedule", label: t("nav.schedule") },
    { to: "/checklists/open", label: t("nav.checklistOpen") },
    { to: "/checklists/handover", label: t("nav.checklistHandover") },
    { to: "/checklists/close", label: t("nav.checklistClose") },
    { to: "/prep-list", label: t("nav.prep") },
    { to: "/recipes", label: t("nav.recipes") },
    { to: "/expiration-tracker", label: t("nav.expiration") }
  ];
};

function StaffShell() {
  const { t } = useTranslation();
  const { token, role, branchId, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const links = useMemo(() => navLinksForRole(role, t), [role, t]);

  return (
    <>
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} branchId={branchId} role={role as any} onLogout={logout} />
      <div className="layout">
        {token && <Sidebar links={links} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <main className="content">
          {token && (
            <div className="toolbar">
              <label className="input">
                <span>{t("app.date")}</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
            </div>
          )}
          <Routes>
            <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/unauthorized" element={<NotAuthorizedPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <DashboardPage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <ShiftSchedulePage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checklists/open"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <ChecklistPage type="open" date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checklists/handover"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <ChecklistPage type="handover" date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checklists/close"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <ChecklistPage type="close" date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prep-list"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <PrepListPage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping-list"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                  <ShoppingListPage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchase-log"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                  <PurchaseLogPage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/waste-log"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                  <WasteLogPage date={date} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/periodic-tasks"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                  <PeriodicTasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expiration-tracker"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <ExpirationTrackerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF", "KITCHEN_STAFF"]}>
                  <RecipesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reservations"
              element={
                <ProtectedRoute allowedRoles={["MANAGER", "HEAD_CHEF"]}>
                  <AdminReservationsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function AppShell() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir();
    document.body.classList.toggle("rtl", i18n.dir() === "rtl");
  }, [i18n]);

  return (
    <div className={`app ${i18n.dir() === "rtl" ? "rtl" : ""}`}>
      <div className="grain" aria-hidden />
      <Routes>
        <Route
          element={
            <PwaProvider>
              <PwaLayout />
            </PwaProvider>
          }
        >
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/cart" element={<CartPage />} />
          <Route path="/order/checkout" element={<CheckoutPage />} />
          <Route path="/order/track/:code" element={<TrackOrderPage />} />
          <Route path="/order/*" element={<Navigate to="/order" replace />} />
          <Route path="/reserve" element={<ReservationPage />} />
        </Route>
        <Route path="*" element={<StaffShell />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
