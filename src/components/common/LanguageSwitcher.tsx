import { useRef, useState } from "react";
import { FiCheck, FiGlobe } from "react-icons/fi";
import { useLocale } from "../../contexts/LocaleContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type { LanguageCode } from "../../i18n";

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleLanguageChange = async (lang: LanguageCode) => {
    await changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-bg-tertiary) transition-all duration-200"
        aria-label="Change language"
      >
        <FiGlobe size={18} />
        <span className="text-sm font-medium">
          {availableLanguages[currentLanguage].nativeName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg shadow-lg overflow-hidden z-50">
          {Object.entries(availableLanguages).map(([code, { nativeName }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as LanguageCode)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-(--color-text-primary) hover:bg-(--color-bg-tertiary) transition-colors duration-200"
            >
              <span className="font-medium">{nativeName}</span>
              {currentLanguage === code && (
                <FiCheck size={16} className="text-(--color-accent)" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
