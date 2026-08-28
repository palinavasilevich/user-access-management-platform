import { Navigate } from "react-router";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

export function LoginPage() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <LoginForm />;
}
