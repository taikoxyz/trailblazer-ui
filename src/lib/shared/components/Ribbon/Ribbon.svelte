<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';

  interface MarqueeItem {
    highlight: string;
    text: string;
  }

  const items: MarqueeItem[] = [
    { highlight: 'SEASON 1 CLAIMING', text: 'NOW LIVE' },
    { highlight: 'EARN 60X MULTIPLIER', text: 'LOCK YOUR TAIKO' },
  ];

  let containerRef: HTMLDivElement;
  let contentWidth = 0;
  let duplicates = 3; // Start with a default number of duplicates

  function updateDuplicates() {
    if (!containerRef) return;

    const containerWidth = containerRef.offsetWidth;
    const singleItemWidth = contentWidth / duplicates;

    // Calculate how many duplicates we need to fill the container twice (for seamless loop)
    const neededDuplicates = Math.ceil((containerWidth * 2) / singleItemWidth);

    if (neededDuplicates !== duplicates) {
      duplicates = neededDuplicates;
    }
  }

  let resizeObserver: ResizeObserver;

  onMount(() => {
    resizeObserver = new ResizeObserver(() => {
      if (containerRef) {
        contentWidth = containerRef.scrollWidth;
        updateDuplicates();
      }
    });

    if (containerRef) {
      resizeObserver.observe(containerRef);
    }
    if (browser) window.addEventListener('resize', updateDuplicates);
  });

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (browser) window.removeEventListener('resize', updateDuplicates);
  });
</script>

<div class="w-full bg-pink-400 overflow-hidden py-[12px] h-[48px] relative z-50" bind:this={containerRef}>
  <div class="flex whitespace-nowrap animate-marquee">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(duplicates) as _}
      {#each items as item}
        <div class="flex items-center text-[18px] mx-[25px]">
          <span class="font-bold mr-3 text-secondary-warm-yellow">{item.highlight}</span>
          <span class="font-bold">{item.text}</span>
        </div>
      {/each}
    {/each}
  </div>
</div>
