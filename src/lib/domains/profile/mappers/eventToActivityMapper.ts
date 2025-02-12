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
};
