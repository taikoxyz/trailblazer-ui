import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from '@wagmi/core/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ClaimGalxePoints
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const claimGalxePointsAbi = [
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'alreadyRegistered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'registrant',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Registered',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const claimGalxePointsAddress = {
  167000: '0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088',
  167009: '0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const claimGalxePointsConfig = {
  address: claimGalxePointsAddress,
  abi: claimGalxePointsAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 */
export const usdcAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 */
export const usdcAddress = {
  167000: '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b',
  167009: '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 */
export const usdcConfig = { address: usdcAddress, abi: usdcAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 */
export const usdtAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 */
export const usdtAddress = {
  167000: '0x2DEF195713CF4a606B49D07E520e22C17899a736',
  167009: '0x2DEF195713CF4a606B49D07E520e22C17899a736',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrailblazersBadges
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const trailblazersBadgesAbi = [
  {
    type: 'function',
    name: 'BADGE_ANDROIDS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_BOUNCERS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_DRUMMERS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_MASTERS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_MONKS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_RAVERS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_ROBOTS',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'BADGE_SHINTO',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MOVEMENT_BASED',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MOVEMENT_BOOSTED',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MOVEMENT_NEUTRAL',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'UPGRADE_INTERFACE_VERSION',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  { type: 'function', name: 'acceptOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'badgeBalances',
    inputs: [{ name: '_owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool[]', internalType: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'badgeBalancesV2',
    inputs: [{ name: '_owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: 'balances', type: 'bool[]', internalType: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'badges',
    inputs: [{ name: '_tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '_badgeId', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'baseURI',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'blacklist',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'contract IMinimalBlacklist' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'canMint',
    inputs: [
      { name: '_signature', type: 'bytes', internalType: 'bytes' },
      { name: '_minter', type: 'address', internalType: 'address' },
      { name: '_tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getHash',
    inputs: [
      { name: '_minter', type: 'address', internalType: 'address' },
      { name: '_tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getTokenId',
    inputs: [
      { name: '_user', type: 'address', internalType: 'address' },
      { name: '_badgeId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_rootURI', type: 'string', internalType: 'string' },
      { name: '_mintSigner', type: 'address', internalType: 'address' },
      { name: '_blacklistAddress', type: 'address', internalType: 'contract IMinimalBlacklist' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_mintSigner', type: 'address', internalType: 'address' },
      { name: '_blacklist', type: 'address', internalType: 'contract IMinimalBlacklist' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'operator', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      { name: '_signature', type: 'bytes', internalType: 'bytes' },
      { name: '_badgeId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      { name: '_signature', type: 'bytes', internalType: 'bytes' },
      { name: '_minter', type: 'address', internalType: 'address' },
      { name: '_badgeId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mintSigner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minted',
    inputs: [{ name: 'signatureHash', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: 'hasMinted', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'movementBadges',
    inputs: [
      { name: 'movementBadgeHash', type: 'bytes32', internalType: 'bytes32' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: 'movementBadge', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'movements',
    inputs: [{ name: '_user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '_movement', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  { type: 'function', name: 'renounceOwnership', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      { name: 'operator', type: 'address', internalType: 'address' },
      { name: 'approved', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMovement',
    inputs: [{ name: '_movementId', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMovement',
    inputs: [
      { name: '_user', type: 'address', internalType: 'address' },
      { name: '_movementId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setUri',
    inputs: [{ name: '_uri', type: 'string', internalType: 'string' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{ name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenByIndex',
    inputs: [{ name: 'index', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenOfOwnerByIndex',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [{ name: '_tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalBadgeSupply',
    inputs: [],
    outputs: [{ name: 'balances', type: 'uint256[]', internalType: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateBlacklist',
    inputs: [{ name: '_blacklist', type: 'address', internalType: 'contract IMinimalBlacklist' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateMintSigner',
    inputs: [{ name: '_mintSigner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      { name: 'newImplementation', type: 'address', internalType: 'address' },
      { name: 'data', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'userBadges',
    inputs: [
      { name: '_user', type: 'address', internalType: 'address' },
      { name: '_badgeId', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '_tokenId', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'approved', type: 'address', indexed: true, internalType: 'address' },
      { name: 'tokenId', type: 'uint256', indexed: true, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      { name: 'owner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'operator', type: 'address', indexed: true, internalType: 'address' },
      { name: 'approved', type: 'bool', indexed: false, internalType: 'bool' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BadgeCreated',
    inputs: [
      { name: '_tokenId', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: '_minter', type: 'address', indexed: false, internalType: 'address' },
      { name: '_badgeId', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BlacklistUpdated',
    inputs: [{ name: '_blacklist', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [{ name: 'version', type: 'uint64', indexed: false, internalType: 'uint64' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MintConsumed',
    inputs: [
      { name: '_minter', type: 'address', indexed: false, internalType: 'address' },
      { name: '_tokenId', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MintSignerUpdated',
    inputs: [{ name: '_mintSigner', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MovementSet',
    inputs: [
      { name: '_user', type: 'address', indexed: false, internalType: 'address' },
      { name: '_movementId', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferStarted',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'previousOwner', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true, internalType: 'address' },
      { name: 'to', type: 'address', indexed: true, internalType: 'address' },
      { name: 'tokenId', type: 'uint256', indexed: true, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [{ name: 'implementation', type: 'address', indexed: true, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UriSet',
    inputs: [{ name: '_uri', type: 'string', indexed: false, internalType: 'string' }],
    anonymous: false,
  },
  { type: 'error', name: 'ADDRESS_BLACKLISTED', inputs: [] },
  { type: 'error', name: 'AddressEmptyCode', inputs: [{ name: 'target', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'ERC1967InvalidImplementation',
    inputs: [{ name: 'implementation', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'ERC1967NonPayable', inputs: [] },
  { type: 'error', name: 'ERC721EnumerableForbiddenBatchMint', inputs: [] },
  {
    type: 'error',
    name: 'ERC721IncorrectOwner',
    inputs: [
      { name: 'sender', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'owner', type: 'address', internalType: 'address' },
    ],
  },
  {
    type: 'error',
    name: 'ERC721InsufficientApproval',
    inputs: [
      { name: 'operator', type: 'address', internalType: 'address' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'ERC721InvalidApprover',
    inputs: [{ name: 'approver', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidOperator',
    inputs: [{ name: 'operator', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'ERC721InvalidOwner', inputs: [{ name: 'owner', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'ERC721InvalidReceiver',
    inputs: [{ name: 'receiver', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721InvalidSender',
    inputs: [{ name: 'sender', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC721NonexistentToken',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'error',
    name: 'ERC721OutOfBoundsIndex',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'index', type: 'uint256', internalType: 'uint256' },
    ],
  },
  { type: 'error', name: 'FailedInnerCall', inputs: [] },
  { type: 'error', name: 'INVALID_BADGE_ID', inputs: [] },
  { type: 'error', name: 'INVALID_INPUT', inputs: [] },
  { type: 'error', name: 'INVALID_MOVEMENT_ID', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'MINTER_NOT_WHITELISTED', inputs: [] },
  { type: 'error', name: 'MINTS_EXCEEDED', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  { type: 'error', name: 'ONLY_MINT_SIGNER', inputs: [] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address', internalType: 'address' }] },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'UUPSUnauthorizedCallContext', inputs: [] },
  {
    type: 'error',
    name: 'UUPSUnsupportedProxiableUUID',
    inputs: [{ name: 'slot', type: 'bytes32', internalType: 'bytes32' }],
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const trailblazersBadgesAddress = {
  167000: '0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5',
  167009: '0xF7B7A80876d884f230c51337D757fCd4238D9166',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const trailblazersBadgesConfig = {
  address: trailblazersBadgesAddress,
  abi: trailblazersBadgesAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimGalxePointsAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const readClaimGalxePoints = /*#__PURE__*/ createReadContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"alreadyRegistered"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const readClaimGalxePointsAlreadyRegistered = /*#__PURE__*/ createReadContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
  functionName: 'alreadyRegistered',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimGalxePointsAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const writeClaimGalxePoints = /*#__PURE__*/ createWriteContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const writeClaimGalxePointsRegister = /*#__PURE__*/ createWriteContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
  functionName: 'register',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimGalxePointsAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const simulateClaimGalxePoints = /*#__PURE__*/ createSimulateContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const simulateClaimGalxePointsRegister = /*#__PURE__*/ createSimulateContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
  functionName: 'register',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimGalxePointsAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const watchClaimGalxePointsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `eventName` set to `"Registered"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const watchClaimGalxePointsRegisteredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
  eventName: 'Registered',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ANDROIDS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeAndroids = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ANDROIDS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_BOUNCERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeBouncers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_BOUNCERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_DRUMMERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeDrummers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_DRUMMERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MASTERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeMasters = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MASTERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MONKS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeMonks = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MONKS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_RAVERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeRavers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_RAVERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ROBOTS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeRobots = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ROBOTS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_SHINTO"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeShinto = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_SHINTO',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BASED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMovementBased = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BASED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BOOSTED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMovementBoosted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BOOSTED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_NEUTRAL"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMovementNeutral = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_NEUTRAL',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badgeBalances"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadgeBalances = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badgeBalances',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBalanceOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"blacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesBlacklist = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'blacklist',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"canMint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesCanMint = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'canMint',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesGetApproved = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getApproved',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getHash"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesGetHash = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getHash',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getTokenId"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesGetTokenId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getTokenId',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMintSigner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mintSigner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"minted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMinted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'minted',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movementBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMovementBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movementBadges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movements"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesMovements = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movements',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesName = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesOwnerOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesPendingOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesSymbol = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenOfOwnerByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesTokenUri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesTotalSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"userBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const readTrailblazersBadgesUserBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'userBadges',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadges = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesApprove = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesInitialize = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesMint = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesSetMovement = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesSetUri = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const writeTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadges = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesApprove = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesInitialize = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesMint = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesSetMovement = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesSetUri = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const simulateTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'ApprovalForAll',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BadgeCreated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesBadgeCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BadgeCreated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesBlacklistUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BlacklistUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintConsumed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesMintConsumedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintConsumed',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintSignerUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesMintSignerUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintSignerUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MovementSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesMovementSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MovementSet',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"UriSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.network/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x329F22b6907bba8b1a795DD527973245B4AE6635)
 */
export const watchTrailblazersBadgesUriSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'UriSet',
});
