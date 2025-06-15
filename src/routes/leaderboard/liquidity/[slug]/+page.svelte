<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from 'svelte-i18n';

  import { page } from '$app/stores';
  import LiquidityRoyaleLeaderboard from '$lib/domains/leaderboard/components/Competition/LiquidityRoyale/LiquidityRoyaleLeaderboard.svelte';
  import { activeLiquidityType } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore.js';
  import { Page } from '$shared/components/Page';

  export let data;

  const { slug, type, pageInfo } = data;

  let loading: boolean;

  // Set the active liquidity type only once on mount
  onMount(() => {
    activeLiquidityType.set(type);
  });

  $: ({ loading } = $page.data);
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.liquidity')}</title>
</svelte:head>

<Page>
  {#key slug}
    <LiquidityRoyaleLeaderboard {loading} edition={parseInt(slug)} serverPageInfo={pageInfo} />
  {/key}
</Page>
