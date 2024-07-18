<script lang="ts">
  import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentDappLeaderboard } from '$stores/leaderboard';

  import DappsHeader from './Header/DappsHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;

  export let pageInfo: PaginationInfo;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || 10;

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getDappLeaderboard(args);
    totalItems = pageInfo.total || $currentDappLeaderboard.items.length;
    loading = false;
  }
</script>

<AbstractLeaderboard
  headers={['No.', 'Dapp', '', 'Volume']}
  data={$currentDappLeaderboard.items}
  showTrophy={true}
  showLastUpdated={true}
  lastUpdated={new Date($currentDappLeaderboard.lastUpdated * 1000)}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  headerComponent={DappsHeader}
  scoreComponent={PointScore} />
