import { useState, useMemo } from "react";
import { useHabits } from "../contexts/HabitContext";
import { FiInbox, FiPlus } from "react-icons/fi";
import CreateHabitModal from "../components/habits/CreateHabitModal";
import HabitCard from "../components/habits/HabitCard";
import CategoryFilter from "../components/filters/CategoryFilter";

export default function HabitPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const { habits, deleteHabit, toggleCompletion } = useHabits();

  const filteredHabits = useMemo(() => {
    if (!selectedCategoryId) return habits;
    return habits.filter((h) => h.category.id === selectedCategoryId);
  }, [habits, selectedCategoryId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--color-text-primary) mb-1">
            My Habits
          </h1>
          <p className="text-sm text-(--color-text-tertiary)">
            Manage and track your daily habits
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

      {habits.length === 0 ? (
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
      ) : (
        <>
          <div className="mb-6">
            <CategoryFilter
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
            />
          </div>
          {filteredHabits.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[40vh] text-center space-y-4">
              <div className="text-(--color-text-tertiary) text-5xl opacity-60">
                <FiInbox />
              </div>
              <h3 className="text-lg font-semibold text-(--color-text-primary)">
                No habits in this category
              </h3>
              <p className="text-sm text-(--color-text-tertiary)">
                Try selecting a different category or create a new habit
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onDelete={deleteHabit}
                  onComplete={toggleCompletion}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CreateHabitModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
