<script lang="ts">
  import { t } from 'svelte-i18n';

  import { ActivityIcon } from '$components/Icon';
  import { Pill } from '$components/Pill';
  import { formatDate } from '$libs/util/formatDate';
  import { currentProfile } from '$stores/profile';

  $: pointsHistory = $currentProfile.pointsHistory;
  $: hasPointHistory = pointsHistory && pointsHistory.items && pointsHistory.items.length > 0;

  let headers = ['Activity', 'Points', 'Time'];
</script>

<div class="border-collapse w-full border-none bg-elevated-background">
  <table class="table w-full border-collapse px-[5px] min-w-[400px]">
    <thead class="border-none bg-none w-full">
      <tr class="border-none body-bold">
        {#each headers as header}
          <th class="w-[200px]"> {header}</th>
        {/each}
      </tr>
    </thead>
    <div class="divider m-0"></div>
    <tbody class="border-none pt-6">
      {#if pointsHistory && hasPointHistory}
        {#each pointsHistory.items as pointHistory}
          <tr class="border-2 border-transparent hover:border-2 body-bold">
            <td class="w-[200px]">
              <div class="flex gap-2 items-center">
                {#if pointHistory?.event === 'TransactionValue'}
                  <ActivityIcon type="double-coin" />
                  <span class="w-full">{$t('leaderboard.user.event.transaction_value')}</span>
                {:else if pointHistory?.event === 'BlockProposed'}
                  <ActivityIcon type="cube" />
                  <span class="w-full">{$t('leaderboard.user.event.block_proposed')}</span>
                {:else if pointHistory?.event === 'Bridged'}
                  <ActivityIcon type="double-diamond" />
                  <span class="w-full">{$t('leaderboard.user.event.bridged')}</span>
                {:else}
                  <ActivityIcon type="triple-coin-stacked" />
                  <span class="w-full">{$t('leaderboard.user.event.transaction')}</span>
                {/if}
              </div>
            </td>
            <td class="whitespace-nowrap w-[200px]">
              {#if pointHistory?.points === 0}
                <span class="text-negative-sentiment truncate">{$t('leaderboard.user.dailyMaxReached')}</span>
              {:else}
                <div class="flex gap-2 z-50 items-center">
                  <span class="">{$t('leaderboard.user.points', { values: { value: pointHistory?.points } })}</span>
                  {#if pointHistory?.multiplier && pointHistory?.multiplier > 1}
                    <Pill
                      class="bg-gradient-to-r from-[#5d08c8] from-10% via-[#9f00b8] via-33% via-[#ca00a8] via-66% to-[#e81899] ">
                      {$t('leaderboard.user.booster', { values: { multiplier: pointHistory?.multiplier } })}
                    </Pill>
                  {/if}
                </div>
              {/if}
            </td>
            <td class="whitespace-nowrap w-[200px]">{formatDate(pointHistory?.date)}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  th,
  td {
    min-height: 60px;
    border: none;
    text-align: left;
  }

  thead,
  tbody,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* Helps in keeping column width consistent */
  }
  thead {
    background-color: none;
  }
</style>
