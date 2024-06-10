<script lang="ts">
  import { onMount } from 'svelte';

  import { Leaderboard } from '$libs/leaderboard';
  import { currentUserLeaderboard } from '$stores/leaderboard';
  let headers = ['#', 'User', 'Score'];

  onMount(async () => {
    await Leaderboard.getUserLeaderboard();
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
      {#each $currentUserLeaderboard.items as thing, i}
        <tr class="row">
          <td>{i+1}</td>
          <td>{thing.address}</td>
          <td>{thing.score}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
