export type S2Multipliers = {
  devMultiplier: number;
  minnowMultiplier: number;
  snaefellMultiplier: number;
  taikoonMultiplier: number;
  whaleMultiplier: number;
  globalMultiplier: number;
};

export type MultiplierApiResponse = {
  address: string;
  global: {
    value: number;
    max: boolean;
  };
  tx: {
    value: number;
    max: boolean;
  };
  txValue: {
    value: number;
    max: boolean;
  };
};
