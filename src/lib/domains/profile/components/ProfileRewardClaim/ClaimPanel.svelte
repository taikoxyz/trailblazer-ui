<script lang="ts">
  import { ActionButton } from '$shared/components/Button';
  import { classNames } from '$shared/utils/classNames';

  import ClaimTerms from './ClaimTerms.svelte';
  import { ClaimStates, type IClaimButton } from './types';

  export let loading: boolean = false;
  export let state: ClaimStates = ClaimStates.START;
  export let title: string;
  export let text: string;
  export let amount: number | null = null;
  export let buttons: IClaimButton[] = [];
  export let disableButton: boolean = false;
  export let additionalContent: { type: string; component?: string } | null = null;

  const contentWrapperClasses = classNames(
    'gap-[40px]',
    'max-w-[500px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'h-max',
    'z-10',
  );

  const textWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'gap-[24px]', 'items-center');

  const titleClasses = classNames(
    'text-primary-content',
    'text-[35px]/[42px]',
    'font-[500]',
    'md:max-w-[392px]',
    'font-clash-grotesk',
    'text-center',
  );
  const contentClasses = classNames(
    'text-secondary-content',
    'w-[294px]',
    'md:w-[494px]',
    'xl:w-[412px]',
    'font-[400]',
    'text-[16px]/[24px]',
    'text-center',
  );

  const rewardInputClasses = classNames(
    'p-[10px]',
    'pl-[20px]',
    'rounded-full',
    'w-full',
    'bg-[#0B101B]',
    'flex',
    'md:flex-row',
    'justify-between',
    'items-center',
    'flex-col',
    'gap-[5px]',
    'md:gap-0',
  );

  const rewardInputValueWrapperClasses = classNames(
    'md:bg-[#2B303B]',
    'rounded-full',
    'text-primary-content',
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

  const buttonsWrapperClasses = classNames('flex', 'flex-col', 'gap-[16px]', 'w-full');

  const iconClasses = classNames('w-[150px]', 'h-[150px]');

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
</script>

<div class={contentWrapperClasses}>
  {#if loading}
    Test
  {:else if amount && amount === 0}
    <img class={iconClasses} alt="Error" src="/claim/claim-error.png" />
    <div class={textWrapperClasses}>
      <div class={titleClasses}>{title}</div>
      <div class={contentClasses}>
        {text}
        <slot />
      </div>
    </div>
  {:else}
    {#if state === ClaimStates.START}
      <img class={iconClasses} alt="Coin" src="/coin.svg" />
    {:else if state === ClaimStates.CLAIM}
      <img class={iconClasses} alt="Coin" src="/blobby/happy_blobby.svg" />
    {:else if state === ClaimStates.INELIGIBLE}
      <img class={iconClasses} alt="Not eligible" src="/blobby/sad_blobby.svg" />
    {:else if state === ClaimStates.SUCCESS}
      <img class={iconClasses} alt="Success" src="/success.svg" />
    {:else if state === ClaimStates.ERROR_CLAIM || state === ClaimStates.ERROR_GENERIC}
      <img class={iconClasses} alt="Error" src="/claim/claim-error.png" />
    {/if}

    <div class={textWrapperClasses}>
      <div class={titleClasses}>{title}</div>
      <div class={contentClasses}>
        {#if state === ClaimStates.CLAIM && loading}
          Claiming
        {/if}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html text}
        <slot />
      </div>
    </div>
    {#if additionalContent && additionalContent.type === 'component' && additionalContent.component === 'ClaimTerms'}
      <ClaimTerms />
    {/if}
    {#if amount}
      <div class={rewardInputClasses}>
        <span class="text-base font-normal">
          {#if ClaimStates.SUCCESS === state}
            You have claimed
          {:else}
            You will receive
          {/if}
        </span>
        <div class={rewardInputValueWrapperClasses}>
          <img alt="TAIKO Icon" src="/tko-icon.svg" />
          <div>{numberWithCommas(amount)} TAIKO</div>
        </div>
      </div>
    {/if}

    <div class={buttonsWrapperClasses}>
      {#each buttons as button}
        <ActionButton on:click={button.handler} disabled={disableButton} priority={button.priority}>
          {button.label}
        </ActionButton>
      {/each}
    </div>
  {/if}
</div>
