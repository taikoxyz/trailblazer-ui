<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { ActionButton } from '$components/Button';
  import GamingLeaderboard from '$components/Leaderboards/GamingLeaderboard.svelte';
  import { Page } from '$components/Page';
  import type { PaginationInfo } from '$libs/leaderboard';

  let pageInfo: PaginationInfo;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/gaming');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - Leaderboard</title>
</svelte:head>

<Page>
  <GamingLeaderboard {pageInfo} {loading} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
