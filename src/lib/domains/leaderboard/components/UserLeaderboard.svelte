<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { UserLeaderboardHeader } from '$lib/domains/leaderboard/components/Header';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import {
    currentUserLeaderboard,
    currentUserLeaderboardUserEntry,
  } from '$lib/domains/leaderboard/stores/userLeaderboard';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  let headers = ['No.', 'Address', 'Level', '', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  export let season: number;
  const endedSeasons = [1];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number, address = '') {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<UserLeaderboardItem> = {
      page,
      size: pageSize,
      total: totalItems,
      address,
    };
    const [leaderboardPage, userEntry] = await Promise.all([
      userLeaderboardService.getUserLeaderboardData(args, season),
      userLeaderboardService.getUserLeaderboardDataForAddress(season, getConnectedAddress()),
    ]);
    totalItems = leaderboardPage?.pagination.total || $currentUserLeaderboard.items.length;
    $currentUserLeaderboardUserEntry = userEntry;
    loading = false;
  }

  setContext('loadUserLeaderboardData', loadLeaderboardData);
  setContext('userPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  {headers}
  {season}
  data={$currentUserLeaderboard.items}
  lastUpdated={new Date($currentUserLeaderboard.lastUpdated)}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  isLoading={loading}
  ended={hasEnded}
  highlightedUserPosition={$currentUserLeaderboardUserEntry}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.user.ended.s1.title')}
  endDescriptionText={$t('leaderboard.user.ended.s1.description')}
  {handlePageChange}
  {totalItems}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
