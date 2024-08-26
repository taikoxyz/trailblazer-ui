<script lang="ts">
  import { leaderboardConfig } from '$config';
  import { type DappLeaderboardItem, Leaderboard, type PaginationInfo } from '$libs/leaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentGamingLeaderboard } from '$stores/leaderboards/gamingLeaderboard';

  import GamingCompetitionInformation from './Competition/GamingCompetition/GamingCompetitionInformation.svelte';
  import GamingHeader from './Header/GamingHeader.svelte';
  import LastUpdatedHeader from './LastUpdatedHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;

  export let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;
  $: lastUpdated = new Date($currentGamingLeaderboard.lastUpdated * 1000);

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    const args: PaginationInfo<DappLeaderboardItem> = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getGamingLeaderboard(args);
    totalItems = pageInfo.total || $currentGamingLeaderboard.items.length;
    loading = false;
  }
</script>

<AbstractLeaderboard
  headers={['No.', 'Game', '', 'Points']}
  data={$currentGamingLeaderboard.items}
  showTrophy={true}
  isLoading={loading}
  showPagination={false}
  {handlePageChange}
  {totalItems}
  headerComponent={GamingHeader}
  scoreComponent={PointScore}
  additionalInfoComponent={GamingCompetitionInformation}>
  <LastUpdatedHeader {lastUpdated} />
</AbstractLeaderboard>
