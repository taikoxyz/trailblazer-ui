<script lang="ts">
  import { t } from 'svelte-i18n';
  import { isAddressEqual } from 'viem';

  import { trailblazersBadgesAddress } from '$generated/abi';
  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { MovementNames, Movements } from '$lib/domains/profile/types/types';
  import { ActionButton } from '$shared/components/Button';
  import type { NFT } from '$shared/types/NFT';
  import { chainId } from '$shared/utils/chain';
  import { classNames } from '$shared/utils/classNames';

  import FactionImage from './FactionImage.svelte';

  export let blurred: boolean = false;
  export let inColor: boolean = true;
  export let buttonDisabled = false;
  export let button: null | FactionBadgeButton = null;

  export let token: NFT;

  $: badgeId = (token.metadata.badgeId as number) || 0;
  $: season = isAddressEqual(token.address, trailblazersBadgesAddress[chainId]) ? 1 : 2;
  $: movementName = MovementNames[(token.metadata.movement as Movements) || Movements.Dev];

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
  const bubbleClasses = classNames(
    'badge',
    'py-[15px]',
    'px-[12px]',
    'text-[16px]/[24px]',
    'font-[700]',
    'border-transparent',
    'bg-[rgba(0,0,0,.4)]',
  );

  const buttonWrapperClasses = classNames('absolute', 'w-full', 'bottom-0', 'p-[20px]', 'h-[88px]');
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage {token} />
    </div>
  </div>
  <slot />

  <div class={bubbleWrapperClasses}>
    <div class={bubbleClasses}>
      {$t('badge_forge.labels.season')}
      {season}
    </div>
    <div class={bubbleClasses}>
      {$t('badge_forge.labels.trail')}
      {badgeId + 1}
    </div>
    {#if season > 1}
      <div class={bubbleClasses}>
        {movementName}
      </div>
    {/if}
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
