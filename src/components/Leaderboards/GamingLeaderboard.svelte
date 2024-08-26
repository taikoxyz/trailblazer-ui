<script lang="ts">
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import { Leaderboard, type PaginationInfo } from '$libs/leaderboard';
  import { getLogger } from '$libs/util/logger';
  import { currentGamingLeaderboard } from '$stores/leaderboards/gamingLeaderboard';

  import GamingCompetitionInformation from './Competition/GamingCompetition/GamingCompetitionInformation.svelte';
  import GamingHeader from './Header/GamingHeader.svelte';
  import LastUpdated from './LastUpdated.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  const log = getLogger('DappsLeaderboard');
  export let loading = false;

  export let pageInfo: PaginationInfo;

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;
  $: lastUpdated = new Date($currentGamingLeaderboard.lastUpdated * 1000);

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    const args: PaginationInfo = {
      page,
      size: pageSize,
    };
    const pageInfo = await Leaderboard.getGamingLeaderboard(args);
    totalItems = pageInfo.total || $currentGamingLeaderboard.items.length;
    loading = false;
  }
</script>

<AbstractLeaderboard
  headers={['No.', 'Game', '', 'Points']}
  data={$currentGamingLeaderboard.items}
  showTrophy={true}
  isLoading={loading}
  showPagination={false}
  {handlePageChange}
  {totalItems}
  headerComponent={GamingHeader}
  scoreComponent={PointScore}
  additionalInfoComponent={GamingCompetitionInformation}>
  <div
    class="f-col lg:f-row lg:f-between-center items-center content-center mt-[60px] lg:mt-[77px] mb-[30px] space-y-[30px] lg:space-y-0">
    <div class="text-xl font-bold">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html $t('leaderboard.whitelist.cta')}
    </div>
    {#if lastUpdated}
      <LastUpdated class="w-fit" {lastUpdated} />
    {/if}
  </div>
</AbstractLeaderboard>
