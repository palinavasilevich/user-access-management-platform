import { useForm } from "@/hooks/useForm";
import type { FormProps, FormValues } from "@/types/forms";

export function Form<T extends FormValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps<T>) {
  const { values, errors, formState, handleChange, handleSubmit } = useForm<T>(
    initialValues,
    validationSchema,
  );

  const renderStatus = () => {
    switch (formState.status) {
      case "loading":
        return <p>Loading...</p>;
      case "success":
        return <p className="text-green-500">Successfully sent!</p>;
      case "error":
        return <p className="text-red-500">Error: {formState.error}</p>;
      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      {typeof children === "function"
        ? children({ values, errors, handleChange })
        : children}

      <div className="mt-4">
        <button type="submit" disabled={formState.status === "loading"}>
          Send
        </button>
      </div>

      {renderStatus()}
    </form>
  );
}
