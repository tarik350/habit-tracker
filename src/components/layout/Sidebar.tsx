import { useTranslation } from "react-i18next";
import { FiFolder, FiHome, FiList, FiLogOut, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { t } = useTranslation();

  const navItems = [
    {
      labelKey: "navigation.dashboard",
      path: "/dashboard",
      icon: <FiHome size={18} strokeWidth={2.5} />,
    },
    {
      labelKey: "navigation.habits",
      path: "/dashboard/habits",
      icon: <FiList size={18} strokeWidth={2.5} />,
    },
    {
      labelKey: "navigation.categories",
      path: "/dashboard/categories",
      icon: <FiFolder size={18} strokeWidth={2.5} />,
    },
  ] as const;
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-xs animate-fade-in z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-(--color-bg-secondary) border-r border-(--color-border) flex flex-col py-8 px-4 gap-8 font-['Inter',sans-serif] h-screen transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Kefya Habits"
              className="h-11 w-11 rounded-xl object-cover shadow-lg"
            />
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-(--color-text-primary) leading-tight">
                {t("app.name")}
              </h2>
              <p className="text-xs text-(--color-text-tertiary)">
                {t("app.tagline")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-(--color-bg-tertiary) text-(--color-text-secondary) transition-colors"
            aria-label="Close menu"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => {
                if (onClose) onClose();
              }}
              className={({ isActive }) =>
                `group flex items-center gap-3.5 px-4 py-3 rounded-xl no-underline text-sm transition-all duration-300 font-medium relative overflow-hidden ${
                  isActive
                    ? "bg-(--color-bg-active) text-(--color-accent) font-semibold shadow-sm"
                    : "text-(--color-text-secondary) hover:bg-(--color-bg-tertiary) hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-(--color-accent) rounded-r-full" />
                  )}
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-(--color-accent) text-white shadow-md"
                        : "bg-(--color-bg-tertiary) text-(--color-text-tertiary) group-hover:bg-(--color-accent) group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{t(item.labelKey)}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-2">
          <button className="group flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-(--color-text-secondary) bg-(--color-bg-tertiary) transition-all duration-300 w-full cursor-pointer">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-(--color-accent) text-white transition-all duration-300 group-hover:translate-x-1">
              <FiLogOut size={18} strokeWidth={2.5} />
            </span>
            <span className="flex-1">{t("actions.signOut")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
