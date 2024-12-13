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
  import { activeSeason } from '$shared/stores/activeSeason';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import LiquidityRoyaleHeader from '../../Header/LiquidityRoyaleHeader/LiquidityRoyaleHeader.svelte';
  import LiquidityDisclaimer from './LiquidityDisclaimer.svelte';

  let headers = ['No.', 'Address', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  const endedSeasons: number[] = [2];

  // The seasons this campaign was active
  const seasons: number[] = [2, 3];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSizeSmall;
  $: hasEnded = endedSeasons.includes(Number($activeSeason));

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number, address = '') {
    loading = true;
    const args: PaginationInfo<UserLeaderboardItem> = { page, size: pageSize, total: totalItems, address };
    const [leaderboardPage, userEntry] = await Promise.all([
      liquidityCompetitionService.getLiquidityCompetitionLeaderboard(args, $activeSeason),
      liquidityCompetitionService.getLiquidityCompetitionDataForAddress($activeSeason, getConnectedAddress()),
    ]);

    totalItems = leaderboardPage?.pagination.total || $currentLiquidityCompetitionLeaderboard.items.length;
    $currentLiquidityCompetitionLeaderboardUserEntry = userEntry;
    loading = false;
  }

  $: $activeSeason && loadLeaderboardData(pageInfo.page);

  setContext('loadDappsLiquidityCompetitionLeaderboardData', loadLeaderboardData);
  setContext('loadLiquidityCompetitionPageInfo', pageInfo);
</script>

{#if seasons.includes(Number($activeSeason))}
  <AbstractLeaderboard
    {headers}
    season={$activeSeason}
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
    endTitleText={$t(`leaderboard.liquidityRoyale.ended.s${$activeSeason}.title`)}
    endDescriptionText={$t(`leaderboard.liquidityRoyale.ended.s${$activeSeason}.description`)}
    {handlePageChange}
    {totalItems}
    headerComponent={LiquidityRoyaleHeader}
    scoreComponent={PointScore} />
  <LiquidityDisclaimer />
{:else}
  No data
{/if}
