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
  export let serverPageInfo: PaginationInfo<UserLeaderboardItem> | undefined = undefined;

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  const pageInfoStore = derived(leaderboardStore, ($leaderboardStore) => $leaderboardStore.pagination);
  const unsubscribePageInfo = pageInfoStore.subscribe((value) => {
    pageInfo = value;
  });

  // Initialize pageInfo with server data if available
  $: if (serverPageInfo && !pageInfo) {
    pageInfo = serverPageInfo;
  }

  const currentEdition: number = 4;
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
  let isInitialized = false;
  let isMounted = false;
  let currentEditionRef = edition; // Track current edition

  // Add unique component ID for debugging
  const componentId = Math.random().toString(36).substr(2, 9);

  onMount(async () => {
    isMounted = true;
    currentEditionRef = edition;

    // Clear the leaderboard store to prevent showing data from previous editions
    leaderboardStore.set({
      items: [],
      lastUpdated: Date.now(),
      pagination: serverPageInfo || { page: 0, size: 10, total: 0 },
    });

    // Wait for pageInfo to be available
    if (!pageInfo && serverPageInfo) {
      pageInfo = serverPageInfo;
    }

    // Track whether we've made the initial API call to prevent duplicates
    let hasLoadedInitialData = false;

    // Set up subscription for tab changes
    activeTypeUnsubscribe = activeLiquidityType.subscribe(() => {
      // Only load data once during initialization
      if (!hasLoadedInitialData && pageInfo) {
        hasLoadedInitialData = true;
        isInitialized = true;
        loadLeaderboardData(pageInfo.page);
        return;
      }

      // For subsequent type changes (user clicking tabs), reload data
      if (hasLoadedInitialData && isInitialized && isMounted && currentEditionRef === edition) {
        // Clear existing data first to prevent showing stale data
        leaderboardStore.set({
          items: [],
          lastUpdated: Date.now(),
          pagination: pageInfo,
        });
        loadLeaderboardData(pageInfo.page);
      }
    });

    // Fetch user position separately
    const address = await getConnectedAddress();
    if (address && address !== zeroAddress) {
      const season = $activeSeason;
      try {
        await fetchLeaderboardUserEntry(address, edition, season);
      } catch (error) {
        console.error(`[${componentId}] Error fetching user row:`, error);
      }
    }

    // Mark initial mount as completed to allow reactive edition changes
    hasInitialMountCompleted = true;
  });

  // Watch for edition changes and update reference
  // Only trigger reload if this is not the initial mount
  let hasInitialMountCompleted = false;
  $: if (edition !== currentEditionRef && hasInitialMountCompleted) {
    currentEditionRef = edition;
    if (isInitialized && isMounted) {
      // Reset and reload for new edition
      isInitialized = false;
      if (browser && $activeSeason && pageInfo) {
        isInitialized = true;
        loadLeaderboardData(pageInfo.page);
      }
    }
  }

  onDestroy(() => {
    isMounted = false;
    if (activeTypeUnsubscribe) activeTypeUnsubscribe();
    unsubscribePageInfo();
  });

  setContext('loadLiquidityCompetitionLeaderboardData', loadLeaderboardData);
  setContext('liquidityEdition', edition);

  $: details = getEditionDetails(reactiveEdition);
  $: tabs = details?.tabs || [];
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
      qualifyingPositions={details ? details.qualifyingPositions : 100}
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
