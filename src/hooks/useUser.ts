import { useEffect, useState } from "react";
import { authApi } from "@/api/auth";

import type { User, UserUpdateData } from "@/types/user";

interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateUser: (data: UserUpdateData) => Promise<User | null>;
}

export function useUser(id?: string): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await authApi.getCurrentUser(id);

        setUser(user ?? null);
      } catch {
        setUser(null);
        setError("Failed to load user.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const updateUser = async (data: UserUpdateData): Promise<User | null> => {
    if (!user) {
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const updatedUser = await authApi.update(user.id, data);

      if (updatedUser) {
        setUser(updatedUser);
      }

      return updatedUser;
    } catch {
      setError("Failed to update user.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateUser,
  };
}
