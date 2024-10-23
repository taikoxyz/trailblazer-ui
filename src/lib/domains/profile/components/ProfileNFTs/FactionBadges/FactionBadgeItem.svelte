<script lang="ts">
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { ActionButton } from '$shared/components/Button';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionImage from './FactionImage.svelte';

  export let blurred: boolean = false;
  export let inColor: boolean = true;
  export let buttonDisabled = false;
  export let button: null | FactionBadgeButton = null;

  export let token: NFT;

  $: badgeMovement = token.movement;
  $: badgeId = token.badgeId || 0;
  $: badgeName = FACTIONS[badgeId] as FactionNames;

  // CSS classes
  $: wrapperClasses = classNames(
    'w-[277px]',
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
    'bg-[#310E2F]',
    'transition-all',
    inColor ? 'grayscale-0' : 'grayscale',
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

  const buttonWrapperClasses = classNames('absolute', 'w-full', 'bottom-0', 'p-[20px]', 'h-[88px]');
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage movement={badgeMovement} type={badgeName} />
    </div>
  </div>
  <slot />

  <div class={weekBadgeClasses}>
    Trail {badgeId + 1}
  </div>

  {#if button}
    <div class={buttonWrapperClasses}>
      <ActionButton
        disabled={buttonDisabled || button.disabled}
        on:click={() => button.handler && button.handler(badgeId)}
        priority={button.type}>
        {button.label}
      </ActionButton>
    </div>
  {/if}
</div>
