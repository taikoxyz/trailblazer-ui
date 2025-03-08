<script lang="ts">
  import { t } from 'svelte-i18n';

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import LiquidityRoyaleLeaderboard from '$lib/domains/leaderboard/components/Competition/LiquidityRoyale/LiquidityRoyaleLeaderboard.svelte';
  import { ActionButton } from '$shared/components/Button';
  import { Page } from '$shared/components/Page';
  import { activeSeason } from '$shared/stores/activeSeason';
  import { classNames } from '$shared/utils/classNames';
  import { activeLiquidityType } from '$lib/domains/leaderboard/stores/liquidityCompetitionStore.js';

  export let data;

  const { slug, type } = data;

  let loading: boolean;

  activeLiquidityType.set(type);

  $: ({ loading } = $page.data);

  const wrapperClasses = classNames('w-full', 'flex', 'justify-center', 'mt-[58px]');
  const buttonClasses = classNames('max-w-[280px]');

  const handleClick = () => {
    goto(`/leaderboard/s${activeSeason}/user`);
  };
</script>

<svelte:head>
  <title>{$t('pagetitle.competition.liquidity')}</title>
</svelte:head>

<Page>
  {#key slug}
    <LiquidityRoyaleLeaderboard {loading} edition={parseInt(slug)} />
  {/key}

  <div class={wrapperClasses}>
    <ActionButton class={buttonClasses} priority="primary" on:click={handleClick} withArrow>
      {$t('buttons.leaderboard.user')}
    </ActionButton>
  </div>
</Page>
