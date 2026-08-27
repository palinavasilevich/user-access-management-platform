export type Role = "admin" | "manager" | "user";
export type Permission = "read" | "write" | "delete" | "manage_users";

export const PERMISSIONS: Record<Role, Permission[]> = {
  admin: ["read", "write", "delete", "manage_users"],
  manager: ["read", "write", "delete"],
  user: ["read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false;
}
