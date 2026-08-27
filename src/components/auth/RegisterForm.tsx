import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import type { RegisterData } from "@/types/user";

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
    <div className="max-w-100 mx-auto p-8">
      <h2>Register</h2>

      <Form<RegisterFormData>
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          profile: { firstName: "", lastName: "" },
        }}
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
      >
        {({ values, errors, handleChange }) => (
          <>
            <Input
              label="Email"
              field="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="Enter email"
            />

            <Input
              label="Password"
              field="password"
              type="password"
              value={values.password}
              error={errors.password}
              onChange={handleChange}
              placeholder="********"
            />

            <Input
              label="Confirm password"
              field="confirmPassword"
              type="password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

            <h3>Personal Information (optional)</h3>

            <Input
              label="First Name"
              field="profile.firstName"
              type="text"
              value={values.profile?.firstName || ""}
              onChange={handleChange}
              placeholder="Enter your first name"
            />

            <Input
              label="Last Name"
              field="profile.lastName"
              type="text"
              value={values.profile?.lastName || ""}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </>
        )}
      </Form>
    </div>
  );
}
