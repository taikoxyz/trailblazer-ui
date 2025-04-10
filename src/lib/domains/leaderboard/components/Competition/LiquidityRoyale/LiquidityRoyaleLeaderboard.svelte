<script lang="ts">
  import { onDestroy, onMount, setContext } from 'svelte';
  import type { Unsubscriber } from 'svelte/motion';
  import { derived } from 'svelte/store';
  import { t } from 'svelte-i18n';
  import { zeroAddress } from 'viem';

  import { browser } from '$app/environment';
  import { CampaignEndedInfoBox } from '$lib/domains/leaderboard/components/CampaignEndedInfoBox';
  import { AbstractLeaderboard, PointScore } from '$lib/domains/leaderboard/components/Template';
  import {
    currentLiquidityCompetitionLeaderboard,
    currentLiquidityCompetitionLeaderboardUserEntry,
  } from '$lib/domains/leaderboard/stores/liquidityCompetitionLeaderboard';
  import {
    activeLiquidityType,
    fetchLeaderboard,
    fetchLeaderboardUserEntry,
    leaderboardStore,
  } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore';
  import type { LiquidityCompetitionPage } from '$lib/domains/leaderboard/types/liquidity/types';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { activeSeason } from '$shared/stores/activeSeason';
  import getConnectedAddress from '$shared/utils/getConnectedAddress';

  import { getEditionDetails } from './editionDetails';
  import LiquidityRoyaleHeader from './Header/LiquidityRoyaleHeader.svelte';
  import LiquidityDisclaimer from './LiquidityDisclaimer.svelte';

  let headers = ['No.', 'Address', 'Points'];
  let leaderboard: LiquidityCompetitionPage;

  export let loading = false;
  export let edition: number;

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  const pageInfoStore = derived(leaderboardStore, ($leaderboardStore) => $leaderboardStore.pagination);
  const unsubscribePageInfo = pageInfoStore.subscribe((value) => {
    pageInfo = value;
  });

  const currentEdition: number = 3;
  $: reactiveEdition = edition;
  $: totalItems = pageInfo?.total || 0;
  $: hasEnded = reactiveEdition !== currentEdition;
  $: leaderboard = $leaderboardStore;

  async function handlePageChange(page: number) {
    if (browser) await fetchLeaderboard(page, $activeLiquidityType, reactiveEdition);
  }

  async function loadLeaderboardData(page: number, address = '') {
    if (browser) await fetchLeaderboard(page, $activeLiquidityType, reactiveEdition, address);
  }

  let activeTypeUnsubscribe: Unsubscriber;
  onMount(() => {
    if (browser && $activeSeason && pageInfo) {
      loadLeaderboardData(pageInfo.page);
    }
    activeTypeUnsubscribe = activeLiquidityType.subscribe(() => {
      if (pageInfo) loadLeaderboardData(pageInfo.page);
    });
  });

  onDestroy(() => {
    if (activeTypeUnsubscribe) activeTypeUnsubscribe();
    unsubscribePageInfo();
  });

  setContext('loadLiquidityCompetitionLeaderboardData', loadLeaderboardData);
  setContext('liquidityEdition', edition);

  $: details = getEditionDetails(reactiveEdition);
  $: tabs = details?.tabs || [];

  onMount(async () => {
    const address = await getConnectedAddress();
    if (address && address !== zeroAddress) {
      const season = $activeSeason;
      try {
        await fetchLeaderboardUserEntry(address, edition, season);
      } catch (error) {
        console.error('Error fetching user row:', error);
      }
    }
  });
</script>

{#key edition}
  {#if edition <= currentEdition}
    <AbstractLeaderboard
      {tabs}
      {headers}
      activeTabStore={activeLiquidityType}
      season={$activeSeason}
      data={leaderboard.items}
      lastUpdated={new Date($currentLiquidityCompetitionLeaderboard.lastUpdated)}
      showPagination={true}
      showDetailsColumn={false}
      showTrophy={true}
      qualifyingPositions={50}
      highlightedUserPosition={$currentLiquidityCompetitionLeaderboardUserEntry}
      isLoading={loading}
      ended={hasEnded}
      endedComponent={CampaignEndedInfoBox}
      endTitleText={$t(`leaderboard.liquidityRoyale.ended.edition${edition}.title`)}
      endDescriptionText={$t(`leaderboard.liquidityRoyale.ended.edition${edition}.description`)}
      {handlePageChange}
      {totalItems}
      headerComponent={LiquidityRoyaleHeader}
      scoreComponent={PointScore} />
    <LiquidityDisclaimer />
  {:else}
    No data
  {/if}
{/key}
