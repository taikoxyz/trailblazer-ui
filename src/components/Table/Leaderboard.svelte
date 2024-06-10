<script lang="ts">
  import { onMount } from 'svelte';

  import { Leaderboard } from '$libs/leaderboard';
  import { currentLeaderboard } from '$stores/leaderboard';
  let headers = ['#', 'Address', 'Score'];

  onMount(async () => {
    await Leaderboard.getLeaderboard();
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
      {#each $currentLeaderboard.items as thing, i}
        <tr class="row">
          <td>{i+1}</td>
          <td>{thing.address}</td>
          <td>{thing.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
