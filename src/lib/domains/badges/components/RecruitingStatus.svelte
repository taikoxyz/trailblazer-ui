<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { Spinner } from '$shared/components';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { currentCycleStore, currentRecruitmentStore, influenceRecruitmentModal } from '$shared/stores/recruitment';
  import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';

  export let badge: TBBadge;

  $: recruitment = $currentRecruitmentStore as ActiveRecruitment | null;
  let activeCycle: number = $currentCycleStore || -1;

  const updateStatus: () => void = getContext('badgeRecruitUpdate');

  const buttonClasses = classNames();

  const rowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full', 'my-[8px]');

  let loading = false;

  const unsubscribeRecruitment = currentRecruitmentStore.subscribe((value) => {
    recruitment = value;
    updateStatus();
  });

  const unsubscribeCurrentCycle = currentCycleStore.subscribe((value) => {
    if (value) activeCycle = value;
    updateStatus();
  });

  onDestroy(() => {
    unsubscribeRecruitment();
    unsubscribeCurrentCycle();
  });

  const handleButtonClick = () => {
    if (status === RecruitmentStatus.UNFINISHED && recruitment) reset(recruitment);
    if (status === RecruitmentStatus.CAN_CLAIM && $currentRecruitmentStore) claim($currentRecruitmentStore);
    if (status === RecruitmentStatus.NOT_STARTED) recruit(badge);
    if (status === RecruitmentStatus.CAN_REFINE) {
      $influenceRecruitmentModal = true;
    }
  };

  const recruit: (badge: TBBadge) => void = getContext('badgeRecruitRecruit');
  const claim: (recruitment: ActiveRecruitment) => void = getContext('badgeRecruitClaim');
  const reset: (recruitment: ActiveRecruitment) => void = getContext('badgeRecruitReset');

  $: status = recruitment?.status || RecruitmentStatus.NOT_STARTED;

  $: isCurrentRecruitment = $currentRecruitmentStore && $currentRecruitmentStore?.badge?.tokenId === badge.tokenId;

  $: recruitmentFinished = status === RecruitmentStatus.COMPLETED;

  $: influencing = $currentRecruitmentStore?.cooldowns.influence
    ? $currentRecruitmentStore.cooldowns.influence > new Date()
    : false;

  $: recruiting = $currentRecruitmentStore?.cooldowns.claim
    ? $currentRecruitmentStore.cooldowns.claim > new Date()
    : false;

  $: canClaim = isCurrentRecruitment && status === RecruitmentStatus.CAN_CLAIM;

  $: isRecruitingAnotherBadge =
    ($currentRecruitmentStore && recruiting) ||
    ($currentRecruitmentStore && status === RecruitmentStatus.CAN_CLAIM && !isCurrentRecruitment);

  $: alreadyRecruitedThisSeason =
    status === RecruitmentStatus.LOCKED ||
    status === RecruitmentStatus.COMPLETED ||
    status === RecruitmentStatus.ALREADY_RECRUITED;

  $: canRecruit = status === RecruitmentStatus.NOT_STARTED && !recruitmentFinished;

  $: isRefining = status === RecruitmentStatus.REFINING && $currentRecruitmentStore?.cooldowns.influence && influencing;

  $: canRefine = status === RecruitmentStatus.CAN_REFINE && isCurrentRecruitment && !recruitmentFinished;
  $: disableInfluence = recruiting && influencing;

  $: resettable = status === RecruitmentStatus.UNFINISHED;

  onMount(() => {
    updateStatus();
  });
</script>

{#if loading}
  <ActionButton class={buttonClasses} priority="primary" disabled={true}><Spinner /></ActionButton>
{:else if resettable}
  <ActionButton class={buttonClasses} priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.reset')}</ActionButton>
{:else if isRecruitingAnotherBadge}
  <ActionButton class={buttonClasses} priority="primary" disabled={true}
    >{$t('badge_recruitment.buttons.ongoing_recruitment')}</ActionButton>
{:else if alreadyRecruitedThisSeason}
  <ActionButton class={buttonClasses} priority="primary" disabled={true}
    >{$t('badge_recruitment.buttons.already_recruited')}</ActionButton>
{:else if canClaim}
  <ActionButton class={buttonClasses} priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.end_recruitment')}</ActionButton>
{:else if canRefine}
  <ActionButton class={buttonClasses} priority="fancy" disabled={disableInfluence} on:click={handleButtonClick}>
    {$t('badge_recruitment.buttons.influence')}
  </ActionButton>
{:else if canRecruit && !influencing}
  <ActionButton class={buttonClasses} priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.start_recruitment')}</ActionButton>
{:else if influencing}
  <div class="f-col">
    <ActionButton
      class={buttonClasses}
      priority="fancy"
      disabled={true}
      loading={disableInfluence}
      on:click={handleButtonClick}>
      Influencing...
    </ActionButton>
  </div>
{/if}

<br />
<br />

{#if isDevelopmentEnv}
  <h1>
    Debug info
    <span class="text-sm"> (to be removed)</span>
  </h1>

  canClaim {canClaim}

  <div class={rowClasses}>
    <span class="text-secondary-content">recruiting</span>
    <span> {recruiting}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">isCurrentRecruitment</span>
    <span>{isCurrentRecruitment}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">recruitmentFinished</span>
    <span>{recruitmentFinished}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">recruiting && !isCurrentRecruitment</span>
    <span>{recruiting && !isCurrentRecruitment}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">alreadyRecruitedThisSeason</span>
    <span>{alreadyRecruitedThisSeason}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">!recruitmentFinished && !isCurrentRecruitment</span>
    <span>{!recruitmentFinished && !isCurrentRecruitment}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">{$t('common.status')}</span>
    <span>{status}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">Influencing</span>
    <span>{influencing ? 'Yes' : 'No'}</span>
  </div>

  isRefining {isRefining}

  <div class={rowClasses}>
    <span class="text-secondary-content">Recruiting</span>
    <span>{recruiting ? 'Yes' : 'No'}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">Cycle</span>
    <span>{activeCycle}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content"> cooldowns.claim</span>
    <span>{$currentRecruitmentStore?.cooldowns.claim}</span>
  </div>

  <div class={rowClasses}>
    <span class="text-secondary-content">cooldowns.influence</span>
    <span>{$currentRecruitmentStore?.cooldowns.influence}</span>
  </div>

  <textarea class="w-full h-[200px]">{JSON.stringify(badge, null, 2)}</textarea>
  <textarea class="w-full h-[200px]">{JSON.stringify($currentRecruitmentStore, null, 2)}</textarea>
{/if}
