import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, type LanguageCode } from "../i18n";

interface LocaleContextType {
  currentLanguage: LanguageCode;
  changeLanguage: (lang: LanguageCode) => Promise<void>;
  availableLanguages: typeof LANGUAGES;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const normalizeLanguageCode = (lang: string): LanguageCode => {
  const normalized = lang.split("-")[0] as LanguageCode;
  return normalized in LANGUAGES ? normalized : "en";
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    normalizeLanguageCode(i18n.language)
  );

  useEffect(() => {
    const normalized = normalizeLanguageCode(i18n.language);
    if (normalized !== currentLanguage) {
      setCurrentLanguage(normalized);
    }
  }, [i18n.language, currentLanguage]);

  useEffect(() => {
    const direction = LANGUAGES[currentLanguage].dir;
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = async (lang: LanguageCode) => {
    try {
      await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      localStorage.setItem("i18nextLng", lang);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  const isRTL = LANGUAGES[currentLanguage].dir === "rtl";
  return (
    <LocaleContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        availableLanguages: LANGUAGES,
        isRTL,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
