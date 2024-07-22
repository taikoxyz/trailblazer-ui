<script lang="ts">
  import { ActionButton } from '$components/Button';

  import type { CarouselItemType } from './types';

  export let carouselItem: CarouselItemType;
  const { title, image, description, link, tag, cta } = carouselItem;

  export let defaultCtaText = cta ? cta : 'Learn More';
  export let width = '350px';
</script>

<div
  class="carousel-item max-h-[465px] min-h-[465px] max-w-[306px] min-w-[306px] lg:max-w-[100%] lg:min-w-[350px]"
  style="width: {width};">
  <div class="flex flex-col p-[35px] bg-neutral-background rounded-[33px] w-full">
    <!-- image -->
    <div class="avatar mb-[30px]">
      <div class="size-[100px] rounded-[20px]">
        <img src={image} alt={image} class="w-full h-full object-cover object-center rounded-[25px]" />
        {#if tag}
          <div
            class="absolute top-[16px] left-[22px] bg-white px-[10px] py-[4px] rounded-full text-primary-base-content w-auto h-auto">
            {tag}
          </div>
        {/if}
      </div>
    </div>
    <!-- title and description -->
    <div class="flex flex-col h-full">
      <div class="font-clash-grotesk text-[28px]/[32px] font-medium tracking-[-0.28px] pb-[5px]">
        <!-- eslint-disable  svelte/no-at-html-tags-->
        {@html title}
      </div>
      <div class="text-secondary-content body-regular pb-[20px]">{description}</div>
    </div>
    <div class="flex justify-start">
      <a class="w-fit" href={link} target="_blank">
        <ActionButton
          href={link}
          class="max-w-[109px] border-2 body-bold text-nowrap py-[2px] h-fit"
          priority="secondary">{defaultCtaText}</ActionButton>
      </a>
    </div>
  </div>
</div>
