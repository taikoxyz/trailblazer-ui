<script lang="ts">
  import type { Address } from 'viem';

  import { ActionButton } from '$components/Button';
  import { Spinner } from '$components/Spinner';
  import BadgeChampions from '$libs/badge-champions';
  import type { IBadgeChampionsMatch } from '$libs/badge-champions/types';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';

  import { default as ArenaTableHeader } from './ArenaTableHeader.svelte';
  import ArenaTableRow from './ArenaTableRow.svelte';

  let rounds: IBadgeChampionsMatch[][] = [];

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

  $: playerAddress = null as null | Address;
  async function load() {
    if (!$account || !$account.address) return;

    const leagueId = 1;
    const results = await BadgeChampions.getGameResults(leagueId);

    if (!results) return;
    rounds = results.rounds;
    if (!$account || !$account.address) return;
    playerAddress = $account.address;
  }

  $: $account, load();

  $: currentRound = 0;

  const navigationClasses = classNames(
    'grid',
    'grid-cols-3',
    'flex',
    'w-full',
    'p-[20px]',
    'justify-center',
    'items-center',
  );

  const roundCounterClasses = classNames('w-full', 'text-center', 'text-[24px]/[36px]', 'font-[700]');
</script>

<div class={wrapperClasses}>
  <div class={navigationClasses}>
    <ActionButton
      disabled={currentRound === 0}
      priority="secondary"
      on:click={() => (currentRound > 0 ? (currentRound -= 1) : null)}>Previous</ActionButton>
    <div class={roundCounterClasses}>
      Round<br />{currentRound}/{rounds.length - 1}
    </div>
    <ActionButton
      disabled={currentRound === rounds.length - 1}
      priority="secondary"
      on:click={() => (currentRound < rounds.length - 1 ? (currentRound += 1) : null)}>Next</ActionButton>
  </div>
  <div class={tableWrapperClasses}>
    <table class={tableClasses} style="background: rgba(25, 30, 40, .50)">
      <ArenaTableHeader />
      <tbody class={tbodyClasses}>
        {#if isLoading}
          <Spinner />
        {:else if rounds.length}
          {#each rounds as round, roundCount}
            {#each round as match, position}
              {#if roundCount === currentRound}
                <ArenaTableRow {playerAddress} {match} position={position + 1} />
              {/if}
            {/each}
          {/each}
        {/if}
        {#if rounds.length === 0 && !isLoading}
          <tr class={rowClasses}>
            <td class="lg:px-10" colspan="4">No data available</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
