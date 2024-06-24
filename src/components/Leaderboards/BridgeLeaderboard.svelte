<script lang="ts">
  import type { Address } from 'viem';
  import { getAddress } from 'viem/utils';

  import { EthIcon } from '$components/Icon';
  import Usdc from '$components/Icon/USDC.svelte';
  import Usdt from '$components/Icon/USDT.svelte';
  import { Skeleton } from '$components/Mock';
  import { chainId } from '$libs/chain';
  import { formatNumbers } from '$libs/util/formatNumbers';
  import { currentBridgeLeaderboard } from '$stores/leaderboard';

  import { usdcAddress, usdtAddress } from '../../generated/abi';
  import BridgeHeader from './Header/BridgeHeader.svelte';

  $: usdc = getValidatedAddress(usdcAddress[chainId] as Address);
  $: usdt = getValidatedAddress(usdtAddress[chainId] as Address);

  function getValidatedAddress(address: string): Address | null {
    try {
      return getAddress(address);
    } catch {
      return null;
    }
  }
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0 space-y-[60px]">
  <BridgeHeader />

  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead class="border-b-2 border-gray-800 ;">
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
                    <img alt="icon" src="/{thing.icon}" />
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
                <div class="body-bold">{thing.name ? thing.name : thing.name}</div>
                {#if thing.twitter}
                  <a
                    class="text-primary-link underline text-[14px]/[20px]"
                    target="_blank"
                    href="https://twitter.com/{thing.twitter}">@{thing.twitter ? thing.twitter : thing.name}</a>
                {/if}
              </div>
            </div>
          </td>
          <td class="lg:px-10 body-regular flex-col">
            {#each thing.scores as bridge}
              {@const tokenAddress = getValidatedAddress(bridge.token)}
              <div class="flex gap-[10px] my-1 justify-between text-right">
                <div class="w-full">{bridge.score > 0 ? formatNumbers(Math.round(bridge.score)) : '-'}</div>
                {#if tokenAddress === usdc}
                  <Usdc />
                {:else if tokenAddress === usdt}
                  <Usdt />
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
