<script lang="ts">
  import type { Address } from 'viem';

  import { UserLeaderboardHeader } from '$components/Leaderboards/Header';
  import { AbstractLeaderboard, PointScore } from '$components/Leaderboards/Template/';
  import { leaderboardConfig } from '$config';
  import { mapUserLeaderboardRow, type PaginationInfo } from '$libs/leaderboard';
  import { type UserLeaderboardItem, UserLeaderboardS2 } from '$libs/leaderboard/season-2/user/index';
  import Pfp from '$libs/pfp';
  import { currentUserLeaderboard } from '$stores/leaderboard';

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
    console.log({pageInfo})
    loading = false;
  }

  $: data, loadProfilePictures();

  async function loadProfilePictures() {
    const pfps = await Pfp.getMany(data.map((d) => d.address as Address));
    console.log(pfps);
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
