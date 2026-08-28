import { Navigate } from "react-router";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export function RegisterPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <RegisterForm />;
}
