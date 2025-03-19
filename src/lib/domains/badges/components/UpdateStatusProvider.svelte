<!-- UpdateStatusProvider.svelte -->
<script lang="ts">
  import { setContext } from 'svelte';

  import { activeRecruitmentStore, currentCycleStore, currentRecruitmentStore } from '$shared/stores/recruitment';
  import { RecruitmentStatus } from '$shared/types/BadgeRecruitment';
  import { getRecruitmentStatus } from '$shared/utils/badges/getRecruitmentStatus';
  import { getLogger } from '$shared/utils/logger';

  const log = getLogger('UpdateStatus');
  let updating = false;
  let activeCycle: number = $currentCycleStore || -1;
  let status: RecruitmentStatus = RecruitmentStatus.NOT_STARTED;

  const updateStatus = async (): Promise<void> => {
    let recruitment = $currentRecruitmentStore;
    if (!recruitment) {
      return;
    }
    log('Updating status for recruitment:', recruitment);
    if (updating || !recruitment) {
      log('Skipping update status for badge:', recruitment.badge, recruitment);
      return;
    }
    const filter = $activeRecruitmentStore?.find((r) => r.badge.tokenId === recruitment?.badge.tokenId);
    if (!filter) {
      status = RecruitmentStatus.NOT_STARTED;
      log('No recruitment found for badge:', recruitment.badge, status);
      return;
    }
    recruitment = filter;
    updating = true;
    log('Updating status for badge:', recruitment.badge, recruitment);
    const newStatus = await getRecruitmentStatus(recruitment, activeCycle);
    updating = false;

    if (newStatus !== status) {
      status = newStatus;
      log('Status updated:', status, recruitment);
    }
  };

  setContext('badgeRecruitUpdate', updateStatus);
</script>

<slot />
