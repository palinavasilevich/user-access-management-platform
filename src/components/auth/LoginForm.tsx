import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };
  return (
    <div className="max-w-100 mx-auto p-8">
      <h2>Login</h2>

      <Form<LoginFormData>
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
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
              placeholder="Enter password"
            />
          </>
        )}
      </Form>
    </div>
  );
}
