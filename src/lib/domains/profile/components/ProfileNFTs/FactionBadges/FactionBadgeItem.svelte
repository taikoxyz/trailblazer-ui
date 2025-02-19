<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { ActionButton } from '$shared/components/Button';
  import type { ActionButtonType } from '$shared/components/Button/types';
  import { Icon } from '$shared/components/Icon';
  import { currentRecruitmentStore } from '$shared/stores/recruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import FactionImage from './FactionImage.svelte';
  import { isBadgeLocked } from '$shared/utils/badges/isBadgeLocked';

  export let inColor: boolean = true;
  export let token: TBBadge;
  export let blurred: boolean = false;
  export let recruitingView: boolean = false;
  export let isHovered: boolean = false;
  export let button: { label: string; type: ActionButtonType } | null = null;

  const dispatch = createEventDispatcher();
  const log = getLogger('FactionBadgeItem');

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

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center', isBlurred ? 'blur-md' : null);

  const lockedOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'items-center', 'justify-center', 'f-col');

  $: reactiveToken = { ...token };

  $: isRecruiting = $currentRecruitmentStore?.cooldowns.claim
    ? new Date($currentRecruitmentStore.cooldowns.claim) > new Date()
    : false;

  $: isBlurred = blurred || (isBadgeLocked(token) && (!isRecruiting || recruitingView));
</script>

<div class={wrapperClasses} on:click={handleBadgeClick} role="button" on:keydown tabindex="0">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage token={reactiveToken} />
    </div>
  </div>
  <slot />

  {#if isBlurred}
    <div class={lockedOverlayClasses}>
      {#if !recruitingView || !isRecruiting}
        <Icon type="lock" size={60} />
      {/if}
    </div>
  {/if}
  {#if isHovered && button}
    <div class="absolute flex w-full h-full bg-black bg-opacity-20 z-10">
      <ActionButton class="self-end m-2 !min-h-[48px] h-[48px]" priority={button.type}>{button.label}</ActionButton>
    </div>
  {/if}
</div>
