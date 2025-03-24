<!-- UpdateStatusProvider.svelte -->
<script lang="ts">
  import { setContext } from 'svelte';
  import { get } from 'svelte/store';

  import { activeRecruitmentStore, currentCycleStore } from '$shared/stores/recruitment';
  import { type ActiveRecruitment, RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import type { TBBadge } from '$shared/types/NFT';
  import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';
  import { getLogger } from '$shared/utils/logger';

  const log = getLogger('UpdateStatus');

  // Updates current recruitment status
  export const updateStatus = async (badge: TBBadge): Promise<RecruitmentStatus> => {
    log('passed badge', badge.tokenId);
    const activeCycle = get(currentCycleStore);
    if (!activeCycle) {
      log('No active cycle found');
      return RecruitmentStatus.NOT_STARTED;
    }

    log('Badge tokenId:', badge.tokenId, 'Type:', typeof badge.tokenId);
    get(activeRecruitmentStore)?.forEach((r: ActiveRecruitment) => {
      log('Recruitment badge tokenId:', r.badge.tokenId, 'Type:', typeof r.badge.tokenId, 'Cycle:', r.cycle);
    });
    const recruitment = get(activeRecruitmentStore)?.find(
      (r: ActiveRecruitment) => r.badge.tokenId.toString() === badge.tokenId.toString() && r.cycle === activeCycle,
    );
    if (!recruitment) {
      log('No recruitment found for badge:', badge);

      // check if badgeId was recruited this cycle
      const wasRecruitedInCylce = get(activeRecruitmentStore)?.some(
        (r: ActiveRecruitment) => r.badge.badgeId === badge.badgeId && r.cycle === activeCycle,
      );

      if (wasRecruitedInCylce) {
        log('Badge was recruited in this cycle:', activeCycle);
        return RecruitmentStatus.ALREADY_RECRUITED_CYCLE;
      }

      return RecruitmentStatus.NOT_STARTED;
    }
    log('Updating status for badge:', recruitment.badge.tokenId, recruitment.badge, recruitment);

    const newStatus = await getRecruitmentStatus(recruitment, activeCycle);
    recruitment.status = newStatus;
    log('Status updated:', newStatus, recruitment);
    return newStatus;
  };

  setContext('badgeRecruitUpdate', updateStatus);
</script>

<slot />
