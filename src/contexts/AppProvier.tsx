import type { ReactNode } from "react";
import { CategoryProvider } from "./CategoryContext";
import { HabitProvider } from "./HabitContext";
import { ThemeProvider } from "./ThemeContext";
const Providers = [ThemeProvider, CategoryProvider, HabitProvider];
export function AppProvider({ children }: { children: ReactNode }) {
  return Providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
}
