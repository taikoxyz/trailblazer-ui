<script lang="ts">
  import { getContext } from 'svelte';
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

  const log = getLogger('BadgeRecruitmentItem');

  export let badge: TBBadge;
  let recruitment: ActiveRecruitment | null = $activeRecruitmentStore;

  let activeCycle = $currentCycleStore;

  const determineStatus = (badge: TBBadge) => {
    if (recruitment && recruitment.badge.tokenId === badge.tokenId) {
      return recruitment.status;
    }
    if (hasRecruitedAlready()) {
      return RecruitmentStatus.ALREADY_RECRUITED;
    }
    if (badge.frozen) {
      return RecruitmentStatus.LOCKED;
    }
    return RecruitmentStatus.ELIGIBLE;
  };

  const hasRecruitedAlready = () => {
    const address = getConnectedAddress();
    if (address !== zeroAddress && activeCycle) {
      log('Checking if recruited already', address, activeCycle, badge);
      return badgeRecruitmentService.canRecruitInCycle(address, activeCycle, badge);
    }
    return false;
  };

  const collectionDetailsRowClasses = classNames('f-row', 'justify-between', 'font-bold', 'w-full');

  $: status = badge && determineStatus(badge);

  const handleButtonClick = () => {
    switch (status) {
      case RecruitmentStatus.CAN_CLAIM:
        claim(badge);
        break;
      case RecruitmentStatus.ELIGIBLE:
        recruit(badge);
        break;
      default:
        break;
    }
  };

  const recruit: (badge: TBBadge) => void = getContext('badgeRecruitRecruit');
  const claim: (badge: TBBadge) => void = getContext('badgeRecruitClaim');
</script>

{#if status === RecruitmentStatus.LOCKED || status === RecruitmentStatus.COMPLETED || status === RecruitmentStatus.ALREADY_RECRUITED}
  <ActionButton priority="primary" disabled={true}>Already recruited</ActionButton>
{:else if status === RecruitmentStatus.CAN_CLAIM}
  <ActionButton priority="primary" on:click={handleButtonClick}>Claim</ActionButton>
{:else if status === RecruitmentStatus.ELIGIBLE}
  <ActionButton priority="primary" on:click={handleButtonClick}>Recruit</ActionButton>
{/if}

<div class={collectionDetailsRowClasses}>
  <span class="text-secondary-content">DEBUG {$t('common.status')}</span>
  <span>{status}</span>
</div>
