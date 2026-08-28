import { AuthProvider } from "@/contexts/AuthContext";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <AuthProvider>
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}
