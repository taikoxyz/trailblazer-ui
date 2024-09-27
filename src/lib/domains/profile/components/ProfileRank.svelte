<script lang="ts">
  import type { UserProfile } from '../types/UserProfile';

  export let profile: UserProfile;

  function getOrdinalSuffix(rank: number): string {
    const j = rank % 10;
    const k = rank % 100;
    if (j == 1 && k != 11) {
      return 'st';
    }
    if (j == 2 && k != 12) {
      return 'nd';
    }
    if (j == 3 && k != 13) {
      return 'rd';
    }
    return 'th';
  }

  $: rank = profile?.userStats?.rank || '0';
  $: total = profile?.userStats?.total || '0';
  $: percentile = profile?.userStats?.rankPercentile || '0%';
</script>

<div class="flex items-center font-bold">
  <span class="text-white"
    >{rank.toLocaleString()}<sup>{getOrdinalSuffix(parseInt(rank))}</sup>
    <span class="text-gray-500"> / {total.toLocaleString()} </span>

    <!-- Display percentile with 2 decimals -->
    <span class="body-regular"> (Top {parseFloat(percentile).toFixed(2)}%)</span>
  </span>
</div>
