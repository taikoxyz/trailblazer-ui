<script lang="ts">
  import Carousel from '$components/Carousel/Carousel.svelte';
  import type { CarouselItemType } from '$components/Carousel/types';
  import { classNames } from '$libs/util/classNames';

  export let title: string | undefined = undefined;
  export let carouselItems: CarouselItemType[] = [];
</script>

<div
  class={classNames(
    'flex',
    'flex-col',
    'gap-6',
    'xl:gap-[60px]',
    'w-[calc(100vw-20px)]',
    'md:w-[calc(100vw-47px)]',
    'lg:w-[calc(100vw-57px)]',
    'relative',
    'top-[-20px]',
    'h-[calc(100%-40px)]',
  )}>
  <Carousel {title} {carouselItems} />
</div>
