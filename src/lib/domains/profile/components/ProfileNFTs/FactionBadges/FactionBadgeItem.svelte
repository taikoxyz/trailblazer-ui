<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import FactionImage from './FactionImage.svelte';
  import { activeRecruitmentStore } from '$shared/stores/recruitment';
  import { RecruitmentStatus } from '$shared/types/BadgeRecruitment';

  export let inColor: boolean = true;
  // export let buttonDisabled = false;
  // export let button: null | FactionBadgeButton = null;
  export let token: TBBadge;

  const dispatch = createEventDispatcher();
  const log = getLogger('FactionBadgeItem');

  // const handleButtonClick = () => {
  //   dispatch('buttonClick', { badge: token, badgeId });
  //   log('Button clicked', token);
  // };

  const handleBadgeClick = () => {
    log('Badge clicked', token);
    dispatch('badgeClick', { badge: token, badgeId });
  };

  $: badgeId = 'badgeId' in token ? (token.badgeId as number) : 0;

  // season-relevant value
  $: isFrozen = token.metadata.frozenS3;

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

  // const buttonWrapperClasses = classNames('absolute', 'w-full', 'bottom-[10px]', 'px-[20px]');

  const lockedOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'items-center', 'justify-center', 'f-col');

  // const buttonClasses = classNames('max-h-[40px]', 'min-h-[40px]');

  $: reactiveToken = { ...token };

  $: isRecruiting =
    $activeRecruitmentStore?.badge?.tokenId === token.tokenId &&
    $activeRecruitmentStore?.status !== RecruitmentStatus.COMPLETED;

  $: blurred = isRecruiting ? false : token.frozen;
</script>

<div class={wrapperClasses} on:click={handleBadgeClick} role="button" on:keydown tabindex="0">
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

  <!-- {#if button}
    <div class={buttonWrapperClasses}>
      <ActionButton
        disabled={buttonDisabled || button.disabled}
        class={buttonClasses}
        on:click={(event) => {
          event.stopPropagation();
          handleButtonClick();
        }}
        priority={button.type}>
        {button.label}
      </ActionButton>
    </div>
  {/if} -->

  {#if reactiveToken.frozen && !isRecruiting}
    <div class={lockedOverlayClasses}>
      <Icon type="lock" size={80} />
    </div>
  {/if}
</div>
