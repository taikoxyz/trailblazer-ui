import client from 'https://api.goldsky.com/api/public/project_clz85cxrvng3n01ughcv5e7hg/subgraphs/tbz-s2/0.0.8-e-616/gn';
import type {} from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  Int8: { input: any; output: any };
  Timestamp: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  approvedForAll: Scalars['Boolean']['output'];
  approvedS1Tokens: Array<Token>;
  /** An Account is any address that holds any amount of badges */
  id: Scalars['Bytes']['output'];
  s1MultiplierNfts: Array<Token>;
  s2Badges: Array<Token>;
  s2Recruitments: Array<BadgeRecruitment>;
  totalMultiplier: Scalars['BigInt']['output'];
};

export type AccountApprovedS1TokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type AccountS1MultiplierNftsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type AccountS2BadgesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type AccountS2RecruitmentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BadgeRecruitment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BadgeRecruitment_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  approvedForAll?: InputMaybe<Scalars['Boolean']['input']>;
  approvedForAll_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approvedForAll_not?: InputMaybe<Scalars['Boolean']['input']>;
  approvedForAll_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approvedS1Tokens?: InputMaybe<Array<Scalars['String']['input']>>;
  approvedS1Tokens_?: InputMaybe<Token_Filter>;
  approvedS1Tokens_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  approvedS1Tokens_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  approvedS1Tokens_not?: InputMaybe<Array<Scalars['String']['input']>>;
  approvedS1Tokens_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  approvedS1Tokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  s1MultiplierNfts_?: InputMaybe<Token_Filter>;
  s2Badges?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_?: InputMaybe<Token_Filter>;
  s2Badges_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Recruitments_?: InputMaybe<BadgeRecruitment_Filter>;
  totalMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Account_OrderBy {
  ApprovedForAll = 'approvedForAll',
  ApprovedS1Tokens = 'approvedS1Tokens',
  Id = 'id',
  S1MultiplierNfts = 's1MultiplierNfts',
  S2Badges = 's2Badges',
  S2Recruitments = 's2Recruitments',
  TotalMultiplier = 'totalMultiplier',
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour',
}

export type BadgeRecruitment = {
  __typename?: 'BadgeRecruitment';
  claimExpirationTimeout: Scalars['BigInt']['output'];
  cycleId: Scalars['BigInt']['output'];
  /** owner:s1BadgeTokenId */
  id: Scalars['ID']['output'];
  influenceExpirationTimeout: Scalars['BigInt']['output'];
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  isStarted?: Maybe<Scalars['Boolean']['output']>;
  minnowInfluences: Scalars['BigInt']['output'];
  owner: Account;
  s1Badge: Token;
  s2Badge?: Maybe<Token>;
  whaleInfluences: Scalars['BigInt']['output'];
};

