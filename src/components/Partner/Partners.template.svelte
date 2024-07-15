<script lang="ts">
  import Carousel from '$components/Carousel/Carousel.svelte';
  import type { CarouselItemType } from '$components/Carousel/types';
  import Title from '$components/Title/Title.svelte';

  export let title: string;
  export let subtitle: string;
  export let borderColor: string = 'border-primary-brand';
  export let carouselItems: CarouselItemType[] = [];
</script>

<div class="flex flex-col gap-6 xl:gap-[60px] w-full">
  <div class="flex flex-col justify-between w-full gap-[40px] xl:pl-[347px] items-center xl:items-start">
    <div class="flex flex-col gap-4 items-center xl:items-start">
      <div class="font-clash-grotesk text-[20px]/[24.6px]">{title}</div>
      <div class={`border ${borderColor} w-[66px] h-[0px]`}></div>
    </div>
    <div class="flex justify-between w-full xl:items-end flex-col xl:flex-row items-center gap-4">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <Title>{@html subtitle}</Title>
    </div>
  </div>
  <Carousel {carouselItems} />
</div>
