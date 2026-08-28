import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminRoute, ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ROUTES } from "@/constants/routes";
import {
  AdminPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
  UnauthorizedPage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: AppLayout,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: ROUTES.LOGIN,
    Component: LoginPage,
  },
  {
    path: ROUTES.REGISTER,
    Component: RegisterPage,
  },
  {
    path: ROUTES.UNAUTHORIZED,
    Component: UnauthorizedPage,
  },
]);
