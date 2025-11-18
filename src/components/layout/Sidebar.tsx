import { FiFolder, FiHome, FiList } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <FiHome size={18} strokeWidth={2.5} />,
  },
  {
    label: "Habits",
    path: "/dashboard/habits",
    icon: <FiList size={18} strokeWidth={2.5} />,
  },
  {
    label: "Categories",
    path: "/dashboard/categories",
    icon: <FiFolder size={18} strokeWidth={2.5} />,
  },
];

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-(--color-bg-secondary) border-r border-(--color-border) flex flex-col py-8 px-4 gap-8 font-['Inter',sans-serif] sticky top-0 h-screen transition-colors duration-200">
      <div className="flex items-center gap-3 px-3">
        <div className="h-11 w-11 bg-linear-to-br from-[#7c4efe] to-[#9d73ff] text-white text-base font-bold rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
          HT
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-(--color-text-primary) leading-tight">
            Habit Tracker
          </h2>
          <p className="text-xs text-(--color-text-tertiary)">Track & Grow</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
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
                <span className="flex-1">{item.label}</span>
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
          <span className="flex-1">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
