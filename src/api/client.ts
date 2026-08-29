import { v4 as uuid } from "uuid";
import { type Entity } from "@/types/entity";

export async function apiGet<T extends Entity>(
  storageKey: string,
  id?: string,
): Promise<T[]> {
  const data = localStorage.getItem(storageKey);
  const items: T[] = data ? JSON.parse(data) : [];

  if (id) {
    return items.filter((item) => item.id === id);
  }

  return items;
}

export async function apiPost<T extends Entity>(
  storageKey: string,
  data: Omit<T, "id">,
  customId?: string,
): Promise<T> {
  const items = await apiGet<T>(storageKey);

  const newItem = {
    ...data,
    id: customId ?? uuid(),
    createdAt: new Date(),
  } as T;

  items.push(newItem);
  localStorage.setItem(storageKey, JSON.stringify(items));
  return newItem;
}

export async function apiPut<T extends Entity>(
  storageKey: string,
  id: string,
  data: Partial<T>,
): Promise<T | null> {
  const items = await apiGet<T>(storageKey);
  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedItem = {
    ...items[index],
    ...data,
  };

  items[index] = updatedItem;

  localStorage.setItem(storageKey, JSON.stringify(items));

  return updatedItem;
}

export async function apiDelete<T extends Entity>(
  storageKey: string,
  id: string,
): Promise<boolean> {
  const items = await apiGet<T>(storageKey);
  const filtered = items.filter((item) => item.id !== id);

  if (filtered.length === items.length) return false;

  localStorage.setItem(storageKey, JSON.stringify(filtered));
  return true;
}
