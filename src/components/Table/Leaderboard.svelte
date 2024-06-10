<script lang="ts">
  import { onMount } from 'svelte';

  import { Leaderboard } from '$libs/leaderboard';
  import { currentLeaderboard } from '$stores/leaderboard';
  import { shortenAddress } from '$libs/util/shortenAddress';
  let headers = ['Dapp', 'Points'];

  onMount(async () => {
    await Leaderboard.getLeaderboard();
  });
</script>

<div class="overflow-x-auto w-full px-8">
  <div class="flex justify-between mb-4">
    <div class="font-clash-grotesk lg:text-[60px] text-[40px] leading-none lg:leading-relaxed"><span class="text-secondary">Dapps</span> Leaderboard</div>
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
          <th class="body-regular text-secondary-content text-start">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentLeaderboard.items as thing, i}
        <tr class="row">
          <td class="text-start lg:block hidden">{thing.address}</td>
          <td class="text-start lg:hidden block">{shortenAddress(thing.address)}</td>
          <td>{thing.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
