<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import UserLeaderboard from '$lib/domains/leaderboard/components/UserLeaderboard.svelte';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { classNames } from '$shared/utils/classNames';

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  let loading: boolean;

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/journeys/liquidity/3');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - Users Leaderboard</title>
</svelte:head>

<Page>
  <UserLeaderboard {pageInfo} {loading} season={4} />
  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.liquidity')}
    </ActionButton>
  </div>
</Page>
