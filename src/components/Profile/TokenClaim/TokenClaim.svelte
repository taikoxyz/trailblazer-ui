<script lang="ts">
  import { t } from 'svelte-i18n';

  import { Spinner } from '$components/Spinner';
  import TokenClaim from '$libs/token-claim';
  import { classNames } from '$libs/util/classNames';
  import { account } from '$stores/account';
  import { tokenClaimTermsAccepted } from '$stores/tokenClaim';

  import ClaimPanel from './ClaimPanel.svelte';
  import { type IClaimButton, type IClaimPanelType } from './types';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center', 'px-[216px]', 'py-[100px]');

  const linkClasses = classNames('underline', 'text-[#FF6FC8]', 'hover:text-primary');
  const checkboxWrapperClasses = classNames('form-control', 'pt-[24px]');
  const checkboxLabelClasses = classNames('cursor-pointer label');
  const checkboxClasses = classNames('checkbox', 'checkbox-primary', 'bg-black', 'bg-opacity-50');

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
</script>

<div class={wrapperClasses}>
  {#if isLoading}
    <Spinner size="lg" />
  {:else}
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
  {/if}
</div>
