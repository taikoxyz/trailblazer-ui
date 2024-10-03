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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const claimGalxePointsAddress = {
  167000: '0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088',
  167009: '0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const claimGalxePointsConfig = {
  address: claimGalxePointsAddress,
  abi: claimGalxePointsAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Airdrop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x0000000000000000000000000000000000000000)
 */
export const erc20AirdropAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x0000000000000000000000000000000000000000)
 */
export const erc20AirdropAddress = {
  167000: '0x0000000000000000000000000000000000000000',
  167009: '0x0000000000000000000000000000000000000000',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x0000000000000000000000000000000000000000)
 */
export const erc20AirdropConfig = {
  address: erc20AirdropAddress,
  abi: erc20AirdropAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RegisterProfilePicture
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const registerProfilePictureAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getProfilePicture',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'profilePicture',
    outputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setPFP',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'nftContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ProfilePictureSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  {
    type: 'error',
    inputs: [{ name: 'nftContract', internalType: 'address', type: 'address' }],
    name: 'InvalidNFTContract',
  },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'NotTokenOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const registerProfilePictureAddress = {
  167000: '0x58617427f3d42e5435908661d3c788d7d2EAf3fa',
  167009: '0xdBfaFc789c4272161ce01a4A3aBa04C232362504',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const registerProfilePictureConfig = {
  address: registerProfilePictureAddress,
  abi: registerProfilePictureAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TaikoonToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const taikoonTokenAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'blacklist',
    outputs: [{ name: '', internalType: 'contract IMinimalBlacklist', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_maxMints', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'canMint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_blacklist',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rootURI', internalType: 'string', type: 'string' },
      { name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' },
      {
        name: '_blacklistAddress',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_maxMints', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'leaf',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_maxMints', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'leaf', internalType: 'bytes32', type: 'bytes32' }],
    name: 'minted',
    outputs: [{ name: 'hasMinted', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'root',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_rootURI', internalType: 'string', type: 'string' }],
    name: 'updateBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_blacklist',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'updateBlacklist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_root', internalType: 'bytes32', type: 'bytes32' }],
    name: 'updateRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_blacklist',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'BlacklistUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_minter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_mintAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MintConsumed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_root',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'RootUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'error', inputs: [], name: 'ADDRESS_BLACKLISTED' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'INVALID_PROOF' },
  { type: 'error', inputs: [], name: 'INVALID_TOKEN_AMOUNT' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MAX_MINTS_EXCEEDED' },
  { type: 'error', inputs: [], name: 'MAX_SUPPLY_REACHED' },
  { type: 'error', inputs: [], name: 'MINTER_NOT_WHITELISTED' },
  { type: 'error', inputs: [], name: 'MINTS_EXCEEDED' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'TOKEN_NOT_MINTED' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const taikoonTokenAddress = {
  167000: '0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295',
  167009: '0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const taikoonTokenConfig = {
  address: taikoonTokenAddress,
  abi: taikoonTokenAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrailblazersBadges
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const trailblazersBadgesAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_ANDROIDS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_BOUNCERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_DRUMMERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_MASTERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_MONKS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_RAVERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_ROBOTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_SHINTO',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MOVEMENT_BASED',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MOVEMENT_BOOSTED',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MOVEMENT_NEUTRAL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'badgeBalances',
    outputs: [{ name: '', internalType: 'bool[]', type: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'badgeBalancesV2',
    outputs: [{ name: 'balances', internalType: 'bool[]', type: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'badges',
    outputs: [{ name: '_badgeId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'blacklist',
    outputs: [{ name: '', internalType: 'contract IMinimalBlacklist', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'canMint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_badgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTokenId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_rootURI', internalType: 'string', type: 'string' },
      { name: '_mintSigner', internalType: 'address', type: 'address' },
      {
        name: '_blacklistAddress',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_mintSigner', internalType: 'address', type: 'address' },
      {
        name: '_blacklist',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_badgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_badgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mintSigner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'signatureHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'minted',
    outputs: [{ name: 'hasMinted', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'movementBadgeHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'movementBadges',
    outputs: [{ name: 'movementBadge', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'movements',
    outputs: [{ name: '_movement', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'season2BadgeContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_movementId', internalType: 'uint256', type: 'uint256' }],
    name: 'setMovement',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_movementId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setMovement',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_season2BadgeContract',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setSeason2BadgeContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_uri', internalType: 'string', type: 'string' }],
    name: 'setUri',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalBadgeSupply',
    outputs: [{ name: 'balances', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_blacklist',
        internalType: 'contract IMinimalBlacklist',
        type: 'address',
      },
    ],
    name: 'updateBlacklist',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_mintSigner', internalType: 'address', type: 'address' }],
    name: 'updateMintSigner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_badgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userBadges',
    outputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_minter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_badgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BadgeCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_blacklist',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'BlacklistUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_minter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MintConsumed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_mintSigner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'MintSignerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_movementId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MovementSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_uri', internalType: 'string', type: 'string', indexed: false }],
    name: 'UriSet',
  },
  { type: 'error', inputs: [], name: 'ADDRESS_BLACKLISTED' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'INVALID_BADGE_ID' },
  { type: 'error', inputs: [], name: 'INVALID_INPUT' },
  { type: 'error', inputs: [], name: 'INVALID_MOVEMENT_ID' },
  { type: 'error', inputs: [], name: 'INVALID_S2_CONTRACT' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MINTER_NOT_WHITELISTED' },
  { type: 'error', inputs: [], name: 'MINTS_EXCEEDED' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'ONLY_MINT_SIGNER' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const trailblazersBadgesAddress = {
  167000: '0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5',
  167009: '0xA951f812D8B52db3E001c6f1F061Be941208a918',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const trailblazersBadgesConfig = {
  address: trailblazersBadgesAddress,
  abi: trailblazersBadgesAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrailblazersBadgesS2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const trailblazersBadgesS2Abi = [
  {
    type: 'function',
    inputs: [],
    name: 'ANDROID_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ANDROID_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BADGE_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BOUNCER_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BOUNCER_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'COOLDOWN_MIGRATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'COOLDOWN_TAMPER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DRUMMER_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DRUMMER_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MASTER_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MASTER_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TAMPERS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONK_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MONK_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RAVER_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RAVER_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ROBOT_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ROBOT_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SHINTO_PINK_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SHINTO_PURPLE_ID',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TAMPER_WEIGHT_PERCENT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'badgeBalanceOf',
    outputs: [{ name: '_balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'badgeBalances',
    outputs: [{ name: '_balances', internalType: 'bool[16]', type: 'bool[16]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'badges',
    outputs: [
      {
        name: '',
        internalType: 'contract TrailblazersBadges',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_s1Badge', internalType: 'uint256', type: 'uint256' }],
    name: 'canMigrate',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'claimCooldowns',
    outputs: [{ name: '_cooldown', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_s1BadgeIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'enableMigrations',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_cycle', internalType: 'uint256', type: 'uint256' },
      { name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enabledBadgeIds',
    outputs: [{ name: '_enabled', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
      { name: 'exp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'endMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_exp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'generateClaimHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getMigrationTampers',
    outputs: [
      { name: '_pinkTampers', internalType: 'uint256', type: 'uint256' },
      { name: '_purpleTampers', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_s2BadgeId', internalType: 'uint256', type: 'uint256' }],
    name: 'getSeason1BadgeId',
    outputs: [{ name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' }],
    name: 'getSeason2BadgeIds',
    outputs: [
      { name: '_pinkBadgeId', internalType: 'uint256', type: 'uint256' },
      { name: '_purpleBadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_s2BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTokenId',
    outputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_badges', internalType: 'address', type: 'address' },
      { name: '_randomSigner', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'isMigrationActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'isTamperActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migrationCycle',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_migrationCycle', internalType: 'uint256', type: 'uint256' },
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'migrationCycleUniqueMints',
    outputs: [{ name: '_mintEnded', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: 'pinkOrPurple', internalType: 'bool', type: 'bool' },
    ],
    name: 'migrationTampers',
    outputs: [{ name: '_tampers', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'randomFromSignature',
    outputs: [{ name: '_random', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'randomSigner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'resetTampers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' }],
    name: 'startMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'tamperCooldowns',
    outputs: [{ name: '_cooldown', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_pinkOrPurple', internalType: 'bool', type: 'bool' }],
    name: 'tamperMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_badgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userBadges',
    outputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_s2BadgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_s2TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MigrationEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_s1BadgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_s1TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_cooldownExpiration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MigrationStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: '_pinkOrPurple',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: '_cooldownExpiration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MigrationTampered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_s1BadgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: '_enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'MigrationToggled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'error', inputs: [], name: 'ALREADY_MIGRATED_IN_CYCLE' },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'CONTRACT_PAUSED' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'HASH_MISMATCH' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MAX_TAMPERS_REACHED' },
  { type: 'error', inputs: [], name: 'MIGRATION_ALREADY_STARTED' },
  { type: 'error', inputs: [], name: 'MIGRATION_NOT_ENABLED' },
  { type: 'error', inputs: [], name: 'MIGRATION_NOT_READY' },
  { type: 'error', inputs: [], name: 'MIGRATION_NOT_STARTED' },
  { type: 'error', inputs: [], name: 'NOT_RANDOM_SIGNER' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'TAMPER_IN_PROGRESS' },
  { type: 'error', inputs: [], name: 'TOKEN_NOT_MINTED' },
  { type: 'error', inputs: [], name: 'TOKEN_NOT_OWNED' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const trailblazersBadgesS2Address = {
  167000: '0x0000000000000000000000000000000000000000',
  167009: '0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const trailblazersBadgesS2Config = {
  address: trailblazersBadgesS2Address,
  abi: trailblazersBadgesS2Abi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xB1Ca1F376AAF482Bf5db741EF4B884eB5d69f27B)
 */
export const usdcAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xB1Ca1F376AAF482Bf5db741EF4B884eB5d69f27B)
 */
export const usdcAddress = {
  167000: '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b',
  167009: '0xB1Ca1F376AAF482Bf5db741EF4B884eB5d69f27B',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x07d83526730c7438048D55A4fc0b850e2aaB6f0b)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xB1Ca1F376AAF482Bf5db741EF4B884eB5d69f27B)
 */
export const usdcConfig = { address: usdcAddress, abi: usdcAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x1292DFD7abeC7D739448e10903C103C99f032cd2)
 */
export const usdtAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x1292DFD7abeC7D739448e10903C103C99f032cd2)
 */
export const usdtAddress = {
  167000: '0x2DEF195713CF4a606B49D07E520e22C17899a736',
  167009: '0x1292DFD7abeC7D739448e10903C103C99f032cd2',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x2DEF195713CF4a606B49D07E520e22C17899a736)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x1292DFD7abeC7D739448e10903C103C99f032cd2)
 */
export const usdtConfig = { address: usdtAddress, abi: usdtAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimGalxePointsAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const readClaimGalxePoints = /*#__PURE__*/ createReadContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"alreadyRegistered"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const writeClaimGalxePoints = /*#__PURE__*/ createWriteContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const simulateClaimGalxePoints = /*#__PURE__*/ createSimulateContract({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `functionName` set to `"register"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const watchClaimGalxePointsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimGalxePointsAbi}__ and `eventName` set to `"Registered"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xD68BF51E2d73A7c7D023f1fd58e2F66F602A8088)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x7Db9D3533704675Cb2BCc672E5F702cc46f6EdDC)
 */
export const watchClaimGalxePointsRegisteredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: claimGalxePointsAbi,
  address: claimGalxePointsAddress,
  eventName: 'Registered',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePicture = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePictureUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"getProfilePicture"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePictureGetProfilePicture = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'getProfilePicture',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePictureOwner = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePicturePendingOwner = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"profilePicture"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePictureProfilePicture = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'profilePicture',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const readRegisterProfilePictureProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePicture = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureInitialize = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"setPFP"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureSetPfp = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'setPFP',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const writeRegisterProfilePictureUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePicture = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureInitialize = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"setPFP"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureSetPfp = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'setPFP',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const simulateRegisterProfilePictureUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `eventName` set to `"ProfilePictureSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureProfilePictureSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  eventName: 'ProfilePictureSet',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link registerProfilePictureAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x58617427f3d42e5435908661d3c788d7d2EAf3fa)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdBfaFc789c4272161ce01a4A3aBa04C232362504)
 */
export const watchRegisterProfilePictureUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: registerProfilePictureAbi,
  address: registerProfilePictureAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonToken = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"baseURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenBaseUri = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'baseURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"blacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenBlacklist = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'blacklist',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"canMint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenCanMint = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'canMint',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenGetApproved = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'getApproved',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"leaf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenLeaf = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'leaf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"maxSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenMaxSupply = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'maxSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"minted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenMinted = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'minted',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenName = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenOwner = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenOwnerOf = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenPendingOwner = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"root"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenRoot = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'root',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'tokenByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'tokenOfOwnerByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenTokenUri = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const readTaikoonTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonToken = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenInitialize = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenMint = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateBaseURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenUpdateBaseUri = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateBaseURI',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenUpdateBlacklist = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateRoot"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenUpdateRoot = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateRoot',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const writeTaikoonTokenUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonToken = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenInitialize = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenMint = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateBaseURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenUpdateBaseUri = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateBaseURI',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenUpdateBlacklist = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"updateRoot"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenUpdateRoot = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'updateRoot',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const simulateTaikoonTokenUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'ApprovalForAll',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenBlacklistUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'BlacklistUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"MintConsumed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenMintConsumedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'MintConsumed',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"RootUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenRootUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'RootUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xf3FBa6f1E6C1998195239e7DD794c1EcEA8Da66B)
 */
export const watchTaikoonTokenUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ANDROIDS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeAndroids = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ANDROIDS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_BOUNCERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeBouncers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_BOUNCERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_DRUMMERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeDrummers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_DRUMMERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MASTERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeMasters = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MASTERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MONKS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeMonks = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MONKS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_RAVERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeRavers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_RAVERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ROBOTS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeRobots = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ROBOTS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_SHINTO"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeShinto = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_SHINTO',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BASED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMovementBased = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BASED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BOOSTED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMovementBoosted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BOOSTED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_NEUTRAL"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMovementNeutral = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_NEUTRAL',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badgeBalances"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeBalances = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badgeBalances',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badgeBalancesV2"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadgeBalancesV2 = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badgeBalancesV2',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBalanceOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"baseURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBaseUri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'baseURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"blacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesBlacklist = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'blacklist',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"canMint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesCanMint = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'canMint',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesGetApproved = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getApproved',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getHash"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesGetHash = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getHash',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getTokenId"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesGetTokenId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getTokenId',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMintSigner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mintSigner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"minted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMinted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'minted',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movementBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMovementBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movementBadges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movements"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesMovements = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movements',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesName = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesOwnerOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesPendingOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"season2BadgeContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesSeason2BadgeContract = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'season2BadgeContract',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesSymbol = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenOfOwnerByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesTokenUri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"totalBadgeSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesTotalBadgeSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'totalBadgeSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesTotalSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"userBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const readTrailblazersBadgesUserBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'userBadges',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadges = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesApprove = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesBurn = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'burn',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesInitialize = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesMint = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesSetMovement = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setSeason2BadgeContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesSetSeason2BadgeContract = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setSeason2BadgeContract',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesSetUri = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const writeTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadges = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesApprove = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"burn"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesBurn = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'burn',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesInitialize = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesMint = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesSetMovement = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setSeason2BadgeContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesSetSeason2BadgeContract = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setSeason2BadgeContract',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesSetUri = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const simulateTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'ApprovalForAll',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BadgeCreated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesBadgeCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BadgeCreated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesBlacklistUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BlacklistUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintConsumed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesMintConsumedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintConsumed',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintSignerUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesMintSignerUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintSignerUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MovementSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesMovementSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MovementSet',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"UriSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xA951f812D8B52db3E001c6f1F061Be941208a918)
 */
export const watchTrailblazersBadgesUriSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'UriSet',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2 = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"ANDROID_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2AndroidPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'ANDROID_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"ANDROID_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2AndroidPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'ANDROID_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"BADGE_COUNT"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BadgeCount = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'BADGE_COUNT',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"BOUNCER_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BouncerPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'BOUNCER_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"BOUNCER_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BouncerPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'BOUNCER_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"COOLDOWN_MIGRATION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2CooldownMigration = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'COOLDOWN_MIGRATION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"COOLDOWN_TAMPER"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2CooldownTamper = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'COOLDOWN_TAMPER',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2DefaultAdminRole = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'DEFAULT_ADMIN_ROLE',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"DRUMMER_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2DrummerPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'DRUMMER_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"DRUMMER_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2DrummerPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'DRUMMER_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"MASTER_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MasterPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'MASTER_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"MASTER_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MasterPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'MASTER_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"MAX_TAMPERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MaxTampers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'MAX_TAMPERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"MONK_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MonkPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'MONK_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"MONK_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MonkPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'MONK_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"RAVER_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RaverPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'RAVER_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"RAVER_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RaverPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'RAVER_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"ROBOT_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RobotPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'ROBOT_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"ROBOT_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RobotPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'ROBOT_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"SHINTO_PINK_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2ShintoPinkId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'SHINTO_PINK_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"SHINTO_PURPLE_ID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2ShintoPurpleId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'SHINTO_PURPLE_ID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"TAMPER_WEIGHT_PERCENT"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2TamperWeightPercent = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'TAMPER_WEIGHT_PERCENT',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2UpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"badgeBalanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BadgeBalanceOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'badgeBalanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"badgeBalances"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BadgeBalances = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'badgeBalances',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2Badges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BalanceOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"balanceOfBatch"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'balanceOfBatch',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"canMigrate"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2CanMigrate = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'canMigrate',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"claimCooldowns"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2ClaimCooldowns = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'claimCooldowns',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"enabledBadgeIds"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2EnabledBadgeIds = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'enabledBadgeIds',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"exists"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2Exists = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'exists',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"generateClaimHash"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GenerateClaimHash = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'generateClaimHash',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getMigrationTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GetMigrationTampers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getMigrationTampers',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getRoleAdmin',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getSeason1BadgeId"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GetSeason1BadgeId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getSeason1BadgeId',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getSeason2BadgeIds"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GetSeason2BadgeIds = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getSeason2BadgeIds',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getTokenId"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2GetTokenId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getTokenId',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2HasRole = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'hasRole',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"isMigrationActive"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2IsMigrationActive = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'isMigrationActive',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"isTamperActive"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2IsTamperActive = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'isTamperActive',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"migrationCycle"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MigrationCycle = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'migrationCycle',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"migrationCycleUniqueMints"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MigrationCycleUniqueMints = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'migrationCycleUniqueMints',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"migrationTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2MigrationTampers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'migrationTampers',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2Owner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2Paused = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'paused',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2PendingOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2ProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"randomFromSignature"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RandomFromSignature = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'randomFromSignature',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"randomSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2RandomSigner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'randomSigner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"tamperCooldowns"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2TamperCooldowns = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'tamperCooldowns',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2TotalSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"uri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2Uri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'uri',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"userBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const readTrailblazersBadgesS2UserBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'userBadges',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2 = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2AcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"enableMigrations"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2EnableMigrations = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'enableMigrations',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"endMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2EndMigration = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'endMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2GrantRole = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'grantRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2Initialize = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2OnErc721Received = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'onERC721Received',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2Pause = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'pause',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2RenounceRole = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"resetTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2ResetTampers = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'resetTampers',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2RevokeRole = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'revokeRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2SafeBatchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'safeBatchTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2StartMigration = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"tamperMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2TamperMigration = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'tamperMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2TransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const writeTrailblazersBadgesS2UpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2 = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2AcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"enableMigrations"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2EnableMigrations = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'enableMigrations',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"endMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2EndMigration = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'endMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2GrantRole = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'grantRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2Initialize = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2OnErc721Received = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'onERC721Received',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2Pause = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'pause',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2RenounceRole = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"resetTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2ResetTampers = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'resetTampers',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2RevokeRole = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'revokeRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2SafeBatchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'safeBatchTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2StartMigration = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"tamperMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2TamperMigration = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'tamperMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2TransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const simulateTrailblazersBadgesS2UpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2Event = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2ApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'ApprovalForAll',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2InitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"MigrationEnded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2MigrationEndedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'MigrationEnded',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"MigrationStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2MigrationStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'MigrationStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"MigrationTampered"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2MigrationTamperedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'MigrationTampered',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"MigrationToggled"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2MigrationToggledEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'MigrationToggled',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2OwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2OwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2PausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Paused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2RoleAdminChangedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'RoleAdminChanged',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2RoleGrantedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'RoleGranted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2RoleRevokedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'RoleRevoked',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2TransferBatchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'TransferBatch',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"TransferSingle"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2TransferSingleEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'TransferSingle',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"URI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2UriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'URI',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2UnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Unpaused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x5fb9662549105Ba46f3153b4e3DCA9CC7923D323)
 */
export const watchTrailblazersBadgesS2UpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Upgraded',
});
