<script lang="ts">
  import { t } from 'svelte-i18n';

  import { page } from '$app/stores';
  import LiquidityRoyaleLeaderboard from '$lib/domains/leaderboard/components/Competition/LiquidityRoyale/LiquidityRoyaleLeaderboard.svelte';
  import { activeLiquidityType } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore.js';
  import { Page } from '$shared/components/Page';

  export let data;

  const { slug, type } = data;

  let loading: boolean;

  activeLiquidityType.set(type);

  $: ({ loading } = $page.data);
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.liquidity')}</title>
</svelte:head>

<Page>
  {#key slug}
    <LiquidityRoyaleLeaderboard {loading} edition={parseInt(slug)} />
  {/key}
</Page>
