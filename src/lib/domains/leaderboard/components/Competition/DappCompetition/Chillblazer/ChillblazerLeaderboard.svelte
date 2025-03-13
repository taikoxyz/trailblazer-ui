<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { fetchLeaderboard, leaderboardStore } from '$lib/domains/leaderboard/stores/dappCompetitionStore';
  import { CompetitionType } from '$lib/domains/leaderboard/types/competition/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import ChillblazerHeader from './ChillblazerHeader.svelte';

  const log = getLogger('ChillblazerLeaderboard');

  // Props from server load
  export let loading = false;
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let edition: number;

  const currentEdition: number = 4;

  $: totalItems = pageInfo?.total || 0;
  // For Chillblazer, you might consider the competition ended if the edition is not the current one.
  $: hasEnded = edition !== currentEdition;
  $: isLoading = loading;

  function handlePageChange(page: number) {
    log('handlePageChange', page);
    if (browser) fetchLeaderboard(page, CompetitionType.CHILLBLAZER, edition);
  }

  async function loadLeaderboardData(page: number) {
    log('loadLeaderboardData', page);
    loading = true;
    if (browser) await fetchLeaderboard(page, CompetitionType.CHILLBLAZER, edition);
    loading = false;
  }

  let leaderboard;
  $: leaderboard = $leaderboardStore;

  onMount(() => {
    if (browser && $activeSeason && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  });

  setContext('loadCompetitionLeaderboardData', loadLeaderboardData);
  setContext('dappsCompetitionPageInfo', pageInfo);
  setContext('chillblazerEdition', edition);
</script>

{#if edition <= currentEdition}
  <AbstractLeaderboard
    headers={['No.', 'Dapp', '', 'Points']}
    season={$activeSeason}
    data={leaderboard.items}
    showTrophy={true}
    lastUpdated={new Date(leaderboard.lastUpdated)}
    {isLoading}
    {handlePageChange}
    {totalItems}
    ended={hasEnded}
    qualifyingPositions={4}
    endedComponent={CampaignEndedInfoBox}
    endTitleText={$t(`leaderboard.chillblazers.${edition}.ended.title`)}
    endDescriptionText={$t(`leaderboard.chillblazers.${edition}.ended.description`)}
    showPagination={true}
    headerComponent={ChillblazerHeader}
    scoreComponent={PointScore} />
{:else}
  No data
{/if}
