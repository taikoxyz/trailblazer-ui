<script lang="ts">
  import { leaderboardConfig } from '$config';
  import { mapUserLeaderboardRow, type PaginationInfo } from '$libs/leaderboard';
  import { type UserLeaderboardItem, UserLeaderboardS2 } from '$libs/leaderboard/season-2/user/index';
  import { currentUserLeaderboard } from '$stores/leaderboard';

  import { UserLeaderboardHeader } from '../Header';
  import { AbstractLeaderboard, PointScore } from '../Template';

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
    const pageInfo = await UserLeaderboardS2.getUserLeaderboard(args);
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
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
