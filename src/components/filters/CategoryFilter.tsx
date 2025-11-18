import { useCategories } from "../../contexts/CategoryContext";
import clsx from "clsx";

interface CategoryFilterProps {
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  selectedCategoryId,
  onCategoryChange,
}: CategoryFilterProps) {
  const { categories } = useCategories();

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onCategoryChange(null)}
        className={clsx(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          {
            "bg-(--color-accent) text-white shadow-md":
              selectedCategoryId === null,
            "bg-(--color-bg-tertiary) text-(--color-text-secondary) hover:bg-(--color-bg-active)":
              selectedCategoryId !== null,
          }
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={clsx(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
            {
              "text-white": selectedCategoryId === category.id,
              "bg-(--color-bg-tertiary) text-(--color-text-secondary) hover:bg-(--color-bg-active)":
                selectedCategoryId !== category.id,
            }
          )}
          style={{
            backgroundColor:
              selectedCategoryId === category.id ? category.color : undefined,
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
