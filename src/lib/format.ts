/** Format a rupee amount for display, e.g. 249 -> "₹249". */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
