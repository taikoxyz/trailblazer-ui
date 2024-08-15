<script lang="ts">
  import { mapUserLeaderboardRow } from '$libs/leaderboard';
  import { currentUserLeaderboard } from '$stores/leaderboard';

  import { UserLeaderboardHeader } from './Header';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import PointScore from './Template/PointScore.template.svelte';

  let headers = ['No.', 'Address', 'Level', 'Title', 'Points'];

  $: data = $currentUserLeaderboard.items.map(mapUserLeaderboardRow);
  console.log('🚀 | data:', data);
</script>

<AbstractLeaderboard
  {headers}
  {data}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  showCTA={false}
  isLoading={false}
  handlePageChange={() => {}}
  currentPage={1}
  totalItems={$currentUserLeaderboard.items.length}
  showLastUpdated={false}
  headerComponent={UserLeaderboardHeader}
  scoreComponent={PointScore} />
