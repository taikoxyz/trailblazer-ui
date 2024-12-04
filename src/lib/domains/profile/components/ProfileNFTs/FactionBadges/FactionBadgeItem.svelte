<script lang="ts">
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import type { NFT } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import MultiplierBadge from '../MultiplierBadge.svelte';
  import FactionImage from './FactionImage.svelte';

  export let blurred: boolean = false;
  export let inColor: boolean = true;
  export let buttonDisabled = false;
  export let button: null | FactionBadgeButton = null;
  export let hideBubbles = false;
  export let locked: boolean = false;
  export let token: NFT;

  $: badgeId = (token.metadata.badgeId as number) || 0;

  // CSS classes
  $: wrapperClasses = classNames(
    'w-[277px]',
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
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

  const bubbleWrapperClasses = classNames(
    'absolute',
    'top-[20px]',
    'right-[20px]',
    'flex',
    'flex-col',
    'justify-end',
    'items-end',
    'gap-[5px]',
  );

  const buttonWrapperClasses = classNames('absolute', 'w-full', 'bottom-0', 'p-[20px]', 'h-[88px]');

  const lockedOverlayClasses = classNames('w-full', 'h-full');

  const lockedOverlayGlassClasses = classNames('glassy-background', 'absolute', 'w-full', 'h-full');

  $: overlayImage = `/factions/recruitment/overlay-${MovementNames[token.metadata.movement as Movements].toLowerCase()}.svg`;
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage {token} />
    </div>
  </div>
  <slot />

  {#if !hideBubbles}
    <div class={bubbleWrapperClasses}>
      <MultiplierBadge {token} />
    </div>
  {/if}

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

  {#if locked}
    <div class={lockedOverlayGlassClasses}>
      <img class={lockedOverlayClasses} alt="Overlay" src={overlayImage} />
    </div>
  {/if}
</div>
