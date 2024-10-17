<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { dappCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import currentDappCompetitionLeaderboard from '$lib/domains/leaderboard/stores/dappCompetitionLeaderboard';
  import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { getLogger } from '$shared/utils/logger';

  import { CampaignEndedInfoBox } from '../../CampaignEndedInfoBox';
  import DappCompetitionHeader from './DappCompetitionHeader.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let season: number;

  const endedSeasons: number[] = [];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number, name = '') {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<DappLeaderboardItem> = {
      page,
      size: pageSize,
      name,
      total: totalItems,
    };
    const leaderboardPage: DappLeaderboardPage = await dappCompetitionService.getCompetitionData(args, season);

    // date from timestamp
    totalItems = leaderboardPage?.pagination.total || $currentDappCompetitionLeaderboard.items.length;
    loading = false;
  }

  setContext('loadDappsLeaderboardData', loadLeaderboardData);
  setContext('dappsPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  headers={['No.', 'Game', '', 'Points']}
  data={$currentDappCompetitionLeaderboard.items}
  showTrophy={true}
  lastUpdated={new Date($currentDappCompetitionLeaderboard.lastUpdated)}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  ended={hasEnded}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.gaming.ended.s1.title')}
  endDescriptionText={$t('leaderboard.gaming.ended.s1.description')}
  showPagination={true}
  {season}
  headerComponent={DappCompetitionHeader}
  scoreComponent={PointScore} />
