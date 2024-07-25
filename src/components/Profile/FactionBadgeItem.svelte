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
  import { pendingTransactions } from '$stores/pendingTransactions';

  import FactionImage from './FactionImage.svelte';
  export let name: FactionNames;
  export let unlocked: boolean = false;
  export let address: Address;
  export let movement: Movements;
  export let canClick: boolean;
  export let enoughGas: boolean;

  $: isClaiming = false;
  $: isAwaitingDisclaimer = false;

  $: $mintDisclaimerModal, isAwaitingDisclaimer && !$mintDisclaimerModal && safeClaimBadge();

  $: isWhitelisted = false;
  $: claimable = isWhitelisted && enoughGas;

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
      canClick = false;
    }
    isClaiming = false;
  }

  async function claimPreflight() {
    if (!connectedAddress) return;
    isWhitelisted = await canClaimPreflight(connectedAddress, FACTIONS[name]);
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
    'rounded-[30px]',
    'bg-[#310E2F]',
    'border-2',
    'transition-all',
    unlocked ? 'border-transparent' : 'border-primary-border-hover',
    // claimable shadow
    claimable && !unlocked
      ? classNames('hover:shadow-primary', 'hover:shadow-[0_0px_50px]', 'hover:border-primary-border-hover')
      : null,
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
  );
  const weekBadgeClasses = classNames(badgeClasses, 'top-[20px]', 'right-[20px]');

  const lockedBadgeNameClasses = classNames(badgeClasses, 'top-[20px]', 'left-[20px]');

  const buttonWrapperClasses = classNames('absolute', 'bottom-[20px]', 'place-self-center', 'w-full', 'px-[20px]');

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

  $: hoveredDescriptionClasses = classNames(
    'w-full',
    'h-full',
    'flex',
    'justify-center',
    'items-center',
    'text-center',
    'flex-col',
    'px-4',
    'text-white',
    'absolute',
    'opacity-0',
    'transition-all',
    !unlocked ? 'hover:opacity-100' : null,
  );

  const requirementsUrls = [
    // week 1 - Ravers
    'https://taiko.mirror.xyz/uySYTWEA0dJa4D8ObK9FXeEjhL2zsWRh2i2EhkFZWxQ',
    // week 2 - Robots
    'https://taiko.mirror.xyz/_StXfEC1rD9gTv96IEOM0PM1b0YkSvkk-xY_sX8UMgc',
    // week 3 - Bouncers
    'https://taiko.mirror.xyz/AH77sZK6ZW_SqY_BDOxheYFJORo1WJfVu7A88jwZ2BA',
    // week 4 - Masters
    'https://taiko.mirror.xyz/D7Z7y46WRHBoT2wb-dujgEtCz4YWCXvKXT8Gize_PeM',
    // week 5 - Monks
    'https://taiko.mirror.xyz/7L-lnL1ab24Q9XmCgpQtVOmfxoNCTb_RGEbS7w4E3io',
    // week 6 - Androids
    'https://taiko.mirror.xyz/n9G_VMf2ShNhx-6eHbLTTE5BwRP1JKHkCDxZQTk0nrY',
  ];

  $: requirementsUrl = requirementsUrls[FACTIONS[name]] || '';
</script>

<div class={wrapperClasses} role="button">
  <div class={contentWrapperClasses}>
    <div class={imageWrapperClasses}>
      <FactionImage {movement} {unlocked} type={name} />
    </div>
    <div class={tooltipClasses}>
      <div class={classNames('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-secondary', 'opacity-10')}></div>

      <div class={hoveredDescriptionClasses}>
        <div class={lockedBadgeNameClasses}>
          {name}
        </div>

        {#if $pendingTransactions.length > 0}
          {$t('badges.pendingTx')}
        {:else if !enoughGas}
          {$t('badges.notEnoughGas')}
        {:else if claimable}
          {$t('badges.claimable')}
        {:else}
          <!-- eslint-disable  svelte/no-at-html-tags-->
          {@html $t('badges.nonClaimable', {
            values: {
              requirements: `<a href="${requirementsUrl}" style="color:#FF6FC8;text-decoration:underline;">${$t('badges.nonClaimableLinkText')}</a>`,
            },
          })}
        {/if}
      </div>
    </div>

    <div class={weekBadgeClasses}>
      Week {FACTIONS[name] + 1}
    </div>
    {#if canClick}
      <div class={buttonWrapperClasses}>
        <ActionButton
          priority="primary"
          on:click={handleClaimClick}
          disabled={!claimable || $pendingTransactions.length > 0}
          loading={isClaiming}>
          {buttonText}
        </ActionButton>
      </div>
    {/if}
  </div>
</div>
