<script lang="ts">
  import { t } from 'svelte-i18n';
  import { type Address } from 'viem';

  import ActionButton from '$components/Button/ActionButton.svelte';
  import { errorToast, successToast } from '$components/NotificationToast';
  import { type FactionNames, FACTIONS } from '$configs/badges';
  import canClaimPreflight from '$libs/badges/canClaimPreflight';
  import claimBadge from '$libs/badges/claimBadge';
  import type { Movements } from '$libs/badges/const';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { isMintDisclaimerAccepted, mintDisclaimerModal } from '$stores/modal';

  import FactionImage from './FactionImage.svelte';
  import { fade } from 'svelte/transition';
  import { claimGalxePointsAbi } from '../../generated/abi';
  export let name: FactionNames;
  export let unlocked: boolean = false;
  export let address: Address;
  export let movement: Movements;
  export let canClick: boolean;

  let claimable: boolean = false;

  $: isClaiming = false;
  $: isAwaitingDisclaimer = false;

  $: $mintDisclaimerModal, isAwaitingDisclaimer && !$mintDisclaimerModal && safeClaimBadge();

  $: connectedAddress = getConnectedAddress();

  async function safeClaimBadge() {
    try {
      const txHash = await claimBadge(address, FACTIONS[name]);
      successToast({
        title: 'Badge Claimed',
        message: $t('common.badge_claimed', { values: { txHash } }),
      });
      unlocked = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error('claim badge error', e);
      errorToast({
        title: 'Badge Claim Error',
        message: e.message,
      });
    } finally {
      isClaiming = false;
    }
  }
  async function handleClaimClick() {
    isClaiming = true;
    if (claimable) {
      if (!isMintDisclaimerAccepted()) {
        isAwaitingDisclaimer = true;
        mintDisclaimerModal.set(true);
        isClaiming = false;
        return;
      }
      await safeClaimBadge();
    }
    isClaiming = false;
  }

  async function claimPreflight() {
    if (!connectedAddress) return;
    claimable = await canClaimPreflight(address, FACTIONS[name]);
  }

  $: $account, claimPreflight();

  $: buttonText = isClaiming ? $t('common.claiming') : claimable ? $t('common.claim') : $t('common.not_eligible');

  // CSS classes
  $: wrapperClasses = classNames(
    'relative',
    'overflow-hidden',
    'flex',
    'w-full',
    'min-h-[306px]',
    'max-w-[306px]',
    'rounded-[20px]',
    'bg-[#310E2F]',
    // claimable shadow
    claimable && !unlocked ? 'shadow-primary shadow-[0_0px_20px] border-2 border-primary-border-hover' : null,
  );

  const contentWrapperClasses = classNames(
    'w-full',
    'relative',
    'flex',
    'flex-col',
    'justify-between',
    'overflow-hidden',
  );

  $: imageWrapperClasses = classNames('w-full', 'f-col', 'items-center', !unlocked ? 'blur-md' : null);


  const badgeClasses = classNames(
'absolute',

    'badge',
    'py-[15px]',
    'px-[12px]',
    'text-[16px]/[24px]',
    'font-[700]',
    'border-transparent',
    'bg-[rgba(0,0,0,.4)]',
  )
  const weekBadgeClasses = classNames(
    badgeClasses,
    'top-6',
    'right-4',
  );

  const lockedBadgeNameClasses = classNames(
    badgeClasses,
    'top-6',
    'left-4'
  );

  const buttonWrapperClasses = classNames('absolute bottom-8 place-self-center w-full px-6');

  $: hovered = false;
  const tooltipClasses = classNames(
    'absolute',
    'w-full',
    'h-full',
    'top-0',
    'left-0',
    'flex',
    'justify-center',
    'items-center',
  );

  const hoveredDescriptionClasses = classNames(
    'w-full',
    'h-full',
    'flex',
    'justify-center',
    'items-center',
    'text-center',
    'flex-col',
    'px-4',
    'text-white',
    'absolute'
  )
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
  class={wrapperClasses}
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
  role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage {movement} {unlocked} type={name} />
    </div>
    {#if hovered}
      <div transition:fade class={tooltipClasses}>
        <div class={classNames('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-secondary', 'opacity-60')}></div>

          {#if !unlocked}
          <div class={lockedBadgeNameClasses}>

            {name}
          </div>

          {/if}

        <div class={hoveredDescriptionClasses}>
          {#if !unlocked && claimable}
            This is a locked and claimable badge. Click claim to proceed.
          {:else if unlocked}
            This is the description for the {name} badge.
          {:else}
            You are not eligible to claim this badge.
          {/if}
        </div>
      </div>
    {/if}
    <div class={weekBadgeClasses}>
      Week {FACTIONS[name] + 1}
    </div>
    {#if canClick}
      <div class={buttonWrapperClasses}>
        <ActionButton priority="primary" on:click={handleClaimClick} disabled={!claimable} loading={isClaiming}>
          {buttonText}
        </ActionButton>
      </div>
    {/if}
  </div>
</div>
