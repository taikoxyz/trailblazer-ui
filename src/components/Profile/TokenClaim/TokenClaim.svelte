<script lang="ts">
  import { ActionButton } from '$components/Button';
  import { Spinner } from '$components/Spinner';
  import { classNames } from '$libs/util/classNames';

  const wrapperClasses = classNames('flex', 'flex-col', 'items-center', 'justify-center', 'px-[216px]', 'py-[100px]');

  const contentWrapperClasses = classNames(
    'gap-[40px]',
    'max-w-[500px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
  );

  const textWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'gap-[24px]');

  const titleClasses = classNames(
    'text-[#F3F3F3]',
    'text-[35px]/[42px]',
    'font-[500]',
    'font-clash-grotesk',
    'px-[90px]',
    'text-center',
  );
  const contentClasses = classNames('px-[50px]', 'text-[#ADB1B8]', 'text-[16px]/[24px]', 'text-center');

  $: amountCalculated = false;
  $: claimableAmount = -1;
  $: termsAccepted = false;
  $: isLoading = false;

  async function getClaimableTokens() {
    if (amountCalculated) return;

    isLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    claimableAmount = 123;
    amountCalculated = true;
    isLoading = false;
  }

  const linkClasses = classNames('underline', 'text-[#FF6FC8]', 'hover:text-primary');

  const checkboxWrapperClasses = classNames('form-control', 'pt-[24px]');
  const checkboxLabelClasses = classNames('cursor-pointer label');
  const checkboxClasses = classNames('checkbox', 'checkbox-primary', 'bg-black', 'bg-opacity-50');

  const rewardInputClasses = classNames(
    'p-[10px]',
    'pl-[20px]',
    'rounded-full',
    'w-full',
    'bg-[#0B101B]',
    'flex',
    'justify-between',
    'items-center',
  );

  const rewardInputLabelClasses = classNames('text-[#F3F3F3]', 'text-[16px]/[24px]');
  const rewardInputValueWrapperClasses = classNames(
    'bg-[#2B303B]',
    'rounded-full',
    'text-[#F3F3F3]',
    'py-[10px]',
    'px-[16px]',
    'text-[22px]/[28px]',
    'uppercase',
    'font-[700]',
    'flex',
    'items-center',
    'justify-center',
    'w-max',
    'gap-[8px]',
  );

  $: isClaimComplete = false;
  $: isClaimSuccessful = false;

  async function executeClaim() {
    isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoading = false;
    isClaimComplete = true;
    isClaimSuccessful = true;
  }

  const iconClasses = classNames('w-[150px]', 'h-[150px]');

  function tryAgain() {
    // reset entire form
    isClaimComplete = false;
    isClaimSuccessful = false;
    amountCalculated = false;
    claimableAmount = -1;
  }

  const termsUrl = 'https://taiko.xyz';
</script>

<div class={wrapperClasses}>
  <div class={contentWrapperClasses}>
    {#if isLoading}
      <Spinner size="lg" />
    {:else}
      {#if isClaimComplete}
        {#if isClaimSuccessful}
          <img class={iconClasses} alt="Success" src="/success.svg" />
        {:else}
          <img class={iconClasses} alt="Error" src="/not-eligible.png" />
        {/if}
      {:else}
        <img class={iconClasses} alt="Coin" src="/coin.svg" />
      {/if}

      <div class={textWrapperClasses}>
        <div class={titleClasses}>
          {#if isClaimComplete}
            {#if isClaimSuccessful}
              Claim Successful
            {:else}
              Claim Unsuccessful
            {/if}
          {:else}
            Are you ready to claim your tokens?
          {/if}
        </div>

        <div class={contentClasses}>
          {#if isClaimComplete}
            {#if isClaimSuccessful}
              Congratulations! You've successfully claimed your tokens. You can now add them to your wallet. Select 'Add
              to Wallet' below to complete the process.
            {:else}
              Your attempt to claim the tokens was not successful. Try claiming your tokens again when you are ready.
            {/if}
          {:else if amountCalculated}
            By confirming your claim, you agree to the <a href={termsUrl} class={linkClasses}>terms and conditions</a>
            of the token distribution and authorize the transfer of tokens directly to your wallet.

            <div class={checkboxWrapperClasses}>
              <label class={checkboxLabelClasses}>
                <input type="checkbox" bind:checked={termsAccepted} class={checkboxClasses} />
                <span>I agree to the terms and conditions mentioned above.</span>
              </label>
            </div>
          {:else}
            You are eligible to claim the token. Click to review your token amount and proceed with your claim.
          {/if}
        </div>
      </div>

      {#if amountCalculated}
        <div class={rewardInputClasses}>
          <div class={rewardInputLabelClasses}>
            {#if isClaimSuccessful}
              You have claimed
            {:else}
              You will receive
            {/if}
          </div>
          <div class={rewardInputValueWrapperClasses}>
            <img alt="TKO Icon" src="/tko-icon.svg" />
            <div>
              {claimableAmount} TAIKO
            </div>
          </div>
        </div>

        {#if !isClaimComplete || isClaimSuccessful}
          <ActionButton disabled={!termsAccepted || isClaimComplete} on:click={executeClaim} priority="primary">
            {#if isClaimComplete}
              Claimed
            {:else}
              Claim now
            {/if}
          </ActionButton>
        {/if}

        {#if isClaimComplete}
          {#if isClaimSuccessful}
            <ActionButton on:click={() => alert('unimplemented')} priority="secondary">Add a wallet</ActionButton>
          {:else}
            <ActionButton on:click={tryAgain} priority="secondary">Try again</ActionButton>
          {/if}{/if}
      {:else}
        <ActionButton on:click={getClaimableTokens} priority="primary">Review amount</ActionButton>
      {/if}
    {/if}
  </div>
</div>
