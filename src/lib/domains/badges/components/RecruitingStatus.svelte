<script lang="ts">
  import { getContext, onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';

  import ActionButton from '$shared/components/Button/ActionButton.svelte';
  import { RecruitmentStatus, type ActiveRecruitment } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { classNames } from '$shared/utils/classNames';
  import { activeRecruitmentStore, currentCycleStore } from '$shared/stores/recruitment';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';
  import badgeRecruitmentService from '../services/BadgeRecruitmentServiceInstance';
  import { zeroAddress } from 'viem';
  import { getLogger } from '$shared/utils/logger';
  import { Spinner } from '$shared/components';

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;

  let loading = false;

  let recruitment: ActiveRecruitment | null;
  let activeCycle: number;
  let status: RecruitmentStatus = RecruitmentStatus.NOT_STARTED;

  const determineStatus = async (badge: TBBadge): Promise<RecruitmentStatus> => {
    if (!badge) return RecruitmentStatus.NOT_STARTED;
    log('Determining status for badge:', badge, recruitment);
    // const eligible = await canRecruit();
    // log('Has recruited already:', eligible);
    // if (!eligible) return RecruitmentStatus.ALREADY_RECRUITED;

    if (recruitment && recruitment.badge.tokenId === badge.tokenId) {
      return recruitment.status;
    }

    if (badge.frozen) return RecruitmentStatus.LOCKED;

    return RecruitmentStatus.ELIGIBLE;
  };

  const canRecruit = async () => {
    const address = getConnectedAddress();
    if (address !== zeroAddress && activeCycle) {
      const canRecruit = await badgeRecruitmentService.canRecruitInCycle(address, activeCycle, badge);
      return canRecruit;
    }
    return false;
  };

  const updateStatus = async () => {
    loading = true;
    status = await determineStatus(badge);
    loading = false;
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
  };

  const recruit: (badge: TBBadge) => void = getContext('badgeRecruitRecruit');
  const claim: (badge: TBBadge) => void = getContext('badgeRecruitClaim');
</script>

{#if loading}
  <ActionButton priority="primary" disabled={true}><Spinner /></ActionButton>
{:else if status === RecruitmentStatus.LOCKED || status === RecruitmentStatus.COMPLETED || status === RecruitmentStatus.ALREADY_RECRUITED}
  <ActionButton priority="primary" disabled={true}>{$t('badge_recruitment.buttons.already_recruited')}</ActionButton>
{:else if status === RecruitmentStatus.CAN_CLAIM}
  <ActionButton priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.end_recruitment')}</ActionButton>
{:else if status === RecruitmentStatus.ELIGIBLE}
  <ActionButton priority="primary" on:click={handleButtonClick}
    >{$t('badge_recruitment.buttons.start_recruitment')}</ActionButton>
{/if}

<h1>DEBUG INFO</h1>
<div class={classNames('f-row', 'justify-between', 'font-bold', 'w-full')}>
  <span class="text-secondary-content">{$t('common.status')}</span>
  <span>{status}</span>
</div>

<div class={classNames('f-row', 'justify-between', 'font-bold', 'w-full')}>
  <span class="text-secondary-content">Cycle</span>
  <span>{activeCycle}</span>
</div>

<textarea placeholder="active recruitment" class="textarea textarea-bordered textarea-lg w-full max-w-xs" readonly>
  {JSON.stringify(recruitment, null, 2)}
</textarea>
