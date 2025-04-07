<script lang="ts">
  import { Spinner } from '$shared/components';
  import { ActionButton } from '$shared/components/Button';
  import { classNames } from '$shared/utils/classNames';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import getTaikoStatus from '$shared/utils/taiko-status/getTaikoStatus';
  import { getTaikoStatusNextRank } from '$shared/utils/taiko-status/getTaikoStatusNextRank';
  import { getTaikoStatusRankBackgroundColorCss } from '$shared/utils/taiko-status/getTaikoStatusRankBackgroundColor';
  import { getTaikoStatusRankIcon } from '$shared/utils/taiko-status/getTaikoStatusRankIcon';
  import { getTaikoStatusRankName } from '$shared/utils/taiko-status/rankName';
  import { formatTaikoStatusPoints, getTaikoStatusPointsToNextRank } from '$shared/utils/taiko-status/rankPoints';
  import { RanksToPoints, StatusRank } from '$shared/utils/taiko-status/types';

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
    'bg-grey-800',
    'text-grey-200',
    'flex',
    'md:flex-row',
    'justify-between',
    'items-center',
    'flex-col',
    'gap-[5px]',
    'md:gap-0',
  );

  const rewardInputValueWrapperClasses = classNames(
    'md:bg-grey-700',
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

  const taikoStatusBadgeClasses = classNames(
    'rounded-full',
    'flex',
    'gap-[8px]',
    'text-grey-10',
    'bg-grey-700',
    'py-[10px]',
    'px-[16px]',
    'font-[700]',
    'text-[22px]/[28px]',
  );

  const buttonsWrapperClasses = classNames('flex', 'flex-col', 'gap-[16px]', 'w-full');

  const iconClasses = classNames('w-[150px]', 'h-[150px]');

  const statusProgressWrapperClasses = classNames(
    'w-full',
    'flex',
    'flex-col',
    'bg-grey-800',
    'gap-[16px]',
    'rounded-[30px]',
    'py-[30px]',
    'px-[24px]',
  );

  const statusProgressLabelClasses = classNames(
    'font-[700]',
    'text-[16px]/[24px]',
    'w-full',
    'flex',
    'justify-between',
    'text-grey-200',
  );

  const taikoStatusProgressClasses = classNames('progress', 'w-full', 'progress-primary', 'h-[16px]');
  function numberWithCommas(x: number): string {
    const [integer, decimal] = x.toString().split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  }
  let statusRank: StatusRank = StatusRank.None;
  let statusPoints: number = 0;
  let statusPointsToNextRank: number = 0;
  let statusNextRank = StatusRank.Bronze;
  let statusPointsNextThreshold: number = 0;
  async function loadTaikoStatus() {
    if (state !== ClaimStates.SUCCESS) return;
    const address = getConnectedAddress();
    const { rank, points } = await getTaikoStatus(address);

    statusRank = rank;
    statusPoints = points;
    statusPointsToNextRank = getTaikoStatusPointsToNextRank(statusPoints);
    statusNextRank = getTaikoStatusNextRank(statusPoints);
    statusPointsNextThreshold = RanksToPoints[statusNextRank];
  }

  $: state, loadTaikoStatus();
</script>

<div class={contentWrapperClasses}>
  {#if loading}
    <Spinner />
  {:else if amount && amount === 0}
    <img class={iconClasses} alt="Error" src="/error/error.png" />
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
      <img class={iconClasses} alt="Success" src="/blobby/success_blobby.gif" />
    {:else if state === ClaimStates.ERROR_CLAIM || state === ClaimStates.ERROR_GENERIC || state === ClaimStates.ERROR_TIMEOUT}
      <img class={iconClasses} alt="Error" src="/error/error.png" />
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
      <div class="w-full flex flex-col gap-[8px]">
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

        {#if ClaimStates.SUCCESS === state}
          <div class={rewardInputClasses}>
            Your Taiko Status

            <div class={taikoStatusBadgeClasses}>
              <img src={getTaikoStatusRankIcon(statusPoints)} alt={statusRank} />
              <span>{getTaikoStatusRankName(statusPoints)}</span>
            </div>
          </div>

          <div class={statusProgressWrapperClasses}>
            <div class={statusProgressLabelClasses}>
              <div>Status Progress</div>
              <div>{getTaikoStatusRankName(statusPointsNextThreshold)}</div>
            </div>
            <progress class={taikoStatusProgressClasses} value={statusPoints} max={statusPointsNextThreshold} />
            <div class="text-grey-500">
              {formatTaikoStatusPoints(statusPoints)} / {formatTaikoStatusPoints(statusPointsNextThreshold)}
            </div>
          </div>
        {/if}
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
