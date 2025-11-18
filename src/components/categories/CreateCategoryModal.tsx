import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HexColorPicker } from "react-colorful";
import { z } from "zod";
import { useCategories } from "../../contexts/CategoryContext";
import Modal from "../common/Modal";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({
  isOpen,
  onClose,
}: CreateCategoryModalProps) {
  const { t } = useTranslation(["categories", "validation", "common"]);
  const { addCategory } = useCategories();

  const schema = z.object({
    name: z.string().min(1, t("validation:categoryName.required")),
    color: z.string().min(1),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { color: "#7c4efe" },
  });

  const selectedColor = watch("color");

  const onSubmit = (data: z.infer<typeof schema>) => {
    addCategory(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t("form.createTitle")}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            {t("form.name")}
          </label>
          <input
            {...register("name")}
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            {t("form.color")}
          </label>
          <div className="flex flex-col items-center gap-3">
            <HexColorPicker
              color={selectedColor}
              onChange={(color) => setValue("color", color)}
              style={{ width: "100%" }}
            />
            <div className="flex items-center gap-2 w-full">
              <div
                className="w-12 h-12 rounded-lg border-2 border-(--color-border)"
                style={{ backgroundColor: selectedColor }}
              />
              <input
                {...register("color")}
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all font-mono text-sm"
                placeholder="#7c4efe"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-(--color-text-primary) mb-2">
            {t("form.description")}
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-(--color-border) bg-(--color-bg-secondary) text-(--color-text-primary) font-medium hover:bg-(--color-bg-tertiary) transition-all"
          >
            {t("common:actions.cancel")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-lg bg-(--color-accent) text-white font-semibold hover:bg-(--color-accent-hover) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {t("form.createButton")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
