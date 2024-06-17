<script lang="ts">
  import { onMount } from 'svelte';

  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  import { Skeleton } from '$components/Mock';
  import { Leaderboard } from '$libs/leaderboard';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentBridgeLeaderboard } from '$stores/leaderboard';
  import { EthIcon } from '$components/Icon';
  import Erc20 from '$components/Icon/ERC20.svelte';
  import Usdc from '$components/Icon/USDC.svelte';
  let headers = ['Dapp', 'Volume'];

  onMount(async () => {
    await Leaderboard.getBridgeLeaderboard();
  });
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0">
  <div class="flex flex-col gap-2 lg:flex-row justify-between mb-4">
    <div class="relative bg-[#310E2F] rounded-[30px] w-full p-12">
      <div class="font-clash-grotesk lg:text-[60px] text-[40px] leading-none">
        <span class="text-secondary">Bridge<br /></span> Leaderboard
      </div>
    </div>

    <div class="body-small-regular lg:body-regular flex flex-col justify-center"></div>
  </div>
  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">No.</th>
        <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">Dapp</th>
        <th class="body-regular text-secondary-content text-end pt-8 lg:px-10">Volume</th>
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentBridgeLeaderboard.items as thing, i}
        <tr class="row h-12">
          <td class="lg:px-10 w-2">{i + 1}</td>
          <td class="lg:px-10">
            <div class="flex gap-[20px] align-center">
              {#if thing.icon}
                <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="/{thing.icon}" />
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
                <div class="body-bold">{thing.name ? thing.name : thing.address}</div>
                {#if thing.twitter}
                  <a
                    class="text-primary-link underline text-[14px]/[20px]"
                    target="_blank"
                    href="https://twitter.com/{thing.twitter}">@{thing.twitter ? thing.twitter : thing.address}</a>
                {/if}
              </div>
            </div>
          </td>
          <td class="lg:px-10 body-regular flex-col">
            {#each thing.bridged as bridge}
              <div class="flex gap-[10px] my-1 justify-between text-right">
                <div class="w-full">{bridge.score > 0 ? formatNumbers(Math.round(bridge.score)) : '-'}</div>
                {#if bridge.token === '0x07d83526730c7438048D55A4fc0b850e2aaB6f0b'}
                  <Usdc />
                {:else}
                  <EthIcon />
                {/if}
              </div>
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
