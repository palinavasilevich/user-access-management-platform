import { type PublicUser } from "@/types/user";

export function isAdmin(
  user: PublicUser | null,
): user is PublicUser & { role: "admin" } {
  return user?.role === "admin";
}

export function isManager(user: PublicUser | null): boolean {
  return user?.role === "manager" || user?.role === "admin";
}
