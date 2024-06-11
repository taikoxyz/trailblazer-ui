<script lang="ts">
  import { onMount } from 'svelte';

  import { Leaderboard } from '$libs/leaderboard';
  import { currentLeaderboard } from '$stores/leaderboard';
  import { shortenAddress } from '$libs/util/shortenAddress';
  import { Skeleton } from '$components/Mock';
  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  let headers = ['Dapp', 'Address', 'Points'];
  // 0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8 orbiter finance
  // 0x5e809A85Aa182A9921EDD10a4163745bb3e36284 owlto finance
  // 0xD57b9EE8f597801e82018ed44e07E9065645B0c1 snaefell nft
  // 0x07d83526730c7438048D55A4fc0b850e2aaB6f0b usdc
  // 0xA9d23408b9bA935c230493c40C73824Df71A0975 TAIKO
  interface MappingValue {
    name: string;
    handle: string;
  }

  interface Mapping {
    [key: string]: MappingValue;
  }

  const mapping: Mapping = {
    '0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8': {
      name: 'Orbiter Finance',
      handle: '@Orbiter_Finance',
    },
    '0x5e809A85Aa182A9921EDD10a4163745bb3e36284': {
      name: 'Owlto Finance',
      handle: '@Owlto_Finance',
    },
    '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b': {
      name: 'USDC',
      handle: '@circle',
    },
    '0xA9d23408b9bA935c230493c40C73824Df71A0975': {
      name: 'TAIKO',
      handle: '@taikoxyz',
    },
    '0xD57b9EE8f597801e82018ed44e07E9065645B0c1': {
      name: 'Snaefell NFT',
      handle: '@taikoxyz',
    },
    '0x04830cfCED9772b8ACbAF76Cfc7A630Ad82c9148': {
      name: 'izumi',
      handle: '@izumi_Finance',
    },
    '0xA51894664A773981C6C112C43ce576f315d5b1B6': {
      name: 'WETH',
      handle: '',
    },
    '0x1670000000000000000000000000000000000001': {
      name: 'Taiko Bridge',
      handle: '@taikoxyz',
    },
    '0x30A0EE3f0F2C76Ad9f0731a4C1c89d9e2cB10930': {
      name: 'Taiko Airdrop',
      handle: '@taikoxyz',
    },
    '0x2c301eBfB0bb42Af519377578099b63E921515B7': {
      name: 'Crack And Stack',
      handle: '@crackandstack',
    },
    '0x1670000000000000000000000000000000010001': {
      name: 'TaikoL2',
      handle: '@taikoxyz',
    },
    '0xe071D7974F882933C9A40fFe8F56Bb76dF61563F': {
      name: 'Taiko Flamenco',
      handle: '',
    },
  };
  onMount(async () => {
    await Leaderboard.getLeaderboard();
  });
</script>

<div class="overflow-x-auto w-full px-8">
  <div class="flex flex-col gap-2 lg:flex-row justify-between mb-4">
    <div class="font-clash-grotesk lg:text-[60px] text-[40px] leading-none lg:leading-relaxed">
      <span class="text-secondary">Dapps</span> Leaderboard
    </div>
    <div class="body-small-regular lg:body-regular flex flex-col justify-center">
      <div>Complete trails, bridge,</div>
      <div>use Dapps to rank up.</div>
    </div>
  </div>
  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th class="body-regular text-secondary-content text-start pt-8 px-10">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentLeaderboard.items as thing, i}
        <tr class="row h-12">
          <td class="px-10">
            <div class="flex gap-[20px] align-center">
              <Skeleton
                class="hidden lg:table-cell"
                width="w-12"
                height="h-12"
                bgColor="bg-pink-200"
                shineColor="bg-pink-100" />
              <div class="flex flex-col justify-around">
                {#if mapping[thing.address] && mapping[thing.address].name}
                  <div class="body-bold">{mapping[thing.address].name}</div>
                {:else}
                  <div class="skeleton w-24 h-5 mb-2"></div>
                {/if}
                {#if mapping[thing.address] && mapping[thing.address].handle}
                  <div class="body-small-regular">{mapping[thing.address].handle}</div>
                {:else}
                  <div class="skeleton w-24 h-5"></div>
                {/if}
              </div>
            </div>
          </td>
          <td class="lg:table-cell hidden px-10 body-regular"><ExplorerLink address={thing.address} /></td>
          <td class="text-start lg:hidden table-cell px-10 body-regular"
            ><ExplorerLink address={thing.address} shorten={true} /></td>
          <td class="px-10 body-regular">{thing.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
