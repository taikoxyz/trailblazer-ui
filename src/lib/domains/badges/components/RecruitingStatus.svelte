<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';

  import { Spinner } from '$shared/components';
  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { currentCycleStore, currentRecruitmentStore, influenceRecruitmentModal } from '$shared/stores/recruitment';
  import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { getLogger } from '$shared/utils/logger';

  import Countdown from './Countdown.svelte';
  import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;

  let loading = false;

  let recruitment: ActiveRecruitment | null;
  let activeCycle: number;
  $: status = RecruitmentStatus.NOT_STARTED;

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

  // const determineStatus = async (badge: TBBadge): Promise<RecruitmentStatus> => {
  //   if (!badge) return RecruitmentStatus.NOT_STARTED;
  //   log('Determining status for badge:', badge, recruitment);

  //   influencing = $currentRecruitmentStore?.cooldowns.influence
  //     ? new Date($currentRecruitmentStore.cooldowns.influence) > new Date()
  //     : false;

  //   recruiting = $currentRecruitmentStore?.cooldowns.claim
  //     ? new Date($currentRecruitmentStore.cooldowns.claim) > new Date()
  //     : false;

  //   if (influencing) return RecruitmentStatus.REFINING;

  //   if (recruitment && isCurrentRecruitment) {
  //     log('Recruitment found for badge:', badge);
  //     return recruitment.status;
  //   }

  //   if (badge.frozen) return RecruitmentStatus.LOCKED;
  //   log('Eligible', badge);
  //   return RecruitmentStatus.ELIGIBLE;
  // };

  $: $influenceRecruitmentModal && updateStatus();

  let updating = false;

  const updateStatus = async () => {
    if (updating || !recruitment) return;
    updating = true;
    loading = true;
    log('Updating status for badge:', badge, recruitment);
    const newStatus = await getRecruitmentStatus(recruitment, activeCycle);
    loading = false;
    updating = false;

    // Only update if status actually changed
    if (newStatus !== status) {
      status = newStatus;
      log('Status updated:', status);
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
    if (status === RecruitmentStatus.CAN_CLAIM) claim(badge);
    if (status === RecruitmentStatus.ELIGIBLE) recruit(badge);
    if (status === RecruitmentStatus.CAN_REFINE) {
      $influenceRecruitmentModal = true;
    }
  };

  const recruit: (badge: TBBadge) => void = getContext('badgeRecruitRecruit');
  const claim: (badge: TBBadge) => void = getContext('badgeRecruitClaim');
  const reset: (recruitment: ActiveRecruitment) => void = getContext('badgeRecruitReset');

  $: isCurrentRecruitment = $currentRecruitmentStore && $currentRecruitmentStore?.badge?.tokenId === badge.tokenId;

  $: recruitmentNotFinished = $currentRecruitmentStore?.status !== RecruitmentStatus.COMPLETED;

  $: influencing = $currentRecruitmentStore?.cooldowns.influence
    ? new Date($currentRecruitmentStore.cooldowns.influence) > new Date()
    : false;

  $: recruiting = $currentRecruitmentStore?.cooldowns.claim
    ? new Date($currentRecruitmentStore.cooldowns.claim) > new Date()
    : false;

  $: $influenceRecruitmentModal && updateStatus();

  $: $currentRecruitmentStore?.cooldowns.claim && updateStatus();
  $: $currentRecruitmentStore?.cooldowns.influence && updateStatus();

  $: canClaim = isCurrentRecruitment && $currentRecruitmentStore?.status === RecruitmentStatus.CAN_CLAIM;

  $: isRecruitingAnotherBadge =
    ($currentRecruitmentStore && recruiting && !isCurrentRecruitment) ||
    ($currentRecruitmentStore && recruitmentNotFinished && !isCurrentRecruitment);

  $: alreadyRecruitedThisSeason =
    status === RecruitmentStatus.LOCKED ||
    status === RecruitmentStatus.COMPLETED ||
    status === RecruitmentStatus.ALREADY_RECRUITED;

  $: canRecruit = status === RecruitmentStatus.ELIGIBLE && recruitmentNotFinished;

  $: isRefining = status === RecruitmentStatus.REFINING && $currentRecruitmentStore?.cooldowns.influence && influencing;

  $: canRefine = status === RecruitmentStatus.CAN_REFINE && isCurrentRecruitment && recruitmentNotFinished;
  $: disableInfluence = recruiting && influencing;

  $: displayRecrutingCooldown =
    isCurrentRecruitment &&
    $currentRecruitmentStore?.cooldowns.claim &&
    (status === RecruitmentStatus.CAN_REFINE || status === RecruitmentStatus.REFINING);

  $: resettable = status === RecruitmentStatus.UNFINISHED;
</script>

<h1>Recruitment</h1>

{isRecruitingAnotherBadge} <br />
{$currentRecruitmentStore} <br />
{recruiting} <br />
{isCurrentRecruitment} <br />
{recruitmentNotFinished} <br />
{!isCurrentRecruitment} <br />

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

<h1>
  Debug info
  <span class="text-sm"> (to be removed)</span>
</h1>

<div class={rowClasses}>
  <span class="text-secondary-content">recruiting</span>
  <span> {recruiting}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">isCurrentRecruitment</span>
  <span>{isCurrentRecruitment}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">recruitmentNotFinished</span>
  <span>{recruitmentNotFinished}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">recruiting && !isCurrentRecruitment</span>
  <span>{recruiting && !isCurrentRecruitment}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">recruitmentNotFinished && !isCurrentRecruitment</span>
  <span>{recruitmentNotFinished && !isCurrentRecruitment}</span>
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
