import { apiGet, apiPost, apiPut, apiDelete } from "./client";
import type { User, RegisterData } from "@/types/user";

const USERS_KEY = "users";

type UserUpdateData = Partial<Omit<User, "id" | "createdAt">>;

export const authApi = {
  async login(email: string, password: string): Promise<User | null> {
    const users = await apiGet<User>(USERS_KEY);
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      const now = new Date();
      const updatedUser = { ...user, lastLogin: now };
      await apiPut(USERS_KEY, user.id, { lastLogin: now });
      return updatedUser;
    }

    return null;
  },

  async register(data: RegisterData): Promise<User> {
    const { confirmPassword, ...userData } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

    const newUser = await apiPost<User>(USERS_KEY, {
      ...userData,
      role: "user",
    } as Omit<User, "id">);

    return newUser;
  },

  async getCurrentUser(id: string): Promise<User | null> {
    const users = await apiGet<User>(USERS_KEY, id);
    return users[0] || null;
  },

  async get(): Promise<User[]> {
    return apiGet<User>(USERS_KEY);
  },

  async update(id: string, data: UserUpdateData): Promise<User | null> {
    const [user] = await apiGet<User>(USERS_KEY, id);

    if (!user) {
      return null;
    }

    const updatedData: UserUpdateData = {
      ...data,
      ...(data.profile && {
        profile: {
          ...user.profile,
          ...data.profile,
        },
      }),
    };

    return apiPut<User>(USERS_KEY, id, updatedData);
  },

  async delete(id: string): Promise<boolean> {
    const users = await apiGet<User>(USERS_KEY);
    const userToDelete = users.find((u) => u.id === id);

    if (userToDelete?.role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount <= 1) {
        throw new Error("Cannot delete the last administrator!");
      }
    }

    return apiDelete(USERS_KEY, id);
  },
};
