<script lang="ts">
  import { mapDefiDappLeaderboardRow } from '$libs/leaderboard';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import DollarScore from './Template/DollarScore.template.svelte';

  let headers = ['No.', 'Dapp', 'TVL'];

  // Map the data to align with the expected types in AbstractLeaderboard
  $: data = $currentDefiDappLeaderboard.protocols.map(mapDefiDappLeaderboardRow);
</script>

<AbstractLeaderboard
  {headers}
  {data}
  showPagination={false}
  showDetailsColumn={false}
  showTrophy={true}
  isLoading={false}
  handlePageChange={() => {}}
  currentPage={1}
  totalItems={$currentDefiDappLeaderboard.protocols.length}
  headerComponent={DefiDappsHeader}
  showLastUpdated={true}
  lastUpdated={new Date($currentDefiDappLeaderboard.lastUpdated * 1000)}
  scoreComponent={DollarScore} />
