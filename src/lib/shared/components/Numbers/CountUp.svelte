<script lang="ts">
  // Count up to value using svelte spring
  import { spring } from 'svelte/motion';

  import { formatNumbers } from '$shared/utils/formatNumbers';

  export let value = 0;
  let countSpring = spring(0, { stiffness: 0.04, damping: 1, precision: 0.001 });
  $: countSpring.update(() => value);
</script>

<div class={$$props.class}>{formatNumbers($countSpring.toFixed(0))}</div>
