<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { Page } from '$components/Page';
  import DeFiDappLeaderboard from '$lib/domains/leaderboard/components/DeFiDappLeaderboard.svelte';
</script>

<svelte:head>
  <title>Taiko Trailblazer - DeFi Leaderboard</title>
</svelte:head>

<Page>
  <DeFiDappLeaderboard />
  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={() => goto('/leaderboard/dapp')} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
