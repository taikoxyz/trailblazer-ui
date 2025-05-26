<script lang="ts">
  import { onMount, setContext } from 'svelte';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { PointScore } from '$lib/domains/leaderboard/components/Template';
  import AbstractLeaderboard from '$lib/domains/leaderboard/components/Template/AbstractLeaderboard.template.svelte';
  import type { PaginationInfo } from '$shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import type { BasedlinerLeaderboard } from '../../dto/BasedlinerLeaderboard';
  import { BasedLinerService } from '../../service/BasedLinerService';
  import { leaderboardStore } from '../../stores/BasedlinerLeaderboardStore';
  import { leaderboardLoading } from '../../stores/loading';
  import { PRECONF_EVENT } from '../../types';
  const log = getLogger('BasedLinersLeaderboard');

  export let pageInfo: PaginationInfo<BasedlinerLeaderboard>;

  async function handlePageChange(page: number) {
    log('handlePageChange', page);
    if (browser) await BasedLinerService.fetchLeaderboard({ eventId: PRECONF_EVENT.BASEDLINER, page });
  }

  async function loadLeaderboardData(page: number) {
    log('loadLeaderboardData', page);
    if (browser) await BasedLinerService.fetchLeaderboard({ eventId: PRECONF_EVENT.BASEDLINER, page });
  }

  let leaderboard;
  $: leaderboard = $leaderboardStore;
  $: totalItems = pageInfo?.total || 0;

  onMount(async () => {
    if (browser && $activeSeason && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  });

  setContext('loadBasedLinerLeaderboardData', loadLeaderboardData);
  setContext('basedlinerPageInfo', pageInfo);
</script>

<div class="f-col w-full">
  <h1 class="text-left mt-[50px]">Leaderboard</h1>
  <AbstractLeaderboard
    headers={['No.', 'Wallet', '', 'Score']}
    season={$activeSeason}
    data={leaderboard.items}
    showTrophy={true}
    lastUpdated={new Date(leaderboard.lastUpdated)}
    isLoading={$leaderboardLoading}
    {handlePageChange}
    {totalItems}
    ended={false}
    qualifyingPositions={3}
    endedComponent={CampaignEndedInfoBox}
    endTitleText="BasedLiners has ended"
    endDescriptionText={`The BasedLiners event has ended. Thank you for your participation!`}
    showPagination={true}
    scoreComponent={PointScore} />
</div>
