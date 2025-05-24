export const isServerSide = typeof window === "undefined";

export function isUndefined(value: unknown): value is null | undefined {
  if (value === null || value === undefined) return true;
  return false;
}
