<script lang="ts">
  import { setContext } from 'svelte';

  import DappsHeader from '$components/Leaderboards/Header/DappsHeader.svelte';
  import { AbstractLeaderboard, PointScore } from '$components/Leaderboards/Template';
  import { leaderboardConfig } from '$config';
  import { type DappLeaderboardItem, type PaginationInfo } from '$libs/leaderboard';
  import { DappsLeaderboardS2 } from '$libs/leaderboard/season-2/dapps/dappsLeaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentDappLeaderboard } from '$stores/leaderboard';

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
    const pageInfo = await DappsLeaderboardS2.getDappLeaderboard(args);
    totalItems = pageInfo.total || $currentDappLeaderboard.items.length;
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
  showPagination={false}
  headerComponent={DappsHeader}
  scoreComponent={PointScore} />
