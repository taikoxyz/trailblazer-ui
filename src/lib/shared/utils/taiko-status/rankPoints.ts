export function formatTaikoStatusPoints(value: number): string {
  return Math.floor(value).toLocaleString();
}

export function getTaikoStatusPointsToNextRank(currentPoints: number): number {
  const ranks = [1000, 5000, 25_000, 100_000];
  const nextRank = ranks.find((rank) => rank > currentPoints);
  return nextRank ? nextRank - currentPoints : 0;
}
