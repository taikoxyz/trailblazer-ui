<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { page } from '$app/stores';
  import { DappsLeaderboard } from '$components/Leaderboards';
  import { Page } from '$components/Page';
  import type { DappLeaderboardItem, PaginationInfo } from '$libs/leaderboard';

  let pageInfo: PaginationInfo<DappLeaderboardItem>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/bridge');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - Dapp Leaderboard</title>
</svelte:head>

<Page>
  <DappsLeaderboard {pageInfo} {loading} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.bridge')}
    </ActionButton>
  </div>
</Page>
