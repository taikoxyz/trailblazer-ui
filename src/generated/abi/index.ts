import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from '@wagmi/core/codegen';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BadgeMigration
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const badgeMigrationAbi = [
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'currentCycleEnabledMigrationIds',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
      { name: 'cycle', internalType: 'uint256', type: 'uint256' },
      { name: 's1BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'enabledBadgeIds',
    outputs: [{ name: 'enabled', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_v', internalType: 'uint8', type: 'uint8' },
      { name: '_r', internalType: 'bytes32', type: 'bytes32' },
      { name: '_s', internalType: 'bytes32', type: 'bytes32' },
      { name: '_exp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'endMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_exp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'generateClaimHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getActiveMigrationFor',
    outputs: [
      {
        name: '',
        internalType: 'struct BadgeMigration.Migration',
        type: 'tuple',
        components: [
          { name: 'migrationCycle', internalType: 'uint256', type: 'uint256' },
          { name: 'user', internalType: 'address', type: 'address' },
          { name: 's1BadgeId', internalType: 'uint256', type: 'uint256' },
          { name: 's1TokenId', internalType: 'uint256', type: 'uint256' },
          { name: 's2TokenId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'cooldownExpiration',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'tamperExpiration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'devTampers', internalType: 'uint256', type: 'uint256' },
          { name: 'whaleTampers', internalType: 'uint256', type: 'uint256' },
          { name: 'minnowTampers', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        name: '',
        internalType: 'struct BadgeMigration.Config',
        type: 'tuple',
        components: [
          {
            name: 'cooldownMigration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'cooldownTamper', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tamperWeightPercent',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'baseMaxTampers', internalType: 'uint256', type: 'uint256' },
          {
            name: 'pointsClaimMultiplicationFactor',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMigrationCycle',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'getMigrationTampers',
    outputs: [
      { name: '_devTampers', internalType: 'uint256', type: 'uint256' },
      { name: '_whaleTampers', internalType: 'uint256', type: 'uint256' },
      { name: '_minnowTampers', internalType: 'uint256', type: 'uint256' },
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
      { name: '_s1Badges', internalType: 'address', type: 'address' },
      { name: '_s2Badges', internalType: 'address', type: 'address' },
      { name: '_randomSigner', internalType: 'address', type: 'address' },
      {
        name: '_config',
        internalType: 'struct BadgeMigration.Config',
        type: 'tuple',
        components: [
          {
            name: 'cooldownMigration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'cooldownTamper', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tamperWeightPercent',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'baseMaxTampers', internalType: 'uint256', type: 'uint256' },
          {
            name: 'pointsClaimMultiplicationFactor',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '_exp', internalType: 'uint256', type: 'uint256' }],
    name: 'maxTampers',
    outputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'migrationCycle', internalType: 'uint256', type: 'uint256' },
      { name: 'minter', internalType: 'address', type: 'address' },
      { name: 's1BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'migrationCycleUniqueMints',
    outputs: [{ name: 'mintEnded', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'migrations',
    outputs: [
      { name: 'migrationCycle', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 's1BadgeId', internalType: 'uint256', type: 'uint256' },
      { name: 's1TokenId', internalType: 'uint256', type: 'uint256' },
      { name: 's2TokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'cooldownExpiration', internalType: 'uint256', type: 'uint256' },
      { name: 'tamperExpiration', internalType: 'uint256', type: 'uint256' },
      { name: 'devTampers', internalType: 'uint256', type: 'uint256' },
      { name: 'whaleTampers', internalType: 'uint256', type: 'uint256' },
      { name: 'minnowTampers', internalType: 'uint256', type: 'uint256' },
    ],
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
      { name: '_v', internalType: 'uint8', type: 'uint8' },
      { name: '_r', internalType: 'bytes32', type: 'bytes32' },
      { name: '_s', internalType: 'bytes32', type: 'bytes32' },
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
    inputs: [],
    name: 's1Badges',
    outputs: [
      {
        name: '',
        internalType: 'contract TrailblazersBadgesV4',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 's2Badges',
    outputs: [
      {
        name: '',
        internalType: 'contract TrailblazersBadgesS2',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_config',
        internalType: 'struct BadgeMigration.Config',
        type: 'tuple',
        components: [
          {
            name: 'cooldownMigration',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'cooldownTamper', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tamperWeightPercent',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'baseMaxTampers', internalType: 'uint256', type: 'uint256' },
          {
            name: 'pointsClaimMultiplicationFactor',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_v', internalType: 'uint8', type: 'uint8' },
      { name: '_r', internalType: 'bytes32', type: 'bytes32' },
      { name: '_s', internalType: 'bytes32', type: 'bytes32' },
      { name: '_exp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_user', internalType: 'address', type: 'address' },
      { name: '_s1BadgeId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'startMigration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
      {
        name: '_tamperColor',
        internalType: 'enum BadgeMigration.TamperColor',
        type: 'uint8',
      },
    ],
    name: 'tamperMigration',
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
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'userExperience',
    outputs: [{ name: 'experience', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
        name: 'migrationCycle',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 's1TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 's2TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'finalColor',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MigrationComplete',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'migrationCycleId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 's1BadgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'MigrationCycleToggled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'migrationCycle',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 's1BadgeId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 's1TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 's2TokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'cooldownExpiration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tamperExpiration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'devTampers',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'whaleTampers',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minnowTampers',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MigrationUpdated',
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
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EXP_TOO_LOW' },
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
  { type: 'error', inputs: [], name: 'NOT_S1_CONTRACT' },
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
  { type: 'error', inputs: [], name: 'TOKEN_NOT_OWNED' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const badgeMigrationAddress = {
  167000: '0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2',
  167009: '0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const badgeMigrationConfig = {
  address: badgeMigrationAddress,
  abi: badgeMigrationAbi,
} as const;

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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const erc20AirdropAbi = [
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
    inputs: [],
    name: 'blacklist',
    outputs: [{ name: '', internalType: 'contract IMinimalBlacklist', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimEnd',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimStart',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_claimStart', internalType: 'uint64', type: 'uint64' },
      { name: '_claimEnd', internalType: 'uint64', type: 'uint64' },
      { name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' },
      { name: '_token', internalType: 'contract IERC20', type: 'address' },
      { name: '_blacklist', internalType: 'address', type: 'address' },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isClaimed',
    outputs: [{ name: 'claimed', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
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
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_claimStart', internalType: 'uint64', type: 'uint64' },
      { name: '_claimEnd', internalType: 'uint64', type: 'uint64' },
      { name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
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
    inputs: [{ name: '_blacklist', internalType: 'address', type: 'address' }],
    name: 'updateBlacklist',
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
    inputs: [{ name: '_token', internalType: 'contract IERC20', type: 'address' }],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
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
        name: 'hash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Claimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'claimStart',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'claimEnd',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'merkleRoot',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'ConfigChanged',
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
  { type: 'error', inputs: [], name: 'ADDRESS_BLACKLISTED' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'CLAIMED_ALREADY' },
  { type: 'error', inputs: [], name: 'CLAIM_NOT_ONGOING' },
  {
    type: 'error',
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'INVALID_PARAMS' },
  { type: 'error', inputs: [], name: 'INVALID_PROOF' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
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
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const erc20AirdropAddress = {
  167000: '0x290265ACd21816EE414E64eEC77dd490d8dd9f51',
  167009: '0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const erc20AirdropConfig = {
  address: erc20AirdropAddress,
  abi: erc20AirdropAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20TaikoToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 */
export const erc20TaikoTokenAbi = [] as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 */
export const erc20TaikoTokenAddress = {
  167000: '0xA9d23408b9bA935c230493c40C73824Df71A0975',
  167009: '0xA9d23408b9bA935c230493c40C73824Df71A0975',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xa9d23408b9ba935c230493c40c73824df71a0975)
 */
export const erc20TaikoTokenConfig = {
  address: erc20TaikoTokenAddress,
  abi: erc20TaikoTokenAbi,
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const taikoonTokenAddress = {
  167000: '0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295',
  167009: '0xF917fE66b590f7A09fE654FD5397da461f816FD0',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const taikoonTokenConfig = {
  address: taikoonTokenAddress,
  abi: taikoonTokenAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrailblazersBadges
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
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
    inputs: [],
    name: 'migrationContract',
    outputs: [{ name: '', internalType: 'contract BadgeMigration', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migrationLockDuration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: '_migrationContract', internalType: 'address', type: 'address' }],
    name: 'setMigrationContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_duration', internalType: 'uint256', type: 'uint256' }],
    name: 'setMigrationLockDuration',
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
    inputs: [{ name: '_uri', internalType: 'string', type: 'string' }],
    name: 'setUri',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_badgeId', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'unlockTimestamps',
    outputs: [{ name: 'unlockTimestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
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
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
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
  { type: 'error', inputs: [], name: 'BADGE_LOCKED' },
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MIGRATION_LOCK_DURATION_NOT_SET' },
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const trailblazersBadgesAddress = {
  167000: '0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970',
  167009: '0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const trailblazersBadgesS2Abi = [
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'exists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBadge',
    outputs: [
      {
        name: '',
        internalType: 'struct TrailblazersBadgesS2.Badge',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'badgeType',
            internalType: 'enum TrailblazersBadgesS2.BadgeType',
            type: 'uint8',
          },
          {
            name: 'movementType',
            internalType: 'enum TrailblazersBadgesS2.MovementType',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_minter', internalType: 'address', type: 'address' },
      { name: '_uriTemplate', internalType: 'string', type: 'string' },
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
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      {
        name: '_badgeType',
        internalType: 'enum TrailblazersBadgesS2.BadgeType',
        type: 'uint8',
      },
      {
        name: '_movementType',
        internalType: 'enum TrailblazersBadgesS2.MovementType',
        type: 'uint8',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
    inputs: [{ name: '_minter', internalType: 'address', type: 'address' }],
    name: 'setMinter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
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
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_badgeType',
        internalType: 'enum TrailblazersBadgesS2.BadgeType',
        type: 'uint8',
      },
      {
        name: '_movementType',
        internalType: 'enum TrailblazersBadgesS2.MovementType',
        type: 'uint8',
      },
    ],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'uriTemplate',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
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
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NOT_MINTER' },
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
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const trailblazersBadgesS2Address = {
  167000: '0x0000000000000000000000000000000000000000',
  167009: '0x01014665e81aB88f055c1a953838Ec34D66B25b7',
} as const;

/**
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigration = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationDefaultAdminRole = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'DEFAULT_ADMIN_ROLE',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"currentCycleEnabledMigrationIds"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationCurrentCycleEnabledMigrationIds = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'currentCycleEnabledMigrationIds',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"enabledBadgeIds"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationEnabledBadgeIds = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'enabledBadgeIds',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"generateClaimHash"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGenerateClaimHash = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'generateClaimHash',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"getActiveMigrationFor"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGetActiveMigrationFor = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'getActiveMigrationFor',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"getConfig"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGetConfig = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'getConfig',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"getMigrationCycle"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGetMigrationCycle = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'getMigrationCycle',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"getMigrationTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGetMigrationTampers = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'getMigrationTampers',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'getRoleAdmin',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationHasRole = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'hasRole',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"isMigrationActive"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationIsMigrationActive = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'isMigrationActive',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"isTamperActive"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationIsTamperActive = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'isTamperActive',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"maxTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationMaxTampers = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'maxTampers',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"migrationCycleUniqueMints"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationMigrationCycleUniqueMints = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'migrationCycleUniqueMints',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"migrations"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationMigrations = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'migrations',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationOwner = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationPaused = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationPendingOwner = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"randomFromSignature"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationRandomFromSignature = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'randomFromSignature',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"randomSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationRandomSigner = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'randomSigner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"s1Badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationS1Badges = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 's1Badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"s2Badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationS2Badges = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 's2Badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"userExperience"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const readBadgeMigrationUserExperience = /*#__PURE__*/ createReadContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'userExperience',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigration = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"enableMigrations"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationEnableMigrations = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'enableMigrations',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"endMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationEndMigration = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'endMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationGrantRole = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'grantRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationInitialize = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationOnErc721Received = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'onERC721Received',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationPause = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'pause',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationRenounceRole = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'renounceRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"resetTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationResetTampers = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'resetTampers',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'revokeRole',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"setConfig"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationSetConfig = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'setConfig',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationStartMigration = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"tamperMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationTamperMigration = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'tamperMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const writeBadgeMigrationUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigration = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"enableMigrations"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationEnableMigrations = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'enableMigrations',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"endMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationEndMigration = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'endMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationGrantRole = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'grantRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationInitialize = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationOnErc721Received = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'onERC721Received',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"pause"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationPause = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'pause',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationRenounceRole = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'renounceRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"resetTampers"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationResetTampers = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'resetTampers',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationRevokeRole = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'revokeRole',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"setConfig"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationSetConfig = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'setConfig',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationStartMigration = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"tamperMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationTamperMigration = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'tamperMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link badgeMigrationAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const simulateBadgeMigrationUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"MigrationComplete"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationMigrationCompleteEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'MigrationComplete',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"MigrationCycleToggled"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationMigrationCycleToggledEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'MigrationCycleToggled',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"MigrationUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationMigrationUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'MigrationUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'Paused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationRoleAdminChangedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'RoleAdminChanged',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationRoleGrantedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'RoleGranted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationRoleRevokedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'RoleRevoked',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'Unpaused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link badgeMigrationAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x86361DaD32F45A04c704a5E0E14B0C91BfD499E2)
 */
export const watchBadgeMigrationUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: badgeMigrationAbi,
  address: badgeMigrationAddress,
  eventName: 'Upgraded',
});

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
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20Airdrop = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"blacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropBlacklist = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'blacklist',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"claimEnd"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropClaimEnd = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'claimEnd',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"claimStart"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropClaimStart = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'claimStart',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"hasClaimed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropHasClaimed = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'hasClaimed',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"isClaimed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropIsClaimed = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'isClaimed',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropMerkleRoot = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'merkleRoot',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropOwner = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropPaused = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'paused',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropPendingOwner = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"token"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const readErc20AirdropToken = /*#__PURE__*/ createReadContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'token',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20Airdrop = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropClaim = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"init"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropInit = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'init',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"setConfig"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropSetConfig = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'setConfig',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropUpdateBlacklist = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"withdrawERC20"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const writeErc20AirdropWithdrawErc20 = /*#__PURE__*/ createWriteContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'withdrawERC20',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20Airdrop = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"claim"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropClaim = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'claim',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"init"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropInit = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'init',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"setConfig"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropSetConfig = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'setConfig',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropUpdateBlacklist = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20AirdropAbi}__ and `functionName` set to `"withdrawERC20"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const simulateErc20AirdropWithdrawErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  functionName: 'withdrawERC20',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropBlacklistUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'BlacklistUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"Claimed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropClaimedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'Claimed',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"ConfigChanged"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropConfigChangedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'ConfigChanged',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"Paused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'Paused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"Unpaused"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'Unpaused',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20AirdropAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x290265ACd21816EE414E64eEC77dd490d8dd9f51)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xdeC2662Dff4eAB8b94B5257D637204d18D95cb74)
 */
export const watchErc20AirdropUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20AirdropAbi,
  address: erc20AirdropAddress,
  eventName: 'Upgraded',
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const readTaikoonToken = /*#__PURE__*/ createReadContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const writeTaikoonToken = /*#__PURE__*/ createWriteContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const simulateTaikoonToken = /*#__PURE__*/ createSimulateContract({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link taikoonTokenAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const watchTaikoonTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link taikoonTokenAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x4A045C5016B200F7E08a4caBB2cdA6E85bF53295)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0xF917fE66b590f7A09fE654FD5397da461f816FD0)
 */
export const watchTaikoonTokenUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: taikoonTokenAbi,
  address: taikoonTokenAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ANDROIDS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeAndroids = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ANDROIDS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_BOUNCERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeBouncers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_BOUNCERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_DRUMMERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeDrummers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_DRUMMERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MASTERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeMasters = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MASTERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_MONKS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeMonks = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_MONKS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_RAVERS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeRavers = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_RAVERS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_ROBOTS"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeRobots = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_ROBOTS',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"BADGE_SHINTO"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeShinto = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'BADGE_SHINTO',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BASED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMovementBased = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BASED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_BOOSTED"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMovementBoosted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_BOOSTED',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"MOVEMENT_NEUTRAL"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMovementNeutral = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'MOVEMENT_NEUTRAL',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesUpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badgeBalances"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeBalances = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badgeBalances',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badgeBalancesV2"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadgeBalancesV2 = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badgeBalancesV2',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"badges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'badges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBalanceOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'balanceOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"baseURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBaseUri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'baseURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"blacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesBlacklist = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'blacklist',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"canMint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesCanMint = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'canMint',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesGetApproved = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getApproved',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getHash"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesGetHash = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getHash',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"getTokenId"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesGetTokenId = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'getTokenId',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"migrationContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMigrationContract = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'migrationContract',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"migrationLockDuration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMigrationLockDuration = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'migrationLockDuration',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMintSigner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mintSigner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"minted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMinted = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'minted',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movementBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMovementBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movementBadges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"movements"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesMovements = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'movements',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesName = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'name',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesOwnerOf = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'ownerOf',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesPendingOwner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'pendingOwner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesSymbol = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'symbol',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenOfOwnerByIndex',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesTokenUri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'tokenURI',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"totalBadgeSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesTotalBadgeSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'totalBadgeSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesTotalSupply = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'totalSupply',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"unlockTimestamps"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesUnlockTimestamps = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'unlockTimestamps',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"userBadges"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesUserBadges = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'userBadges',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"version"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const readTrailblazersBadgesVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'version',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadges = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesApprove = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesInitialize = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesMint = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMigrationContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSetMigrationContract = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMigrationContract',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMigrationLockDuration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSetMigrationLockDuration = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMigrationLockDuration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSetMovement = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesSetUri = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesStartMigration = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const writeTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadges = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesAcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesApprove = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'approve',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesInitialize = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesMint = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'mint',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'safeTransferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMigrationContract"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSetMigrationContract = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMigrationContract',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMigrationLockDuration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSetMigrationLockDuration = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMigrationLockDuration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setMovement"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSetMovement = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setMovement',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"setUri"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesSetUri = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'setUri',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"startMigration"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesStartMigration = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'startMigration',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferFrom',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'transferOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateBlacklist"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesUpdateBlacklist = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateBlacklist',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"updateMintSigner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesUpdateMintSigner = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'updateMintSigner',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const simulateTrailblazersBadgesUpgradeToAndCall = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  functionName: 'upgradeToAndCall',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Approval',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'ApprovalForAll',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BadgeCreated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesBadgeCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BadgeCreated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"BlacklistUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesBlacklistUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'BlacklistUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesInitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintConsumed"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesMintConsumedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintConsumed',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MintSignerUpdated"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesMintSignerUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MintSignerUpdated',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"MovementSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesMovementSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'MovementSet',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesOwnershipTransferStartedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferStarted',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Transfer',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 */
export const watchTrailblazersBadgesUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesAbi,
  address: trailblazersBadgesAddress,
  eventName: 'Upgraded',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesAbi}__ and `eventName` set to `"UriSet"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x97EFA197dc3d9dD3efF5c4D04FFBB35728e42970)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2 = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2UpgradeInterfaceVersion = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'UPGRADE_INTERFACE_VERSION',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'balanceOfBatch',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"exists"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2Exists = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'exists',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"getBadge"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2GetBadge = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'getBadge',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'isApprovedForAll',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"minter"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2Minter = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'minter',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2Owner = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'owner',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"pendingOwner"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2ProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'proxiableUUID',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'supportsInterface',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"totalSupply"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2Uri = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'uri',
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"uriTemplate"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const readTrailblazersBadgesS2UriTemplate = /*#__PURE__*/ createReadContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'uriTemplate',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2 = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2AcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2Initialize = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'initialize',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2Mint = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'mint',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"setMinter"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const writeTrailblazersBadgesS2SetMinter = /*#__PURE__*/ createWriteContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setMinter',
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2 = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"acceptOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2AcceptOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'acceptOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2Initialize = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'initialize',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"mint"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2Mint = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'mint',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'renounceOwnership',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setApprovalForAll',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"setMinter"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const simulateTrailblazersBadgesS2SetMinter = /*#__PURE__*/ createSimulateContract({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  functionName: 'setMinter',
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const watchTrailblazersBadgesS2Event = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const watchTrailblazersBadgesS2InitializedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Initialized',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const watchTrailblazersBadgesS2OwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'OwnershipTransferred',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"TransferBatch"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
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
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const watchTrailblazersBadgesS2UriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'URI',
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trailblazersBadgesS2Abi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Taiko Mainnet Taikoscan__](https://taikoscan.io/address/0x0000000000000000000000000000000000000000)
 * - [__View Contract on Taiko Hekla L2 Taikoscan__](https://hekla.taikoscan.network/address/0x01014665e81aB88f055c1a953838Ec34D66B25b7)
 */
export const watchTrailblazersBadgesS2UpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trailblazersBadgesS2Abi,
  address: trailblazersBadgesS2Address,
  eventName: 'Upgraded',
});
