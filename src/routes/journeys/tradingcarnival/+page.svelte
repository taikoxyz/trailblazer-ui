<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import TradingCarnivalLeaderboard from '$lib/domains/leaderboard/components/Competition/CexCompetition/TradingCarnivalLeaderboard.svelte';
  import type { CexCompetitionRow } from '$lib/domains/leaderboard/types/cex/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';

  let pageInfo: PaginationInfo<CexCompetitionRow>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  const handleClick = () => {
    goto(`/leaderboard/s${activeSeason}/user`);
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.trading_carnival')}</title>
</svelte:head>

<Page>
  <TradingCarnivalLeaderboard {pageInfo} {loading} />

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
