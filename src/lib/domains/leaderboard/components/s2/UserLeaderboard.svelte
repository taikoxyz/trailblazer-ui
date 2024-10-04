<script lang="ts">
  import { leaderboardConfig } from '$config';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

  import { userLeaderboardService } from '../../services/LeaderboardServiceInstances';
  import { currentUserLeaderboard } from '../../stores/userLeaderboard';
  import type { UserLeaderboardItem } from '../../types/dapps/types';
  import { UserLeaderboardHeader } from '../Header';
  import { AbstractLeaderboard, PointScore } from '../Template';

  let headers = ['No.', 'Address', 'Level', 'Title', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;

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
    const leaderboardPage = await userLeaderboardService.getUserLeaderboardData(args, 2);
    totalItems = leaderboardPage?.pagination.total || $currentUserLeaderboard.items.length;

    loading = false;
  }
</script>

<AbstractLeaderboard
  {headers}
  data={$currentUserLeaderboard.items}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
