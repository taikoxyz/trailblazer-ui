<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import { PUBLIC_SEASON_BONUS_CLAIM_ACTIVE } from '$env/static/public';
  import { ActionButton } from '$shared/components/Button';
  import { Icon } from '$shared/components/Icon';
  import { successToast } from '$shared/components/NotificationToast';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import { closeOnEscapeOrOutsideClick } from '$shared/utils/customActions';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import { bonusLoading, claimModal } from '../../stores';

  $: modalContentWrapperClasses = classNames(
    'w-[100vw]',
    'h-[100vh]',
    'md:rounded-[20px]',
    'md:h-max',
    'bg-neutral-background',
    'md:w-[500px]',
    'flex',
    'flex-col',
    'items-center',
    'relative',
  );

  const modalTitleClasses = classNames('font-[700]', 'w-full', 'text-[18px]/[24px]');
  const bodyWrapperClasses = classNames(
    'gap-[30px]',
    'flex',
    'justify-center',
    'items-center',
    'flex-col',
    'px-[50px]',
    'text-grey-200',
    'py-4',
  );
  const footerWrapperClasses = classNames(
    'border-t',
    'border-divider-border',
    'px-[50px]',
    'py-[20px]',
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'gap-4',
  );

  const dialogId = crypto.randomUUID();
  function closeModal() {
    $claimModal = false;
  }

  const modalHeaderClasses = classNames(
    'w-full',
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'py-[20px]',
    'px-[24px]',
    'border-divider-border',
    'border',
    'border-b-1',
    'border-l-0',
    'border-r-0',
    'border-t-0',
  );
  const closeButtonClasses = classNames(
    'h-[24px]',
    'w-[24px]',
    'focus:outline-none',
    'flex',
    'items-center',
    'justify-center',
  );

  const amountInfoClasses = classNames('font-[700]', 'text-[22px]/[28px]');
  const rewardInputValueWrapperClasses = classNames(
    'rounded-full',
    'text-primary-content',
    'flex',
    'items-center',
    'px-[24px]',
    'py-[14px]',
    'justify-between',
    'w-full',
    'bg-grey-800',
  );

  const successTitleClasses = classNames(
    'font-clash-grotesk',
    'text-center',
    'text-grey-10',
    'text-[35px]/[42px]',
    'font-[500]',
  );

  const amountInfoTextClasses = classNames('text-grey-200', 'font-[400]', 'flex', 'gap-[4px]', 'text-[16px]/[24px]');

  function numberWithCommas(x: number) {
    const fixedNumber = x.toFixed(2); // Ensures two decimal places
    const parts = fixedNumber.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  $: bonusClaimActive = PUBLIC_SEASON_BONUS_CLAIM_ACTIVE === 'true';
  $: seasonBonusPoints = 0;

  let alreadyClaimed = false;
  let claiming: boolean = false;

  $: claimError = false;

  const loadPoints = async () => {
    const address = getConnectedAddress();

    if (address && address !== zeroAddress && $activeSeason && bonusClaimActive) {
      $bonusLoading = true;
      const [bonusPoints, claimed] = await Promise.all([
        profileService.getProfileBonusPoints(address, $activeSeason),
        profileService.checkBonusClaimRegistered(address, $activeSeason),
        profileService.getPointsAndRankForAddress(address, $activeSeason - 1),
      ]);

      seasonBonusPoints = bonusPoints || 0;
      alreadyClaimed = claimed;

      $bonusLoading = false;
    }
  };

  async function handleBonusClaim() {
    const address = getConnectedAddress();

    claiming = true;

    const txhash = await profileService.claimSeasonBonus(address, $activeSeason);
    if (txhash) {
      claiming = false;
      alreadyClaimed = true;
      successToast({
        title: 'Claim submitted',
        message: 'Your points will be updated within the next few hours',
      });
    } else {
      claimError = true;
    }

    claiming = false;
  }

  onMount(async () => {
    await loadPoints();
  });

  $: getConnectedAddress() && loadPoints();
</script>

<dialog
  id={dialogId}
  class="modal"
  class:modal-open={$claimModal}
  use:closeOnEscapeOrOutsideClick={{ enabled: $claimModal, callback: closeModal, uuid: dialogId }}>
  <div class={modalContentWrapperClasses}>
    <div class={modalHeaderClasses}>
      <div class={modalTitleClasses}>
        {$t('claim.modal.title')}
      </div>
      <button on:click={closeModal} class={closeButtonClasses}>
        <Icon type="x-close" size={18} />
      </button>
    </div>

    <div class={bodyWrapperClasses}>
      {#if claimError}
        <img alt="Warning" src="/warning.svg" class="w-[120px] h-[120px]" />
      {:else if alreadyClaimed}
        <img alt="Success" src="/success.svg" class="w-[120px] h-[120px]" />
      {:else}
        <img alt="Claim" src="/claim.svg" class="w-[120px] h-[120px]" />
      {/if}

      {#if alreadyClaimed}
        <div class={successTitleClasses}>
          {$t('claim.modal.claimed_title')}
        </div>
      {:else if claimError}
        <div class={successTitleClasses}>
          {$t('claim.modal.claimed_error_title')}
        </div>
      {/if}

      <div class="text-center">
        {#if alreadyClaimed}
          {$t('claim.modal.claimed')}
        {:else if claimError}
          {$t('claim.modal.claimed_error_body')}
        {:else}
          {$t('claim.modal.body')}
        {/if}
      </div>
      <div class={rewardInputValueWrapperClasses}>
        <div class={amountInfoClasses}>{numberWithCommas(seasonBonusPoints)}</div>
        <div class={amountInfoTextClasses}>
          Bonus points
          <Icon type="info-circle" size={24} />
        </div>
      </div>
    </div>

    <div class={footerWrapperClasses}>
      <ActionButton
        on:click={handleBonusClaim}
        disabled={claiming || alreadyClaimed || !seasonBonusPoints}
        priority="primary">
        {#if claimError}
          {$t('claim.modal.button_retry')}
        {:else}
          {$t('claim.modal.button')}
        {/if}
      </ActionButton>

      {#if alreadyClaimed || claimError}
        <ActionButton on:click={closeModal} priority="secondary">{$t('claim.modal.button_close')}</ActionButton>
      {/if}
    </div>
    <button class="overlay-backdrop" data-modal-uuid={dialogId} />
  </div>
</dialog>
