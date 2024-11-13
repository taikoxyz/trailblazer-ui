<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { FactionBadgeItem } from '$lib/domains/profile/components/ProfileNFTs';
  import { Movements } from '$lib/domains/profile/types/types';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  export let blurred: boolean = false;
  export let value: number = 0;
  export let shadow: boolean = false;
  export let hideBubbles = false;
  export let locked = false;

  export let token: NFT;
  const hasSlotContent = Object.keys($$slots).includes('default');
  const dispatch = createEventDispatcher();

  $: unlocked = !blurred;
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
    hasSlotContent ? 'pb-0' : null,
    'transition-all',
    shadow && (token.metadata.movement as Movements) === Movements.Minnow
      ? 'border-secondary  shadow-[0_0px_50px_0px_#E81899]'
      : null,
    shadow && (token.metadata.movement as Movements) === Movements.Whale
      ? 'border-[#5D08C8] shadow-[0_0px_50px_0px_#5D08C8]'
      : null,
    shadow && (token.metadata.movement as Movements) === Movements.Dev
      ? 'border-[white] shadow-[0_0px_50px_0px_white]'
      : null,
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
    hasSlotContent ? 'glassy-background' : 'glassy-background-lg',
  );

  const indicatorClasses = classNames('indicator-item', 'badge', 'badge-secondary', 'text-white', 'text-[24]/[36px]');
</script>

<button class={wrapperClasses} on:click={() => dispatch('click')}>
  {#if value > 0}
    <span class={indicatorClasses}>{value}</span>
  {/if}
  <div class={imageWrapperClasses}>
    <FactionBadgeItem {locked} {hideBubbles} {token} />
    {#if !unlocked}
      <div class={lockImageOverlayClasses}></div>{/if}
  </div>
  {#if hasSlotContent}
    <div class={badgeTextClasses}>
      <slot />
    </div>
  {/if}
</button>
