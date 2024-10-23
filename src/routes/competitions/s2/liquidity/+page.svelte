<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import DappCompetitonLeaderboard from '$lib/domains/leaderboard/components/Competition/DappCompetition/DappCompetitonLeaderboard.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { classNames } from '$shared/utils/classNames';

  let pageInfo: PaginationInfo<DappLeaderboardItem>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  const handleClick = () => {
    goto('/leaderboard/s2/user');
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.liquidity')}</title>
</svelte:head>

<Page>
  <DappCompetitonLeaderboard {pageInfo} {loading} season={2} />

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
