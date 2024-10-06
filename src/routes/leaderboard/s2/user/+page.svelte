<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ActionButton } from '$components/Button';
  import { Page } from '$components/Page';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/dapps/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { classNames } from '$libs/util/classNames';
  import UserLeaderboard from '$lib/domains/leaderboard/components/UserLeaderboard.svelte';

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
  <UserLeaderboard {pageInfo} {loading} season={2} />
  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
