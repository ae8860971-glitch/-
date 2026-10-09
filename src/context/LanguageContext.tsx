import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (arText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  dir: 'rtl',
  t: (arText) => arText,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alnabeel_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar'; // Default Arabic primary with English translations
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alnabeel_lang', lang);
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
    }
  }, [lang, dir]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (arText: string, enText: string) => {
    return lang === 'ar' ? arText : enText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t }}>
      <div dir={dir} className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