export type BadgeRecruitment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BadgeRecruitment_Filter>>>;
  claimExpirationTimeout?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimExpirationTimeout_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimExpirationTimeout_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cycleId?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  cycleId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_not?: InputMaybe<Scalars['BigInt']['input']>;
  cycleId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  influenceExpirationTimeout?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_gt?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_gte?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  influenceExpirationTimeout_lt?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_lte?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_not?: InputMaybe<Scalars['BigInt']['input']>;
  influenceExpirationTimeout_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isCompleted_not?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isStarted?: InputMaybe<Scalars['Boolean']['input']>;
  isStarted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isStarted_not?: InputMaybe<Scalars['Boolean']['input']>;
  isStarted_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  minnowInfluences?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minnowInfluences_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_not?: InputMaybe<Scalars['BigInt']['input']>;
  minnowInfluences_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BadgeRecruitment_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge?: InputMaybe<Scalars['String']['input']>;
  s1Badge_?: InputMaybe<Token_Filter>;
  s1Badge_contains?: InputMaybe<Scalars['String']['input']>;
  s1Badge_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge_ends_with?: InputMaybe<Scalars['String']['input']>;
  s1Badge_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge_gt?: InputMaybe<Scalars['String']['input']>;
  s1Badge_gte?: InputMaybe<Scalars['String']['input']>;
  s1Badge_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s1Badge_lt?: InputMaybe<Scalars['String']['input']>;
  s1Badge_lte?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_contains?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s1Badge_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  s1Badge_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s1Badge_starts_with?: InputMaybe<Scalars['String']['input']>;
  s1Badge_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge?: InputMaybe<Scalars['String']['input']>;
  s2Badge_?: InputMaybe<Token_Filter>;
  s2Badge_contains?: InputMaybe<Scalars['String']['input']>;
  s2Badge_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge_ends_with?: InputMaybe<Scalars['String']['input']>;
  s2Badge_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge_gt?: InputMaybe<Scalars['String']['input']>;
  s2Badge_gte?: InputMaybe<Scalars['String']['input']>;
  s2Badge_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badge_lt?: InputMaybe<Scalars['String']['input']>;
  s2Badge_lte?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_contains?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badge_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  s2Badge_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  s2Badge_starts_with?: InputMaybe<Scalars['String']['input']>;
  s2Badge_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  whaleInfluences?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_gt?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_gte?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whaleInfluences_lt?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_lte?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_not?: InputMaybe<Scalars['BigInt']['input']>;
  whaleInfluences_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum BadgeRecruitment_OrderBy {
  ClaimExpirationTimeout = 'claimExpirationTimeout',
  CycleId = 'cycleId',
  Id = 'id',
  InfluenceExpirationTimeout = 'influenceExpirationTimeout',
  IsCompleted = 'isCompleted',
  IsStarted = 'isStarted',
  MinnowInfluences = 'minnowInfluences',
  Owner = 'owner',
  OwnerApprovedForAll = 'owner__approvedForAll',
  OwnerId = 'owner__id',
  OwnerTotalMultiplier = 'owner__totalMultiplier',
  S1Badge = 's1Badge',
  S1BadgeBadgeId = 's1Badge__badgeId',
  S1BadgeContract = 's1Badge__contract',
  S1BadgeErc = 's1Badge__erc',
  S1BadgeFrozen = 's1Badge__frozen',
  S1BadgeId = 's1Badge__id',
  S1BadgeMovement = 's1Badge__movement',
  S1BadgeSeason = 's1Badge__season',
  S1BadgeTokenId = 's1Badge__tokenId',
  S1BadgeUri = 's1Badge__uri',
  S2Badge = 's2Badge',
  S2BadgeBadgeId = 's2Badge__badgeId',
  S2BadgeContract = 's2Badge__contract',
  S2BadgeErc = 's2Badge__erc',
  S2BadgeFrozen = 's2Badge__frozen',
  S2BadgeId = 's2Badge__id',
  S2BadgeMovement = 's2Badge__movement',
  S2BadgeSeason = 's2Badge__season',
  S2BadgeTokenId = 's2Badge__tokenId',
  S2BadgeUri = 's2Badge__uri',
  WhaleInfluences = 'whaleInfluences',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Champion = {
  __typename?: 'Champion';
  badgeId: Scalars['BigInt']['output'];
  color: Scalars['BigInt']['output'];
  contract: Scalars['String']['output'];
  /** [ownerAddress]:[contractId]:[tokenId]:[tournamentId] */
  id: Scalars['ID']['output'];
  leagueId: Scalars['BigInt']['output'];
  owner: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  power: Scalars['BigInt']['output'];
  tokenId: Scalars['BigInt']['output'];
};

export type Champion_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Champion_Filter>>>;
  badgeId?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_not?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  color?: InputMaybe<Scalars['BigInt']['input']>;
  color_gt?: InputMaybe<Scalars['BigInt']['input']>;
  color_gte?: InputMaybe<Scalars['BigInt']['input']>;
  color_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  color_lt?: InputMaybe<Scalars['BigInt']['input']>;
  color_lte?: InputMaybe<Scalars['BigInt']['input']>;
  color_not?: InputMaybe<Scalars['BigInt']['input']>;
  color_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contract?: InputMaybe<Scalars['String']['input']>;
  contract_contains?: InputMaybe<Scalars['String']['input']>;
  contract_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_gt?: InputMaybe<Scalars['String']['input']>;
  contract_gte?: InputMaybe<Scalars['String']['input']>;
  contract_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_lt?: InputMaybe<Scalars['String']['input']>;
  contract_lte?: InputMaybe<Scalars['String']['input']>;
  contract_not?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with?: InputMaybe<Scalars['String']['input']>;
  contract_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  leagueId?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  leagueId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_not?: InputMaybe<Scalars['BigInt']['input']>;
  leagueId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Champion_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power?: InputMaybe<Scalars['BigInt']['input']>;
  power_gt?: InputMaybe<Scalars['BigInt']['input']>;
  power_gte?: InputMaybe<Scalars['BigInt']['input']>;
  power_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power_lt?: InputMaybe<Scalars['BigInt']['input']>;
  power_lte?: InputMaybe<Scalars['BigInt']['input']>;
  power_not?: InputMaybe<Scalars['BigInt']['input']>;
  power_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Champion_OrderBy {
  BadgeId = 'badgeId',
  Color = 'color',
  Contract = 'contract',
  Id = 'id',
  LeagueId = 'leagueId',
  Owner = 'owner',
  Points = 'points',
  Power = 'power',
  TokenId = 'tokenId',
}

export type League = {
  __typename?: 'League';
  closeTime: Scalars['BigInt']['output'];
  /** Contract's league id */
  id: Scalars['ID']['output'];
  openTime: Scalars['BigInt']['output'];
  participants: Array<Champion>;
  rounds: Array<Round>;
  seed: Scalars['BigInt']['output'];
  startTime: Scalars['BigInt']['output'];
};

export type LeagueParticipantsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Champion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Champion_Filter>;
};

