<script lang="ts">
  import { Leaderboard } from '$libs/leaderboard';
  import { currentLeaderboard } from '$stores/leaderboard';
  import { onMount } from 'svelte';
  let headers = ['#', 'Wallet Address', 'Score'];

  export let start = 0;
  export let end = 2714348799;

  onMount(async () => {
    await Leaderboard.getLeaderboard(start, end);
  });
</script>

<div class="overflow-x-auto w-full">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="rounded-lg">
      {#each $currentLeaderboard.items as thing, i (thing.address)}
        <tr class="row">
          <td>{i}</td>
          <td>{thing.address}</td>
          <td>{thing.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
