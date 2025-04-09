export enum StatusRank {
  None = 'none',
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Based = 'based',
}

export const RanksToPoints: Record<StatusRank, number> = {
  [StatusRank.None]: 0,
  [StatusRank.Bronze]: 1000,
  [StatusRank.Silver]: 5000,
  [StatusRank.Gold]: 25_000,
  [StatusRank.Platinum]: 100_000,
  [StatusRank.Based]: 1_000_000,
};
