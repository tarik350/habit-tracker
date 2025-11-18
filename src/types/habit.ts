import type { Category } from "./category";

export interface Habit {
  id: string;
  name: string;
  category: Category;
  completions: string[];
  createdAt: Date;
  updatedAt: Date;
}
