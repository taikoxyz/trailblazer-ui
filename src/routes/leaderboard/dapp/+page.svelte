<script>
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import { DappsLeaderboard } from '$components/Leaderboards';
  import { Page } from '$components/Page';
</script>

<svelte:head>
  <title>Taiko Trailblazer - Leaderboard</title>
</svelte:head>

<Page>
  <DappsLeaderboard />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={() => goto('/leaderboard/bridge')} withArrow>
      {$t('buttons.leaderboard.bridge')}
    </ActionButton>
  </div>
</Page>
