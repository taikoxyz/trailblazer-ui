<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { liquidityCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import {
    currentLiquidityCompetitionLeaderboard,
    currentLiquidityCompetitionLeaderboardUserEntry,
  } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import LiquidityRoyaleHeader from '../../Header/LiquidityRoyaleHeader/LiquidityRoyaleHeader.svelte';

  let headers = ['No.', 'Address', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  export let season: number;
  const endedSeasons: number[] = [];

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
      liquidityCompetitionService.getLiquidityCompetitionLeaderboard(args, season),
      liquidityCompetitionService.getLiquidityCompetitionDataForAddress(season, getConnectedAddress()),
    ]);

    totalItems = leaderboardPage?.pagination.total || $currentLiquidityCompetitionLeaderboard.items.length;
    $currentLiquidityCompetitionLeaderboardUserEntry = userEntry;

    loading = false;
  }

  setContext('loadDappsLiquidityCompetitionLeaderboardData', loadLeaderboardData);
  setContext('loadLiquidityCompetitionPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  {headers}
  {season}
  data={$currentLiquidityCompetitionLeaderboard.items}
  lastUpdated={new Date($currentLiquidityCompetitionLeaderboard.lastUpdated)}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  qualifyingPositions={100}
  highlightedUserPosition={$currentLiquidityCompetitionLeaderboardUserEntry}
  isLoading={loading}
  ended={hasEnded}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.user.ended.s1.title')}
  endDescriptionText={$t('leaderboard.user.ended.s1.description')}
  {handlePageChange}
  {totalItems}
  headerComponent={LiquidityRoyaleHeader}
  scoreComponent={PointScore} />
