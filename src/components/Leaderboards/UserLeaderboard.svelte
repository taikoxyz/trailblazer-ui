<script lang="ts">
  import { leaderboardConfig } from '$config';
  import { Leaderboard, mapUserLeaderboardRow, type PaginationInfo, type UserLeaderboardItem } from '$libs/leaderboard';
  import { currentUserLeaderboard } from '$stores/leaderboard';

  import { UserLeaderboardHeader } from './Header';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  let headers = ['No.', 'Address', 'Level', 'Title', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;

  $: data = $currentUserLeaderboard.items.map(mapUserLeaderboardRow);
  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<UserLeaderboardItem> = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getUserLeaderboard(args);
    totalItems = pageInfo.total || $currentUserLeaderboard.items.length;
    loading = false;
  }
</script>

<AbstractLeaderboard
  {headers}
  {data}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  showCTA={false}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  showLastUpdated={false}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
