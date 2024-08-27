<script lang="ts">
  import Carousel from '$components/Carousel/Carousel.svelte';
  import type { CarouselItemType } from '$components/Carousel/types';
  import { classNames } from '$libs/util/classNames';

  export let title: string | undefined = undefined;
  export let carouselItems: CarouselItemType[] = [];
</script>

<div class={classNames('flex', 'flex-col', 'gap-6', 'xl:gap-[60px]', 'w-[100vw]', 'relative', 'h-full')}>
  <Carousel {title} {carouselItems} />
</div>
