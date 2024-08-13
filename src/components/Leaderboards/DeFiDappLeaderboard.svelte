<script lang="ts">
  import { t } from 'svelte-i18n';

  import { mapDefiDappLeaderboardRow } from '$libs/leaderboard';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import { DefiEndedComponent } from './Competition/DefiCompetition';
  import DefiCompetitionInformation from './Competition/DefiCompetition/DefiCompetitionInformation.svelte';
  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import DollarScore from './Template/DollarScore.template.svelte';

  let headers = ['No.', 'Dapp', 'TVL'];

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
  showLastUpdated={true}
  lastUpdated={new Date($currentDefiDappLeaderboard.lastUpdated * 1000)}
  headerComponent={DefiDappsHeader}
  scoreComponent={DollarScore}
  additionalInfoComponent={DefiCompetitionInformation}
  ended={true}
  endedComponent={DefiEndedComponent}
  endTitleText={$t('leaderboard.defi.ended.title')}
  endDescriptionText={$t('leaderboard.defi.ended.description')} />
