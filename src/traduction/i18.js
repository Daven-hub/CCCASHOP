import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18
  .use(HttpBackend) // Charge les traductions via HttpBackend
  .use(LanguageDetector) // Détecte automatiquement la langue
  .use(initReactI18next) // Intègre i18next avec React
  .init({
    fallbackLng: 'en', // Langue par défaut
    debug: true,
    interpolation: {
      escapeValue: false, // React gère déjà l'échappement des XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin vers les fichiers de traduction
    },
  });

export default i18;
