<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { cexCompetitionService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import { currentCexCompetitionLeaderboard } from '$lib/domains/leaderboard/stores/cexLeaderboard';
  import { type CexCompetitionRow, CexCompetitionType } from '$lib/domains/leaderboard/types/cex/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import TradingCarnivalHeader from '../../Header/TradingCarnivalHeader/TradingCarnivalHeader.svelte';

  const log = getLogger('TradingCarnivalLeaderboard');
  let headers = ['No.', 'Address', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<CexCompetitionRow>;
  const endedSeasons: number[] = [2];

  // The seasons this campaign was active
  const seasons: number[] = [2, 3];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSizeXlarge;
  $: hasEnded = endedSeasons.includes(Number($activeSeason));

  $: selectedType = CexCompetitionType.SPOT as CexCompetitionType;

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number, address = '') {
    loading = true;
    const args: PaginationInfo<CexCompetitionRow> = { page, size: pageSize, total: totalItems, address };
    log('loadLeaderboardData', args);
    const leaderboardData = await cexCompetitionService.getCexCompetitionLeaderboard(args, selectedType, $activeSeason);
    log('leadeboardData', leaderboardData);
    // const [leaderboardPage] = await Promise.all([
    //   // liquidityCompetitionService.getLiquidityCompetitionLeaderboard(args, $activeSeason),
    //   // liquidityCompetitionService.getLiquidityCompetitionDataForAddress($activeSeason, getConnectedAddress()),
    // ]);

    // totalItems = leaderboardPage?.pagination.total || $currentCexCompetitionLeaderboard.items.length;
    loading = false;
  }

  $: $activeSeason && loadLeaderboardData(pageInfo.page);

  setContext('loadCexCompetitionLeaderboardData', loadLeaderboardData);
  setContext('loadCexCompetitionPageInfo', pageInfo);
</script>

{#if seasons.includes(Number($activeSeason))}
  <AbstractLeaderboard
    {headers}
    season={$activeSeason}
    data={$currentCexCompetitionLeaderboard.items}
    lastUpdated={new Date($currentCexCompetitionLeaderboard.lastUpdated)}
    showPagination={true}
    showDetailsColumn={false}
    showTrophy={true}
    qualifyingPositions={3}
    isLoading={loading}
    ended={hasEnded}
    endedComponent={CampaignEndedInfoBox}
    endTitleText={$t(`leaderboard.trading_carnival.ended.s${$activeSeason}.title`)}
    endDescriptionText={$t(`leaderboard.trading_carnival.ended.s${$activeSeason}.description`)}
    {handlePageChange}
    {totalItems}
    headerComponent={TradingCarnivalHeader}
    scoreComponent={PointScore} />
{:else}
  No data
{/if}
