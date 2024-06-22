<script lang="ts">
  import { ActionButton } from '$components/Button';

  import type { CarouselItem } from '../types';
  export let carouselItem: CarouselItem;
  const { title, image, description, link, tag } = carouselItem;
</script>

<a class="carousel-item h-[465px] w-[350px]" href={link}>
  <div class="flex flex-col p-[35px] bg-neutral-background rounded-[33px] w-full">
    <!-- image -->
    <div class="avatar">
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
    <div class="flex flex-col py-[16px] h-full">
      <div class="font-clash-grotesk text-[28px]/[32px] font-medium tracking-[-0.28px] pb-[5px]">
        {title}
      </div>
      <div class="text-secondary-content body-regular pb-[20px]">{description}</div>
    </div>
    <a class="w-fit" href={link} target="_blank">
      <ActionButton class="max-w-[109px] border-2 body-bold text-nowrap py-[2px] h-fit" priority="secondary"
        >Play now</ActionButton>
    </a>
  </div>
</a>
