<script lang="ts">
  import { t } from 'svelte-i18n';

  import { mapDefiDappLeaderboardRow } from '$libs/leaderboard';
  import { currentDefiDappLeaderboard } from '$stores/leaderboard';

  import { DefiEndedComponent } from './Competition/DefiCompetition';
  import DefiCompetitionInformation from './Competition/DefiCompetition/DefiCompetitionInformation.svelte';
  import DefiDappsHeader from './Header/DefiDappsHeader.svelte';
  import LastUpdated from './LastUpdated.svelte';
  import AbstractLeaderboard from './Template/AbstractLeaderboard.template.svelte';
  import DollarScore from './Template/DollarScore.template.svelte';

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
  <div
    class="f-col lg:f-row lg:f-between-center items-center content-center mt-[60px] lg:mt-[77px] mb-[30px] space-y-[30px] lg:space-y-0">
    <div class="text-xl font-bold">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html $t('leaderboard.whitelist.cta')}
    </div>
    {#if lastUpdated}
      <LastUpdated class="w-fit" {lastUpdated} />
    {/if}
  </div>
</AbstractLeaderboard>
