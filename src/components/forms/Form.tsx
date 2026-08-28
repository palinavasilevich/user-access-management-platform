import { useForm } from "@/hooks/useForm";

import type { FormProps, FormValues } from "@/types/forms";

export function Form<T extends FormValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  submitLabel = "Submit",
}: FormProps<T>) {
  const { values, errors, formState, handleChange, handleSubmit } = useForm<T>(
    initialValues,
    validationSchema,
  );

  const renderStatus = () => {
    switch (formState.status) {
      case "loading":
        return (
          <p className="mt-4 text-sm font-medium text-center text-gray-500">
            Loading...
          </p>
        );

      case "success":
        return (
          <p className="mt-4 text-sm font-medium text-center text-green-600">
            Successfully sent!
          </p>
        );

      case "error":
        return (
          <p className="mt-4 text-sm font-medium text-center text-red-600">
            Error: {formState.error}
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit);
      }}
      className="w-full space-y-5"
    >
      {typeof children === "function"
        ? children({ values, errors, handleChange })
        : children}

      <div className="pt-2">
        <button
          type="submit"
          disabled={formState.status === "loading"}
          className="
            w-full rounded-lg bg-gray-900 px-4 py-2.5
            text-sm font-medium text-white
            transition-colors
            hover:bg-gray-800
            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {formState.status === "loading" ? "Loading..." : submitLabel}
        </button>
      </div>

      {renderStatus()}
    </form>
  );
}
