<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';

  import { Spinner } from '$shared/components';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import {
    activeRecruitmentStore,
    currentCycleStore,
    currentRecruitmentStore,
    influenceRecruitmentModal,
  } from '$shared/stores/recruitment';
  import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';
  import { classNames } from '$shared/utils/classNames';
  import { isDevelopmentEnv } from '$shared/utils/isDevelopmentEnv';
  import { getLogger } from '$shared/utils/logger';

  import Countdown from './Countdown.svelte';

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;

  let loading = false;

  $: recruitment = null as ActiveRecruitment | null;
  let activeCycle: number = $currentCycleStore || -1;

  const countdownClasses = classNames(
    'flex',
    'gap-[5px]',
    'font-clash-grotesk',
    'text-[16px]',
    'font-[500]',
    'text-primary-content',
  );

  const buttonClasses = classNames('!min-h-[48px]', 'h-[48px]', 'my-4');

  const rowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full', 'my-[8px]');

  let updating = false;

  const updateStatus = async () => {
    if (updating || !recruitment) {
      log('Skipping update status for badge:', badge, recruitment);
      return;
    }
    const filter = $activeRecruitmentStore?.filter((r) => r.badge.tokenId === badge.tokenId)[0];
    if (!filter) {
      status = RecruitmentStatus.NOT_STARTED;
      log('No recruitment found for badge:', badge, status);
      return;
    }
    recruitment = filter;
    updating = true;
    loading = true;
    log('Updating status for badge:', badge, recruitment);
    const newStatus = await getRecruitmentStatus(recruitment, activeCycle);
    loading = false;
    updating = false;

    // Only update if status actually changed
    if (newStatus !== status) {
      status = newStatus;
      log('Status updated:', status, recruitment);
    }
  };

  let cooldownEnded = false;

  const handleCountdownEnd = () => {
    if (cooldownEnded) return;
    cooldownEnded = true;
    updateStatus();
  };

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

  $: if (badge) updateStatus();

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

  $: $influenceRecruitmentModal && updateStatus();

  $: isCurrentRecruitment = $currentRecruitmentStore && $currentRecruitmentStore?.badge?.tokenId === badge.tokenId;

  $: recruitmentFinished = status === RecruitmentStatus.COMPLETED;

  $: influencing = $currentRecruitmentStore?.cooldowns.influence
    ? $currentRecruitmentStore.cooldowns.influence > new Date()
    : false;

  $: recruiting = $currentRecruitmentStore?.cooldowns.claim
    ? $currentRecruitmentStore.cooldowns.claim > new Date()
    : false;

  $: $influenceRecruitmentModal && updateStatus();

  $: $currentRecruitmentStore?.cooldowns.claim && updateStatus();
  $: $currentRecruitmentStore?.cooldowns.influence && updateStatus();

  $: canClaim = isCurrentRecruitment && status === RecruitmentStatus.CAN_CLAIM;

  $: isRecruitingAnotherBadge = $currentRecruitmentStore && recruiting && !isCurrentRecruitment;

  $: alreadyRecruitedThisSeason =
    status === RecruitmentStatus.LOCKED ||
    status === RecruitmentStatus.COMPLETED ||
    status === RecruitmentStatus.ALREADY_RECRUITED;

  $: canRecruit = status === RecruitmentStatus.NOT_STARTED && !recruitmentFinished;

  $: isRefining = status === RecruitmentStatus.REFINING && $currentRecruitmentStore?.cooldowns.influence && influencing;

  $: canRefine = status === RecruitmentStatus.CAN_REFINE && isCurrentRecruitment && !recruitmentFinished;
  $: disableInfluence = recruiting && influencing;

  $: displayRecrutingCooldown =
    isCurrentRecruitment &&
    $currentRecruitmentStore?.cooldowns.claim &&
    (status === RecruitmentStatus.CAN_REFINE || status === RecruitmentStatus.REFINING);

  $: resettable = status === RecruitmentStatus.UNFINISHED;
</script>

<h1>Recruitment</h1>

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
{:else if canRecruit}
  <ActionButton class={buttonClasses} priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.start_recruitment')}</ActionButton>
{:else if isRefining}
  <div class="f-col">
    <ActionButton class={buttonClasses} priority="primary" disabled={disableInfluence} on:click={handleButtonClick}>
      Influencing...
    </ActionButton>
  </div>
{:else if canRefine}
  <ActionButton class={buttonClasses} priority="primary" disabled={disableInfluence} on:click={handleButtonClick}>
    {$t('badge_recruitment.buttons.influence')}
  </ActionButton>
{/if}

{#if isRefining && $currentRecruitmentStore?.cooldowns.influence}
  <div class="f-row gap-2">
    <div class={rowClasses}>
      <span class="text-secondary-content">Influence cooldown </span>
      <Countdown
        class="f-row  gap-2 text-secondary-content!"
        itemClasses={countdownClasses}
        target={$currentRecruitmentStore?.cooldowns.influence}
        on:end={handleCountdownEnd} />
    </div>
  </div>
{/if}

{#if displayRecrutingCooldown && $currentRecruitmentStore?.cooldowns.claim}
  <div class={rowClasses}>
    <span class="text-secondary-content">Claimable in</span>
    <Countdown
      class="f-row gap-2"
      itemClasses={countdownClasses}
      target={$currentRecruitmentStore?.cooldowns.claim}
      on:end={() => (status = RecruitmentStatus.CAN_CLAIM)} />
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
