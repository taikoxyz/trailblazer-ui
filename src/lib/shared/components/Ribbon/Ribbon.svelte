<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';

  import { browser } from '$app/environment';
  import { debounce } from '$shared/utils/debounce';

  interface MarqueeItem {
    highlight: string;
    text: string;
  }

  const items: MarqueeItem[] = [{ highlight: 'SEASON 2 CLAIMING', text: 'NOW LIVE' }];

  let containerRef: HTMLDivElement;
  let contentWidth = 0;
  let duplicates = 3;

  let animationDuration = 20;

  const debouncedUpdateDuplicates = debounce(() => {
    updateDuplicates();
  }, 100);

  function updateDuplicates() {
    if (!containerRef) return;

    const containerWidth = containerRef.offsetWidth;
    const singleItemWidth = contentWidth / duplicates;

    const neededDuplicates = Math.ceil((containerWidth * 3) / singleItemWidth);

    if (neededDuplicates !== duplicates) {
      duplicates = neededDuplicates;
    }

    const baseSpeed = 100;
    animationDuration = contentWidth / baseSpeed;
  }

  let resizeObserver: ResizeObserver;

  onMount(async () => {
    resizeObserver = new ResizeObserver(() => {
      if (containerRef) {
        contentWidth = containerRef.scrollWidth;
        debouncedUpdateDuplicates();
      }
    });

    if (containerRef) {
      resizeObserver.observe(containerRef);
    }
    if (browser) {
      window.addEventListener('resize', debouncedUpdateDuplicates);
    }

    await tick();

    if (containerRef) {
      contentWidth = containerRef.scrollWidth;
      updateDuplicates();
    }
  });

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    if (browser) {
      window.removeEventListener('resize', debouncedUpdateDuplicates);
    }
  });
</script>

<div class="w-full bg-pink-400 overflow-hidden py-[12px] h-[48px] absolute left-0 top-0 z-50" bind:this={containerRef}>
  <div class="flex whitespace-nowrap animate-marquee" style:animation-duration="{animationDuration}s">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array(duplicates) as _}
      {#each items as item}
        <div class="flex items-center text-[18px] mx-[25px]">
          <span class="font-bold mr-3 text-secondary-warm-yellow">
            {item.highlight}
          </span>
          <span class="font-bold">{item.text}</span>
        </div>
      {/each}
    {/each}
  </div>
</div>
