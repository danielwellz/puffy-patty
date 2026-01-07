import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiFetch } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { ExpirationRule } from "../types";

export function ExpirationTrackerPage() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [rules, setRules] = useState<ExpirationRule[]>([]);

  useEffect(() => {
    if (!token) return;
    apiFetch<ExpirationRule[]>("/expiration", {}, token)
      .then(setRules)
      .catch(() => setRules([]));
  }, [token]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">{t("nav.expiration")}</p>
          <h1>{t("expiration.title")}</h1>
          <p className="lede">{t("expiration.subtitle")}</p>
        </div>
      </div>
      <div className="cards">
        <article className="card">
          <div className="stack">
            {rules.map((rule) => (
              <div key={rule.id} className="pill ghost">
                <strong>{rule.item}</strong> — {rule.shelfLife}
              </div>
            ))}
            {rules.length === 0 && <p className="status info">{t("status.loading")}</p>}
          </div>
        </article>
      </div>
    </div>
  );
}

export default ExpirationTrackerPage;
