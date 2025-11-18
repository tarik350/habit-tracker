import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Category, CreateCategoryDto } from "../types";

interface CategoryContextType {
  categories: Category[];
  addCategory: (dto: CreateCategoryDto) => Category;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "categories",
    []
  );

  const addCategory = (dto: CreateCategoryDto): Category => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: dto.name,
      color: dto.color,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
