<script lang="ts">
  import { isAddress } from 'ethereum-address';
  import type { ComponentType } from 'svelte';

  import { Icon } from '$components/Icon';
  import ExplorerLink from '$components/Links/ExplorerLink.svelte';
  import { Skeleton } from '$components/Mock';
  import type { UnifiedLeaderboardRow } from '$libs/leaderboard/types';
  import { shortenAddress } from '$libs/util/shortenAddress';

  export let entry: UnifiedLeaderboardRow;
  export let index: number;
  export let rank: number;
  export let fillClass: string;
  export let showTrophy: boolean;
  export let expandedRow: number;
  export let toggleRow: (index: number) => void;
  export let showDetailsColumn: boolean;
  export let scoreComponent: ComponentType;
</script>

<tr
  class="row h-12 hover:bg-neutral-background {entry.data.length ? 'cursor-pointer' : ''}"
  on:click={() => toggleRow(index)}>
  <td class="h-full table-cell body-bold w-1/12">
    <div class="f-center gap-[12px]">
      {#if showTrophy}
        <Icon type="trophy" {fillClass} />
      {/if}
      {rank}
    </div>
  </td>
  <td class="lg:px-10 w-6/12">
    <div class="flex gap-[20px] align-center">
      <div class="flex flex-col justify-around">
        <div class="flex gap-[20px] align-center">
          {#if entry.icon}
            <div class="avatar flex items-center">
              <div class="w-12 h-12 rounded-full">
                <img alt="icon" src={entry.icon} />
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
          <div class="f-col justify-center">
            {#if isAddress(entry.address)}
              <div class="body-bold">{shortenAddress(entry.address, 8, 4)}</div>
            {:else}
              <div class="body-bold">{entry.address}</div>
            {/if}
            {#if entry.handle}
              <div class="body-small-regular">
                <a
                  href={'https://twitter.com/' + entry.handle}
                  class="f-row text-primary-link underline text-[14px]/[20px] gap-1"
                  target="_blank">
                  {entry.handle}
                  <Icon size={10} type="arrow-top-right" />
                </a>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </td>
  {#if showDetailsColumn}
    {#if entry.data?.length > 0}
      <td class="text-start table-cell lg:px-10 body-regular w-3/12">
        <button class="link">Details</button>
      </td>
    {:else if entry.address}
      <td class="text-start table-cell lg:px-10 body-regular w-3/12">
        <ExplorerLink address={entry.address} linkText="Explorer" shorten />
      </td>
    {/if}
  {/if}
  <td class="lg:px-10 body-regular w-3/12 text-right">
    <svelte:component this={scoreComponent} score={entry.totalScore} data={entry.data} />
  </td>
</tr>

{#if expandedRow === index && entry.data.length > 0}
  {#each entry.data as detail}
    <tr id={(index + 0.5).toString()} class="row border-y-2 border-neutral-background h-12 hover:bg-neutral-background">
      <td class=""></td>
      <td class="lg:px-10 w-1/4"><ExplorerLink address={detail.address} /></td>
      <td class="text-start table-cell lg:px-10 w-1/4"> </td>
      <td class="lg:px-10 body-regular w-1/4">
        <svelte:component this={scoreComponent} score={detail.score} />
      </td>
    </tr>
  {/each}
{/if}
