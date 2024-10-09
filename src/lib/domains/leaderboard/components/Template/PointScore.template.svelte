<script lang="ts">
  import { formatNumbers } from '$shared/utils/formatNumbers';

  export let score: number;
</script>

<!-- <span>{score.toLocaleString()}</span> -->

<div class=" body-regular text-right">{formatNumbers(Math.round(score))}</div>
