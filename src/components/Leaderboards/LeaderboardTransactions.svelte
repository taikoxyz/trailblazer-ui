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
  <div class="px-[5px]">
    <table class="table w-full border-collapse">
      <thead class="border-none bg-none">
        <tr class="border-none body-bold">
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
    </table>
  </div>
  <div class="divider m-0"></div>
  <div class="overflow-y-scroll max-h-[529px] block bg-elevated-background px-[5px]">
    <table class="table w-full border-collapse bg-elevated-background">
      <tbody class="border-none pt-6 overflow-scroll">
        {#if pointsHistory && hasPointHistory}
          {#each pointsHistory.items as pointHistory}
            <tr class="border-2 border-transparent hover:border-2 body-bold">
              <td class="flex gap-2 items-center">
                {#if pointHistory?.event === 'TransactionValue'}
                  <ActivityIcon type="double-coin" />
                  {$t('leaderboard.user.event.transaction_value')}
                {:else if pointHistory?.event === 'BlockProposed'}
                  <ActivityIcon type="cube" />
                  {$t('leaderboard.user.event.block_proposed')}
                {:else if pointHistory?.event === 'Bridged'}
                  <ActivityIcon type="double-diamond" />
                  {$t('leaderboard.user.event.bridged')}
                {:else}
                  <ActivityIcon type="triple-coin-stacked" />
                  {$t('leaderboard.user.event.transaction')}
                {/if}
              </td>
              <td>
                {#if pointHistory?.points === 0}
                  <span class="text-negative-sentiment">{$t('leaderboard.user.dailyMaxReached')}</span>
                {:else}
                  <div class="flex gap-2 z-50">
                    {$t('leaderboard.user.points', { values: { value: pointHistory?.points } })}
                    {#if pointHistory?.multiplier && pointHistory?.multiplier > 1}
                      <Pill
                        class="bg-gradient-to-r from-[#5d08c8] from-10% via-[#9f00b8] via-33% via-[#ca00a8] via-66% to-[#e81899]">
                        {$t('leaderboard.user.booster', { values: { multiplier: pointHistory?.multiplier } })}
                      </Pill>
                    {/if}
                  </div>
                {/if}
              </td>
              <td>{formatDate(pointHistory?.date)}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
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
