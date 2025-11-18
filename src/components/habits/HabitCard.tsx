import type { Habit } from "../../types";
import { FaFire } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface HabitCardProps {
  habit: Habit;
  onDelete?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export default function HabitCard({
  habit,
  onDelete,
  onComplete,
}: HabitCardProps) {
  const { t, i18n } = useTranslation(["habits", "common"]);
  const category = habit.category;
  const today = new Date().toDateString();
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div className="bg-(--color-bg-secondary) rounded-2xl p-5 border border-(--color-border) hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-(--color-text-primary) mb-1">
            {habit.name}
          </h3>
          {category && (
            <span
              className="inline-block text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                backgroundColor: category.color + "20",
                color: category.color,
              }}
            >
              {category.name}
            </span>
          )}
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(habit.id)}
            className="text-sm bg-(--color-accent) hover:bg-(--color-accent-hover) text-(--color-text-primary) transition-colors duration-200 px-2 py-1 rounded-md shadow-md"
          >
            {t("common:actions.delete")}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-(--color-border)">
        <div className="text-center">
          <p className="text-xs text-(--color-text-tertiary) mb-1">
            {t("habits:card.currentStreak")}
          </p>
          <p className="text-sm font-semibold text-(--color-accent) flex items-center gap-1 justify-center">
            <FaFire />
            {habit.completions.length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-(--color-text-tertiary) mb-1">
            {t("habits:card.created")}
          </p>
          <p className="text-sm font-semibold text-(--color-text-secondary)">
            {new Date(habit.createdAt).toLocaleDateString(i18n.language, {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      {onComplete && (
        <button
          onClick={() => onComplete(habit.id)}
          className={`mt-4 w-full transition-all duration-200 px-3 py-2 rounded-md shadow-md font-medium ${
            isCompletedToday
              ? "bg-(--color-success) hover:bg-(--color-success-hover) text-white"
              : "bg-(--color-accent) hover:bg-(--color-accent-hover) text-white"
          }`}
        >
          {isCompletedToday
            ? t("habits:card.completedToday")
            : t("habits:card.markCompleted")}
        </button>
      )}
    </div>
  );
}
