<script>
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { ActionButton } from '$components/Button';
  import UserLeaderboard from '$components/Leaderboards/UserLeaderboard.svelte';
  import { Page } from '$components/Page';

  const handleClick = () => {
    goto('/leaderboard/bridge');
  };
</script>

<svelte:head>
  <title>Taiko Trailblazer - User Leaderboard</title>
</svelte:head>

<Page>
  <UserLeaderboard />

  <div class="w-full flex justify-center mt-[58px]">
    <ActionButton class="max-w-[280px]" priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.bridge')}
    </ActionButton>
  </div>
</Page>
