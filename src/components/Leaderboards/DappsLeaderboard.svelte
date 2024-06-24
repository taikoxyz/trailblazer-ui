<script lang="ts">
  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  import { Skeleton } from '$components/Mock';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentLeaderboard } from '$stores/leaderboard';

  import DappsHeader from './Header/DappsHeader.svelte';
  let headers = ['Dapp', 'Address', 'Points'];
  // 0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8 orbiter finance
  // 0x5e809A85Aa182A9921EDD10a4163745bb3e36284 owlto finance
  // 0xD57b9EE8f597801e82018ed44e07E9065645B0c1 snaefell nft
  // 0x07d83526730c7438048D55A4fc0b850e2aaB6f0b usdc
  // 0xA9d23408b9bA935c230493c40C73824Df71A0975 TAIKO
  interface MappingValue {
    name: string;
    handle: string;
    icon?: string;
  }

  interface Mapping {
    [key: string]: MappingValue;
  }

  const filterList: { [key: string]: string } = {
    '0xA9d23408b9bA935c230493c40C73824Df71A0975': 'TAIKO',
    '0xA51894664A773981C6C112C43ce576f315d5b1B6': 'WETH',
    '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b': 'USDC',
    '0x30A0EE3f0F2C76Ad9f0731a4C1c89d9e2cB10930': 'TAIKO Airdrop',
    '0xD57b9EE8f597801e82018ed44e07E9065645B0c1': 'Snaefell NFT',
    '0x1670000000000000000000000000000000000001': 'Taiko Bridge',
    '0xa20a8856e00F5ad024a55A663F06DCc419FFc4d5': 'Trailblazer Badges',
  };

  // These are all orbiter
  // 0x80c67432656d59144ceff962e8faf8926599bcf8 - ETH
  // 0xe4edb277e41dc89ab076a1f049f4a3efa700bce8 - ETH
  // 0xee73323912a4e3772b74ed0ca1595a152b0ef282 - ETH
  // 0x34723B92aE9708BA33843120A86035D049dA7dfA - ETH
  // 0x41d3d33156ae7c62c094aae2995003ae63f587b3 - USDC
  // 0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc - USDT

  const mapping: Mapping = {
    '0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8': {
      name: 'Orbiter Finance',
      handle: '@Orbiter_Finance',
      icon: 'orbiter.png',
    },
    '0x5e809A85Aa182A9921EDD10a4163745bb3e36284': {
      name: 'Owlto Finance',
      handle: '@Owlto_Finance',
      icon: 'owlto.png',
    },
    '0x1Df2De291F909baA50C1456C87C71Edf9Fb199D5': {
      name: 'rhino.fi',
      handle: '@rhinofi',
      icon: 'rhinofi.png',
    },
    '0x04830cfCED9772b8ACbAF76Cfc7A630Ad82c9148': {
      name: 'izumi',
      handle: '@izumi_Finance',
      icon: 'dapps/izumi.svg',
    },

    '0x2c301eBfB0bb42Af519377578099b63E921515B7': {
      name: 'Crack And Stack',
      handle: '@crackandstack',
    },
    '0xe071D7974F882933C9A40fFe8F56Bb76dF61563F': {
      name: 'Taiko Flamenco',
      handle: '',
    },
    '0x953096A53b50776Ee3571aA7C6277F84C00947F3': {
      name: 'Taiko Farm (Morkie)',
      handle: '',
    },
    '0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B': {
      name: 'Ritsu Swap',
      handle: '@ritsuprotocol',
      icon: 'dapps/ritsu-protocol.jpg',
    },
    '0xee73323912a4e3772B74eD0ca1595a152b0ef282': {
      name: 'Orbiter Finance',
      handle: '@Orbiter_Finance',
      icon: 'orbiter.png',
    },
  };

  $: itemsToDisplay = $currentLeaderboard.items.filter((entry) => !filterList[entry.address]);
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[60px]">
  <DappsHeader />
  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each itemsToDisplay as entry}
        {@const hasName = mapping[entry.address] && mapping[entry.address].name}
        {@const hasHandle = mapping[entry.address] && mapping[entry.address].handle}
        {@const hasIcon = mapping[entry.address] && mapping[entry.address].icon}
        <tr class="row h-12">
          <td class="lg:px-10">
            <div class="flex gap-[20px] align-center">
              {#if hasIcon}
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img alt="icon" src="/{mapping[entry.address].icon}" />
                  </div>
                </div>
              {:else}
                <Skeleton
                  class="hidden lg:table-cell"
                  width="w-12"
                  height="h-12"
                  bgColor="bg-pink-200"
                  shineColor="bg-pink-100" />
              {/if}
              <div class="flex flex-col justify-around">
                {#if hasName}
                  <div class="body-bold">{mapping[entry.address].name}</div>
                {:else}
                  <div class="body-bold">tbd</div>
                {/if}
                {#if hasHandle}
                  <div class="body-small-regular">{mapping[entry.address].handle}</div>
                {/if}
              </div>
            </div>
          </td>
          <td class="lg:table-cell hidden lg:px-10 body-regular"><ExplorerLink address={entry.address} /></td>
          <td class="text-start lg:hidden table-cell lg:px-10 body-regular"
            ><ExplorerLink address={entry.address} shorten={true} /></td>
          <td class="lg:px-10 body-regular">{formatNumbers(Math.round(entry.score))}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
