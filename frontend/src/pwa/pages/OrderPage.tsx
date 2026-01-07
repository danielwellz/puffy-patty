import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchBranches, fetchMenu } from "../../api/public";
import { Branch, MenuCategory, MenuItem } from "../../types";
import { loadCachedMenu, usePwa } from "../PwaContext";
import { useOnline } from "../useOnline";

export default function OrderPage() {
  const { t, i18n } = useTranslation();
  const { branch, setBranch, menu, setMenu, addToCart } = usePwa();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const online = useOnline();

  useEffect(() => {
    fetchBranches()
      .then((data) => setBranches(data.filter((item) => item.onlineOrderingEnabled !== false)))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!branch) return;
    setLoading(true);
    setError(null);
    if (!online) {
      const cached = loadCachedMenu(branch.id);
      if (cached) {
        setMenu(cached);
      } else {
        setError(t("pwa.offlineMenu"));
      }
      setLoading(false);
      return;
    }

    fetchMenu(branch.id)
      .then((data) => setMenu(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [branch, online, setMenu, t]);

  const language = i18n.language;
  const locale = language === "fa" ? "fa-IR" : "en-US";
  const hasMenu = menu.length > 0;
  const grouped = useMemo(() => menu, [menu]);

  const handleSelectBranch = (selected: Branch) => {
    setBranch(selected);
  };

  const renderItemName = (item: MenuItem) => (language === "fa" ? item.nameFa : item.nameEn);
  const renderItemDesc = (item: MenuItem) => (language === "fa" ? item.descFa : item.descEn);
  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setToast(t("pwa.addedToCart"));
    window.setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="pwa-grid">
      {!online && (
        <div className="pwa-toast pwa-warning">{t("pwa.offlineNotice")}</div>
      )}
      {toast && <div className="pwa-toast">{toast}</div>}

      <section className="pwa-card">
        <h2 className="pwa-section-title">{t("pwa.branchSelect")}</h2>
        <div className="pwa-grid two">
          {branches.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pwa-card ${branch?.id === item.id ? "active" : ""}`}
              onClick={() => handleSelectBranch(item)}
            >
              <strong>{item.name}</strong>
              {item.address && <p className="pwa-muted">{item.address}</p>}
              {item.phone && <p className="pwa-muted">{item.phone}</p>}
            </button>
          ))}
        </div>
      </section>

      <section className="pwa-card">
        <div className="pwa-inline" style={{ justifyContent: "space-between" }}>
          <h2 className="pwa-section-title">{t("pwa.menu")}</h2>
          {loading && <span className="pwa-muted">{t("pwa.loading")}</span>}
        </div>
        {error && <div className="pwa-toast pwa-warning">{error}</div>}
        {!branch && <div className="pwa-empty">{t("pwa.selectBranchFirst")}</div>}
        {branch && !loading && !hasMenu && !error && <div className="pwa-empty">{t("pwa.emptyMenu")}</div>}
        {branch &&
          grouped.map((category: MenuCategory) => (
            <div key={category.id} className="pwa-grid" style={{ marginBottom: "1.5rem" }}>
              <h3 className="pwa-section-title">
                {language === "fa" ? category.nameFa : category.nameEn}
              </h3>
              <div className="pwa-grid">
                {category.items.map((item) => (
                  <article key={item.id} className="pwa-menu-item">
                    {item.imageUrl && <img src={item.imageUrl} alt={renderItemName(item)} loading="lazy" />}
                    <div>
                      <strong>{renderItemName(item)}</strong>
                      {renderItemDesc(item) && <p className="pwa-muted">{renderItemDesc(item)}</p>}
                      <div className="pwa-menu-actions">
                        <span className="pwa-price">{item.basePrice.toLocaleString(locale)}</span>
                        <button type="button" className="pwa-btn" onClick={() => handleAddToCart(item)}>
                          {t("pwa.addToCart")}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
