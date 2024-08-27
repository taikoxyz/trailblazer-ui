<script lang="ts">
  import { formatNumbers } from '$libs/util/formatNumbers';

  export let score: number;
</script>

<!-- <span>{score.toLocaleString()}</span> -->

<div class=" body-regular text-right">{formatNumbers(Math.round(score))}</div>
