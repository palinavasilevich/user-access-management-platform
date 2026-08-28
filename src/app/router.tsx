import { createBrowserRouter } from "react-router";
import { ROUTES } from "@/constants/routes";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminPage, DashboardPage, LoginPage, RegisterPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },

      {
        path: ROUTES.ADMIN,
        Component: AdminPage,
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
]);
