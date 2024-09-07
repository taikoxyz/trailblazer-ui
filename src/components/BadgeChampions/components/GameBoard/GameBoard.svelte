<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';

  import { Spinner } from '$components/Spinner';
  import BadgeChampions from '$libs/badge-champions';
  import type { IBadgeChampionsMatch, IBadgeChampionsParticipant } from '$libs/badge-champions/types';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';

  import { default as GameBoardHeader } from './GameBoardHeader.svelte';
  import GameBoardRow from './GameBoardRow.svelte';

  export let rounds: IBadgeChampionsMatch[][] = [];
  export let participants: IBadgeChampionsParticipant[] = [];
  let playerAddress = null as null | Address;

  let isLoading: boolean = false;
  let ended: boolean = true;

  const wrapperClasses = classNames('overflow-x-auto', 'w-full');

  const tableWrapperClasses = classNames('overflow-x-auto');

  const tableClasses = classNames(
    'relative',
    'table-lg',
    'table-zebra',
    'table-center',
    'w-full',
    'body-regular',
    'text-white',
  );

  $: tbodyClasses = classNames('w-full', ended ? null : 'blur-[1.5px]');

  const rowClasses = classNames('row', 'h-12');

  onMount(async () => {
    const leagueId = 1;
    const results = await BadgeChampions.getGameResults(leagueId);
    if (!results) return;
    rounds = results.rounds;
    participants = results.participants.sort((a, b) => b.points - a.points);

    if (!$account || !$account.address) return;
    playerAddress = $account.address;
  });
</script>

<div class={wrapperClasses}>
  <div class={tableWrapperClasses}>
    <table class={tableClasses} style="background: rgba(25, 30, 40, .50)">
      <GameBoardHeader />
      <tbody class={tbodyClasses}>
        {#if isLoading}
          <Spinner />
        {:else}
          {#each participants as participant, position}
            <GameBoardRow {playerAddress} {participant} position={position + 1} />
          {/each}
        {/if}
        {#if participants.length === 0 && !isLoading}
          <tr class={rowClasses}>
            <td class="lg:px-10" colspan="4">No data available</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
