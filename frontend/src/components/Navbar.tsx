import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import logo from "../assets/logo.svg";
import { UserRole } from "../types";

type Props = {
  onToggleSidebar: () => void;
  branchId?: string | null;
  role?: UserRole | null;
  onLogout: () => void;
};

export function Navbar({ onToggleSidebar, branchId, role, onLogout }: Props) {
  const { t } = useTranslation();
  return (
    <header className="topbar">
      <button className="ghost-btn mobile-only" onClick={onToggleSidebar} aria-label={t("layout.mobileMenu")}>
        ☰
      </button>
      <div className="brand">
        <img className="brand-logo" src={logo} alt="Puffy Patty" />
        <div className="brand-meta">
          <p className="brand-kicker">{t("app.title")}</p>
          {branchId && <p className="brand-location">{branchId}</p>}
        </div>
      </div>
      <div className="spacer" />
      <LanguageSelector />
      {role && <span className="badge">{role}</span>}
      {role && (
        <button className="btn secondary ghost-btn" onClick={onLogout}>
          {t("nav.logout")}
        </button>
      )}
    </header>
  );
}
