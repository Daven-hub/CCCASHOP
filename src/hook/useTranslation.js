import { useLanguage } from "../context/languageContext";

export const useTranslation = () => {
  const { translations, currentLanguage, changeLanguage } = useLanguage();
  
  const t = (key, params) => {
    const keys = key.split('.');
    let result = translations;

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
  
    if (typeof result !== 'string') {
      console.warn(`Translation is not a string for key: ${key}`);
      return key;
    }

    let translation = result;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        const regex = new RegExp(`\\{\\{${paramKey}\\}\\}|\\{${paramKey}\\}`, 'g');
        translation = translation.replace(regex, paramValue?.toString());
      });
    }
    
    return translation;
  };
  
  return { t, currentLanguage, changeLanguage };
};
