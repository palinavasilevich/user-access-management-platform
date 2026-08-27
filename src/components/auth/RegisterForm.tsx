import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";

const registerSchema = z
  .object({
    email: z.string("Email is required").email("Invalid email"),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register } = useAuth();

  const handleSubmit = async ({
    email,
    password,
    confirmPassword,
  }: RegisterFormData) => {
    await register({ email, password, confirmPassword });
  };
  return (
    <div className="max-w-100 mx-auto p-8">
      <h2>Register</h2>

      <Form<RegisterFormData>
        initialValues={{ email: "", password: "", confirmPassword: "" }}
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
            />
          </>
        )}
      </Form>
    </div>
  );
}
