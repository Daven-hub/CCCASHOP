import React, { createContext, useContext, useState, useEffect } from 'react';
import { enUS, fr } from '../locales';

const defaultLanguage = 'en';

const LanguageContext = createContext({
  currentLanguage: defaultLanguage,
  translations: enUS,
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || defaultLanguage;
  });

  const [translations, setTranslations] = useState(
    currentLanguage === 'en' ? enUS : fr
  );

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    setTranslations(currentLanguage === 'en' ? enUS : fr);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, translations, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

