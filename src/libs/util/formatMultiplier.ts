export function formatMultiplier(multiplier: number): number {
  return Number(((multiplier + 1000) / 1000).toFixed(2));
}