export type LeagueRoundsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Round_Filter>;
};

export type League_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<League_Filter>>>;
  closeTime?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  closeTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  closeTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  openTime?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  openTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  openTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<League_Filter>>>;
  participants?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_?: InputMaybe<Champion_Filter>;
  participants_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds_?: InputMaybe<Round_Filter>;
  rounds_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds_not?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  rounds_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  seed?: InputMaybe<Scalars['BigInt']['input']>;
  seed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  seed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  seed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  seed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  seed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  seed_not?: InputMaybe<Scalars['BigInt']['input']>;
  seed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum League_OrderBy {
  CloseTime = 'closeTime',
  Id = 'id',
  OpenTime = 'openTime',
  Participants = 'participants',
  Rounds = 'rounds',
  Seed = 'seed',
  StartTime = 'startTime',
}

export type Match = {
  __typename?: 'Match';
  /** [tournamentSeed]:[round]:[match] */
  id: Scalars['ID']['output'];
  participants: Array<MatchParticipant>;
};

export type MatchParticipantsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MatchParticipant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MatchParticipant_Filter>;
};

export type MatchParticipant = {
  __typename?: 'MatchParticipant';
  battler: Champion;
  energy: Scalars['BigInt']['output'];
  /** [ownerAddress]:[contractId]:[tokenId]:[tournamentId]:[match] */
  id: Scalars['ID']['output'];
  isWinner: Scalars['Boolean']['output'];
  owner: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  power: Scalars['BigInt']['output'];
  totalPower: Scalars['BigInt']['output'];
};

