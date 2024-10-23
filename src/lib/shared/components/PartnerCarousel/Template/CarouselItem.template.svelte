<script lang="ts">
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { classNames } from '$shared/utils/classNames';

  import type { PartnerCarouselItem } from './types';

  export let blur: number = 0;
  export let active = false;

  export let item: PartnerCarouselItem;

  $: carouselWrapperClasses = classNames(
    'p-[35px]',

    'max-w-[324px]',
    'rounded-[35px]',
    'bg-partner-dark',
    'max-h-[350px]',
    active ? 'border-2 border-pink-400' : '',
  );
  const innerWrapper = classNames('flex', 'flex-wrap', 'gap-8', 'justify-between', 'content-start', 'items-start');

  const imageClasses = classNames('object-contain', 'aspect-square', 'w-[100px]', 'shrink-0', 'rounded-[20px]');

  const tagClasses = classNames(
    'px-2.5',
    'py-1.5',
    'text-sm',
    'font-bold',
    'text-center',
    'text-primary-base-content',
    'bg-primary-link-hover',
    'rounded-full',
  );

  const titleClasses = classNames('text-3xl', 'font-medium', 'text-zinc-100');
  const descriptionClasses = classNames('text-sm', 'text-gray-400', 'leading-5');
  const buttonClasses = classNames('self-start', 'mt-[20px]', 'max-w-[120px]');
</script>

<article class={carouselWrapperClasses}>
  <div class={innerWrapper} style="filter: blur({blur}px); transition: filter 0.5s ease;">
    <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" class={imageClasses} />
    <span class={tagClasses}>{item.tagText}</span>
    <div class="f-col min-w-[240px] w-full">
      <h2 class={titleClasses}>{item.title}</h2>

      <p class={descriptionClasses}>{item.description}</p>
      <ActionButton priority="primary" href={item.buttonLink} class={buttonClasses}>{item.buttonText}</ActionButton>
    </div>
  </div>
</article>
