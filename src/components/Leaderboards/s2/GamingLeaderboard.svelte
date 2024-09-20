<script lang="ts">
  import { setContext } from 'svelte';

  import { default as GamingCompetitionInformation } from '$components/Leaderboards/Competition/GamingCompetition/GamingCompetitionInformation.svelte';
  import { default as GamingHeader } from '$components/Leaderboards/Header/GamingHeader.svelte';
  import { AbstractLeaderboard, PointScore } from '$components/Leaderboards/Template/';
  import { leaderboardConfig } from '$config';
  import { type DappLeaderboardItem, type PaginationInfo } from '$libs/leaderboard';
  import { GamingLeaderboard } from '$libs/leaderboard/season-2/competitions/gaming/gamingLeaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentGamingLeaderboard } from '$stores/leaderboards/gamingLeaderboard';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;

  export let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

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
    const pageInfo = await GamingLeaderboard.getGamingLeaderboard(args);
    totalItems = pageInfo.total || $currentGamingLeaderboard.items.length;
    loading = false;
  }

  setContext('loadDappsLeaderboardData', loadLeaderboardData);
  setContext('dappsPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  headers={['No.', 'Game', '', 'Points']}
  data={$currentGamingLeaderboard.items}
  showTrophy={true}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  showPagination={false}
  additionalInfoComponent={GamingCompetitionInformation}
  headerComponent={GamingHeader}
  scoreComponent={PointScore} />
