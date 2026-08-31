import { z } from "zod";

import { authApi } from "@/api/auth";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";

interface ChangePasswordProps {
  userId: string;
  onComplete?: () => void;
}

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit"),

    confirmPassword: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  });

type ChangePasswordFormData = z.infer<typeof passwordSchema>;

export function ChangePassword({ userId, onComplete }: ChangePasswordProps) {
  const handleSubmit = async (data: ChangePasswordFormData) => {
    await authApi.changePassword(
      userId,
      data.currentPassword,
      data.newPassword,
    );

    onComplete?.();
  };

  return (
    <Form<ChangePasswordFormData>
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={passwordSchema}
      submitLabel="Change password"
    >
      {({ values, errors, handleChange }) => (
        <div className="space-y-5">
          <Input
            label="Current password"
            field="currentPassword"
            type="password"
            value={values.currentPassword}
            error={errors.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
          />

          <Input
            label="New password"
            field="newPassword"
            type="password"
            value={values.newPassword}
            error={errors.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
          />

          <Input
            label="Confirm new password"
            field="confirmPassword"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
          />
        </div>
      )}
    </Form>
  );
}
