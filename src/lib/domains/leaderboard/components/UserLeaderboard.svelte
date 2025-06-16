<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { UserLeaderboardHeader } from '$lib/domains/leaderboard/components/Header';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { userLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import {
    clearUserLeaderboardStore,
    currentUserLeaderboard,
    currentUserLeaderboardUserEntry,
  } from '$lib/domains/leaderboard/stores/userLeaderboard';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  let headers = ['No.', 'Address', 'Level', '', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  export let season: number;
  const endedSeasons = [1, 2, 3, 4];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number, address = '') {
    if (!browser) return;

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

  // Watch for season changes and clear store when season changes
  let previousSeason = season;
  $: if (season !== previousSeason) {
    clearUserLeaderboardStore(season);
    previousSeason = season;

    // Reload data for the new season if we have pageInfo
    if (pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  }

  onMount(() => {
    // Clear store on mount to ensure clean slate
    clearUserLeaderboardStore(season);

    // Load initial data if pageInfo is available and we're in browser
    if (browser && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  });

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
  endTitleText={$t(`leaderboard.user.ended.s${$activeSeason - 1}.title`)}
  endDescriptionText={$t(`leaderboard.user.ended.s${$activeSeason - 1}.description`)}
  {handlePageChange}
  {totalItems}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
