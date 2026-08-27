import { RegisterForm } from "./components/auth/RegisterForm";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>
  );
}
