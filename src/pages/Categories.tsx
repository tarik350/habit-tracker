import { FiInbox, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useCategories } from "../contexts/CategoryContext";
import { useHabits } from "../contexts/HabitContext";
import type { Category } from "../types";

export default function CategoriesPage() {
  const { t } = useTranslation("categories");
  const { categories } = useCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text-primary) mb-1">
            {t("title")}
          </h1>
          <p className="text-sm text-(--color-text-tertiary)">
            {t("subtitle")}
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-(--color-accent) text-white font-semibold shadow-md hover:bg-(--color-accent-hover) transition-all duration-200">
          <FiPlus size={20} />
          {t("newCategory")}
        </button>
      </div>

      {categories.length === 0 ? (
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
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            return <CategoryCard category={category} />;
          })}
        </div>
      )}
    </div>
  );
}

const CategoryCard = ({ category }: { category: Category }) => {
  const { t } = useTranslation("categories");
  const { habits } = useHabits();
  const getCategoryHabitCount = (categoryId: string): number => {
    return habits.filter((h) => h.category.id === categoryId).length;
  };
  const habitCount = getCategoryHabitCount(category.id);

  return (
    <div
      key={category.id}
      className="bg-(--color-bg-secondary) rounded-2xl p-6 border border-(--color-border) hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        borderLeft: `4px solid ${category.color}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-semibold text-(--color-text-primary)">
              {category.name}
            </h3>
            <p className="text-xs text-(--color-text-tertiary)">
              {t("habitCount", { count: habitCount })}
            </p>
          </div>
        </div>
      </div>
      {category.description && (
        <p className="text-sm text-(--color-text-tertiary) mt-2">
          {category.description}
        </p>
      )}
    </div>
  );
};
