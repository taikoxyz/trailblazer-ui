<script lang="ts">
  import { setContext } from 'svelte';

  import { leaderboardConfig } from '$config';
  import { DappsLeaderboardHeader } from '$lib/domains/leaderboard/components/Header';
  import { PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { getLogger } from '$libs/util/logger';

  import type { DappLeaderboardItem } from '../../dto/dapps.dto';
  import { dappLeaderboardService } from '../../services/LeaderboardServiceInstances';
  import { currentDappLeaderboard } from '../../stores/dappLeaderboard';
  import { AbstractLeaderboard } from '../Template';

  const log = getLogger('DappsLeaderboard');

  let headers = ['No.', 'Dapp', '', 'Volume'];

  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  let value = '';

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page, value);
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
    const leaderboardPage = await dappLeaderboardService.getDappLeaderboardData(args, 2);
    totalItems = leaderboardPage?.pagination.total || $currentDappLeaderboard.items.length;
    loading = false;
  }

  setContext('loadDappsLeaderboardData', loadLeaderboardData);
  setContext('dappsPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  {headers}
  data={$currentDappLeaderboard.items}
  showTrophy={true}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  showPagination={true}
  headerComponent={DappsLeaderboardHeader}
  scoreComponent={PointScore} />
