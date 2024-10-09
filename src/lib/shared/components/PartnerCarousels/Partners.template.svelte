<script lang="ts">
  import Carousel from '$shared/components/Carousel/Carousel.svelte';
  import type { CarouselItemType } from '$shared/components/Carousel/types';
  import { classNames } from '$shared/utils/classNames';

  export let title: string | undefined = undefined;
  export let carouselItems: CarouselItemType[] = [];
</script>

<div class={classNames('flex', 'flex-col', 'gap-6', 'xl:gap-[60px]', 'h-full')}>
  <Carousel {title} {carouselItems} />
</div>
