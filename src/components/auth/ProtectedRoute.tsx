import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import type { Permission, Role } from "@/types/permissions";
import { ROUTES } from "@/constants/routes";

type ProtectionMode =
  | { type: "authenticated" }
  | { type: "role"; roles: Role[] }
  | { type: "permission"; permission: Permission };

interface ProtectedRouteProps {
  children: React.ReactNode;
  protection?: ProtectionMode;
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  protection = { type: "authenticated" },
  fallbackPath = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const { user, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={fallbackPath} replace />;
  }

  switch (protection.type) {
    case "authenticated":
      return <>{children}</>;

    case "role":
      if (!protection.roles.includes(user.role)) {
        return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
      }
      return <>{children}</>;

    case "permission":
      if (!hasPermission(protection.permission)) {
        return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
      }

      return <>{children}</>;

    default:
      return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute protection={{ type: "role", roles: ["admin"] }}>
      {children}
    </ProtectedRoute>
  );
}

export function ManagerRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute protection={{ type: "role", roles: ["admin", "manager"] }}>
      {children}
    </ProtectedRoute>
  );
}
