<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import UserLeaderboard from '$lib/domains/leaderboard/components/UserLeaderboard.svelte';
  import type { UserLeaderboardItem } from '$lib/domains/leaderboard/types/user/types';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';

  let pageInfo: PaginationInfo<UserLeaderboardItem>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/s1/user');
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.leaderboards.user')}</title>
</svelte:head>

<Page>
  <UserLeaderboard {pageInfo} {loading} season={1} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
