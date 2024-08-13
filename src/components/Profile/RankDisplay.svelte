<script lang="ts">
  export let rank: number = 0;
  export let total: number = 0;
  export let percentile: string = '0%';

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
</script>

<div class="flex items-center font-bold">
  <span class="text-white"
    >{rank.toLocaleString()}<sup>{getOrdinalSuffix(rank)}</sup>
    <span class="text-gray-500"> / {total.toLocaleString()} </span>
    <span class="body-regular"> (Top {percentile})</span>
  </span>
</div>
