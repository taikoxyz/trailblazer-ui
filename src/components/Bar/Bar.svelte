<script lang="ts">
  // Count up to value using svelte spring
  import { spring } from 'svelte/motion';

  export let value = 42069;
  export let maxValue = 42069 * 2;
  let countSpring = spring(0, { stiffness: 0.04, damping: 1, precision: 0.001 });

  $: countSpring.update(() => value);
</script>

<progress class={$$props.class} value={$countSpring.toFixed(0)} max={maxValue}> </progress>
