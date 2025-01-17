<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { thrillblazerService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import ThrillblazerHeader from '../../../Header/ThrillblazersHeader/ThrillblazerHeader.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let season: number;

  const endedSeasons: number[] = [2];

  // The seasons this campaign was active
  const seasons: number[] = [2, 3];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;
  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  const currentDappCompetitionLeaderboard = thrillblazerService.getStore();

  async function loadLeaderboardData(page: number, name = '') {
    log('loadLeaderboardData', page, name);
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<DappLeaderboardItem> = {
      page,
      size: pageSize,
      slug: name,
      total: totalItems,
    };

    const leaderboardPage: DappLeaderboardPage = await thrillblazerService.fetchCompetitionData(args, $activeSeason);

    // date from timestamp
    totalItems = leaderboardPage?.pagination.total || $currentDappCompetitionLeaderboard.items.length;
    loading = false;
  }

  $: $activeSeason && loadLeaderboardData(pageInfo.page);

  setContext('loadCompetitionLeaderboardData', loadLeaderboardData);
  setContext('dappsCompetitionPageInfo', pageInfo);
</script>

{#if seasons.includes(Number($activeSeason))}
  <AbstractLeaderboard
    headers={['No.', 'Dapp', '', 'Points']}
    season={$activeSeason}
    data={$currentDappCompetitionLeaderboard.items}
    showTrophy={true}
    lastUpdated={new Date($currentDappCompetitionLeaderboard.lastUpdated)}
    isLoading={loading}
    {handlePageChange}
    {totalItems}
    ended={hasEnded}
    qualifyingPositions={4}
    endedComponent={CampaignEndedInfoBox}
    endTitleText={$t('leaderboard.thrillblazer.ended.title')}
    endDescriptionText={$t('leaderboard.thrillblazer.ended.description')}
    showPagination={true}
    headerComponent={ThrillblazerHeader}
    scoreComponent={PointScore} />
{:else}
  No data
{/if}
