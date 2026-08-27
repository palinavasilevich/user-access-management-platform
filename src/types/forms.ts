import { type ReactNode } from "react";
import { z } from "zod";

export type FormState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export type FormRenderProps<T> = {
  values: T;
  errors: ValidationErrors<T>;
  handleChange: (field: string, value: string) => void;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export type FormValues = Record<string, unknown>;

export type FieldType<T, K extends keyof T> = T[K] extends infer U ? U : never;

export interface FormProps<T extends FormValues> {
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
  validationSchema?: z.ZodSchema<T>;
  children: ReactNode | ((props: FormRenderProps<T>) => ReactNode);
}
