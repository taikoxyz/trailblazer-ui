<script lang="ts">
  import { onMount } from 'svelte';

  let repetitions: number = 5; // Start with an estimated initial value
  let marqueeContent: HTMLDivElement;

  const updateRepetitions = () => {
    if (marqueeContent) {
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      repetitions = Math.ceil(viewportWidth / contentWidth) + 1;
    }
  };

  onMount(() => {
    // Estimate initial repetitions as soon as the component is mounted
    updateRepetitions();

    // Attach event listener to handle window resize
    window.addEventListener('resize', updateRepetitions);

    return () => window.removeEventListener('resize', updateRepetitions);
  });
</script>

<div class="bg-pink-400 h-6 py-5 f-center">
  <div class="relative flex overflow-x-hidden w-full">
    <div class="f-row animate-marquee whitespace-nowrap" bind:this={marqueeContent}>
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each Array(repetitions).fill(0) as _}
        <span class="f-row mx-4 text-4xl">
          <div class="body-bold mr-[10px] text-secondary-warm-yellow">SEASON 1 HAS ENDED</div>
          <div class="body-bold">STAY TUNED FOR S2!</div>
        </span>
      {/each}
    </div>

    <div class="absolute f-row top-0 animate-marquee2 whitespace-nowrap">
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each Array(repetitions).fill(0) as _}
        <span class="f-row mx-4 text-4xl">
          <div class="body-bold mr-[10px] text-secondary-warm-yellow">SEASON 1 HAS ENDED</div>
          <div class="body-bold">STAY TUNED FOR S2!</div>
        </span>
      {/each}
    </div>
  </div>
</div>
