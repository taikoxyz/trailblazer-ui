<script lang="ts">
  import { setContext } from 'svelte';

  import { leaderboardConfig } from '$config';
  import { activeSeason } from '$lib/shared/stores/activeSeason';
  import { type DappLeaderboardItem, type PaginationInfo } from '$libs/leaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentDappLeaderboard } from '$stores/leaderboard';

  import { dappLeaderboardService } from '../services/LeaderboardServiceInstances';
  import DappsHeader from './Header/DappsLeaderboardHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

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
    };
    const leaderboardPage = await dappLeaderboardService.getDappLeaderboardData(args, $activeSeason);
    if (leaderboardPage) {
      totalItems = leaderboardPage.pagination.total || $currentDappLeaderboard.items.length;
      pageInfo = leaderboardPage.pagination;
      log('leaderboardPage', leaderboardPage.pagination);
    }
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
  headerComponent={DappsHeader}
  scoreComponent={PointScore} />
