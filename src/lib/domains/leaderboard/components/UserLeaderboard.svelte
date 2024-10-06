<script lang="ts">
  import { t } from 'svelte-i18n';

  import { leaderboardConfig } from '$config';
  import type { PaginationInfo } from '$lib/shared/dto/CommonPageApiResponse';

  import { userLeaderboardService } from '../services/LeaderboardServiceInstances';
  import { currentUserLeaderboard } from '../stores/userLeaderboard';
  import type { UserLeaderboardItem } from '../types/dapps/types';
  import { CampaignEndedInfoBox } from './CampaignEndedInfoBox';
  import { UserLeaderboardHeader } from './Header';
  import { AbstractLeaderboard, PointScore } from './Template';

  let headers = ['No.', 'Address', 'Level', 'Title', 'Points'];

  export let loading = false;
  export let pageInfo: PaginationInfo<UserLeaderboardItem>;
  export let season: number;
  const endedSeasons = [1];

  $: totalItems = pageInfo?.total || 0;
  $: pageSize = pageInfo?.size || leaderboardConfig.pageSize;

  $: hasEnded = endedSeasons.includes(season);

  function handlePageChange(page: number) {
    loadLeaderboardData(page);
  }

  async function loadLeaderboardData(page: number) {
    loading = true;
    // Fetch the leaderboard data for the given page
    const args: PaginationInfo<UserLeaderboardItem> = {
      page,
      size: pageSize,
      total: totalItems,
    };
    const leaderboardPage = await userLeaderboardService.getUserLeaderboardData(args, season);
    totalItems = leaderboardPage?.pagination.total || $currentUserLeaderboard.items.length;

    loading = false;
  }
</script>

<AbstractLeaderboard
  {headers}
  data={$currentUserLeaderboard.items}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  isLoading={loading}
  ended={hasEnded}
  endedComponent={CampaignEndedInfoBox}
  endTitleText={$t('leaderboard.user.ended.s1.title')}
  endDescriptionText={$t('leaderboard.user.ended.s1.description')}
  {handlePageChange}
  {totalItems}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
