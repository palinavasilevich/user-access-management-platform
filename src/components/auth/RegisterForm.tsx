import { z } from "zod";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { useAuth } from "@/hooks/useAuth";
import type { RegisterData } from "@/types/user";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

const registerSchema = z
  .object({
    email: z.email("Invalid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit"),

    confirmPassword: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters long"),

    profile: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register } = useAuth();

  const handleSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

    await register(registerData as RegisterData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Create your account and start managing your profile.
          </p>
        </div>

        <Form<RegisterFormData>
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            profile: {
              firstName: "",
              lastName: "",
            },
          }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
          submitLabel="Create account"
        >
          {({ values, errors, handleChange }) => (
            <div className="space-y-5">
              <Input
                label="Email"
                field="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                field="password"
                type="password"
                value={values.password}
                error={errors.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />

              <Input
                label="Confirm password"
                field="confirmPassword"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />

              <div className="border-t border-gray-100 pt-5">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Personal information
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Optional. You can add this information later.
                  </p>
                </div>

                <div className="space-y-5">
                  <Input
                    label="First name"
                    field="profile.firstName"
                    type="text"
                    value={values.profile?.firstName ?? ""}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />

                  <Input
                    label="Last name"
                    field="profile.lastName"
                    type="text"
                    value={values.profile?.lastName ?? ""}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>
          )}
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-medium text-gray-900 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
