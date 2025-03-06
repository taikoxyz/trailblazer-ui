<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { t } from 'svelte-i18n';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import {
    currentLiquidityCompetitionLeaderboard,
    currentLiquidityCompetitionLeaderboardUserEntry,
  } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
  import { fetchLeaderboard } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore';
  import { LiquidityCompetitionType } from '$lib/domains/leaderboard/types/competition/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';

  import LiquidityRoyaleHeader from './Header/LiquidityRoyaleHeader.svelte';
  import LiquidityDisclaimer from './LiquidityDisclaimer.svelte';

  let headers = ['No.', 'Address', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  export let edition: number;
  export let type: LiquidityCompetitionType = LiquidityCompetitionType.OG;

  const currentEdition: number = 3;

  $: reactiveEdition = edition;

  $: totalItems = pageInfo?.total || 0;
  $: hasEnded = reactiveEdition !== currentEdition;

  async function handlePageChange(page: number) {
    if (browser) await fetchLeaderboard(page, type, reactiveEdition);
  }

  async function loadLeaderboardData(page: number, address = '') {
    if (browser) {
      await Promise.all([fetchLeaderboard(page, type, reactiveEdition, address)]);
    }
  }

  onMount(() => {
    if (browser && $activeSeason && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
  });

  setContext('loadDappsLiquidityCompetitionLeaderboardData', loadLeaderboardData);
  setContext('loadLiquidityCompetitionPageInfo', pageInfo);
  setContext('liquidityEdition', reactiveEdition);
</script>

{#key edition}
  {#if edition <= currentEdition}
    <AbstractLeaderboard
      {headers}
      season={$activeSeason}
      data={$currentLiquidityCompetitionLeaderboard.items}
      lastUpdated={new Date($currentLiquidityCompetitionLeaderboard.lastUpdated)}
      showPagination={true}
      showDetailsColumn={false}
      showTrophy={true}
      qualifyingPositions={50}
      highlightedUserPosition={$currentLiquidityCompetitionLeaderboardUserEntry}
      isLoading={loading}
      ended={hasEnded}
      endedComponent={CampaignEndedInfoBox}
      endTitleText={$t(`leaderboard.liquidityRoyale.ended.${edition}.title`)}
      endDescriptionText={$t(`leaderboard.liquidityRoyale.ended.${edition}.description`)}
      {handlePageChange}
      {totalItems}
      headerComponent={LiquidityRoyaleHeader}
      scoreComponent={PointScore} />
    <LiquidityDisclaimer />
  {:else}
    No data
  {/if}
{/key}
