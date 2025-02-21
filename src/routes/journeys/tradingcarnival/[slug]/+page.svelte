<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import TradingCarnivalLeaderboard from '$lib/domains/leaderboard/components/Competition/CexCompetition/TradingCarnivalLeaderboard.svelte';
  import { competitionSlug } from '$lib/domains/leaderboard/stores/dappCompetitionStore.js';
  import type { CexCompetitionItem } from '$lib/domains/leaderboard/types/cex/types.js';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { classNames } from '$shared/utils/classNames';

  export let data;

  let pageInfo: PaginationInfo<CexCompetitionItem>;

  $: ({ pageInfo } = $page.data);

  $: competitionSlug.set(data.slug);

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  const handleClick = () => {
    goto('/leaderboard/s3/dapps');
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.trading_carnival')}</title>
</svelte:head>

<Page>
  {#key data.slug}
    <TradingCarnivalLeaderboard {pageInfo} edition={parseInt($competitionSlug)} />
  {/key}

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