export type MatchParticipant_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MatchParticipant_Filter>>>;
  battler?: InputMaybe<Scalars['String']['input']>;
  battler_?: InputMaybe<Champion_Filter>;
  battler_contains?: InputMaybe<Scalars['String']['input']>;
  battler_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  battler_ends_with?: InputMaybe<Scalars['String']['input']>;
  battler_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  battler_gt?: InputMaybe<Scalars['String']['input']>;
  battler_gte?: InputMaybe<Scalars['String']['input']>;
  battler_in?: InputMaybe<Array<Scalars['String']['input']>>;
  battler_lt?: InputMaybe<Scalars['String']['input']>;
  battler_lte?: InputMaybe<Scalars['String']['input']>;
  battler_not?: InputMaybe<Scalars['String']['input']>;
  battler_not_contains?: InputMaybe<Scalars['String']['input']>;
  battler_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  battler_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  battler_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  battler_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  battler_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  battler_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  battler_starts_with?: InputMaybe<Scalars['String']['input']>;
  battler_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  energy?: InputMaybe<Scalars['BigInt']['input']>;
  energy_gt?: InputMaybe<Scalars['BigInt']['input']>;
  energy_gte?: InputMaybe<Scalars['BigInt']['input']>;
  energy_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  energy_lt?: InputMaybe<Scalars['BigInt']['input']>;
  energy_lte?: InputMaybe<Scalars['BigInt']['input']>;
  energy_not?: InputMaybe<Scalars['BigInt']['input']>;
  energy_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  isWinner?: InputMaybe<Scalars['Boolean']['input']>;
  isWinner_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isWinner_not?: InputMaybe<Scalars['Boolean']['input']>;
  isWinner_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MatchParticipant_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power?: InputMaybe<Scalars['BigInt']['input']>;
  power_gt?: InputMaybe<Scalars['BigInt']['input']>;
  power_gte?: InputMaybe<Scalars['BigInt']['input']>;
  power_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power_lt?: InputMaybe<Scalars['BigInt']['input']>;
  power_lte?: InputMaybe<Scalars['BigInt']['input']>;
  power_not?: InputMaybe<Scalars['BigInt']['input']>;
  power_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPower?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalPower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalPower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum MatchParticipant_OrderBy {
  Battler = 'battler',
  BattlerBadgeId = 'battler__badgeId',
  BattlerColor = 'battler__color',
  BattlerContract = 'battler__contract',
  BattlerId = 'battler__id',
  BattlerLeagueId = 'battler__leagueId',
  BattlerOwner = 'battler__owner',
  BattlerPoints = 'battler__points',
  BattlerPower = 'battler__power',
  BattlerTokenId = 'battler__tokenId',
  Energy = 'energy',
  Id = 'id',
  IsWinner = 'isWinner',
  Owner = 'owner',
  Points = 'points',
  Power = 'power',
  TotalPower = 'totalPower',
}

export type Match_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Match_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Match_Filter>>>;
  participants?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_?: InputMaybe<MatchParticipant_Filter>;
  participants_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  participants_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum Match_OrderBy {
  Id = 'id',
  Participants = 'participants',
}

export type OpenRecruitment = {
  __typename?: 'OpenRecruitment';
  badgeIds: Array<Scalars['BigInt']['output']>;
  enabled: Scalars['Boolean']['output'];
  endTime: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  startTime: Scalars['BigInt']['output'];
};

