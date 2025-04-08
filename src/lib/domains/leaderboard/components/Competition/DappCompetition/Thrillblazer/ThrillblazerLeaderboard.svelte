<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { leaderboardLoading } from '$lib/domains/leaderboard/stores/dappCompetitionLeaderboard';
  import { fetchLeaderboard, leaderboardStore } from '$lib/domains/leaderboard/stores/dappCompetitionStore';
  import { DappCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import type { CompetitionInfo } from '../../types';
  import Header from './Header/Header.svelte';
  import { getThrillblazerDetails } from './thrillblazerDetails';

  const log = getLogger('DappsLeaderboard');
  export let pageInfo: PaginationInfo<DappLeaderboardItem>;
  export let edition: number;

  $: reactiveEdition = edition;

  const currentEdition: number = 4;

  $: totalItems = pageInfo?.total || 0;
  $: hasEnded = reactiveEdition !== currentEdition;

  async function handlePageChange(page: number) {
    log('handlePageChange', page);
    if (browser) await fetchLeaderboard(page, DappCompetitionType.THRILLBLAZER, reactiveEdition);
  }

  async function loadLeaderboardData(page: number) {
    log('loadLeaderboardData', page);
    if (browser) await fetchLeaderboard(page, DappCompetitionType.THRILLBLAZER, reactiveEdition);
  }

  let leaderboard;
  $: leaderboard = $leaderboardStore;

  let thrillblazerDetails: Record<number, CompetitionInfo> | null = null;

  onMount(async () => {
    thrillblazerDetails = await getThrillblazerDetails();
    if (browser && $activeSeason && pageInfo && thrillblazerDetails) {
      loadLeaderboardData(pageInfo.page);
    }
  });

  setContext('loadCompetitionLeaderboardData', loadLeaderboardData);
  setContext('dappsCompetitionPageInfo', pageInfo);

  setContext('thrillblazerEdition', reactiveEdition);
</script>

{#key edition}
  {#if edition <= currentEdition && thrillblazerDetails}
    <AbstractLeaderboard
      headers={['No.', 'Dapp', '', 'Points']}
      season={$activeSeason}
      data={leaderboard.items}
      showTrophy={true}
      lastUpdated={new Date(leaderboard.lastUpdated)}
      isLoading={$leaderboardLoading}
      {handlePageChange}
      {totalItems}
      ended={hasEnded}
      qualifyingPositions={thrillblazerDetails[edition].qualifyingPositions}
      endedComponent={CampaignEndedInfoBox}
      endTitleText={$t(`leaderboard.thrillblazers.${edition}.ended.title`)}
      endDescriptionText={$t(`leaderboard.thrillblazers.${edition}.ended.description`)}
      showPagination={true}
      headerComponent={Header}
      scoreComponent={PointScore} />
  {:else}
    No data
  {/if}
{/key}
