/**
 * StrictOmit - a safe version of Omit
 * Checks that the keys being deleted actually exist in the type
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

/**
 * Example usage:
 * type Test = StrictOmit<User, 'id'>; // ✅ OK
 * type Test = StrictOmit<User, 'id2'>; // ❌ Error!
 */
