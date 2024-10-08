<script lang="ts">
  import { formatNumbers } from '$shared/utils/formatNumbers';

  export let score: number;
</script>

<span> ${formatNumbers(Number(score).toFixed(2))} </span>
