<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { FactionBadgeButton } from '$lib/domains/profile/types/FactionBadgeButton';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';

  import FactionImage from './FactionImage.svelte';

  export let blurred: boolean = false;
  export let inColor: boolean = true;
  export let buttonDisabled = false;
  export let button: null | FactionBadgeButton = null;
  export let token: TBBadge;

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch('badgeclick', { badge: token });
  };

  $: badgeId = 'badgeId' in token ? (token.badgeId as number) : 0;

  // CSS classes
  $: wrapperClasses = classNames(
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'aspect-square',
    'rounded-[30px]',
    'transition-all',
    inColor ? 'grayscale-0' : 'grayscale',
    $$props.class,
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

  // const bubbleWrapperClasses = classNames(
  //   'absolute',
  //   'top-[20px]',
  //   'right-[20px]',
  //   'flex',
  //   'flex-col',
  //   'justify-end',
  //   'items-end',
  //   'gap-[5px]',
  // );

  const buttonWrapperClasses = classNames('absolute', 'w-full', 'bottom-0', 'p-[20px]', 'h-[88px]');

  const lockedOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'items-center', 'justify-center', 'f-col');

  $: reactiveToken = { ...token };
</script>

<div class={wrapperClasses} role="button" on:click={handleClick} on:keydown tabindex="0">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage token={reactiveToken} />
    </div>
  </div>
  <slot />

  <!-- {#if !hideBubbles}
    <div class={bubbleWrapperClasses}>
      <MultiplierBadge {token} />
    </div>
  {/if} -->

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

  {#if token.frozen}
    <div class={lockedOverlayClasses}>
      <Icon type="lock" size={80} />
      <span class="text-sm hidden lg:block">Locked for current season</span>
    </div>
  {/if}
</div>
