<script lang="ts">
  import { onMount } from 'svelte';

  let outerRibbon: HTMLElement;
  let innerRibbon: HTMLElement;
  let ribbonGroup: HTMLElement;

  let count = 0;

  onMount(() => {
    // Calculate the width of one innerRibbon including the gap
    const innerRibbonWidth = innerRibbon.getBoundingClientRect().width + 15;
    // Calculate how many ribbons fit in the outerRibbon
    const outerRibbonWidth = outerRibbon.getBoundingClientRect().width;
    count = Math.floor(outerRibbonWidth / innerRibbonWidth) + 1; // Adding extra for full coverage

    // Set CSS variable for use in keyframes
    ribbonGroup.style.setProperty('--move-distance', `${innerRibbonWidth}px`);
    ribbonGroup.style.setProperty('--initial-offset', `-${innerRibbonWidth}px`);

    // Apply animation duration proportional to the width of one ribbon
    ribbonGroup.style.animationDuration = `${innerRibbonWidth / 100}s`; // Adjust speed by changing divisor
  });
</script>

<div bind:this={outerRibbon} class="w-screen bg-pink-400 overflow-hidden h-6 f-center py-5">
  <div bind:this={ribbonGroup} class="w-full flex gap-[50px] animate-move">
    {#each Array.from({ length: count + 2 }, (_, i) => i) as _}
      <!-- Add whatever repeating content here -->
      <div bind:this={innerRibbon} class="min-w-fit flex flex-nowrap break-keep overflow-visible">
        <div class="body-bold mr-[10px] text-secondary-warm-yellow">JOIN THE REVOLUTION</div>
        <div class="body-bold">PINKIFY YOUR PROFILE</div>
      </div>
    {/each}
  </div>
</div>

<style>
  @keyframes moveRight {
    0% {
      transform: translateX(var(--initial-offset));
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-move {
    animation-name: moveRight;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
</style>
