<script lang="ts">
  import { formatNumbers } from '$libs/util/formatNumbers';

  export let score: number;
</script>

<span> ${formatNumbers(Number(score).toFixed(2))} </span>
