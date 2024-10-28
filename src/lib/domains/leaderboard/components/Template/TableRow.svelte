<script lang="ts">
  import { isAddress } from 'ethereum-address';
  import type { ComponentType } from 'svelte';

  import type { UnifiedLeaderboardRow } from '$lib/domains/leaderboard/types/shared/types';
  import { Icon } from '$shared/components/Icon';
  import ExplorerLink from '$shared/components/Links/ExplorerLink.svelte';
  import { Skeleton } from '$shared/components/Mock';
  import { classNames } from '$shared/utils/classNames';
  import { shortenAddress } from '$shared/utils/shortenAddress';

  export let entry: UnifiedLeaderboardRow;
  export let index: number;
  export let rank: number;
  export let fillClass: string;
  export let showTrophy: boolean;
  export let expandedRow: number;
  export let toggleRow: (index: number) => void;
  export let showDetailsColumn: boolean;
  export let scoreComponent: ComponentType;
  export let qualifyingPositions: number;
  export let highlightIndexPosition: number = -1;

  const rowClasses = classNames(
    'row',
    'h-12',
    'hover:bg-neutral-background',
    index === -1 || index === highlightIndexPosition ? ' bg-pink-400/20 ' : '',
    entry.data?.length ? 'cursor-pointer' : '',
  );
  const rankCellClasses = classNames(
    'h-full',
    'table-cell',
    'body-bold',
    'w-1/12',
    'rounded-tl-[10px] rounded-bl-[10px]',
  );
  const rankIconClasses = classNames('f-row', 'gap-[12px]');
  const addressCellClasses = classNames('lg:px-10', 'w-6/12', 'px-6');
  const addressWrapperClasses = classNames('flex', 'gap-[20px]', 'align-center');
  const addressInnerWrapperClasses = classNames('flex', 'flex-col', 'justify-around');
  const avatarClasses = classNames('avatar', 'flex', 'items-center');
  const skeletonClasses = classNames('hidden', 'lg:table-cell');
  const twitterLinkClasses = classNames('f-row', 'text-primary-link', 'underline', 'text-[14px]/[20px]', 'gap-1');
  const detailsButtonClasses = classNames('text-start', 'table-cell', 'body-regular', 'w-3/12');
  const levelCellClasses = classNames('body-regular', 'w-3/12', 'text-left');
  const titleCellClasses = classNames('body-regular', 'w-3/12', 'text-left');
  const scoreCellClasses = classNames('body-regular', 'w-3/12', 'text-right', 'rounded-tr-[10px] rounded-br-[10px]');
  const expandedRowClasses = classNames('row border-y-2 border-neutral-background h-12 hover:bg-neutral-background  ');
</script>

<tr class={rowClasses} on:click={() => toggleRow(index)}>
  <td class={`${rankCellClasses}`}>
    <div class={rankIconClasses}>
      {#if showTrophy && rank <= qualifyingPositions && qualifyingPositions > 3}
        <Icon type="gold-crown" />
      {:else if showTrophy}
        <Icon type="trophy" {fillClass} />
      {/if}
      {rank}
    </div>
  </td>
  <td class={addressCellClasses}>
    <div class={addressWrapperClasses}>
      <div class={addressInnerWrapperClasses}>
        <div class={addressWrapperClasses}>
          {#if entry.icon}
            <div class={avatarClasses}>
              <div class="w-12 h-12 rounded-full">
                <img alt="icon" src={entry.icon} />
              </div>
            </div>
          {:else}
            <Skeleton
              class={skeletonClasses}
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
                <a href={'https://twitter.com/' + entry.handle} class={twitterLinkClasses} target="_blank">
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
    <td class={detailsButtonClasses}>
      <div class="px-6">
        <!-- Added padding here -->
        {#if entry.data?.length > 0}
          <button class="link">Details</button>
        {:else if entry.address}
          <ExplorerLink address={entry.address} linkText="Explorer" shorten />
        {/if}
      </div>
    </td>
  {/if}

  {#if entry.level}
    <td class={levelCellClasses}>
      <div class="px-6">
        <!-- Added padding here -->
        {entry.level}
      </div>
    </td>
  {/if}

  {#if entry.title}
    <td class={titleCellClasses}>
      <div class="px-6">
        <!-- Added padding here -->
        {entry.title}
      </div>
    </td>
  {/if}

  <td class={scoreCellClasses}>
    <div class="px-6">
      <!-- Added padding here -->
      {#if entry.totalScore >= 0}
        <svelte:component this={scoreComponent} score={entry.totalScore} data={entry.data} />
      {:else}
        Indexing...
      {/if}
    </div>
  </td>
</tr>

{#if expandedRow === index && entry.data?.length > 0}
  {#each entry.data as detail}
    <tr id={(index + 0.5).toString()} class={expandedRowClasses}>
      <td class=""></td>
      <td class="lg:px-10 w-1/4"><ExplorerLink address={detail.address} /></td>
      <td class="text-start table-cell lg:px-10 w-1/4"> </td>
      <td class="lg:px-10 body-regular w-1/4">
        <svelte:component this={scoreComponent} score={detail.score} />
      </td>
    </tr>
  {/each}
{/if}
