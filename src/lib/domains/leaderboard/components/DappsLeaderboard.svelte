<script lang="ts">
  import { setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { DappsLeaderboardHeader } from '$lib/domains/leaderboard/components/Header';
  import { PointScore } from '$lib/domains/leaderboard/components/Template';
  import { AbstractLeaderboard } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { dappLeaderboardService } from '$lib/domains/leaderboard/services/LeaderboardServiceInstances';
  import { currentDappLeaderboard } from '$lib/domains/leaderboard/stores';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import type { DappLeaderboardPage } from '../types/dapps/types';

  const log = getLogger('DappsLeaderboard');

  let headers = ['No.', 'Dapp', '', 'Volume'];

  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let season: number;

  const endedSeasons = [1, 2];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  let value = '';

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page, value);
  }

  async function loadLeaderboardData(page: number, name = '') {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<DappLeaderboardItem> = {
      page,
      size: pageSize,
      slug: name,
      total: totalItems,
    };

    const leaderboardPage: DappLeaderboardPage | undefined = await dappLeaderboardService.getDappLeaderboardData(
      args,
      season,
    );

    // date from timestamp

    totalItems = leaderboardPage?.pagination.total || $currentDappLeaderboard.items.length;
    loading = false;
  }

  setContext('loadDappsLeaderboardData', loadLeaderboardData);
  setContext('dappsPageInfo', pageInfo);
</script>

<AbstractLeaderboard
  {headers}
  {season}
  data={$currentDappLeaderboard.items}
  showTrophy={true}
  lastUpdated={new Date($currentDappLeaderboard.lastUpdated)}
  isLoading={loading}
  ended={hasEnded}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t(`leaderboard.dapp.ended.s${$activeSeason - 1}.title`)}
  endDescriptionText={$t(`leaderboard.dapp.ended.s${$activeSeason - 1}.description`)}
  {handlePageChange}
  {totalItems}
  showPagination={true}
  headerComponent={DappsLeaderboardHeader}
  scoreComponent={PointScore} />
