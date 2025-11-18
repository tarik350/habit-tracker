import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
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

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate();
      const isToday = date.toDateString() === new Date().toDateString();

      dates.push({ date, dayName, dayNumber, isToday });
    }
    return dates;
  };

  const weekDates = generateWeekDates();

  return (
    <div className=" space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text-primary) mb-1">
            Hi, Welcome Back!
          </h1>
          <p className="text-sm text-(--color-text-tertiary)">
            Track your daily habits and build consistency
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-(--color-accent) text-white font-semibold shadow-md hover:bg-(--color-accent-hover) transition-all duration-200"
        >
          <FiPlus size={20} />
          New Habit
        </button>
      </div>

      <div className="bg-(--color-bg-secondary) rounded-2xl p-3 shadow-sm border border-(--color-border)">
        <h2 className="text-lg font-semibold text-(--color-text-primary) mb-4">
          This Week
        </h2>
        <div className="flex gap-2">
          {weekDates.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedDate(item.date)}
              className={clsx(
                "flex flex-col items-center justify-center min-w-13 h-11 rounded-3xl px-2 py-1 ",
                {
                  "bg-(--color-accent) text-white shadow-lg shadow-purple-500/30 scale-105":
                    item.isToday,
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
                className={`text-base font-semibold ${
                  item.isToday ? "text-white" : ""
                }`}
              >
                {item.dayNumber}
              </span>
              <span
                className={`text-[9px] font-medium uppercase tracking-wide ${
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
            No habits yet
          </h2>
          <p className="text-(--color-text-tertiary) max-w-xs">
            Start your journey by creating your first habit and begin tracking
            your progress.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-(--color-accent) text-white font-semibold shadow-md hover:bg-(--color-accent-hover) transition-all duration-200"
          >
            Create Your First Habit
          </button>
        </div>
      )}

      {habits.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-(--color-bg-secondary) rounded-2xl p-5 border border-(--color-border) hover:shadow-lg transition-all duration-300">
              <h3 className="text-sm font-medium text-(--color-text-tertiary) mb-1">
                Total Habits
              </h3>
              <p className="text-3xl font-bold text-(--color-accent)">
                {habits.length}
              </p>
            </div>

            <div className="bg-(--color-bg-secondary) rounded-2xl p-5 border border-(--color-border) hover:shadow-lg transition-all duration-300">
              <h3 className="text-sm font-medium text-(--color-text-tertiary) mb-1">
                Completed Today
              </h3>
              <p className="text-3xl font-bold text-green-500">
                {
                  habits.filter((h) =>
                    h.completions.includes(selectedDate.toDateString())
                  ).length
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-(--color-text-primary)">
                  Your Habits
                </h2>
                <span className="text-sm text-(--color-text-tertiary)">
                  {filteredHabits.length}{" "}
                  {filteredHabits.length === 1 ? "habit" : "habits"}
                </span>
              </div>
              <div className="mb-4">
                <CategoryFilter
                  selectedCategoryId={selectedCategoryId}
                  onCategoryChange={setSelectedCategoryId}
                />
              </div>
              <div className="flex flex-col gap-4">
                {filteredHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onComplete={(id) => toggleCompletion(id, selectedDate)}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col  md:w-1/2 max-h-max">
              <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">
                Streak Progress by Category
              </h2>
              <div className="bg-(--color-bg-secondary) rounded-2xl p-6">
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
