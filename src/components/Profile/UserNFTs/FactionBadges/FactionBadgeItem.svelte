<script lang="ts">
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import type { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';

  import FactionImage from './FactionImage.svelte';

  export let name: FactionNames;
  export let movement: Movements;
  export let blurred: boolean = false;
  export let disabled: boolean = false;
  export let showWeek: boolean = true;
  // CSS classes
  $: wrapperClasses = classNames(
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'border-2',
    'transition-all',
    disabled ? 'grayscale' : 'grayscale-0',
    blurred ? 'border-primary-border-hover' : 'border-transparent',
  );

  const contentWrapperClasses = classNames(
    'w-full',
    'relative',
    'flex',
    'flex-col',
    'justify-between',
    'overflow-hidden',
  );

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center', blurred ? 'blur-md' : null);

  const weekBadgeClasses = classNames(
    'absolute',
    'badge',
    'py-[15px]',
    'px-[12px]',
    'text-[16px]/[24px]',
    'font-[700]',
    'border-transparent',
    'bg-[rgba(0,0,0,.4)]',
    'top-[20px]',
    'right-[20px]',
  );
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage {movement} type={name} />
    </div>
  </div>
  <slot />

  {#if showWeek}
    <div class={weekBadgeClasses}>
      Week {FACTIONS[name] + 1}
    </div>{/if}
</div>