export type OpenRecruitment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OpenRecruitment_Filter>>>;
  badgeIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  enabled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  enabled_not?: InputMaybe<Scalars['Boolean']['input']>;
  enabled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OpenRecruitment_Filter>>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum OpenRecruitment_OrderBy {
  BadgeIds = 'badgeIds',
  Enabled = 'enabled',
  EndTime = 'endTime',
  Id = 'id',
  StartTime = 'startTime',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type ProfilePicture = {
  __typename?: 'ProfilePicture';
  id: Scalars['Bytes']['output'];
  tokenAddress: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  tokenURI?: Maybe<Scalars['String']['output']>;
};

export type ProfilePicture_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProfilePicture_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProfilePicture_Filter>>>;
  tokenAddress?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenURI?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_gte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_lt?: InputMaybe<Scalars['String']['input']>;
  tokenURI_lte?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ProfilePicture_OrderBy {
  Id = 'id',
  TokenAddress = 'tokenAddress',
  TokenId = 'tokenId',
  TokenUri = 'tokenURI',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  badgeRecruitment?: Maybe<BadgeRecruitment>;
  badgeRecruitments: Array<BadgeRecruitment>;
  champion?: Maybe<Champion>;
  champions: Array<Champion>;
  league?: Maybe<League>;
  leagues: Array<League>;
  match?: Maybe<Match>;
  matchParticipant?: Maybe<MatchParticipant>;
  matchParticipants: Array<MatchParticipant>;
  matches: Array<Match>;
  openRecruitment?: Maybe<OpenRecruitment>;
  openRecruitments: Array<OpenRecruitment>;
  profilePicture?: Maybe<ProfilePicture>;
  profilePictures: Array<ProfilePicture>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  s2Multiplier?: Maybe<S2Multiplier>;
  s2Multipliers: Array<S2Multiplier>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type QueryBadgeRecruitmentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBadgeRecruitmentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BadgeRecruitment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BadgeRecruitment_Filter>;
};

export type QueryChampionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryChampionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Champion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Champion_Filter>;
};

export type QueryLeagueArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLeaguesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<League_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<League_Filter>;
};

export type QueryMatchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMatchParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMatchParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MatchParticipant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MatchParticipant_Filter>;
};

export type QueryMatchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Match_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Match_Filter>;
};

export type QueryOpenRecruitmentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOpenRecruitmentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OpenRecruitment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OpenRecruitment_Filter>;
};

export type QueryProfilePictureArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProfilePicturesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProfilePicture_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProfilePicture_Filter>;
};

export type QueryRoundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRoundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Round_Filter>;
};

export type QueryS2MultiplierArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryS2MultipliersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<S2Multiplier_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<S2Multiplier_Filter>;
};

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Round = {
  __typename?: 'Round';
  /** [tournamentSeed]:[round] */
  id: Scalars['ID']['output'];
  matches: Array<Match>;
};

export type RoundMatchesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Match_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Match_Filter>;
};

export type Round_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Round_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  matches?: InputMaybe<Array<Scalars['String']['input']>>;
  matches_?: InputMaybe<Match_Filter>;
  matches_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  matches_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  matches_not?: InputMaybe<Array<Scalars['String']['input']>>;
  matches_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  matches_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Round_Filter>>>;
};

export enum Round_OrderBy {
  Id = 'id',
  Matches = 'matches',
}

export type S2Multiplier = {
  __typename?: 'S2Multiplier';
  devMultiplier: Scalars['BigInt']['output'];
  globalMultiplier: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  minnowMultiplier: Scalars['BigInt']['output'];
  snaefellMultiplier: Scalars['BigInt']['output'];
  taikoonMultiplier: Scalars['BigInt']['output'];
  whaleMultiplier: Scalars['BigInt']['output'];
};

export type S2Multiplier_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<S2Multiplier_Filter>>>;
  devMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  devMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  devMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  globalMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  globalMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  globalMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  minnowMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minnowMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  minnowMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<S2Multiplier_Filter>>>;
  snaefellMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  snaefellMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  snaefellMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  taikoonMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  taikoonMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  taikoonMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whaleMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  whaleMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  whaleMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum S2Multiplier_OrderBy {
  DevMultiplier = 'devMultiplier',
  GlobalMultiplier = 'globalMultiplier',
  Id = 'id',
  MinnowMultiplier = 'minnowMultiplier',
  SnaefellMultiplier = 'snaefellMultiplier',
  TaikoonMultiplier = 'taikoonMultiplier',
  WhaleMultiplier = 'whaleMultiplier',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  badgeRecruitment?: Maybe<BadgeRecruitment>;
  badgeRecruitments: Array<BadgeRecruitment>;
  champion?: Maybe<Champion>;
  champions: Array<Champion>;
  league?: Maybe<League>;
  leagues: Array<League>;
  match?: Maybe<Match>;
  matchParticipant?: Maybe<MatchParticipant>;
  matchParticipants: Array<MatchParticipant>;
  matches: Array<Match>;
  openRecruitment?: Maybe<OpenRecruitment>;
  openRecruitments: Array<OpenRecruitment>;
  profilePicture?: Maybe<ProfilePicture>;
  profilePictures: Array<ProfilePicture>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  s2Multiplier?: Maybe<S2Multiplier>;
  s2Multipliers: Array<S2Multiplier>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};

export type SubscriptionBadgeRecruitmentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBadgeRecruitmentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BadgeRecruitment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BadgeRecruitment_Filter>;
};

export type SubscriptionChampionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionChampionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Champion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Champion_Filter>;
};

export type SubscriptionLeagueArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLeaguesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<League_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<League_Filter>;
};

export type SubscriptionMatchArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMatchParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMatchParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MatchParticipant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MatchParticipant_Filter>;
};

export type SubscriptionMatchesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Match_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Match_Filter>;
};

export type SubscriptionOpenRecruitmentArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionOpenRecruitmentsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OpenRecruitment_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OpenRecruitment_Filter>;
};

export type SubscriptionProfilePictureArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProfilePicturesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProfilePicture_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProfilePicture_Filter>;
};

export type SubscriptionRoundArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRoundsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Round_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Round_Filter>;
};

export type SubscriptionS2MultiplierArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionS2MultipliersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<S2Multiplier_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<S2Multiplier_Filter>;
};

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  badgeId?: Maybe<Scalars['BigInt']['output']>;
  contract: Scalars['Bytes']['output'];
  erc: Scalars['BigInt']['output'];
  frozen?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  movement?: Maybe<Scalars['BigInt']['output']>;
  owner: Account;
  season?: Maybe<Scalars['BigInt']['output']>;
  tokenId: Scalars['BigInt']['output'];
  uri?: Maybe<Scalars['String']['output']>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  badgeId?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  badgeId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_not?: InputMaybe<Scalars['BigInt']['input']>;
  badgeId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contract?: InputMaybe<Scalars['Bytes']['input']>;
  contract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  contract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  contract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  contract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  erc?: InputMaybe<Scalars['BigInt']['input']>;
  erc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  erc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  erc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  erc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  erc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  erc_not?: InputMaybe<Scalars['BigInt']['input']>;
  erc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frozen?: InputMaybe<Scalars['Boolean']['input']>;
  frozen_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  frozen_not?: InputMaybe<Scalars['Boolean']['input']>;
  frozen_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  movement?: InputMaybe<Scalars['BigInt']['input']>;
  movement_gt?: InputMaybe<Scalars['BigInt']['input']>;
  movement_gte?: InputMaybe<Scalars['BigInt']['input']>;
  movement_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  movement_lt?: InputMaybe<Scalars['BigInt']['input']>;
  movement_lte?: InputMaybe<Scalars['BigInt']['input']>;
  movement_not?: InputMaybe<Scalars['BigInt']['input']>;
  movement_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['BigInt']['input']>;
  season_gt?: InputMaybe<Scalars['BigInt']['input']>;
  season_gte?: InputMaybe<Scalars['BigInt']['input']>;
  season_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  season_lt?: InputMaybe<Scalars['BigInt']['input']>;
  season_lte?: InputMaybe<Scalars['BigInt']['input']>;
  season_not?: InputMaybe<Scalars['BigInt']['input']>;
  season_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Token_OrderBy {
  BadgeId = 'badgeId',
  Contract = 'contract',
  Erc = 'erc',
  Frozen = 'frozen',
  Id = 'id',
  Movement = 'movement',
  Owner = 'owner',
  OwnerApprovedForAll = 'owner__approvedForAll',
  OwnerId = 'owner__id',
  OwnerTotalMultiplier = 'owner__totalMultiplier',
  Season = 'season',
  TokenId = 'tokenId',
  Uri = 'uri',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}
