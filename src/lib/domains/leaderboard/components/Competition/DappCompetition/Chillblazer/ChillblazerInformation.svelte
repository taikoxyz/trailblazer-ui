<script lang="ts">
  import { t } from 'svelte-i18n';

  import CompetitionInformation from '$lib/domains/leaderboard/components/Competition/CompetitionInformation.template.svelte';
  import type { CompetitionInfo } from '$lib/domains/leaderboard/components/Competition/types';

  export let lastUpdated: Date;

  export let season: number;

  const competitionInfo: CompetitionInfo = {
    title: $t(`leaderboard.competitions.s${season}.dapp.banner.title`),
    description: $t('leaderboard.gaming.banner.description'),
    prizeTitle: $t('leaderboard.gaming.prize.1'),
    prizeSubtitle: $t('leaderboard.gaming.prize.2'),
    prizes: [
      {
        image: '/first.svg',
        amount: $t('leaderboard.gaming.prize_breakdown.first.amount'),
      },
      {
        image: '/second.svg',
        amount: $t('leaderboard.gaming.prize_breakdown.second.amount'),
      },
      {
        image: '/third.svg',
        amount: $t('leaderboard.gaming.prize_breakdown.third.amount'),
      },
    ],
  };
</script>

<CompetitionInformation {competitionInfo} {lastUpdated} />
