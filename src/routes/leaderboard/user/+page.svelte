<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ActionButton } from '$components/Button';
  import { UserLeaderboard } from '$components/Leaderboards';
  import { Page } from '$components/Page';
  import type { PaginationInfo, UserLeaderboardItem } from '$libs/leaderboard';

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/bridge');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - User Leaderboard</title>
</svelte:head>

<Page>
  <UserLeaderboard {pageInfo} {loading} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.bridge')}
    </ActionButton>
  </div>
</Page>
