import { useEffect } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/10 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-(--color-bg-primary) rounded-2xl shadow-2xl w-full max-w-md animate-scale-in border border-(--color-border)">
        <div className="flex items-center justify-between p-6 border-b border-(--color-border)">
          <h2 className="text-xl font-bold text-(--color-text-primary)">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-(--color-bg-tertiary) transition-colors duration-200 text-(--color-text-secondary)"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
