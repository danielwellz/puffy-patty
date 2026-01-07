import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nResources } from "./resources";

const detectionOptions = {
  order: ["localStorage", "navigator"],
  lookupLocalStorage: "puffy-lang",
  caches: ["localStorage"]
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: i18nResources,
    fallbackLng: "en",
    supportedLngs: Object.keys(i18nResources),
    detection: detectionOptions,
    interpolation: {
      escapeValue: false
    },
    returnEmptyString: false,
    react: {
      useSuspense: false
    }
  });

export default i18n;
