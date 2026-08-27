import { type StrictOmit } from "./utils";
import type { Role } from "./permissions";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  createdAt: Date;
  lastLogin?: Date;
}

export type RegisterData = StrictOmit<
  User,
  "id" | "createdAt" | "lastLogin" | "role"
> & {
  confirmPassword: string;
  role?: "user";
};

export type PublicUser = Omit<User, "password">;
export type UserProfile = Partial<User>;
export type UserUpdateData = Partial<Omit<User, "id" | "createdAt">>;
