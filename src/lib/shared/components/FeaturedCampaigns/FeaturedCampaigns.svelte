<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import { classNames } from '$shared/utils/classNames';
  import { isMobile } from '$shared/utils/responsiveCheck';

  export let title: string | undefined = undefined;
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import Card from '../Card/Card.svelte';
  import type { CampaignCardType } from './types';

  const cards: CampaignCardType[] = [
    {
      title: 'Recruit Season 2 members',
      text: 'Recruit new Season 2 members to your cause by sending your Season 1 Devs out to find them.',
      btn: {
        text: 'Recruit now',
        external: false,
        destination: `profile/${getConnectedAddress()}#badge-recruitment`,
      },
      images: {
        sm: '/campaign/cards/sm/recruit.png',
        md: '/campaign/cards/xl/recruit.png',
        lg: '/campaign/cards/xl/recruit.png',
        xl: '/campaign/cards/xl/recruit.png',
      },
    },
    {
      title: 'Taiko x Robinos',
      text: 'Gain bonus points for correct predictions on select events with Robinos.',
      btn: {
        text: 'Learn more',
        external: true,
        destination: 'https://predict.robinos.finance',
      },
      images: {
        sm: '/campaign/cards/sm/robinos.png',
        md: '/campaign/cards/xl/robinos.png',
        lg: '/campaign/cards/xl/robinos.png',
        xl: '/campaign/cards/xl/robinos.png',
      },
    },
    {
      title: 'Chillblazers',
      text: 'Prize pool 140K TAIKO tokens for all gaming and sociafi dapps!',
      btn: {
        text: 'Start now',
        external: false,
        destination: 'journeys/s2/chillblazers',
      },
      images: {
        sm: '/campaign/cards/sm/chillblazers.png',
        md: '/campaign/cards/xl/chillblazers.png',
        lg: '/campaign/cards/xl/chillblazers.png',
        xl: '/campaign/cards/xl/chillblazers.png',
      },
    },
    {
      title: 'Liquidity Royale',
      text: 'Taiko Edition, Battle for Liquidity: Taiko Rewards Race, Taiko TVL Rush',
      btn: {
        text: 'Earn now',
        external: false,
        destination: 'journeys/s2/liquidity',
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
  let carouselWrapper: HTMLDivElement;
  let atStart = true;
  let atEnd = false;

  function scrollLeft() {
    const scrollAmount = isMobile ? -200 : -600;
    carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function scrollRight() {
    const scrollAmount = isMobile ? 200 : 600;
    carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  function checkScrollPosition() {
    atStart = carouselElement?.scrollLeft === 0;
    atEnd = carouselElement?.scrollLeft + carouselElement?.offsetWidth >= carouselElement?.scrollWidth;
  }

  $: checkScrollPosition();

  onMount(() => {
    carouselElement?.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
  });

  onDestroy(() => {
    carouselElement?.removeEventListener('scroll', checkScrollPosition);
  });
</script>

<div class={classNames('flex', 'flex-col', 'justify-center', 'items-center', 'w-full')}>
  <div class="w-full flex gap-4 justify-between items-between h-full bottom-0">
    <div class={classNames('relative right-0 flex-row flex justify-end items-end w-full')}>
      {#if title}
        <div class="flex flex-col justify-start gap-[40px]">
          <div class="flex flex-col gap-[20px] items-start xl:items-start">
            <div class="font-clash-grotesk text-[40px]/[49.2px]">{title}</div>
            <div class={`border border-primary-brand w-[66px] h-[0px]`}></div>
          </div>
        </div>
      {/if}

      <div class="flex gap-4">
        <button
          class={`f-center btn-circle border border-primary-brand ${atStart ? '' : 'bg-primary-brand  hover:bg-primary-interactive-hover'}`}
          on:click={scrollLeft}
          disabled={atStart}>
          <Icon class="-translate-x-[2px]" type="chevron-left" />
        </button>

        <button
          class={`f-center btn-circle border border-primary-brand ${atEnd ? '' : ' bg-primary-brand hover:bg-primary-interactive-hover'}`}
          on:click={scrollRight}
          disabled={atEnd}>
          <Icon class="translate-x-[2px]" type="chevron-right" />
        </button>
      </div>
    </div>
  </div>
  <div bind:this={carouselWrapper} class="w-full pt-[100px] md:pt-[70px]">
    <div
      bind:this={carouselElement}
      class="flex w-full gap-4 lg:gap-8 overflow-x-hidden overflow-y-hidden scroll-smooth snap-x snap-mandatory">
      {#each cards as card}
        <Card content={card} class="snap-start flex-shrink-0 w-[300px] md:w-[400px] h-full" />
      {/each}
    </div>
  </div>
</div>
