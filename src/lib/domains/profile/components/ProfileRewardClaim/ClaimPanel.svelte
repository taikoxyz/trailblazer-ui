<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { ActionButton } from '$components/Button';
  import { Spinner } from '$components/Spinner';
  import { classNames } from '$libs/util/classNames';

  import type { IClaimAmount, IClaimButton, IClaimPanelType } from './types';

  const contentWrapperClasses = classNames(
    'gap-[40px]',
    'max-w-[500px]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
  );

  const textWrapperClasses = classNames('w-full', 'flex', 'flex-col', 'gap-[24px]', 'items-center');

  const titleClasses = classNames(
    'text-[#F3F3F3]',
    'text-[35px]/[42px]',
    'font-[500]',
    'md:max-w-[316px]',
    'font-clash-grotesk',
    'text-center',
  );
  const contentClasses = classNames(
    'text-[#ADB1B8]',
    'w-[294px]',
    'md:w-[392px]',
    ' xl:w-[412px]',
    'text-secondary-content',
    'font-weight-[400]',
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

  const iconClasses = classNames('w-[150px]', 'h-[150px]');

  export let loading = false;
  export let type: IClaimPanelType = 'claim';

  export let title: string;
  export let text: string;

  export let amount: IClaimAmount | null = null;
  export let button: IClaimButton = { priority: 'primary', label: 'Claim now' };

  export let disableButton: boolean = false;

  const dispatch = createEventDispatcher();

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
</script>

<div class={contentWrapperClasses}>
  {#if loading}
    <Spinner size="lg" />
  {:else}
    {#if type === 'claim'}
      <img class={iconClasses} alt="Coin" src="/coin.svg" />
    {/if}
    {#if type === 'success'}
      <img class={iconClasses} alt="Success" src="/success.svg" />
    {/if}
    {#if type === 'error'}
      <img class={iconClasses} alt="Error" src="/not-eligible.png" />
    {/if}

    <div class={textWrapperClasses}>
      <div class={titleClasses}>
        {title}
      </div>

      <div class={contentClasses}>
        {text}
        <slot />
      </div>
    </div>

    {#if amount}
      <div class={rewardInputClasses}>
        <div class={rewardInputLabelClasses}>
          {amount.label}
        </div>
        <div class={rewardInputValueWrapperClasses}>
          <img alt="TKO Icon" src="/tko-icon.svg" />
          <div>
            {numberWithCommas(amount.value)} TAIKO
          </div>
        </div>
      </div>
    {/if}

    <ActionButton on:click={() => dispatch('click')} disabled={disableButton} priority={button.priority}
      >{button.label}</ActionButton>
  {/if}
</div>
