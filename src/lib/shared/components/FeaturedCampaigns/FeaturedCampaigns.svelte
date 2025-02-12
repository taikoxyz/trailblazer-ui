<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';

  export let title: string | undefined = undefined;

  import Card from '../Card/Card.svelte';
  import { cards } from './cards';

  let carouselElement: HTMLDivElement;
  let isDragging = false;
  let startX = 0;
  let scrollStartX = 0;
  let atStart = true;
  let atEnd = false;

  function checkScrollPosition() {
    if (!carouselElement) return;
    atStart = carouselElement.scrollLeft === 0;
    atEnd = Math.ceil(carouselElement.scrollLeft + carouselElement.offsetWidth) >= carouselElement.scrollWidth;
  }

  function onDragStart(event: MouseEvent | TouchEvent) {
    isDragging = true;
    startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    scrollStartX = carouselElement.scrollLeft;
    carouselElement.style.scrollBehavior = 'auto';
  }

  function onDragMove(event: MouseEvent | TouchEvent) {
    if (!isDragging || (event instanceof MouseEvent && event.buttons !== 1)) return;
    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = currentX - startX;
    carouselElement.scrollLeft = scrollStartX - deltaX;
    checkScrollPosition();
  }

  function onDragEnd() {
    isDragging = false;
    carouselElement.style.scrollBehavior = 'smooth';
    checkScrollPosition();
  }

  function scrollLeft() {
    const card = carouselElement.querySelector('.snap-start') as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 23;
    const totalCardWidth = cardWidth + gap;

    const currentScroll = carouselElement.scrollLeft;
    const newScroll = Math.max(0, currentScroll - totalCardWidth);

    carouselElement.scrollTo({ left: newScroll, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  }

  function scrollRight() {
    const card = carouselElement.querySelector('.snap-start') as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 23;
    const totalCardWidth = cardWidth + gap;

    const currentScroll = carouselElement.scrollLeft;
    const maxScroll = carouselElement.scrollWidth - carouselElement.clientWidth;
    const newScroll = Math.min(maxScroll, currentScroll + totalCardWidth);

    carouselElement.scrollTo({ left: newScroll, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  }

  onMount(() => {
    carouselElement?.addEventListener('mousedown', onDragStart);
    carouselElement?.addEventListener('mousemove', onDragMove);
    carouselElement?.addEventListener('mouseup', onDragEnd);
    carouselElement?.addEventListener('mouseleave', onDragEnd);
    carouselElement?.addEventListener('touchstart', onDragStart);
    carouselElement?.addEventListener('touchmove', onDragMove);
    carouselElement?.addEventListener('touchend', onDragEnd);
    carouselElement?.addEventListener('wheel', checkScrollPosition); // Add wheel listener for touchpad scrolling
    checkScrollPosition();
  });

  onDestroy(() => {
    carouselElement?.removeEventListener('mousedown', onDragStart);
    carouselElement?.removeEventListener('mousemove', onDragMove);
    carouselElement?.removeEventListener('mouseup', onDragEnd);
    carouselElement?.removeEventListener('mouseleave', onDragEnd);
    carouselElement?.removeEventListener('touchstart', onDragStart);
    carouselElement?.removeEventListener('touchmove', onDragMove);
    carouselElement?.removeEventListener('touchend', onDragEnd);
    carouselElement?.removeEventListener('wheel', checkScrollPosition); // Cleanup wheel listener
  });

  const containerClasses = classNames('flex', 'flex-col', 'justify-center', 'items-center', 'w-full', 'container');

  const headerWrapperClasses = classNames(
    'w-full',
    'flex',
    'gap-4',
    'justify-between',
    'items-between',
    'h-full',
    'bottom-0',
  );

  const headerClasses = classNames(
    'relative',
    'left-0',
    'flex-row',
    'flex',
    title ? 'justify-between' : 'justify-end',
    'items-end',
    'w-full',
  );

  const titleWrapperClasses = classNames('flex', 'flex-col', 'justify-start', 'gap-[40px]');

  const titleInnerClasses = classNames('flex', 'flex-col', 'gap-[20px]', 'items-start', 'xl:items-start');

  const titleClasses = classNames('font-clash-grotesk', 'text-[40px]/[49.2px]');

  const buttonWrapperClasses = classNames('flex', 'gap-4');

  const buttonBaseClasses = classNames('f-center', 'btn-circle', 'border', 'border-primary-brand');

  const buttonActiveClasses = classNames('bg-primary-brand', 'hover:bg-primary-interactive-hover');

  const carouselWrapperClasses = classNames(
    'w-full',
    'pt-[100px]',
    'md:pt-[70px]',
    'overflow-x-auto',
    'overflow-y-hidden',
    'scroll-smooth',
    'scrollable',
  );

  const cardContainerClasses = classNames('flex', 'w-full', 'gap-[23px]', 'snap-x', 'snap-mandatory');

  const cardClasses = classNames('snap-start', 'flex-shrink-0', 'w-full', 'md:w-[432px]', 'min-h-[470px]', 'h-full');
</script>

<div class={containerClasses}>
  <div class={headerWrapperClasses}>
    <div class={headerClasses}>
      {#if title}
        <div class={titleWrapperClasses}>
          <div class={titleInnerClasses}>
            <div class={titleClasses}>{title}</div>
          </div>
        </div>
      {/if}

      <div class={buttonWrapperClasses}>
        <button
          class={`${buttonBaseClasses} ${atStart ? '' : buttonActiveClasses}`}
          on:click={scrollLeft}
          disabled={atStart}>
          <Icon class="-translate-x-[2px]" type="chevron-left" />
        </button>

        <button
          class={`${buttonBaseClasses} ${atEnd ? '' : buttonActiveClasses}`}
          on:click={scrollRight}
          disabled={atEnd}>
          <Icon class="translate-x-[2px]" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>
  <div bind:this={carouselElement} class={carouselWrapperClasses}>
    <div class={cardContainerClasses}>
      {#each cards as card}
        <Card content={card} class={cardClasses} />
      {/each}
    </div>
  </div>
</div>

<style>
  .carousel {
    scroll-behavior: smooth;
  }
  .scrollable {
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For IE and Edge */
  }

  .scrollable::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
</style>
