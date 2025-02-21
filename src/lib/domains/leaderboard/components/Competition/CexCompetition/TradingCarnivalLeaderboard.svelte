<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import { cexLeaderboardStore, fetchLeaderboard } from '$lib/domains/leaderboard/stores/cexCompetitionStore';
  import { type CexCompetitionItem, CexCompetitionType } from '$lib/domains/leaderboard/types/cex/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { getLogger } from '$shared/utils/logger';

  import TradingCarnivalHeader from './TradingCarnivalHeader/TradingCarnivalHeader.svelte';

  const log = getLogger('TradingCarnivalLeaderboard');

  export let pageInfo: PaginationInfo<CexCompetitionItem>;
  export let edition: number;

  $: isObfuscated = new Date() <= new Date('2025-02-27T12:00:00Z');

  const currentEdition: number = 1;

  let headers = ['No.', 'Name', 'Points'];

  $: reactiveEdition = edition;

  $: $activeSeason && loadLeaderboardData(pageInfo.page);

  $: totalItems = pageInfo?.total || 0;
  $: hasEnded = reactiveEdition !== currentEdition;

  $: selectedType = CexCompetitionType.SPOT as CexCompetitionType;

  let leaderboard;
  $: leaderboard = $cexLeaderboardStore;

  async function handlePageChange(page: number) {
    log('handlePageChange', page);
    if (browser) await fetchLeaderboard(page, selectedType, reactiveEdition);
  }

  async function loadLeaderboardData(page: number) {
    log('loadLeaderboardData', page);
    if (browser) await fetchLeaderboard(page, selectedType, reactiveEdition);
  }

  onMount(() => {
    if (browser && $activeSeason && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  });

  setContext('loadCexCompetitionLeaderboardData', loadLeaderboardData);
  setContext('loadCexCompetitionPageInfo', pageInfo);

  setContext('cexCompetitionEdition', reactiveEdition);
</script>

{isObfuscated}
{#key edition}
  {#if edition <= currentEdition}
    <AbstractLeaderboard
      obfuscate={isObfuscated}
      {headers}
      season={$activeSeason}
      data={leaderboard.items}
      lastUpdated={new Date(leaderboard.lastUpdated)}
      showPagination={true}
      showDetailsColumn={false}
      showTrophy={true}
      qualifyingPositions={3}
      ended={hasEnded}
      endedComponent={CampaignEndedInfoBox}
      endTitleText={$t(`leaderboard.trading_carnival.ended.s${edition}.title`)}
      endDescriptionText={$t(`leaderboard.trading_carnival.ended.s${edition}.description`)}
      {handlePageChange}
      {totalItems}
      headerComponent={TradingCarnivalHeader}
      scoreComponent={PointScore} />
  {:else}
    No data
  {/if}
{/key}
