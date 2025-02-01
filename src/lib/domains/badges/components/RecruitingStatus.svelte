<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { RecruitmentStatus, type ActiveRecruitment } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { activeRecruitmentStore, currentCycleStore, influenceRecruitmentModal } from '$shared/stores/recruitment';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import badgeRecruitmentService from '../services/BadgeRecruitmentServiceInstance';
  import { zeroAddress } from 'viem';
  import { getLogger } from '$shared/utils/logger';
  import { Spinner } from '$shared/components';
  import Countdown from './Countdown.svelte';

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

  const rowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');

  const determineStatus = async (badge: TBBadge): Promise<RecruitmentStatus> => {
    if (!badge) return RecruitmentStatus.NOT_STARTED;
    log('Determining status for badge:', badge, recruitment);

    isInfluencing = $activeRecruitmentStore?.cooldowns.influence
      ? new Date($activeRecruitmentStore.cooldowns.influence) > new Date()
      : false;

    isRecruiting = $activeRecruitmentStore?.cooldowns.claim
      ? new Date($activeRecruitmentStore.cooldowns.claim) > new Date()
      : false;

    if (isInfluencing) return RecruitmentStatus.REFINING;

    if (recruitment && isCurrentRecruitment) {
      log('Recruitment found for badge:', badge);
      return recruitment.status;
    }

    if (badge.frozen) return RecruitmentStatus.LOCKED;
    log('Eligible', badge);
    return RecruitmentStatus.ELIGIBLE;
  };

  $: $influenceRecruitmentModal && updateStatus();

  let updating = false;

  const updateStatus = async () => {
    if (updating) return;
    updating = true;
    loading = true;
    const newStatus = await determineStatus(badge);
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

  const unsubscribeRecruitment = activeRecruitmentStore.subscribe((value) => {
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
    if (status === RecruitmentStatus.CAN_CLAIM) claim(badge);
    if (status === RecruitmentStatus.ELIGIBLE) recruit(badge);
    if (status === RecruitmentStatus.CAN_REFINE) {
      $influenceRecruitmentModal = true;
    }
  };

  const recruit: (badge: TBBadge) => void = getContext('badgeRecruitRecruit');
  const claim: (badge: TBBadge) => void = getContext('badgeRecruitClaim');

  $: isCurrentRecruitment = $activeRecruitmentStore?.badge?.tokenId === badge.tokenId;

  $: isInfluencing = $activeRecruitmentStore?.cooldowns.influence
    ? new Date($activeRecruitmentStore.cooldowns.influence) > new Date()
    : false;

  $: isRecruiting = $activeRecruitmentStore?.cooldowns.claim
    ? new Date($activeRecruitmentStore.cooldowns.claim) > new Date()
    : false;
</script>

{#if loading}
  <ActionButton priority="primary" disabled={true}><Spinner /></ActionButton>
{:else if isRecruiting && !isCurrentRecruitment}
  <ActionButton priority="primary" disabled={true}>{$t('badge_recruitment.buttons.ongoing_recruitment')}</ActionButton>
{:else if status === RecruitmentStatus.LOCKED || status === RecruitmentStatus.COMPLETED || status === RecruitmentStatus.ALREADY_RECRUITED}
  <ActionButton priority="primary" disabled={true}>{$t('badge_recruitment.buttons.already_recruited')}</ActionButton>
{:else if status === RecruitmentStatus.CAN_CLAIM}
  <ActionButton priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.end_recruitment')}</ActionButton>
{:else if status === RecruitmentStatus.ELIGIBLE}
  <ActionButton priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.start_recruitment')}</ActionButton>
{:else if status === RecruitmentStatus.REFINING && $activeRecruitmentStore?.cooldowns.influence}
  <div class="f-col">
    <ActionButton priority="primary" disabled={isRecruiting && isInfluencing} on:click={handleButtonClick}>
      <span>Influencing</span>
      <div class="f-row gap-2">
        <Countdown
          class="f-row  gap-2 text-secondary-content!"
          itemClasses={countdownClasses}
          target={$activeRecruitmentStore?.cooldowns.influence}
          on:end={handleCountdownEnd} /> left
      </div>
    </ActionButton>
  </div>
{:else if status === RecruitmentStatus.CAN_REFINE}
  <ActionButton priority="primary" disabled={isRecruiting && isInfluencing} on:click={handleButtonClick}>
    {$t('badge_recruitment.buttons.influence')}
  </ActionButton>
{/if}

<h1>DEBUG INFO</h1>
<div class={rowClasses}>
  <span class="text-secondary-content">{$t('common.status')}</span>
  <span>{status}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">Influencing</span>
  <span>{isInfluencing ? 'Yes' : 'No'}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">Recruiting</span>
  <span>{isRecruiting ? 'Yes' : 'No'}</span>
</div>

<div class={rowClasses}>
  <span class="text-secondary-content">Cycle</span>
  <span>{activeCycle}</span>
</div>

{#if isCurrentRecruitment && $activeRecruitmentStore?.cooldowns.claim && status === RecruitmentStatus.CAN_REFINE}
  <div class={rowClasses}>
    <span class="text-secondary-content">Claimable in</span>
    <Countdown
      class="f-row gap-2"
      itemClasses={countdownClasses}
      target={$activeRecruitmentStore?.cooldowns.claim}
      on:end={() => (status = RecruitmentStatus.CAN_CLAIM)} />
  </div>

  <textarea placeholder="active recruitment" class="textarea textarea-bordered textarea-lg w-full max-w-xs" readonly>
    {JSON.stringify(recruitment, null, 2)}
  </textarea>
{/if}
