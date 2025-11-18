import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiInbox, FiPlus } from "react-icons/fi";
import CategoryStreakChart from "../components/charts/CategoryStreakChart";
import CategoryFilter from "../components/filters/CategoryFilter";
import CreateHabitModal from "../components/habits/CreateHabitModal";
import HabitCard from "../components/habits/HabitCard";
import { useCategories } from "../contexts/CategoryContext";
import { useHabits } from "../contexts/HabitContext";
import { initializeDefaultCategories } from "../utils/seedData";

interface DateItem {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
}

export default function DashboardPage() {
  const { t, i18n } = useTranslation("dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const { habits, toggleCompletion } = useHabits();
  const { categories, addCategory } = useCategories();

  useEffect(() => {
    initializeDefaultCategories(categories, addCategory);
  }, []);

  const filteredHabits = useMemo(() => {
    if (!selectedCategoryId) return habits;
    return habits.filter((h) => h.category.id === selectedCategoryId);
  }, [habits, selectedCategoryId]);

  const generateWeekDates = (): DateItem[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const dates: DateItem[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + i);

      const dayName = date.toLocaleDateString(i18n.language, {
        weekday: "short",
      });
      const dayNumber = date.getDate();
      const isToday = date.toDateString() === new Date().toDateString();

      dates.push({ date, dayName, dayNumber, isToday });
    }
    return dates;
  };

  const weekDates = generateWeekDates();

  const handleComplete = useCallback(
    (id: string) => toggleCompletion(id, selectedDate),
    [toggleCompletion, selectedDate]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--color-text-primary) mb-1">
            {t("welcome")}
          </h1>
          <p className="text-xs md:text-sm text-(--color-text-tertiary)">
            {t("subtitle")}
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-(--color-accent) text-white font-semibold shadow-md hover:bg-(--color-accent-hover) transition-all duration-200 text-sm md:text-base"
        >
          <FiPlus size={18} className="md:w-5 md:h-5" />
          {t("newHabit")}
        </button>
      </div>

      <div className="bg-(--color-bg-secondary) rounded-2xl p-3 md:p-4 shadow-sm border border-(--color-border)">
        <h2 className="text-base md:text-lg font-semibold text-(--color-text-primary) mb-3 md:mb-4">
          {t("thisWeek")}
        </h2>
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {weekDates.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(item.date)}
              className={clsx(
                "flex flex-col items-center justify-center min-w-12 md:min-w-13 h-10 md:h-11 rounded-3xl px-1.5 md:px-2 py-1 shrink-0",
                {
                  "bg-(--color-accent) text-white  ": item.isToday,
                  "bg-(--color-bg-active) text-(--color-accent) border-2 border-(--color-accent)":
                    !item.isToday &&
                    selectedDate.toDateString() === item.date.toDateString(),
                  "bg-(--color-bg-tertiary) text-(--color-text-secondary) hover:bg-(--color-bg-active) hover:scale-105":
                    !item.isToday &&
                    selectedDate.toDateString() !== item.date.toDateString(),
                }
              )}
            >
              <span
                className={`text-sm md:text-base font-semibold ${
                  item.isToday ? "text-white" : ""
                }`}
              >
                {item.dayNumber}
              </span>
              <span
                className={`text-[8px] md:text-[9px] font-medium uppercase tracking-wide ${
                  item.isToday
                    ? "text-white opacity-90"
                    : "text-(--color-text-tertiary)"
                }`}
              >
                {item.dayName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {habits.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="text-(--color-accent) text-7xl opacity-80">
            <FiInbox />
          </div>
          <h2 className="text-xl font-semibold text-(--color-text-primary)">
            {t("empty.title")}
          </h2>
          <p className="text-(--color-text-tertiary) max-w-xs">
            {t("empty.description")}
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-(--color-accent) text-white font-semibold shadow-md hover:bg-(--color-accent-hover) transition-all duration-200"
          >
            {t("empty.action")}
          </button>
        </div>
      )}

      {habits.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-(--color-bg-secondary) rounded-2xl p-4 md:p-5 border border-(--color-border) hover:shadow-lg transition-all duration-300">
              <h3 className="text-xs md:text-sm font-medium text-(--color-text-tertiary) mb-1">
                {t("totalHabits")}
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-(--color-accent)">
                {habits.length}
              </p>
            </div>

            <div className="bg-(--color-bg-secondary) rounded-2xl p-4 md:p-5 border border-(--color-border) hover:shadow-lg transition-all duration-300">
              <h3 className="text-xs md:text-sm font-medium text-(--color-text-tertiary) mb-1">
                {t("completedToday")}
              </h3>
              <p className="text-2xl md:text-3xl font-bold text-green-500">
                {
                  habits.filter((h) =>
                    h.completions.includes(selectedDate.toDateString())
                  ).length
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            <div className="lg:w-1/2">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-(--color-text-primary)">
                  {t("yourHabits")}
                </h2>
                <span className="text-xs md:text-sm text-(--color-text-tertiary)">
                  {t("habitCount", { count: filteredHabits.length })}
                </span>
              </div>
              <div className="mb-3 md:mb-4">
                <CategoryFilter
                  selectedCategoryId={selectedCategoryId}
                  onCategoryChange={setSelectedCategoryId}
                />
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {filteredHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onComplete={handleComplete}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:w-1/2">
              <h2 className="text-lg md:text-xl font-semibold text-(--color-text-primary) mb-3 md:mb-4">
                {t("streakProgress")}
              </h2>
              <div className="bg-(--color-bg-secondary) rounded-2xl p-4 md:p-6">
                <CategoryStreakChart habits={habits} />
              </div>
            </div>
          </div>
        </>
      )}

      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
