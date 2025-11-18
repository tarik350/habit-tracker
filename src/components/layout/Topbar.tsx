import { useTranslation } from "react-i18next";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeSwitcher from "../common/ThemeSwitcher";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const translationMap: Record<string, string> = {
    dashboard: t("navigation.dashboard"),
    habits: t("navigation.habits"),
    categories: t("navigation.categories"),
  };

  const title = pathSegments
    .map(
      (segment) =>
        translationMap[segment.toLowerCase()] ||
        segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join(" / ");

  return (
    <header className="h-[60px] flex justify-between items-center px-3 md:px-5 border-b border-(--color-border-light) bg-(--color-bg-primary) transition-colors duration-200">
      <div className="left flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-(--color-bg-tertiary) text-(--color-text-secondary) transition-colors"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-sm font-normal text-(--color-text-tertiary) truncate">
          {title}
        </h1>
      </div>

      <div className="right flex items-center gap-2 md:gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <div className="hidden md:flex items-center px-3 py-1 gap-2 border-2 border-(--color-border-light) rounded-full bg-transparent transition-colors duration-200 select-none">
          <FaRegUserCircle className="text-xl text-(--color-text-secondary)" />
          <span className="text-sm font-medium text-(--color-text-primary)">
            Tarik Teshome
          </span>
        </div>
      </div>
    </header>
  );
}
