<script lang="ts">
  import { Icon } from '$shared/components/Icon';

  import CarouselItem from './CarouselItem.svelte';

  export let carouselItems = [
    {
      title: 'Robinos',
      description: 'Robinos leverages smart contracts and blockchain technology to create...',
      imageSrc: '/dapps/robinos.png',
      imageAlt: 'Robinos logo',
      tagText: 'DeFi',
      buttonText: 'Earn more',
    },
    {
      title: 'Card 2',
      description: 'Another interesting blockchain project...',
      imageSrc: 'https://via.placeholder.com/100',
      imageAlt: 'Card 2 logo',
      tagText: 'NFT',
      buttonText: 'Discover',
    },
    {
      title: 'Card 3',
      description: 'Yet another cool project...',
      imageSrc: 'https://via.placeholder.com/100',
      imageAlt: 'Card 3 logo',
      tagText: 'GameFi',
      buttonText: 'Explore',
    },
    {
      title: 'Card 4',
      description: 'One more project to check out...',
      imageSrc: 'https://via.placeholder.com/100',
      imageAlt: 'Card 4 logo',
      tagText: 'Metaverse',
      buttonText: 'Learn more',
    },
    {
      title: 'Card 5',
      description: 'The last project in the carousel...',
      imageSrc: 'https://via.placeholder.com/100',
      imageAlt: 'Card 5 logo',
      tagText: 'DAO',
      buttonText: 'Join us',
    },
  ];

  export let title: string | undefined = 'Boost your Taiko score';

  let currentIndex = 0;
  let isAnimating = false;
  const animationDuration = 500;

  let startX = 0;
  let deltaX = 0;
  let isDragging = false;
  let threshold = 50;

  $: N = carouselItems.length;

  $: styles = carouselItems.map((_, idx) => {
    const relativeIndex = (idx - currentIndex + N) % N;
    let transform = '';
    let opacity = 0;
    let zIndex = 1;
    let visibility = 'hidden';
    let blur = 4;
    let filter = 'blur(5px)';

    if (relativeIndex === 0) {
      // Center card
      transform = 'translate(-50%, -50%) scale(1)';
      opacity = 1;
      zIndex = 2;
      visibility = 'visible';
      blur = 0;
      filter = 'blur(0)';
    } else if (relativeIndex === N - 1) {
      // Left card
      transform = 'translate(-145%, -50%) translateZ(-200px) scale(0.8)';
      opacity = 0.5;
      visibility = 'visible';
      blur = 5;
      filter = 'blur(5px)';
    } else if (relativeIndex === 1) {
      // Right card
      transform = 'translate(45%, -50%) translateZ(-200px) scale(0.8)';
      opacity = 0.5;
      visibility = 'visible';
      blur = 5;
      filter = 'blur(5px)';
    } else {
      // Hidden cards
      transform = 'translate(-50%, -50%) translateZ(-400px) scale(0.6)';
      opacity = 0;
      visibility = 'hidden';
      blur = 0;
      filter = 'blur(0)';
    }

    return {
      transform,
      opacity,
      zIndex,
      visibility,
      blur,
      filter,
    };
  });

  async function rotateLeft() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + 1) % N;
    await new Promise((r) => setTimeout(r, animationDuration));
    isAnimating = false;
  }

  async function rotateRight() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex - 1 + N) % N;
    await new Promise((r) => setTimeout(r, animationDuration));
    isAnimating = false;
  }

  function handlePointerDown(event: PointerEvent) {
    if (isAnimating) return;
    isDragging = true;
    startX = event.clientX;

    // Type assertion to ensure event.target is an Element
    (event.target as Element).setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isDragging) return;
    deltaX = event.clientX - startX;
  }

  function handlePointerUp(event: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
    }
    deltaX = 0;
    // Type assertion to ensure event.target is an Element
    (event.target as Element).releasePointerCapture(event.pointerId);
  }

  function handleTouchStart(event: TouchEvent) {
    if (isAnimating) return;
    isDragging = true;
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging) return;
    deltaX = event.touches[0].clientX - startX;
    event.preventDefault();
  }

  function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        rotateRight();
      } else {
        rotateLeft();
      }
    }
    deltaX = 0;
  }
</script>

<div class="flex justify-center items-center w-full">
  <div class="w-full f-col lg:f-row justify-between items-center relative h-full mb-10">
    <!-- Title Section -->
    {#if title}
      <div class="flex flex-col gap-10 w-full md:min-w-[400px] md:w-[400px] self-start">
        <div class="flex flex-col gap-5 items-start">
          <div class="text-[20px] text-white font-clash-grotesk">{title}</div>
          <div class="border border-primary-brand w-16" />
          <span class="text-[45px] font-semi-bold text-white leading-tight font-clash-grotesk"
            >Hit the Drums, Rack Up Points:</span>
          <p class="text-secondary-content">
            Unlock multiplier magic with Robinos - the more you engage, the more you earn!
          </p>
        </div>
      </div>
    {/if}

    <!-- Navigation Buttons (Mobile - centered above) -->
    <div class="md:hidden flex gap-4 justify-center w-full mb-[40px] mt-[50px]">
      <button
        class="flex items-center justify-center w-12 h-12 rounded-full bg-primary-interactive-accent hover:bg-primary-brand-hover disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={rotateLeft}
        disabled={isAnimating}>
        <Icon type="chevron-left" />
      </button>
      <button
        class="flex items-center justify-center w-12 h-12 rounded-full bg-primary-interactive-accent hover:bg-primary-brand-hover disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={rotateRight}
        disabled={isAnimating}>
        <Icon type="chevron-right" />
      </button>
    </div>

    <!-- Carousel Container with Desktop Navigation -->
    <div
      class="relative w-full flex justify-center items-center md:mt-[50px] lg:w-[472px] lg:overflow-hidden xl:w-full">
      <!-- Left Navigation Button (Desktop only) -->
      <button
        class="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-interactive-accent hover:bg-primary-brand-hover disabled:opacity-50 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 z-10"
        style="right: calc(50% + 186px)"
        on:click={rotateLeft}>
        <Icon type="chevron-left" />
      </button>

      <!-- Right Navigation Button (Desktop only) -->
      <button
        class="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-interactive-accent hover:bg-primary-brand-hover disabled:opacity-50 disabled:cursor-not-allowed absolute top-1/2 -translate-y-1/2 z-10"
        style="left: calc(50% + 186px)"
        on:click={rotateRight}>
        <Icon type="chevron-right" />
      </button>

      <div
        class="relative w-[1024px] h-[350px] perspective-[1000px]"
        on:pointerdown={handlePointerDown}
        on:pointermove={handlePointerMove}
        on:pointerup={handlePointerUp}
        on:pointercancel={handlePointerUp}
        on:pointerleave={handlePointerUp}
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}>
        {#each carouselItems as item, index (index)}
          <div
            class="carousel-item absolute top-1/2 left-1/2 w-[324px] transform"
            style="
              transform: {styles[index].transform};
              opacity: {styles[index].opacity};
              z-index: {styles[index].zIndex};
              visibility: {styles[index].visibility};
              filter: {styles[index].filter};
              transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
            ">
            <CarouselItem {...item} active={(index - currentIndex + N) % N === 0} blur={styles[index].blur} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
