<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import DappsLeaderboard from '$lib/domains/leaderboard/components/DappsLeaderboard.svelte';
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
    goto('/leaderboard/s3/user');
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.leaderboards.dapp')}</title>
</svelte:head>

<Page>
  <DappsLeaderboard {pageInfo} {loading} season={3} />

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
