/**
 * Concatenates class names conditionally
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format currency or number values
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}
