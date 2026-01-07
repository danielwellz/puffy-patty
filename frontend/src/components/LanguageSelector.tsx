import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fa", label: "فا" },
  { code: "en", label: "EN" }
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("puffy-lang", code);
    document.documentElement.lang = code;
    document.documentElement.dir = i18n.dir(code);
  };

  return (
    <div className="lang-switch" aria-label={t("layout.language")}>
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          type="button"
          className={i18n.language === lang.code ? "active" : ""}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
