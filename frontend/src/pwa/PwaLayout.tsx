import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/LanguageSelector";
import { usePwa } from "./PwaContext";
import "./PwaStyles.css";

export default function PwaLayout() {
  const { t, i18n } = useTranslation();
  const { branch, cart } = usePwa();
  const location = useLocation();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={`pwa ${i18n.dir() === "rtl" ? "rtl" : ""}`}>
      <header className="pwa-header">
        <div className="pwa-brand">
          <div>
            <p className="pwa-kicker">{t("pwa.kicker")}</p>
            <h1 className="pwa-title">{t("pwa.title")}</h1>
          </div>
          <LanguageSelector />
        </div>
        <div className="pwa-branch">
          <span>{t("pwa.branch")}:</span>
          <strong>{branch ? branch.name : t("pwa.branchUnset")}</strong>
          {branch?.address && <span className="pwa-branch-meta">{branch.address}</span>}
        </div>
      </header>

      <nav className="pwa-nav">
        <Link to="/order" className={location.pathname.startsWith("/order") ? "active" : ""}>
          <span aria-hidden>🍔</span>
          {t("pwa.menu")}
        </Link>
        <Link to="/order/cart" className={location.pathname === "/order/cart" ? "active" : ""}>
          <span aria-hidden>🛒</span>
          {t("pwa.cart")}
          {cartCount > 0 && <span className="pwa-badge">{cartCount}</span>}
        </Link>
        <Link to="/reserve" className={location.pathname.startsWith("/reserve") ? "active" : ""}>
          <span aria-hidden>🪑</span>
          {t("pwa.reserve")}
        </Link>
      </nav>

      <main className="pwa-content">
        <Outlet />
      </main>
    </div>
  );
}
