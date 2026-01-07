import { useTranslation } from "react-i18next";

export function NotAuthorizedPage() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <div className="page-header">
        <h1>{t("layout.notAuthorized")}</h1>
      </div>
    </div>
  );
}

export default NotAuthorizedPage;
