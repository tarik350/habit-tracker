import type { Category, CreateCategoryDto } from "../types";

export const defaultCategories: Omit<
  Category,
  "id" | "createdAt" | "updatedAt"
>[] = [
  {
    name: "Health",
    color: "#10b981",
    description: "Physical and mental wellness",
  },
  {
    name: "Productivity",
    color: "#3b82f6",
    description: "Work and personal productivity",
  },
  {
    name: "Learning",
    color: "#8b5cf6",
    description: "Education and skill development",
  },
  {
    name: "Fitness",
    color: "#f59e0b",
    description: "Exercise and physical activity",
  },
  {
    name: "Mindfulness",
    color: "#ec4899",
    description: "Meditation and mental clarity",
  },
  {
    name: "Social",
    color: "#06b6d4",
    description: "Relationships and connections",
  },
];

export function initializeDefaultCategories(
  existingCategories: Category[],
  addCategory: (dto: CreateCategoryDto) => Category
): void {
  if (existingCategories.length === 0) {
    defaultCategories.forEach((cat) => {
      addCategory(cat);
    });
  }
}
