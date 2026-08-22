import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import ua from './locales/ua.json';
import pl from './locales/pl.json';

export const defaultNS = 'translation';
export const resources = {
  ru: { translation: ru },
  en: { translation: en },
  ua: { translation: ua },
  pl: { translation: pl },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false, // React экранирует XSS автоматически
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Сохраняем выбор оператора в браузер
    },
  });

export default i18n;