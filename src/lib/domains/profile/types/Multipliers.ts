export type Multipliers = {
  multipliers: {
    transationMultiplier: Multiplier;
    transactionVolumeMultiplier: Multiplier;
    globalMultiplier: Multiplier;
  };
};

type Multiplier = {
  multiplier: number;
  max: boolean;
};
