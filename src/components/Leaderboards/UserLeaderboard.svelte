<script lang="ts">
  import { mapDefiDappLeaderboardRow } from '$libs/leaderboard';
  import { currentDefiDappLeaderboard, currentUserLeaderboard } from '$stores/leaderboard';

  import DefiCompetitionInformation from './Competition/DefiCompetition/DefiCompetitionInformation.svelte';
  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import DollarScore from './Template/DollarScore.template.svelte';

  let headers = ['No.', 'Name', 'Address', 'Level', 'Title', 'Points'];

  $: data = $currentUserLeaderboard;
  console.log('🚀 | data:', data);
</script>

<AbstractLeaderboard
  {headers}
  {data}
  showPagination={true}
  showDetailsColumn={false}
  showTrophy={true}
  isLoading={false}
  handlePageChange={() => {}}
  currentPage={1}
  totalItems={$currentDefiDappLeaderboard.protocols.length}
  showLastUpdated={true}
  lastUpdated={new Date($currentDefiDappLeaderboard.lastUpdated * 1000)}
  headerComponent={DefiDappsHeader}
  scoreComponent={DollarScore}
  additionalInfoComponent={DefiCompetitionInformation} />
