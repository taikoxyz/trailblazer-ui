<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { chillblazerService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import type { DappLeaderboardPage } from '$lib/domains/leaderboard/types/dapps/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import ChillblazerHeader from './ChillblazerHeader.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let season: number;

  const endedSeasons: number[] = [2, 3];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  const currentDappCompetitionLeaderboard = chillblazerService.getStore();

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

    const leaderboardPage: DappLeaderboardPage = await chillblazerService.fetchCompetitionData(args, season);

    // date from timestamp
    totalItems = leaderboardPage?.pagination.total || $currentDappCompetitionLeaderboard.items.length;
    loading = false;
  }

  setContext('loadCompetitionLeaderboardData', loadLeaderboardData);
  setContext('dappsCompetitionPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  headers={['No.', 'Dapp', '', 'Points']}
  data={$currentDappCompetitionLeaderboard.items}
  showTrophy={true}
  lastUpdated={new Date($currentDappCompetitionLeaderboard.lastUpdated)}
  isLoading={loading}
  {handlePageChange}
  {totalItems}
  ended={hasEnded}
  qualifyingPositions={4}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.chillblazers.ended.title')}
  endDescriptionText={$t(`leaderboard.chillblazers.ended.s${$activeSeason}.description`)}
  showPagination={true}
  {season}
  headerComponent={ChillblazerHeader}
  scoreComponent={PointScore} />
