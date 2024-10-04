<script lang="ts">
  import { setContext } from 'svelte';

  import { leaderboardConfig } from '$config';
  import { GamingCompetitionInformation } from '$lib/domains/leaderboard/components/Competition/GamingCompetition';
  import GamingHeader from '$lib/domains/leaderboard/components/Header/GamingHeader.svelte';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { gamingLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import { currentGamingLeaderboard } from '$lib/domains/leaderboard/stores/gamingLeaderboard';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { getLogger } from '$libs/util/logger';

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
      total: totalItems,
    };
    const leaderboardPage = await gamingLeaderboardService.getGamingLeaderboardData(args, 2);
    totalItems = leaderboardPage?.pagination.total || $currentGamingLeaderboard.items.length;
    log('loadLeaderboardData', leaderboardPage);
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
  showPagination={true}
  additionalInfoComponent={GamingCompetitionInformation}
  headerComponent={GamingHeader}
  scoreComponent={PointScore} />
