import type { User } from "@/types/user";

const STORAGE_KEY = "users";

export const initialUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    profile: {
      firstName: "Admin",
      lastName: "System",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    createdAt: new Date("2026-08-01"),
    lastLogin: new Date(),
  },
  {
    id: "2",
    email: "manager@example.com",
    password: "manager123",
    role: "manager",
    profile: {
      firstName: "Manager",
      lastName: "Projects",
      avatar: "https://i.pravatar.cc/150?img=38",
    },
    createdAt: new Date("2026-08-15"),
  },
  {
    id: "3",
    email: "user@example.com",
    password: "user123",
    role: "user",
    profile: {
      firstName: "Emily",
      lastName: "Johnson",
      avatar: "https://i.pravatar.cc/150?img=28",
    },
    createdAt: new Date("2026-08-26"),
  },
];

export function initializeData() {
  const users = localStorage.getItem(STORAGE_KEY);

  if (!users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
    console.log("Test data loaded.");
  }
}
