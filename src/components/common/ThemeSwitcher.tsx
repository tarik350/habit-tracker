import { useRef, useState } from "react";
import { FaSun, FaTree, FaWater } from "react-icons/fa";
import { FiCheck, FiMoon, FiSun } from "react-icons/fi";
import type { Theme } from "../../contexts/ThemeContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const themes = [
    { value: "light", label: "Light", icon: <FiSun size={16} /> },
    { value: "dark", label: "Dark", icon: <FiMoon size={16} /> },
    { value: "theme-ocean", label: "Ocean", icon: <FaWater size={16} /> },
    { value: "theme-sunset", label: "Sunset", icon: <FaSun size={16} /> },
    { value: "theme-forest", label: "Forest", icon: <FaTree size={16} /> },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--color-bg-secondary) border border-(--color-border) text-(--color-text-primary) hover:bg-(--color-bg-tertiary) transition-all duration-200"
        aria-label="Change theme"
      >
        {currentTheme.icon}
        <span className="text-sm font-medium hidden sm:inline">
          {currentTheme.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-(--color-bg-secondary) border border-(--color-border) rounded-lg shadow-lg overflow-hidden z-50">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                changeTheme(t.value as Theme);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-(--color-text-primary) hover:bg-(--color-bg-tertiary) transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span>{t.icon}</span>
                <span className="font-medium">{t.label}</span>
              </div>
              {theme === t.value && (
                <FiCheck size={16} className="text-(--color-accent)" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
