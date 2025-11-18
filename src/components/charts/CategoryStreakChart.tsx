import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Habit } from "../../types";
import { useCategories } from "../../contexts/CategoryContext";
import { useEffect } from "react";

interface CategoryStreakChartProps {
  habits: Habit[];
}

interface ChartData {
  name: string;
  streaks: number;
  color: string;
}

export default function CategoryStreakChart({
  habits,
}: CategoryStreakChartProps) {
  const { categories } = useCategories();
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const chartData: ChartData[] = categories
    .map((category) => {
      const categoryHabits = habits.filter(
        (h) => h.category.id === category.id
      );
      const totalStreaks = categoryHabits.reduce(
        (sum, habit) => sum + habit.completions.length,
        0
      );

      return {
        name: category.name,
        streaks: totalStreaks,
        color: category.color,
      };
    })
    .filter((item) => item.streaks > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-(--color-text-tertiary)">
        No streak data available yet. Start completing habits!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis
          dataKey="name"
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
          axisLine={{ stroke: "var(--color-border)" }}
        />
        <YAxis
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
          axisLine={{ stroke: "var(--color-border)" }}
          label={{
            value: "Total Streaks",
            angle: -90,
            position: "insideLeft",
            style: { fill: "var(--color-text-secondary)", fontSize: 12 },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            color: "var(--color-text-primary)",
          }}
          cursor={{ fill: "var(--color-bg-tertiary)" }}
        />
        <Bar dataKey="streaks" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
