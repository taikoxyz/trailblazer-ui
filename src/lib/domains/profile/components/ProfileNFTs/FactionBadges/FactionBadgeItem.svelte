<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { Icon } from '$shared/components/Icon';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';
  import FactionImage from './FactionImage.svelte';

  export let inColor: boolean = true;
  export let token: TBBadge;
  export let blurred: boolean = false;

  const dispatch = createEventDispatcher();
  const log = getLogger('FactionBadgeItem');

  const handleBadgeClick = () => {
    log('Badge clicked', token);
    dispatch('badgeClick', { badge: token, badgeId });
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

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center', isBlurred ? 'blur-md' : null);

  const lockedOverlayClasses = classNames('absolute', 'w-full', 'h-full', 'items-center', 'justify-center', 'f-col');

  $: reactiveToken = { ...token };

  // $: isRecruiting =
  //   $activeRecruitmentStore?.badge?.tokenId === token.tokenId &&
  //   $activeRecruitmentStore?.status !== RecruitmentStatus.COMPLETED;

  $: isBlurred = blurred || token.frozen;
</script>

<div class={wrapperClasses} on:click={handleBadgeClick} role="button" on:keydown tabindex="0">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      {reactiveToken.tokenId}
      <FactionImage token={reactiveToken} />
    </div>
  </div>
  <slot />
  {#if isBlurred}
    <div class={lockedOverlayClasses}>
      <Icon type="lock" size={80} />
    </div>
  {/if}
</div>
