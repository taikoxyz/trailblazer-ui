<script lang="ts">
  import { onMount } from 'svelte';
  let headers = ['#', 'Wallet Address', 'Score'];
  export let start: number;
  export let end: number;
  type LeaderboardRow = {
    address: string;
    score: string;
    date: string;
  };
  let rows: LeaderboardRow[] = []
  onMount(async () => {
		const res = await fetch(`https://trailblazer.internal.taiko.xyz/leaderboard?since=${start}&until=${end}`);
		const data = await res.json();
    rows = data.items
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
      {#each rows as thing, i (thing.address)}
      <tr class="row">
        <td>{i}</td>
        <td>{thing.address}</td>
        <td>{thing.score}</td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
