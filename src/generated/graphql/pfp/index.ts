import client from 'https://api.goldsky.com/api/public/project_clz85cxrvng3n01ughcv5e7hg/subgraphs/tbz-pfps/0.0.7/gn';
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
  id: Scalars['Bytes']['output'];
  profilePicture?: Maybe<Token>;
  tokens: Array<Token>;
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
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  profilePicture_?: InputMaybe<Token_Filter>;
  profilePicture_contains?: InputMaybe<Scalars['String']['input']>;
  profilePicture_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  profilePicture_ends_with?: InputMaybe<Scalars['String']['input']>;
  profilePicture_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  profilePicture_gt?: InputMaybe<Scalars['String']['input']>;
  profilePicture_gte?: InputMaybe<Scalars['String']['input']>;
  profilePicture_in?: InputMaybe<Array<Scalars['String']['input']>>;
  profilePicture_lt?: InputMaybe<Scalars['String']['input']>;
  profilePicture_lte?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_contains?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  profilePicture_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  profilePicture_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  profilePicture_starts_with?: InputMaybe<Scalars['String']['input']>;
  profilePicture_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokens_?: InputMaybe<Token_Filter>;
};

export enum Account_OrderBy {
  Id = 'id',
  ProfilePicture = 'profilePicture',
  ProfilePictureId = 'profilePicture__id',
  ProfilePictureIsErc721 = 'profilePicture__isERC721',
  ProfilePictureIsErc1155 = 'profilePicture__isERC1155',
  ProfilePictureTokenAddress = 'profilePicture__tokenAddress',
  ProfilePictureTokenId = 'profilePicture__tokenId',
  ProfilePictureTokenUri = 'profilePicture__tokenURI',
  Tokens = 'tokens',
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
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
  id: Scalars['Bytes']['output'];
  isERC721: Scalars['Boolean']['output'];
  isERC1155: Scalars['Boolean']['output'];
  owner: Account;
  tokenAddress: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  tokenURI?: Maybe<Scalars['String']['output']>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
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
  isERC721?: InputMaybe<Scalars['Boolean']['input']>;
  isERC721_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isERC721_not?: InputMaybe<Scalars['Boolean']['input']>;
  isERC721_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isERC1155?: InputMaybe<Scalars['Boolean']['input']>;
  isERC1155_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isERC1155_not?: InputMaybe<Scalars['Boolean']['input']>;
  isERC1155_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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

export enum Token_OrderBy {
  Id = 'id',
  IsErc721 = 'isERC721',
  IsErc1155 = 'isERC1155',
  Owner = 'owner',
  OwnerId = 'owner__id',
  TokenAddress = 'tokenAddress',
  TokenId = 'tokenId',
  TokenUri = 'tokenURI',
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
