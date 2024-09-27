<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { BridgeLeaderboard } from '$components/Leaderboards';
  import { Page } from '$components/Page';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Gaming Leaderboard</title>
</svelte:head>

<Page>
  <BridgeLeaderboard />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={() => goto('/leaderboard/dapp')} withArrow>
      {$t('buttons.leaderboard.dapp')}
    </ActionButton>
  </div>
</Page>
