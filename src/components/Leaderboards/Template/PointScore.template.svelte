<script lang="ts">
  import { formatNumbers } from '$libs/util/formatNumbers';

  export let score: number;
</script>

<!-- <span>{score.toLocaleString()}</span> -->

<td class="lg:px-10 body-regular w-3/12 text-right">{formatNumbers(Math.round(score))}</td>
