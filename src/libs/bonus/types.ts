export type SeasonBonusRewards = {
  claim(): void;
  updatePoints(): Promise<void>;
  refreshData(): void;
  checkClaimStatus(): void;
};
