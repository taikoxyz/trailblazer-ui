<script lang="ts">
  import { onMount } from 'svelte';

  import { ExplorerLink } from '$components/Links';
  import { Leaderboard } from '$libs/leaderboard';
  import { currentUserLeaderboard } from '$stores/leaderboard';
  import { formatNumbers } from '$libs/util/formatNumbers';
  let headers = ['Rank', 'Address', 'Points'];

  onMount(async () => {
    await Leaderboard.getUserLeaderboard();
  });
</script>

<div class="overflow-x-auto lg:w-full px-8 mt-[18%] lg:mt-0">
  <div class="flex justify-between mb-4">
    <div class="font-clash-grotesk lg:text-[60px] text-[40px] leading-none lg:leading-relaxed">
      <span class="text-secondary">User</span> Leaderboard
    </div>
    <div class="body-small-regular lg:body-regular flex flex-col justify-center">
      <div>Complete trails, bridge,</div>
      <div>use Dapps to rank up.</div>
    </div>
  </div>
  <table class="table-lg w-full body-regular text-white rounded-3xl" style="background: rgba(25, 30, 40, .50)">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th class="body-regular text-secondary-content text-start pt-8 lg:px-10">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentUserLeaderboard.items as thing, i}
        <tr class="row h-12">
          <td class="lg:px-10">{i + 1}</td>
          <td class="lg:table-cell hidden lg:px-10 body-regular"><ExplorerLink address={thing.address} /></td>
          <td class="text-start lg:hidden table-cell lg:px-10 body-regular"
            ><ExplorerLink address={thing.address} shorten={true} /></td>
          <td>{formatNumbers(Math.round(thing.score))}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
