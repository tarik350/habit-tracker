import { FaMoon, FaRegUserCircle, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const path = location.pathname;
  const title = path
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" / ");

  return (
    <header className="h-[60px] flex justify-between items-center px-5 border-b border-(--color-border-light) bg-(--color-bg-primary) transition-colors duration-200">
      <div className="left">
        <h1 className="text-sm font-normal text-(--color-text-tertiary)">
          {title}
        </h1>
      </div>

      <div className="right flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="theme-toggle text-xl text-(--color-text-secondary) hover:text-(--color-accent) transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <div className="flex items-center px-3 py-1 gap-2 border-2 border-(--color-border-light) rounded-full bg-transparent transition-colors duration-200 select-none">
          <FaRegUserCircle className="text-xl text-(--color-text-secondary)" />
          <span className="text-sm font-medium text-(--color-text-primary)">
            Tarik Teshome
          </span>
        </div>
      </div>
    </header>
  );
}
