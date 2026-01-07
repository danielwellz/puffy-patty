import fa from "../locales/fa.json";
import en from "../locales/en.json";

export const i18nResources = {
  en: { translation: en },
  fa: { translation: fa }
};

export type SupportedLanguage = keyof typeof i18nResources;
