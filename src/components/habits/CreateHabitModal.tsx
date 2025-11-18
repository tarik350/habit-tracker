import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCategories } from "../../contexts/CategoryContext";
import { useHabits } from "../../contexts/HabitContext";
import Modal from "../common/Modal";

const createHabitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(50, "Name too long"),
  categoryId: z.string().min(1, "Please select a category"),
});

export type CreateHabitDto = z.infer<typeof createHabitSchema>;

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateHabitModal({
  isOpen,
  onClose,
}: CreateHabitModalProps) {
  const { categories } = useCategories();
  const { addHabit } = useHabits();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateHabitDto>({
    resolver: zodResolver(createHabitSchema),
  });

  const onSubmit = async (data: CreateHabitDto) => {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) return;

    addHabit({
      name: data.name,
      category: category,
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Habit">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            Habit Name
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="e.g., Morning Exercise"
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) placeholder:text-(--color-text-tertiary) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            Category
          </label>
          <select
            {...register("categoryId")}
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all duration-200"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) font-medium hover:bg-(--color-bg-tertiary) transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-lg bg-(--color-accent) text-white font-semibold hover:bg-(--color-accent-hover) disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? "Creating..." : "Create Habit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
