<script lang="ts">
  import Skeleton from '$components/Mock/Skeleton.svelte';
  import { currentProfile } from '$stores/profile';

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
        {#if $currentProfile.pointsHistory && $currentProfile.pointsHistory.items}
          {#each $currentProfile.pointsHistory.items as pointHistory}
            <tr class="border-2 border-transparent hover:border-2">
              <td class="flex gap-2 items-center">
                <Skeleton width="w-4" height="h-4" bgColor="bg-pink-200" shineColor="bg-pink-100" />
                {pointHistory?.event === 'TransactionValue'
                  ? 'Transaction Value'
                  : pointHistory?.event === 'BlockProposed'
                    ? 'Block Proposed'
                    : pointHistory?.event === 'Bridged'
                      ? 'Bridged'
                      : 'Transaction'}
              </td>
              <td>
                {#if pointHistory?.points === 0}
                  <span class="text-negative-sentiment">Daily Max Reached</span>
                {:else}
                  + {pointHistory?.points}
                {/if}
              </td>
              <td>{new Date(pointHistory?.date * 1000).toLocaleString()}</td>
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
