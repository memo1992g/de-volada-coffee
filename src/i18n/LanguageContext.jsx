import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations.js';

const LanguageContext = createContext(null);

function detectInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'es';
  }

  const savedLanguage = window.localStorage.getItem('devolada-language');

  if (savedLanguage === 'en' || savedLanguage === 'es') {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language || window.navigator.userLanguage || 'es';

  return browserLanguage.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('devolada-language', language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
