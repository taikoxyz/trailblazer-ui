<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';

  export let title: string | undefined = undefined;

  import Card from '../Card/Card.svelte';
  import type { CampaignCardType } from './types';

  const cards: CampaignCardType[] = [
    {
      title: 'Claim your 50K points now!',
      text: 'Vote for your favorite projects on DoraHacks. Don’t miss out—claim your 50,000 points today!',
      btn: {
        text: 'Vote now',
        external: true,
        destination: 'https://dorahacks.io/grant/taiko/buidl',
      },
      images: {
        sm: '/campaign/cards/sm/dorahacks.png',
        md: '/campaign/cards/xl/dorahacks.png',
        lg: '/campaign/cards/xl/dorahacks.png',
        xl: '/campaign/cards/xl/dorahacks.png',
      },
    },
    {
      title: 'Avalon x Taiko: Exclusive rewards await',
      text: 'Supply TAIKO on Avalon to unlock airdrops, 100K TAIKO incentives, and 100x Trailblazers XP! ⏳',
      btn: {
        text: 'Earn now',
        external: true,
        destination: 'https://usdalend.avalonfinance.xyz/?marketName=proto_usda_taiko_v3',
      },
      images: {
        sm: '/campaign/cards/sm/avalon.png',
        md: '/campaign/cards/sm/avalon.png',
        lg: '/campaign/cards/sm/avalon.png',
        xl: '/campaign/cards/sm/avalon.png',
      },
    },
    {
      title: 'Evolve your Faction Badges',
      text: 'The Devs are out in full force looking for new recruits to join their Faction. Will you join them?',
      btn: {
        text: 'Recruit now',
        external: false,
        destination: `profile/`,
      },
      images: {
        sm: '/campaign/cards/sm/recruit.png',
        md: '/campaign/cards/xl/recruit.png',
        lg: '/campaign/cards/xl/recruit.png',
        xl: '/campaign/cards/xl/recruit.png',
      },
    },
    {
      title: 'Play, Socialize, and Win Big!',
      text: 'Explore top Gaming and SocialFi DApps, compete, and claim your share of 150k in prizes.',
      btn: {
        text: 'Explore now',
        external: false,
        destination: 'journeys/s3/chillblazers',
      },
      images: {
        sm: '/campaign/cards/sm/chillblazer.png',
        md: '/campaign/cards/xl/chillblazer.png',
        lg: '/campaign/cards/xl/chillblazer.png',
        xl: '/campaign/cards/xl/chillblazer.png',
      },
    },
    {
      title: 'Liquidity Royale Season 3',
      text: 'Supercharge your liquidity and get rewarded for it. Season 3 is offering a massive 1.2M TAIKO tokens!',
      btn: {
        text: 'Earn now',
        external: false,
        destination: 'journeys/liquidity',
      },
      images: {
        sm: '/campaign/cards/sm/liquidity-royale.png',
        md: '/campaign/cards/xl/liquidity-royale.png',
        lg: '/campaign/cards/xl/liquidity-royale.png',
        xl: '/campaign/cards/xl/liquidity-royale.png',
      },
    },
  ];

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
