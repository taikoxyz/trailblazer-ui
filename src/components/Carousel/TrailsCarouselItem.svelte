<script lang="ts">
  import { Icon } from '$components/Icon';
  import type { CarouselItem } from './types';

  export let carouselItem: CarouselItem;

  const { title, image, publishDate, readTime } = carouselItem;
</script>

<div class="carousel-item min-h-[465px] min-w-[350px]">
  <div class="flex flex-col p-2 bg-neutral-background rounded-[33px] w-full">
    <!-- image -->
    <div class="relative w-full h-[212px] rounded-[25px] bg-black">
      <img src={image} alt={image} class="w-full h-full object-cover object-center rounded-[25px]" />
      <div
        class="absolute top-[16px] left-[22px] bg-white px-[10px] py-[4px] rounded-full text-primary-base-content w-auto h-auto">
        tag
      </div>
    </div>
    <div class="flex flex-col gap-[21px] px-[16px] py-[16px] justify-between h-full">
      <div class="font-clash-grotesk text-[28px] font-medium tracking-[-0.28px]">
        {title}
      </div>
      <div class="flex justify-between text-secondary-content">
        <div class="f-center gap-2">
          <Icon type="calendar"></Icon>
          {publishDate.toLocaleDateString()}
        </div>
        <div class="f-center gap-2">
          <Icon type="clock"></Icon>
          {readTime} min read
        </div>
      </div>
    </div>
  </div>
</div>
