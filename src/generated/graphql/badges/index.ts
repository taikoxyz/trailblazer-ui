import client from "https://api.goldsky.com/api/public/project_cm0gfm7474if101wcawrq6mhu/subgraphs/tbz-all/2.0.0/gn";
import type {
        
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  approvedForAll: Scalars['Boolean']['output'];
  approvedS1Tokens: Array<Token>;
  /** An Account is any address that holds any amount of badges */
  id: Scalars['Bytes']['output'];
  s2Badges: Array<Token>;
  s2Recruitments: Array<BadgeRecruitment>;
  tokens: Array<Token>;
};


export type AccountApprovedS1TokensArgs = {
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


export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
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
  s2Badges?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_?: InputMaybe<Token_Filter>;
  s2Badges_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Badges_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  s2Recruitments_?: InputMaybe<BadgeRecruitment_Filter>;
  tokens_?: InputMaybe<Token_Filter>;
};

export enum Account_OrderBy {
  ApprovedForAll = 'approvedForAll',
  ApprovedS1Tokens = 'approvedS1Tokens',
  Id = 'id',
  S2Badges = 's2Badges',
  S2Recruitments = 's2Recruitments',
  Tokens = 'tokens'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
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
  S1Badge = 's1Badge',
  S1BadgeBadgeId = 's1Badge__badgeId',
  S1BadgeContract = 's1Badge__contract',
  S1BadgeErc = 's1Badge__erc',
  S1BadgeFrozenAt = 's1Badge__frozenAt',
  S1BadgeId = 's1Badge__id',
  S1BadgeMovement = 's1Badge__movement',
  S1BadgeSeason = 's1Badge__season',
  S1BadgeTokenId = 's1Badge__tokenId',
  S1BadgeUri = 's1Badge__uri',
  S2Badge = 's2Badge',
  S2BadgeBadgeId = 's2Badge__badgeId',
  S2BadgeContract = 's2Badge__contract',
  S2BadgeErc = 's2Badge__erc',
  S2BadgeFrozenAt = 's2Badge__frozenAt',
  S2BadgeId = 's2Badge__id',
  S2BadgeMovement = 's2Badge__movement',
  S2BadgeSeason = 's2Badge__season',
  S2BadgeTokenId = 's2Badge__tokenId',
  S2BadgeUri = 's2Badge__uri',
  WhaleInfluences = 'whaleInfluences'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

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
  StartTime = 'startTime'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  badgeRecruitment?: Maybe<BadgeRecruitment>;
  badgeRecruitments: Array<BadgeRecruitment>;
  openRecruitment?: Maybe<OpenRecruitment>;
  openRecruitments: Array<OpenRecruitment>;
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  badgeRecruitment?: Maybe<BadgeRecruitment>;
  badgeRecruitments: Array<BadgeRecruitment>;
  openRecruitment?: Maybe<OpenRecruitment>;
  openRecruitments: Array<OpenRecruitment>;
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
  frozenAt?: Maybe<Scalars['BigInt']['output']>;
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
  frozenAt?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frozenAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  frozenAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  FrozenAt = 'frozenAt',
  Id = 'id',
  Movement = 'movement',
  Owner = 'owner',
  OwnerApprovedForAll = 'owner__approvedForAll',
  OwnerId = 'owner__id',
  Season = 'season',
  TokenId = 'tokenId',
  Uri = 'uri'
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
  Deny = 'deny'
}


