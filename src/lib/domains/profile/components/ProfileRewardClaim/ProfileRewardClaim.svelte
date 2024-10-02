<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';
  import type { Address } from 'viem';
  import { getAddress } from 'viem';

  import { page } from '$app/stores';
  import { Spinner } from '$components/Spinner';
  import { PUBLIC_CLAIMING_ACTIVE } from '$env/static/public';
  import TokenClaim from '$libs/token-claim';
  import { classNames } from '$libs/util/classNames';
  import getConnectedAddress from '$libs/util/getConnectedAddress';
  import { account } from '$stores/account';
  import { tokenClaimTermsAccepted } from '$stores/tokenClaim';

  import ClaimPanel from './ClaimPanel.svelte';
  import { type IClaimButton, type IClaimPanelType } from './types';

  const linkClasses = classNames('underline', 'text-[#FF6FC8]', 'hover:text-primary');
  const checkboxWrapperClasses = classNames('form-control', 'pt-[24px]');
  const checkboxLabelClasses = classNames('cursor-pointer label');
  const checkboxClasses = classNames('checkbox', 'checkbox-primary', 'bg-black', 'bg-opacity-50');

  const claimingActive = PUBLIC_CLAIMING_ACTIVE === 'true' || false;

  $: isLoading = false;

  $: currentStep = 0;
  $: claimAmount = -1;
  $: claimLabel = '';
  $: claimProof = '';
  $: isClaimSuccessful = false;

  async function handlePanelButtonClick() {
    if (!$account || !$account.address) return;
    const address = $account.address;
    if (currentStep === 0) {
      // load claim amount
      isLoading = true;
      const { value, proof } = await TokenClaim.preflight(address);
      claimAmount = value;
      claimProof = proof;
      claimLabel = 'You will receive';
      isLoading = false;
    }

    if (currentStep === 1) {
      // make the actual claim call
      isLoading = true;
      try {
        await TokenClaim.claim(address, claimAmount, claimProof);
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        currentStep = 2; // success
        claimLabel = 'You have claimed';
        isClaimSuccessful = true;
      } catch (e) {
        console.error(e);
        currentStep = 3; // error
      } finally {
        isLoading = false;
      }

      return;
    }

    if (currentStep === 3) {
      // error, retry
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
      button: {
        priority: 'primary',
        label: $t('claim.panels.review.button'),
      } satisfies IClaimButton,
    },
    {
      title: $t('claim.panels.claim.title'),
      type: 'claim' as IClaimPanelType,
      button: {
        priority: 'primary',
        label: $t('claim.panels.claim.button'),
      } satisfies IClaimButton,
    },
    {
      title: $t('claim.panels.success.title'),
      text: $t('claim.panels.success.text'),
      type: 'success' as IClaimPanelType,
      button: {
        priority: 'primary',
        label: $t('claim.panels.success.button'),
      } satisfies IClaimButton,
    },
    {
      title: $t('claim.panels.error.title'),
      text: $t('claim.panels.error.text'),
      type: 'error' as IClaimPanelType,
      button: {
        priority: 'secondary',
        label: $t('claim.panels.error.button'),
      } satisfies IClaimButton,
    },
  ];

  const termsUrl = 'https://taiko.xyz';
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
    'grid',
    'items-center',
    'gap-x-[26px]',
    'justify-center',
    'xl:h-[800px]',
    'md:h-[642px]',
    'h-[708px]',
    'px-[16px]',
    'pt-[34px]',
    'md:px-[47px]',
    'body-bold',
    'text-sm',
  );
  let isSelfProfile = false;
  onMount(async () => {
    const urlAddress = $page.url.pathname.split('/').pop() as Address;
    isSelfProfile = getAddress(urlAddress) === getAddress(getConnectedAddress());
  });
</script>

<div class={containerClass}>
  <div class={rowClass}>
    {#if isLoading}
      <Spinner size="lg" />
    {:else if isSelfProfile && claimingActive}
      <ClaimPanel
        disableButton={(currentStep === 1 && !$tokenClaimTermsAccepted) ||
          claimAmount === 0 ||
          (currentStep === 2 && isClaimSuccessful)}
        title={panels[currentStep].title}
        amount={currentStep > 0 ? { value: claimAmount, label: claimLabel } : null}
        text={panels[currentStep].text || ''}
        type={panels[currentStep].type}
        button={panels[currentStep].button}
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
    {:else if !isSelfProfile && claimingActive}
      Visit your own profile to claim your rewards.
    {:else}
      Currently no claiming active. Check back soon!
    {/if}
  </div>
</div>
