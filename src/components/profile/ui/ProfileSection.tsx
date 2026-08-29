import type { ReactNode } from "react";
interface ProfileSectionProps {
  title: string;
  description?: string;
  isEdit: boolean;
  onEdit: () => void;
  children: ReactNode;
}

export function ProfileSection({
  title,
  description,
  isEdit,
  onEdit,
  children,
}: ProfileSectionProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          {isEdit ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}
