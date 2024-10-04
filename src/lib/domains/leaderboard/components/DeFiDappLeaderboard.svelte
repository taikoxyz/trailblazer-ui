<!-- <script lang="ts">
  import { t } from 'svelte-i18n';

  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import { DefiEndedComponent } from './Competition/DefiCompetition';
  import DefiCompetitionInformation from './Competition/DefiCompetition/DefiCompetitionInformation.svelte';
  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import LastUpdatedHeader from './LastUpdatedHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import DollarScore from './Template/DollarScore.template.svelte';
  import { mapDefiDappLeaderboardRow } from '../mapper/mapper';

  let headers = ['No.', 'Dapp', 'TVL'];

  $: data = $currentDefiDappLeaderboard.protocols.map(mapDefiDappLeaderboardRow);
  $: lastUpdated = new Date($currentDefiDappLeaderboard.lastUpdated * 1000);
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
  scoreComponent={DollarScore}
  additionalInfoComponent={DefiCompetitionInformation}
  ended={true}
  endedComponent={DefiEndedComponent}
  endTitleText={$t('leaderboard.defi.ended.title')}
  endDescriptionText={$t('leaderboard.defi.ended.description')}>
  <LastUpdatedHeader {lastUpdated} />
</AbstractLeaderboard> -->
