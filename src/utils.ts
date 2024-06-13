
export function requireNonNull<T, V = T | null | undefined>(v: V): T {
  if (v === null || v === undefined) {
    throw new Error("value is null")
  }
  return v as T
}