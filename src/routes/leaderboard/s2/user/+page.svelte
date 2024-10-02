<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ActionButton } from '$components/Button';
  import { UserLeaderboardS2 } from '$components/Leaderboards/s2';
  import { Page } from '$components/Page';
  import { classNames } from '$lib/shared/utils/classNames';
  import type { PaginationInfo, UserLeaderboardItem } from '$libs/leaderboard';

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  let loading: boolean;

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/s2/dapp');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - User Leaderboard</title>
</svelte:head>

<Page>
  <UserLeaderboardS2 {pageInfo} {loading} />
  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
