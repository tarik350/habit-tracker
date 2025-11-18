import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useCategories } from "../../contexts/CategoryContext";
import { useHabits } from "../../contexts/HabitContext";
import Modal from "../common/Modal";

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateHabitModal({
  isOpen,
  onClose,
}: CreateHabitModalProps) {
  const { t } = useTranslation(["habits", "validation", "common"]);
  const { categories } = useCategories();
  const { addHabit } = useHabits();

  const createHabitSchema = z.object({
    name: z
      .string()
      .min(1, t("validation:habitName.required"))
      .max(50, t("validation:habitName.tooLong")),
    categoryId: z.string().min(1, t("validation:category.required")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createHabitSchema>>({
    resolver: zodResolver(createHabitSchema),
  });

  const onSubmit = async (data: z.infer<typeof createHabitSchema>) => {
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("habits:form.createTitle")}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            {t("habits:form.habitName")}
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder={t("habits:form.habitNamePlaceholder")}
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) placeholder:text-(--color-text-tertiary) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            {t("habits:form.category")}
          </label>
          <select
            {...register("categoryId")}
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all duration-200"
          >
            <option value="">{t("habits:form.selectCategory")}</option>
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
            {t("common:actions.cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-lg bg-(--color-accent) text-white font-semibold hover:bg-(--color-accent-hover) disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting
              ? t("habits:form.creating")
              : t("habits:form.createButton")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
