<script lang="ts">
  import { t } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { DappsLeaderboard } from '$components/Leaderboards';
  import { Page } from '$components/Page';
  import type { PaginationInfo } from '$libs/leaderboard';
  import { page } from '$app/stores';

  let pageInfo: PaginationInfo = $page.data.pageInfo;

  const handleClick = () => {
    goto('/leaderboard/bridge');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - Leaderboard</title>
</svelte:head>

<Page>
  <DappsLeaderboard {pageInfo} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.bridge')}
    </ActionButton>
  </div>
</Page>
