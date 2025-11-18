import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CreateHabitDto, Habit } from "../types";

interface HabitContextType {
  habits: Habit[];
  addHabit: (dto: CreateHabitDto) => Habit;
  deleteHabit: (id: string) => void;
  deleteHabitsByCategoryId: (categoryId: string) => void;
  toggleCompletion: (id: string, date?: Date) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

  const addHabit = (dto: CreateHabitDto): Habit => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: dto.name,
      category: dto.category,
      completions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setHabits((prev) => [...prev, newHabit]);
    return newHabit;
  };

  const deleteHabit = (id: string): void => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const deleteHabitsByCategoryId = (categoryId: string): void => {
    setHabits((prev) =>
      prev.filter((habit) => habit.category.id !== categoryId)
    );
  };

  const toggleCompletion = (id: string, date: Date = new Date()): void => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const dateString = date.toDateString();
        const completions = habit.completions.includes(dateString)
          ? habit.completions.filter((d) => d !== dateString)
          : [...habit.completions, dateString];

        return {
          ...habit,
          completions,
          updatedAt: new Date(),
        };
      })
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        deleteHabitsByCategoryId,
        toggleCompletion,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
