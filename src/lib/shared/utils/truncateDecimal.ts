export function truncateDecimal(num: number, decimalPlaces: number): number {
  const factor = 10 ** decimalPlaces;
  const truncated = Math.round(num * factor) / factor;
  return truncated;
}
