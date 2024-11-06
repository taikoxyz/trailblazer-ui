<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import type { Address } from 'viem';
  import { getAddress } from 'viem';

  import { page } from '$app/stores';
  import { userProfile } from '$lib/domains/profile/stores/';
  import { Spinner } from '$shared/components/Spinner';
  import { account } from '$shared/stores/account';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { pendingTransactions } from '$shared/stores/pendingTransactions';
  import { tokenClaimTermsAccepted } from '$shared/stores/tokenClaim';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import TokenClaim from '$shared/utils/token-claim';
  import watchAsset from '$shared/utils/token-claim/watchAsset';

  import profileService from '../../services/ProfileServiceInstance';
  import ClaimPanel from './ClaimPanel.svelte';
  import { type IClaimButton, type IClaimPanelType } from './types';

  const linkClasses = classNames('underline', 'text-[#FF6FC8]', 'hover:text-primary');
  const checkboxWrapperClasses = classNames('form-control', 'pt-[24px]');
  const checkboxLabelClasses = classNames(
    'cursor-pointer',
    'flex',
    'flex-col',
    'gap-[5px]',
    'md:flex-row',
    'md:gap-0',
    'label',
    'font-[400]',
  );
  const checkboxClasses = classNames('checkbox', 'checkbox-primary', 'bg-black', 'bg-opacity-50');

  $: isLoading = false;
  $: currentStep = 0;
  $: claimAmount = -1;
  $: claimLabel = '';
  $: claimProof = '';
  $: isClaimSuccessful = false;

  $: isBlacklisted = $userProfile?.personalInfo?.blacklisted || false;

  let isSelfProfile = false;

  onMount(() => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());

    if (isSelfProfile) {
      profileService.getBlacklistStatus(urlAddress, $activeSeason).then((result) => {
        isBlacklisted = result;
      });
      TokenClaim.hasClaimed(urlAddress).then(async (hasClaimed) => {
        if (hasClaimed) {
          currentStep = 2;
          isClaimSuccessful = true;
          claimLabel = 'You have claimed';
          const { value, proof } = await TokenClaim.preflight(urlAddress);
          claimAmount = value;
          claimProof = proof;
        }
      });
    }
  });

  async function handlePanelButtonClick() {
    if (!$account || !$account.address) return;
    const address = $account.address;
    if (currentStep === 0) {
      isLoading = true;
      const { value, proof } = await TokenClaim.preflight(address);
      claimAmount = value;
      claimProof = proof;
      claimLabel = 'You will receive';
      isLoading = false;
    }

    if (currentStep === 1) {
      isLoading = true;
      try {
        await TokenClaim.claim(address, claimAmount, claimProof);
        currentStep = 2;
        claimLabel = 'You have claimed';
        isClaimSuccessful = true;
      } catch (e) {
        console.error(e);
        currentStep = 3;
      } finally {
        isLoading = false;
      }

      return;
    }

    if (currentStep === 3) {
      currentStep = 0;
      return;
    }
    currentStep += 1;
  }

  const panels = [
    {
      title: $t('claim.panels.review.title'),
      text: $t('claim.panels.review.text'),
      type: 'claim' as IClaimPanelType,

      buttons: [
        {
          priority: 'primary',
          label: $t('claim.panels.review.button'),
          handler: async () => {
            if (!$account || !$account.address) return;
            const address = $account.address;
            // load claim amount
            isLoading = true;
            const { value, proof } = await TokenClaim.preflight(address);
            claimAmount = value;
            claimProof = proof;
            claimLabel = 'You will receive';
            isLoading = false;

            currentStep += 1;
          },
        } satisfies IClaimButton,
      ],
    },
    {
      title: $t('claim.panels.claim.title'),
      type: 'prepare' as IClaimPanelType,

      buttons: [
        {
          priority: 'primary',
          label: $t('claim.panels.claim.button'),
          handler: async () => {
            if (!$account || !$account.address) return;
            const address = $account.address;
            // make the actual claim call
            isLoading = true;
            try {
              await TokenClaim.claim(address, claimAmount, claimProof);
              currentStep = 2; // success
              claimLabel = 'You have claimed';
              isClaimSuccessful = true;
            } catch (e) {
              console.error(e);
              currentStep = 3; // error
            } finally {
              isLoading = false;
            }
          },
        } satisfies IClaimButton,
      ],
    },
    {
      title: $t('claim.panels.success.title'),
      text: $t('claim.panels.success.text'),
      type: 'success' as IClaimPanelType,
      buttons: [
        {
          priority: 'secondary',
          label: $t('claim.panels.success.buttons.0'),
          handler: async () => {
            await watchAsset();
          },
        } satisfies IClaimButton,
        {
          priority: 'tertiary',
          label: $t('claim.panels.success.buttons.1'),
          handler: () => {
            window.location.hash = '#lockdown';
          },
        } satisfies IClaimButton,
      ],
    },
    {
      title: $t('claim.panels.error.title'),
      text: $t('claim.panels.error.text'),
      type: 'error' as IClaimPanelType,
      buttons: [
        {
          priority: 'secondary',
          label: $t('claim.panels.error.button'),
          handler: () => {
            currentStep = 0;
          },
        } satisfies IClaimButton,
      ],
    },
  ];

  const termsUrl = 'https://www.notion.so/taikoxyz/Legal-Disclaimer-89047a75cb0948f8833032f3467660c4';
  const containerClass = classNames(
    'container',
    'w-full',
    'bg-elevated-background',
    'xl:max-w-[1344px]',
    'sm:rounded-b-[30px]',
    'rounded-t-[30px]',
    'md:rounded-tl-none',
    'rounded-[30px]',
    'relative',
  );

  const rowClass = classNames(
    'relative',
    'items-center',
    'gap-x-[26px]',
    'items-center',
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
</script>

<div class={containerClass}>
  <div class={rowClass}>
    {#if isBlacklisted}
      <div class="text-center space-y-[15px]">
        <h1 class="text-3xl font-bold">You have been blacklisted</h1>
        <p class="text-lg">You will not be able to claim.</p>
      </div>
    {:else if isLoading || $pendingTransactions.length > 0}
      <Spinner size="lg" />
    {:else if isSelfProfile}
      <ClaimPanel
        disableButton={(currentStep === 1 && !$tokenClaimTermsAccepted) ||
          claimAmount === 0 ||
          (currentStep === 2 && !isClaimSuccessful)}
        title={panels[currentStep].title}
        amount={currentStep > 0 ? { value: claimAmount, label: claimLabel } : null}
        text={panels[currentStep].text || ''}
        type={panels[currentStep].type}
        buttons={panels[currentStep].buttons}
        on:click={handlePanelButtonClick}>
        {#if currentStep === 1}
          By confirming your claim, you agree to the <a href={termsUrl} target="_blank" class={linkClasses}
            >terms and conditions</a>
          of the token distribution and authorize the transfer of tokens directly to your wallet.

          <div class={checkboxWrapperClasses}>
            <label class={checkboxLabelClasses}>
              <input type="checkbox" bind:checked={$tokenClaimTermsAccepted} class={checkboxClasses} />
              <span>{$t('claim.terms_agree')}</span>
            </label>
          </div>
        {/if}
      </ClaimPanel>
    {:else if !isSelfProfile}
      Visit your own profile to claim your rewards.
    {/if}
  </div>
</div>
