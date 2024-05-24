type NonNullableValue = string | unknown[] | object | [];

export function isEmpty<T extends NonNullableValue>(
  value: T | null | undefined,
): boolean {
  if (value == null) {
    // Check for null or undefined
    return true;
  }

  if (typeof value === 'string') {
    // Check for empty string
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    // Check for empty array
    return value.length === 0;
  }

  if (typeof value === 'object') {
    // Check for empty object
    return Object.keys(value).length === 0;
  }

  return false;
}
