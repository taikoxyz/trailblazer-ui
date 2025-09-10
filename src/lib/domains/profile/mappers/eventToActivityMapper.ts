import { ActivityType } from '$lib/domains/profile/types/ActivityHistory';

export const eventToActivityTypeMap: Record<string, ActivityType> = {
  TransactionValue: ActivityType.TRANSACTION_VALUE,
  Transaction: ActivityType.TRANSACTION,
  Bridged: ActivityType.BRIDGED,
  BlockProposed: ActivityType.BLOCK_PROPOSED,
  BlockProven: ActivityType.BLOCK_PROVEN,
  Prediction: ActivityType.PREDICTION,
  DoraHacksVoting: ActivityType.DORAHACKS_VOTE,
  AvalonClaim: ActivityType.AVALON_CLAIM,
  FrozenBonus: ActivityType.MONK_COMPENSATION,
  PfpRegister: ActivityType.PFP_BONUS,
  LoopringDeposit: ActivityType.LOOPRING_DEPOSIT,
  TaikoStatusPoints: ActivityType.TAIKO_STATUS_REWARD,
  OkidoriNftSold: ActivityType.OKIDORI_NFT_SOLD,
  Basedliner: ActivityType.BASEDLINER,
};
