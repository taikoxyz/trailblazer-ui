<script lang="ts">
  import { t } from 'svelte-i18n';

  import { page } from '$app/stores';
  import ThrillblazerLeaderboard from '$lib/domains/leaderboard/components/Competition/DappCompetition/Thrillblazer/ThrillblazerLeaderboard.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { leaderboardLoading } from '$lib/domains/leaderboard/stores/dappCompetitionLeaderboard';
  import { competitionSlug } from '$lib/domains/leaderboard/stores/dappCompetitionStore.js';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { Page } from '$shared/components/Page';

  export let data;

  let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: ({ pageInfo } = $page.data);

  $: competitionSlug.set(data.slug);

  $: if (pageInfo) {
    $leaderboardLoading = false;
  } else {
    $leaderboardLoading = true;
  }
</script>

<svelte:head>
  <title>{$t('pagetitle.journeys.thrillblazers')}</title>
</svelte:head>

<Page>
  {#key data.slug}
    <ThrillblazerLeaderboard {pageInfo} edition={parseInt($competitionSlug)} />
  {/key}
</Page>
