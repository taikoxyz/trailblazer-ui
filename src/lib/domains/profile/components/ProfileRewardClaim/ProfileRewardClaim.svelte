<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';
  import { getAddress } from 'viem';

  import { page } from '$app/stores';
  import { PUBLIC_CLAIMING_ACTIVE } from '$env/static/public';
  import { claimServiceInstance } from '$lib/domains/claim/service/ClaimServiceInstance';
  import {
    claimAmount,
    claimLabel,
    claimProof,
    currentStep,
    isBlacklisted,
    isClaimSuccessful,
    isLoading,
    isSelfProfile,
  } from '$lib/domains/claim/stores/claimStores';
  import { errorToast, warningToast } from '$shared/components/NotificationToast';
  import { account } from '$shared/stores/account';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { pendingTransactions } from '$shared/stores/pendingTransactions';
  import { tokenClaimTermsAccepted } from '$shared/stores/tokenClaim';
  import { TransactionTimedOutError } from '$shared/types/errors';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import ClaimPanel from './ClaimPanel.svelte';
  import { getPanels } from './claimpanels';
  import { type ClaimPanelType, ClaimStates } from './types';

  const containerClass = classNames(
    'container',
    'w-full',
    'min-h-[800px]',
    'py-[89px]',
    'f-col',
    'justify-center',
    'items-center',
    'border',
    'border-divider-border',
    'glassy-gradient-card',
    'dark-glass-background-gradient',
    'rounded-[30px]',
    'relative',
  );

  const rowClass = classNames(
    'relative',
    'items-center',
    'gap-x-[26px]',
    'overflow-hidden',
    'flex',
    'flex-col',
    'justify-center',
    'min-xl:h-[800px]',
    'min-md:h-[642px]',
    'min-h-[760px]',
    'body-bold',
    'text-sm',
    'px-[24px]',
    'md:px-[55px]',
  );

  const titleClasses = classNames(
    'text-primary-content',
    'text-[35px]/[42px]',
    'font-[500]',
    'md:max-w-[392px]',
    'font-clash-grotesk',
    'text-center',
  );

  let panels: Record<ClaimStates, ClaimPanelType> = {} as Record<ClaimStates, ClaimPanelType>;

  const claimingLive = PUBLIC_CLAIMING_ACTIVE === 'true';

  $: panels = getPanels();

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile.set(getAddress(urlAddress) === getAddress(getConnectedAddress()));

    if ($isSelfProfile) {
      const blacklistStatus = await profileService.getBlacklistStatus(urlAddress, $activeSeason);
      isBlacklisted.set(blacklistStatus);

      try {
        const hasClaimed = await claimServiceInstance.hasClaimed(urlAddress, $activeSeason);
        if (hasClaimed) {
          currentStep.set(ClaimStates.SUCCESS);
          isClaimSuccessful.set(true);
          claimLabel.set('You have claimed');
          // we need to go back 1 season as the current season is not claimable yet
          const { value, proof } = await claimServiceInstance.preflight(urlAddress, $activeSeason - 1);
          if (value) {
            claimAmount.set(value);
            claimProof.set(proof);
          } else {
            currentStep.set(ClaimStates.ERROR_CLAIM);
            warningToast({
              title: 'Error',
              message: 'An error occurred while claiming.',
            });
          }
        }
      } catch (error) {
        console.error(error);
        currentStep.set(ClaimStates.ERROR_CLAIM);
      }
    }
  });

  /**
   * Handles button clicks based on the panel state.
   *
   * @param state - The current state of the claim process
   */
  async function handlePanelButtonClick(state: ClaimStates) {
    if (!$account || !$account.address) return;
    const address = $account.address;

    if (state === ClaimStates.START) {
      isLoading.set(true);
      try {
        // we need to go back 1 season as the current season is not claimable yet
        const { value, proof } = await claimServiceInstance.preflight(address, $activeSeason - 1);
        claimAmount.set(value);
        claimProof.set(proof);
        claimLabel.set('Start');
        if (value === -1) {
          currentStep.set(ClaimStates.ERROR_GENERIC);
        } else if (value === 0) {
          currentStep.set(ClaimStates.INELIGIBLE);
        } else {
          currentStep.set(ClaimStates.CLAIM);
        }
      } catch (error) {
        console.error(error);
        currentStep.set(ClaimStates.ERROR_GENERIC);
      } finally {
        isLoading.set(false);
      }
    }

    if (state === ClaimStates.CLAIM) {
      isLoading.set(true);
      $tokenClaimTermsAccepted = false;
      // currentStep.set(ClaimStates.SUCCESS);
      try {
        await claimServiceInstance.claim(address, $claimAmount, $claimProof, $activeSeason);
        claimLabel.set('You have claimed');
        isClaimSuccessful.set(true);
        currentStep.set(ClaimStates.SUCCESS);
      } catch (e) {
        if (e instanceof TransactionTimedOutError) {
          currentStep.set(ClaimStates.ERROR_TIMEOUT);
          warningToast({
            title: 'Timeout',
            message: 'The transaction receipt took too long. Please check your wallet for the transaction status.',
          });
        }
        console.error(e);
        currentStep.set(ClaimStates.ERROR_CLAIM);
        errorToast({
          title: 'Error',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).shortMessage || 'An error occurred while claiming.',
        });
      } finally {
        isLoading.set(false);
      }
    }

    if (state === ClaimStates.ERROR_CLAIM || state === ClaimStates.ERROR_GENERIC) {
      currentStep.set(ClaimStates.START);
    }

    if (state === ClaimStates.INELIGIBLE) {
      currentStep.set(ClaimStates.INELIGIBLE);
    }
  }

  $: disableButton = $currentStep === ClaimStates.CLAIM ? !$tokenClaimTermsAccepted : false;

  $: mappedButtons = panels[$currentStep].buttons.map((button) => ({
    ...button,
    handler: () => handlePanelButtonClick(panels[$currentStep].state),
  }));
</script>

<div class={containerClass}>
  {#if claimingLive}
    <div class={rowClass}>
      {#if $isBlacklisted}
        <div class="text-center space-y-[15px]">
          <h1 class={titleClasses}>You have been blacklisted</h1>
          <p class="text-lg">You will not be able to claim.</p>
        </div>
      {:else if $isLoading || $pendingTransactions.length > 0}
        <img alt="loading" src="/blobby/jumping_blobby.gif" class="w-[150px] h-[150px]" />
        {#if $currentStep === ClaimStates.CLAIM}
          <div class="text-center space-y-[15px]">
            <h1 class={titleClasses}>Claiming</h1>
            <p class="text-secondary-content">Please wait while the transaction is pending.</p>
          </div>
        {/if}
      {:else if $isSelfProfile}
        <ClaimPanel
          {disableButton}
          title={panels[$currentStep].title}
          amount={$currentStep === ClaimStates.CLAIM || $currentStep === ClaimStates.SUCCESS ? $claimAmount : null}
          text={panels[$currentStep].text || ''}
          state={panels[$currentStep].state}
          buttons={mappedButtons}
          additionalContent={panels[$currentStep].additionalContent}>
        </ClaimPanel>
      {:else}
        <div class={rowClass}>Visit your own profile to claim your rewards.</div>
      {/if}
    </div>
  {:else}
    <div class={rowClass}>
      <img alt="loading" src="/blobby/sad_blobby.svg" class="w-[150px] h-[150px] mb-[24px]" />
      <span>The claim period has ended.</span>
    </div>
  {/if}
</div>
