<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import ThrillblazerLeaderboard from '$lib/domains/leaderboard/components/Competition/DappCompetition/Thrillblazer/ThrillblazerLeaderboard.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import { leaderboardLoading } from '$lib/domains/leaderboard/stores/dappCompetitionLeaderboard';
  import { competitionSlug } from '$lib/domains/leaderboard/stores/dappCompetitionStore.js';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { classNames } from '$shared/utils/classNames';

  export let data;

  let pageInfo: PaginationInfo<DappLeaderboardItem>;

  $: ({ pageInfo } = $page.data);

  $: competitionSlug.set(data.slug);

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  const handleClick = () => {
    goto('/leaderboard/s3/dapps');
  };

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

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
