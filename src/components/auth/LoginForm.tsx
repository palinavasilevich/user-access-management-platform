import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>

        <Form<LoginFormData>
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
          submitLabel="Sign in"
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
            </div>
          )}
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-medium text-gray-900 underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
