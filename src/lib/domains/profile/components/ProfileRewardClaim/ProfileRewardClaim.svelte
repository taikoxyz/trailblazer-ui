<script lang="ts">
  import { onMount } from 'svelte';
  import type { Address } from 'viem';
  import { getAddress } from 'viem';

  import { goto } from '$app/navigation';
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
  import { errorToast } from '$shared/components/NotificationToast';
  import { Spinner } from '$shared/components/Spinner';
  import { account } from '$shared/stores/account';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { pendingTransactions } from '$shared/stores/pendingTransactions';
  import { tokenClaimTermsAccepted } from '$shared/stores/tokenClaim';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import profileService from '../../services/ProfileServiceInstance';
  import ClaimPanel from './ClaimPanel.svelte';
  import { getPanels } from './claimpanels';
  import { type ClaimPanelType, ClaimStates } from './types';

  const containerClass = classNames(
    'container',
    'w-full',
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

  let panels: Record<ClaimStates, ClaimPanelType> = {} as Record<ClaimStates, ClaimPanelType>;

  const claimingLive = PUBLIC_CLAIMING_ACTIVE === 'true';

  $: panels = getPanels();

  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile.set(getAddress(urlAddress) === getAddress(getConnectedAddress()));

    if ($isSelfProfile) {
      const blacklistStatus = await profileService.getBlacklistStatus(urlAddress, $activeSeason);
      isBlacklisted.set(blacklistStatus);

      const hasClaimed = await claimServiceInstance.hasClaimed(urlAddress, $activeSeason);
      if (hasClaimed) {
        currentStep.set(ClaimStates.SUCCESS);
        isClaimSuccessful.set(true);
        claimLabel.set('You have claimed');
        // we need to go back 1 season as the current season is not claimable yet
        const { value, proof } = await claimServiceInstance.preflight(urlAddress, $activeSeason - 1);
        claimAmount.set(value);
        claimProof.set(proof);
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
          currentStep.set(ClaimStates.ERROR);
        } else if (value === 0) {
          currentStep.set(ClaimStates.INELIGIBLE);
        } else {
          currentStep.set(ClaimStates.CLAIM);
        }
      } catch (error) {
        console.error(error);
        currentStep.set(ClaimStates.ERROR);
      } finally {
        isLoading.set(false);
      }
    }

    if (state === ClaimStates.CLAIM) {
      isLoading.set(true);
      $tokenClaimTermsAccepted = false;
      try {
        await claimServiceInstance.claim(address, $claimAmount, $claimProof, $activeSeason);
        claimLabel.set('You have claimed');
        isClaimSuccessful.set(true);
        currentStep.set(ClaimStates.SUCCESS);
      } catch (e) {
        console.error(e);
        currentStep.set(ClaimStates.ERROR);
        errorToast({
          title: 'Error',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          message: (e as any).shortMessage || 'An error occurred while claiming.',
        });
      } finally {
        isLoading.set(false);
      }
    }

    if (state === ClaimStates.SUCCESS) {
      // Handle success buttons if needed
    }

    if (state === ClaimStates.ERROR) {
      currentStep.set(ClaimStates.START);
    }

    if (state === ClaimStates.INELIGIBLE) {
      currentStep.set(ClaimStates.INELIGIBLE);
      goto('/profile');
    }
  }

  $: disableButton = $currentStep === ClaimStates.CLAIM ? !$tokenClaimTermsAccepted : false;

  $: mappedButtons = panels[$currentStep].buttons.map((button) => ({
    ...button,
    handler: () => handlePanelButtonClick(panels[$currentStep].state),
  }));
</script>

<button class="btn btn-primary" on:click={() => currentStep.set(ClaimStates.START)}>reset</button>
state {$currentStep}

<div class={containerClass}>
  {#if claimingLive}
    <div class={rowClass}>
      {#if $isBlacklisted}
        <div class="text-center space-y-[15px]">
          <h1 class="text-3xl font-bold">You have been blacklisted</h1>
          <p class="text-lg">You will not be able to claim.</p>
        </div>
      {:else if $isLoading || $pendingTransactions.length > 0}
        <Spinner size="lg" />
      {:else if $isSelfProfile}
        <ClaimPanel
          {disableButton}
          title={panels[$currentStep].title}
          amount={$currentStep === ClaimStates.CLAIM ? $claimAmount : null}
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
    <div class={rowClass}>The claim period has ended.</div>
  {/if}
</div>
