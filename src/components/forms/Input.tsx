import { cn } from "@/lib/utils";
import type { FormValues } from "@/types/forms";
import type React from "react";

interface InputProps<T extends FormValues, K extends keyof T> {
  label: string;
  field: K;
  value: T[K];
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date";
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (field: K, value: string) => void;
}

export function Input<T extends FormValues, K extends keyof T>({
  label,
  field,
  value,
  error,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  onChange,
}: InputProps<T, K>) {
  const getInputValue = (value: T[K]): string => {
    if (value === null || value === undefined) {
      return "";
    }

    if (value instanceof Date) {
      return value.toISOString().split("T")[0];
    }

    return String(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className={cn("mb-4", disabled ? "opacity-60" : "opacity-100")}>
      <label className="block mb-2 font-medium">
        {label}
        {required && <span className="ml-1 text-[#dc3545]">*</span>}
      </label>

      <input
        type={type}
        value={getInputValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          "w-full p-2 rounded-lg text-base border",
          error ? "border-[#dc3545]" : "border-[#ced4da]",
          disabled && "bg-[#e9ecef] cursor-not-allowed",
        )}
      />

      {error && <p className="mt-1 text-sm text-[#dc3545]">{error}</p>}
    </div>
  );
}
