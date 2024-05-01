<script lang="ts">
  import Skeleton from '$components/Mock/Skeleton.svelte';
  import type { UserPointHistory } from '$libs/profile';
  import { currentProfile } from '$stores/profile';
  import { userPointHistory } from '$stores/userPointHistory';

  let headers = ['Activity Name', 'Points', 'Date & Time'];
</script>

<div class="border-collapse w-full border-none bg-elevated-background">
  <div class="px-[5px]">
    <table class="table w-full border-collapse">
      <thead class="border-none bg-none">
        <tr class="border-none">
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
        {#if $currentProfile.pointsHistory}
          {#each $currentProfile.pointsHistory.items as pointHistory}
            <tr class="border-2 border-transparent hover:border-2 hover:border-orange-400">
              <td class="flex gap-2 items-center">
                <Skeleton width="w-4" height="h-4" bgColor="bg-blue-200" shineColor="bg-blue-100" />
                {pointHistory?.event}
              </td>
              <td>{pointHistory?.points}</td>
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
