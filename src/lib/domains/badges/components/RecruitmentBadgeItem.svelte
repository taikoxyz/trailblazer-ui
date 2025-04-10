<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs';
  import { Movements } from '$lib/domains/profile/types/types';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let value: number = 0;
  export let shadow: boolean = false;
  export let hideBubbles: boolean = false;
  export let locked: boolean = false;
  export let token: TBBadge;

  const hasDefaultSlot = 'default' in $$slots;
  const hasOverlaySlot = 'overlay' in $$slots;
  const dispatch = createEventDispatcher();

  $: wrapperClasses = classNames(
    'indicator',
    'bg-white',
    'p-[8px]',
    'w-full',
    'relative',
    'border',
    'border-white',
    'gap-[23px]',
    'border-[3px]',
    'md:rounded-[30px]',
    'rounded-[15px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    hasDefaultSlot ? 'pb-0' : null,
    shadow && (token.movement as Movements) === Movements.Minnows
      ? 'border-secondary shadow-[0_0px_50px_0px_#E81899]'
      : null,
    shadow && (token.movement as Movements) === Movements.Whales
      ? 'border-purple-600 shadow-[0_0px_50px_0px_#5D08C8]'
      : null,
    shadow && (token.movement as Movements) === Movements.Devs ? 'border-[white] shadow-[0_0px_50px_0px_white]' : null,
  );

  const imageWrapperClasses = classNames(
    'w-full',
    'rounded-[15px]',
    'md:rounded-[30px]',
    'overflow-hidden',
    'flex',
    'flex-row',
    'relative',
  );

  const badgeTextClasses = classNames(
    'w-full',
    'text-elevated-background',
    'md:text-[26px]/[32px]',
    'sm:text-[20px]/[26px]',
    'font-[500]',
    'font-clash-grotesk',
    'text-center',
    'pb-[22px]',
    'flex',
    'justify-center',
    'items-center',
  );

  $: lockImageOverlayClasses = classNames(
    'absolute',
    'w-full',
    'h-full',
    hasDefaultSlot ? 'glassy-background' : 'glassy-background-lg',
  );

  const indicatorClasses = classNames('indicator-item', 'badge', 'badge-secondary', 'text-white', 'text-[24]/[36px]');
</script>

<button class={wrapperClasses} on:click={() => dispatch('click')}>
  {#if value > 0}
    <span class={indicatorClasses}>{value}</span>
  {/if}
  <div class={imageWrapperClasses}>
    <FactionBadgeItem {locked} {hideBubbles} {token} />
    {#if locked}
      <div class={lockImageOverlayClasses}></div>
    {/if}
    {#if hasOverlaySlot}
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <slot name="overlay" />
      </div>
    {/if}
  </div>
  {#if hasDefaultSlot}
    <div class={badgeTextClasses}>
      <slot />
    </div>
  {/if}
</button>
