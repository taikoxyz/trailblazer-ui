<script lang="ts">
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { liquidityCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import { currentLiquidityCompetitionLeaderboard } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
  import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

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

  async function loadLeaderboardData(page: number) {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<UserLeaderboardItem> = {
      page,
      size: pageSize,
      total: totalItems,
    };
    const leaderboardPage: LiquidityCompetitionPage =
      await liquidityCompetitionService.getLiquidityCompetitionLeaderboard(args, season);
    totalItems = leaderboardPage?.pagination.total || $currentLiquidityCompetitionLeaderboard.items.length;

    loading = false;
  }
</script>

<AbstractLeaderboard
  {headers}
  {season}
  data={$currentLiquidityCompetitionLeaderboard.items}
  highlightedUserPosition={$currentLiquidityCompetitionLeaderboard.items[44]}
  lastUpdated={new Date($currentLiquidityCompetitionLeaderboard.lastUpdated)}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  qualifyingPositions={100}
  isLoading={loading}
  ended={hasEnded}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.user.ended.s1.title')}
  endDescriptionText={$t('leaderboard.user.ended.s1.description')}
  {handlePageChange}
  {totalItems}
  headerComponent={LiquidityRoyaleHeader}
  scoreComponent={PointScore} />
