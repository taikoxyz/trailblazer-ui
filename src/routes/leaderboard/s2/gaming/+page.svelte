<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import GamingLeaderboard from '$lib/domains/leaderboard/components/GamingLeaderboard.svelte';
  import type { DappLeaderboardItem } from '$lib/domains/leaderboard/dto/dapps.dto';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';

  let pageInfo: PaginationInfo<DappLeaderboardItem>;
  let loading: boolean;

  $: ({ pageInfo, loading } = $page.data);

  const handleClick = () => {
    goto('/leaderboard/s2/user');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - Gaming Leaderboard</title>
</svelte:head>

<Page>
  <GamingLeaderboard {pageInfo} {loading} season={2} />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
